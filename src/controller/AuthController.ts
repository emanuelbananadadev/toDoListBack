import {Request, Response} from 'express'
import bcrypt, { hash } from "bcrypt"
import { prisma } from '../config/PrismaConfig'
import jwt from "jsonwebtoken"
import { loginSchema, resetPasswordConfirmSchema, resetPasswordSchema } from '../schemas/authSchemas'
import { randomUUID } from 'crypto'
import { AppError } from '../errors/AppError'

export class AuthController {
    
    async login(request: Request, response: Response) {

        const {email, password} = loginSchema.parse(request.body)

        const user = await prisma.user.findUnique({where: { email }})

        if(!user) {
            return response.status(400).json("Usuário não encontrado")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            return response.status(400).json("Senha incorreta")
        }

        const {password: _, ...userWithoutPassword} = user

        const token = jwt.sign({id: user.id, email: user.email, role: user.role}, "emanuelTesteSecreta", {expiresIn: "1d"})

        return response.json({token: token, user: userWithoutPassword})
    }

    async resetPassword(request: Request, response: Response) {
        const {email} = resetPasswordSchema.parse(request.body)

        try {
            const user = await prisma.user.findUnique({where: {email}})

            if(!user) {
                return response.status(200).json({message: "Se o email estiver cadastrado, o processo foi iniciado. "})
            }

            const token = randomUUID()
            const expirationTime = new Date()
            expirationTime.setHours(expirationTime.getHours() + 1)

            await prisma.user.update({
                where: {id: user.id},
                data: {
                    resetToken: token,
                    resetTokenExpiresAt: expirationTime
                }
            })

            return response.status(200).json({
                message: "Token de redefinição gerado com sucesso",
                resetToken: token
            })



        } catch (error) {
            throw new AppError("Erro interno ao solicitar redefinição de senha.")
        }

    }

    async resetPasswordConfirm(request: Request, response: Response) {
        try {
            const {token, newPassword} = resetPasswordConfirmSchema.parse(request.body)

            const user = await prisma.user.findUnique({
                where: {
                    resetToken: token,
                    resetTokenExpiresAt: {
                        gt: new Date(),
                    },
                },
            })

            if(!user) {
                throw new AppError("Token de redefinição inválido ou expirado", 400)
            }

            const hashedPassword = await hash(newPassword, 10)

            await prisma.user.update({
                where: {id: user.id},
                data: {
                    password: hashedPassword,
                    resetToken: null,
                    resetTokenExpiresAt: null
                },
            })

            return response.status(200).json({message: "Senha redefinida com sucesso. Você pode fazer login agora"})
        } catch (error) {
            if(error instanceof AppError) {
                return response.status(error.status).json({message: error.message})
            }

            console.log(error)
            return response.status(500).json({message: "Erro interno ao redefinir a senha"})
        }
    }

    async logout(request: Request, response: Response) {
        return response.status(204).send()
    }
}