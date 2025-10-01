import {Request, Response} from 'express'
import bcrypt from "bcrypt"
import { prisma } from '../config/PrismaConfig'
import jwt from "jsonwebtoken"
import { loginSchema } from '../schemas/authSchemas'

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

        const token = jwt.sign({id: user.id, email: user.email, role: user.role}, "emanuelTesteSecreta", {expiresIn: "1d"})

        return response.json({token: token, user})
    }
}