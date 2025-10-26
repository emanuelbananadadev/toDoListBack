import {Router} from 'express'
import { AuthController } from '../controller/AuthController'
import { authMiddleware } from '../middleware/authMiddleware'

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/login', authController.login)
authRouter.post('/forgot-password', authController.resetPassword)
authRouter.patch('/reset-password-confirm', authController.resetPasswordConfirm)

authRouter.post('/logout', authMiddleware, authController.logout)

export {authRouter}