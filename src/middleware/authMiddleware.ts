import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

interface JwtPayload {
    id: string
    email: string
}

export function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        return response.status(401).json({message: "Token não fornecido"})
    }

    const [_, token] = authHeader?.split(" ")

    try {
        const decoded = jwt.verify(token, "emanuelTeste") as JwtPayload

        request.user = {
            id: decoded.id,
            email: decoded.email,
        }

        next()
    } catch (error) {
        return response.status(401).json({message: "Token inválido ou expirado"})        
    }

}