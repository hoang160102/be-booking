import { Request, Response, NextFunction } from 'express';

class UserController {
  public static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      // Mock data
      const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ];
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  public static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      res.status(200).json({
        success: true,
        data: { id, name: 'John Doe' },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
