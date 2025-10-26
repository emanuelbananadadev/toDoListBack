import {NextFunction, Request, Response} from "express"
import {z} from 'zod'
import bcrypt from "bcrypt"
import { prisma } from "../config/PrismaConfig"
import { AppError } from "../errors/AppError"
import { UserRole } from "../types/roles"
import { changePasswordSchema } from "../schemas/userSchemas"
import { hash } from "bcrypt"

export class UserController {

    async create(request: Request, response: Response) {

        const bodySchema = z.object({
            name: z.string(),
            email: z.email({message: "Digite um e-mail correto"}),
            password: z.string(),
        })

        const {name, email, password} = bodySchema.parse(request.body)

        const userExists = await prisma.user.findUnique({where: {email}})
        if(userExists) {
            throw new AppError("Usuário já existe")
        }

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

    async profile(request: Request, response: Response, next: NextFunction) {

        try {
            const userId = request.user?.id

            if(!userId) {
                throw new AppError("Usuário não autenticado", 401)
            }

            const user = await prisma.user.findUnique({where: {id: userId}, select: {
                id: true,
                name: true,
                email: true,
                role: true
            }})

            if(!user) {
                throw new AppError("Usuário não encontrado", 404)
            }

            return response.status(200).json({message: "Perfil do usuário", user})
                
        } catch (error) {
            next(error)
        }
       
    }

    async updateRole(request: Request, response: Response, next: NextFunction) {

        try {
            const roleUser = request.user?.role

            const {id} = request.params

            if(!roleUser || roleUser != UserRole.ADMIN) {
                throw new AppError("Permissão somente para administradores")
            }

            const user = await prisma.user.findUnique({where: {id}})
            if(user?.role == UserRole.USER) {
                await prisma.user.update({where: {id}, data: {role: UserRole.ADMIN}})
            }

            return response.status(200).json({message: "Alteração feita com sucesso"})
            
        } catch (error) {
            next(error)
        }
        

    }

    async list(request:Request, response: Response) {
        const users = await prisma.user.findMany()

        return response.status(200).json(users)
    }

    async changePassword(request: Request, response: Response, next: NextFunction) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado", 401)
        }

        try {
            const {currentPassword, newPassword, confirmNewPassword} = changePasswordSchema.parse(request.body)
            
            const user = await prisma.user.findUnique({where: {id: userId}})

            if(!user) {
                throw new AppError("Usuário não encontrado", 401)
            }

            const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

            if(!isPasswordValid) {
                throw new AppError("A senha atual está incorreta", 401)
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10)

            await prisma.user.update({
                where: {id: userId},
                data: {password: hashedPassword}
            })

            return response.status(204).send()

        } catch (error) {
            next(error)
        }
    }

    //Descartar método
    // async resetPassword(request: Request, response: Response)  {
    //     const bodySchema = z.object({
    //         email: z.string().email(),
    //         newPassword: z.string().min(6, {message: "A nova senha deve ter pelo menos 6 caracteres"})
    //     })

    //     const {email, newPassword} = bodySchema.parse(request.body)

    //     try {
    //         const user = await prisma.user.findUnique({where:{email}})

    //         if(!user) {
    //             return response.status(404).json({message: "Usuário não encontrado"})
    //         }

    //         const hashedPassword = await hash(newPassword, 10)

    //         await prisma.user.update({
    //             where: {email},
    //             data: {password: hashedPassword}
    //         })

    //         return response.status(200).json({message: "Senha atualizada com sucesso!"})


    //     } catch (error) {
    //         console.log(error)
    //         throw new AppError("Erro interno ao redefinir a senha")
    //     }
    // }
}