import { Request, Response, NextFunction } from "express";
import User from "../models/User";

class AuthController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {

      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Vui lòng nhập email và mật khẩu"
        })
      }

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Email hoặc mật khẩu không chính xác",
        })
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Email hoặc mật khẩu không chính xác",
        })
      }
      const token = user.getSignedJwtToken();
      res.status(200).json({
        success: true,
        token,
      })
    }
    catch (error) {
      next(error);
    }
  }
}

export default AuthController;
