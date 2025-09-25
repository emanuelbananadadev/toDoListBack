import {Request, Response} from 'express'
import {z} from 'zod'
import bcrypt from "bcrypt"
import { prisma } from '../config/PrismaConfig'
import jwt from "jsonwebtoken"

export class AuthController {
    
    async login(request: Request, response: Response) {
        const bodySchema = z.object({
            email: z.email(),
            password: z.string()
        })

        const {email, password} = bodySchema.parse(request.body)

        const user = await prisma.user.findUnique({where: { email }})

        if(!user) {
            return response.status(400).json("Usuário não encontrado")
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            return response.status(400).json("Senha incorreta")
        }

        const token = jwt.sign({id: user.id, email: user.email}, "emanuelTeste", {expiresIn: "1d"})

        return response.json(token)
    }
}