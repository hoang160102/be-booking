import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

class UserController {
  public static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find();
      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body;
      const user = await User.create(userData);
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
