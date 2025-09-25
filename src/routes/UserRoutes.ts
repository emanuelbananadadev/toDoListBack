import { Router } from "express";
import { UserController } from "../controller/UserController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = Router()
const userController = new UserController()

userRouter.get('/', userController.list)
userRouter.post('/', authMiddleware, userController.create)

export {userRouter}