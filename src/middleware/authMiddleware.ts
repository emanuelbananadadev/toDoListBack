import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"

export function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization

    console.log(authHeader)

    next()
}