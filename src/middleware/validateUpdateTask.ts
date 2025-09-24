import {Request, Response, NextFunction} from "express"
import { updateTaskSchema } from "../schemas/taskSchemas"
import {ZodError} from "zod"
import { AppError } from "../errors/AppError"

export function validateUpdateTask(request: Request, response: Response, next: NextFunction) {

    try {
        updateTaskSchema.parse(request.body)
        next()
        
    } catch (error) {
        if(error instanceof ZodError) {
            throw new AppError(error.issues[0].message, 400)
        }       
        
        throw new AppError("Erro inesperado na validação da task", 500)
    }


}