// export const protectRoute = async (req, res, next) => {
//   if (!req.auth().isAuthenticated) {
//     return res.status(401).json({ message: "Unauthorized - you must be logged in" });
//   }
//   next();
// };

// middleware/auth.middleware.js
import { getAuth } from "@clerk/express";

export const protectRoute = (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - you must be logged in" });
    }

    // Attach userId to request so controllers can use it
    req.userId = userId;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ message: "Unauthorized - invalid token" });
  }
};
