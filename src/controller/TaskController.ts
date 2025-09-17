import {prisma} from "../config/PrismaConfig"
import { Request, Response } from "express"

export class TaskController {
    async list(request: Request, response: Response) {
        const tasks = await prisma.task.findMany()

        return response.status(200).json(tasks)
    }

    async create(request: Request, response: Response) {
        const {title} = request.body

        await prisma.task.create({
            data: {
                title
            }
        })

        return response.status(201).json()
    }

    async find(request: Request, response: Response) {
        const {id} = request.params

        try {
            const task = await prisma.task.findUnique({where: {id}})

            return response.status(200).json(task)
            
        } catch (error) {
            console.log(error)

            return response.status(404).json({message: "Task não encontrada"})
        }

    }

    async deleteTask(request: Request, response: Response) {
        const {id} = request.params

        try {

            const taskForDelete = await prisma.task.delete({where: {id}})

             return response.status(200).json()
            
        } catch (error) {
            console.log(error)
                        
            return response.status(404).json({message: "Task não encontrada"})

        }
    }
}