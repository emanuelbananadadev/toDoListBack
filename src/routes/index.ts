import { Router } from "express";
import { taskRouter } from "./TaskRoutes";
import { userRouter } from "./UserRoutes";
import { authRouter } from "./AuthRoutes";
import { adminRouter } from "./AdminRoutes";

const routes = Router()

routes.use("/task", taskRouter)
routes.use("/user", userRouter)
routes.use("/auth", authRouter)
routes.use('/admin', adminRouter)

export {routes}