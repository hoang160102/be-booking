import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export interface AuthRequest extends Request {
  userId?: string;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Vui lòng đăng nhập để truy cập",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Vui lòng đăng nhập để truy cập",
      });
    }

    req.userId = user._id.toString();
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Vui lòng đăng nhập để truy cập",
    });
  }
};
