import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createHash, randomBytes, randomUUID } from "crypto";
import sql from "../configs/db.js";

const TOKEN_EXPIRES_IN = "1d";

const ensureUsersTable = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      token_hash TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      used_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
};

const signToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRES_IN }
  );
};

const toSafeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

const sendAuthResponse = (res, user) => {
  res.json({
    success: true,
    token: signToken(user),
    user: toSafeUser(user),
  });
};

const hashToken = (token) => createHash("sha256").update(token).digest("hex");

export const register = async (req, res) => {
  try {
    await ensureUsersTable();

    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = `user_${randomUUID()}`;

    const [user] = await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${id}, ${name}, ${email}, ${hashedPassword})
      RETURNING id, name, email
    `;

    sendAuthResponse(res, user);
  } catch (error) {
    const duplicateEmail = error.message?.includes("users_email_key");
    res.status(duplicateEmail ? 409 : 500).json({
      success: false,
      message: duplicateEmail ? "Email is already registered" : error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    await ensureUsersTable();

    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
    const passwordMatches = user && (await bcrypt.compare(password, user.password));

    if (!passwordMatches) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    sendAuthResponse(res, user);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    await ensureUsersTable();

    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const [user] = await sql`SELECT id, email FROM users WHERE email = ${email}`;

    if (!user) {
      return res.json({
        success: true,
        message: "If an account exists, a reset link will be available.",
      });
    }

    const resetToken = randomBytes(32).toString("hex");
    const tokenHash = hashToken(resetToken);
    const id = `reset_${randomUUID()}`;

    await sql`
      INSERT INTO password_reset_tokens (id, user_id, token_hash, expires_at)
      VALUES (${id}, ${user.id}, ${tokenHash}, NOW() + INTERVAL '15 minutes')
    `;

    res.json({
      success: true,
      message: "Password reset token generated.",
      resetToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    await ensureUsersTable();

    const token = req.body.token?.trim();
    const password = req.body.password;

    if (!token || !password) {
      return res.status(400).json({ success: false, message: "Reset token and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const tokenHash = hashToken(token);
    const [reset] = await sql`
      SELECT * FROM password_reset_tokens
      WHERE token_hash = ${tokenHash}
        AND used_at IS NULL
        AND expires_at > NOW()
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (!reset) {
      return res.json({ success: false, message: "Reset link is invalid or expired" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`UPDATE users SET password = ${hashedPassword} WHERE id = ${reset.user_id}`;
    await sql`UPDATE password_reset_tokens SET used_at = NOW() WHERE id = ${reset.id}`;

    res.json({ success: true, message: "Password updated. You can sign in now." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const me = async (req, res) => {
  res.json({ success: true, user: req.user });
};
