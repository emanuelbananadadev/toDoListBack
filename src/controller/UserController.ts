import {Request, Response} from "express"
import {z} from 'zod'
import bcrypt from "bcrypt"
import { prisma } from "../config/PrismaConfig"

export class UserController {

    async create(request: Request, response: Response) {

        const bodySchema = z.object({
            name: z.string(),
            email: z.email({message: "Digite um e-mail correto"}),
            password: z.string(),
        })

        const {name, email, password} = bodySchema.parse(request.body)

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        return response.status(201).json(newUser)
    }

    async list(request:Request, response: Response) {
        const users = await prisma.user.findMany()

        return response.status(200).json(users)
    }
}