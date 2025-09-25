import {Request, Response, NextFunction} from "express"
import { AppError } from "../errors/AppError"
import { ZodError } from "zod"


export function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {

    console.log(error)

    if(error instanceof AppError) {
        return response.status(error.status).json({message: error.message})
    }

    if(error instanceof ZodError) {
        return response.status(400).json(error.issues[0].message)
    }

    
    return response.status(500).json({message: "Erro interno do servidor"})
}