import {prisma} from "../config/PrismaConfig"
import { Request, Response, NextFunction } from "express"
import { AppError } from "../errors/AppError"
import { createTaskSchema, idSchema, updateTaskSchema } from "../schemas/taskSchemas"
import { ZodError } from "zod"

const typeColorMap: Record<string, string> = {
    TRABALHO: "#f97316",
    PROVA: "#ef4444",
    REUNIAO: "#3b82f6",
    APRESENTACAO: "#1e3a8a"
};


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

    async create(request: Request, response: Response, next: NextFunction) {
        const userId = request.user?.id

        if(!userId) {
            throw new AppError("Usuário não autenticado ou token inválido", 401)
        }

        try {
            const taskData = createTaskSchema.parse(request.body)

            const newTask = await prisma.task.create({
                data: {
                    ...taskData,
                    color: typeColorMap[taskData.type],
                    dueDate: new Date(taskData.dueDate),
                    userId: userId,
                }
            })

            return response.status(201).json({message: "Tarefa criada com sucesso", newTask})
            
        } catch (error) {
            if(error instanceof ZodError) {
                return response.status(400).json({
                    message: "Dados inválidos na requisição"
                })
            }

            next(error)
        }

    }

    async find(request: Request, response: Response, next: NextFunction) {
      

        try {
            const {id} = idSchema.parse(request.params)
            const userId = request.user?.id

            const task = await prisma.task.findUnique({where: {id, userId: userId}})

            if(!task) {
                throw new AppError("Task não encontrada ou não pertence a este usuário", 404)
            }

            return response.status(200).json({message: "Sua task",task})
            
        } catch (error) {
            next(error)
        }

    }

    async deleteTask(request: Request, response: Response, next: NextFunction) {

        try {

            const {id} = idSchema.parse(request.params)
            const userId = request.user?.id

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

        
        try {         
            delete request.body.color
            const {id} = idSchema.parse(request.params)
            const userId = request.user?.id

            const validateData = updateTaskSchema.parse(request.body)

            if(Object.keys(validateData).length === 0) {
                throw new AppError("Nenhum dado válido fornecido para atualização", 400)
            }

            if (validateData.type) {
                (validateData as any).color = typeColorMap[validateData.type];
            }

            const taskForUpdate = await prisma.task.update({
                where: {
                    id,
                    userId: userId
                },
                data: validateData
            })

            return response.status(200).json({message: "Task atualizada com sucesso", taskForUpdate})
            
        } catch (error) {

            if(error instanceof ZodError) {
                return response.status(400).json({
                    message: "Dados inválidos na requisição",
                    errors: error.issues[0]
                })
            }
            
            next(error)
            
        }
    }
}