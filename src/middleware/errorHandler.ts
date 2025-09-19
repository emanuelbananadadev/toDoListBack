import {Request, Response, NextFunction} from "express"
import { AppError } from "../errors/AppError"


export function errorHandler(error: any, request: Request, response: Response, next: NextFunction) {

    console.log(error)

    if(error instanceof AppError) {
        return response.status(error.status).json({message: error.message})
    }

    
    return response.status(500).json({message: "Erro interno do servidor"})
}