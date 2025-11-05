import { Router } from "express";
import { UserController } from "../controller/UserController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware"; 
import { validateTaskId } from "../middleware/validateTaskId";

const userRouter = Router()
const userController = new UserController()
userRouter.post('/', userController.create)

userRouter.get('/profile', authMiddleware, userController.profile)
userRouter.patch('/profile', authMiddleware, userController.updateProfile) 
userRouter.patch('/change-password', authMiddleware, userController.changePassword)
userRouter.get('/', authMiddleware, adminMiddleware, userController.list) 
userRouter.patch('/:id', authMiddleware, adminMiddleware, validateTaskId, userController.updateRole)

export { userRouter }