import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import { UserRole } from "../types/roles"

interface JwtPayload {
    id: string
    email: string
    role?: UserRole
}

export function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        return response.status(401).json({message: "Token não fornecido"})
    }

    const [_, token] = authHeader?.split(" ")

    try {
        const decoded = jwt.verify(token, "emanuelTesteSecreta") as JwtPayload

        request.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        }

        next()
    } catch (error) {
        return response.status(401).json({message: "Token inválido ou expirado"})        
    }

}