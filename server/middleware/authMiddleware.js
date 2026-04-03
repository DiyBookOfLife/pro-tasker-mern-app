import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // extract token from "Bearer <token>"
  const token = req.headers.authorization?.split(" ")[1];

  // block request if no token is provided
  if (!token) {
    return res.status(401).json({ msg: "No token" });
  }

  try {
    // verify token using my secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach user id to request so protected routes know who's making the request
    req.user = { id: decoded.id };
    next(); // allow request to continue
  } catch {
    res.status(401).json({ msg: "Invalid token" }); // invalid or expired token
  }
};

export default authMiddleware;
