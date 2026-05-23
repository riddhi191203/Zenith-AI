import { clerkClient } from "@clerk/express";

// AUTH MIDDLEWARE

export const auth = async (req, res, next) => {
  try {
    const { userId } = await req.auth();

    // GET USER
    const user = await clerkClient.users.getUser(userId);

    // DEFAULT VALUES
    req.userId = userId;

    // REMOVE PREMIUM RESTRICTIONS
    req.plan = "premium";

    // OPTIONAL FREE USAGE
    req.free_usage = 0;

    next();

  } catch (error) {
    console.log(error.message);

    res.json({
      success: false,
      message: error.message,
    });
  }
};