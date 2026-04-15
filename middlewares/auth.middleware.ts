import jwt from "jsonwebtoken";
import User from "../models/User";

export const protect = async (req: any, res: any, next: any) => {
  console.log("Protect middleware called");
  try {
    let token;
    
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    console.log("Token from cookies:", token);

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Token failed" });
  }
};