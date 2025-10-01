import { Router } from "express";
import { AdminController } from "../controller/AdminController";
import { adminMiddleware } from "../middleware/adminMiddleware";
import { authMiddleware } from "../middleware/authMiddleware";

const adminRouter = Router()
const adminController = new AdminController()

adminRouter.get('/', authMiddleware ,adminMiddleware ,adminController.enter)

export {adminRouter}