import {prisma} from "../config/PrismaConfig"
import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/AppError"

export class TaskController {
    async list(request: Request, response: Response) {
        const page = Number(request.query.page) || 1
        const limit = Number(request.query.limit) || 10
        const skip = (page - 1) * limit

        const userId = request.user?.id

        if(!userId) {
            return response.status(401).json({message: "Usuário não autenticado"})
        }

        const tasks = await prisma.task.findMany({
            where: {userId},
            skip,
            take: limit,
            orderBy: {createdAt: "asc"}
            })

        const total = await prisma.task.count({where: {userId}})

        const totalPages = Math.ceil(total / limit)

        return response.status(200).json({message: "Lista paginada de tasks", page, totalPages, total, tasks, user: request.user})
    }

    async create(request: Request, response: Response) {
        const {title} = request.body
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado ou token inválido", 401)
        }

        const newTask = await prisma.task.create({
            data: {
                title,
                userId: userId
            }
        })

        return response.status(201).json({message: "Task criada com sucesso", newTask})
    }

    async find(request: Request, response: Response, next: NextFunction) {
        const {id} = request.params
        const userId = request.user?.id

        try {
            const task = await prisma.task.findUnique({where: {id}})

            if(!task || task.userId != userId) {
                throw new AppError("Task não encontrada ou não pertence a este usuário", 404)
            }

            return response.status(200).json({message: "Sua task",task})
            
        } catch (error) {
            next(error)
        }

    }

    async deleteTask(request: Request, response: Response, next: NextFunction) {
        const {id} = request.params
        const userId = request.user?.id

        try {

            const task = await prisma.task.findUnique({where: {id}})

            if(!task || task.userId != userId) {
                throw new AppError("Task não encontrada ou não pertence a este usuário", 404)
            }

            const taskForDelete = await prisma.task.delete({where: {id}})

             return response.status(204).json({ messsage: "Task deletada com sucesso", taskForDelete})
            
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {

        const {id} = request.params

        const {...data} = request.body 
        const userId = request.user?.id

        try {
            const task = await prisma.task.findUnique({where: {id}})

            if(!task || task.userId != userId) {
                throw new AppError("Task não encontrada ou não pertence a ese usuário", 404)
            }

            const taskForUpdate = await prisma.task.update({where: {id}, data: data})

            return response.status(200).json({message: "Task atualizada com sucesso", taskForUpdate})
            
        } catch (error) {
            next(error)
            
        }
    }
}