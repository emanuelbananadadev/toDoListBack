import {Request, Response, NextFunction} from "express"
import { createTaskSchema } from "../schemas/taskSchemas"
import {ZodError} from "zod"
import { AppError } from "../errors/AppError"

export function validateTask(request: Request, response: Response, next: NextFunction) {

    try {
        createTaskSchema.parse(request.body)

        next()
    } catch (error) {
        if(error instanceof ZodError) {
            throw new AppError(error.issues[0].message, 400)
        }

        throw new AppError("Erro inesperado ao criar uma task", 500)
    }


}

