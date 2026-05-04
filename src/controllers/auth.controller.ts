import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { AuthRequest } from "../middlewares/auth.middleware";

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

  public static async getMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.userId);
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({
        success: true,
        message: "Đăng xuất thành công",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
