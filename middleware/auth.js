import jwt from "jsonwebtoken";

export const protectRoute = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: "Access denied. Invalid token.",
      },
    });
  }

  const authToken = token.slice(7); // Remove 'Bearer ' prefix

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: {
        code: 401,
        message: "Access denied. Invalid token.",
      },
    });
  }
};
