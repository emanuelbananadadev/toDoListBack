import { idSchema } from "../schemas/taskSchemas"
import {Request, Response, NextFunction} from "express"
import { ZodError } from "zod"
import { AppError } from "../errors/AppError"

export function validateTaskId(request: Request, response: Response, next: NextFunction) {

    try {
        idSchema.parse(request.params) 
        next()
        
    } catch (error) {
        if(error instanceof ZodError) {
            throw new AppError(error.issues[0].message, 400)
        }

        throw new AppError("Erro inesperado na validação do ID", 500)
    }

}
