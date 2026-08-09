import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied token not found", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Access Denied token not valid", success: false });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Access Denied", success: false });
  }
};

export default authenticateToken;
