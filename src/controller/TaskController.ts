import {prisma} from "../config/PrismaConfig"
import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/AppError"

export class TaskController {
    async list(request: Request, response: Response) {
        const page = Number(request.query.page) || 1
        const limit = Number(request.query.limit) || 10
        const skip = (page - 1) * limit

        const tasks = await prisma.task.findMany({
            skip,
            take: limit,
            orderBy: {createdAt: "asc"}
        })

        const total = await prisma.task.count()
        const totalPages = Math.ceil(total / limit)

        return response.status(200).json({message: "Lista paginada de tasks", page, totalPages, total, tasks})
    }

    async create(request: Request, response: Response) {
        const {title} = request.body

        const newTask = await prisma.task.create({
            data: {
                title
            }
        })

        return response.status(201).json({message: "Task criada com sucesso", newTask})
    }

    async find(request: Request, response: Response, next: NextFunction) {
        const {id} = request.params

        try {
            const task = await prisma.task.findUnique({where: {id}})

            if(!task) {
                throw new AppError("Task não encontrada")
            }

            return response.status(200).json({message: "Sua task",task})
            
        } catch (error) {
            next(error)
        }

    }

    async deleteTask(request: Request, response: Response, next: NextFunction) {
        const {id} = request.params

        try {

            const taskForDelete = await prisma.task.delete({where: {id}})

             return response.status(200).json({ messsage: "Task deletada com sucesso", taskForDelete})
            
        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {

        const {id} = request.params

        const {...data} = request.body 

        try {
            const taskForUpdate = await prisma.task.update({where: {id}, data: data})

            return response.status(200).json({message: "Task atualizada com sucesso", taskForUpdate})
            
        } catch (error) {
            next(error)
            
        }
    }
}