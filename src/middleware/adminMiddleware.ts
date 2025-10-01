import {Request, Response, NextFunction} from "express"
import { UserRole } from "../types/roles"

export function adminMiddleware(request: Request, response: Response, next: NextFunction) {
    if(!request.user) {
        return response.status(401).json({message: "Usuário não autenticado"})
    }

    if(request.user.role !== UserRole.ADMIN) {
        return response.status(403).json({message: "Acesso negado. Apenas administradores."})
    }

    next()
}