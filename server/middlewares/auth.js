import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ success: false, message: "Authorization token is required" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    req.user = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };
    req.plan = "premium";
    req.free_usage = 0;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.name === "TokenExpiredError" ? "Session expired. Please log in again." : "Invalid token",
    });
  }
};
