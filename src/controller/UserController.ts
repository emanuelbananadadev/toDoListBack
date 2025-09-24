import {Request, Response} from "express"

export class UserController {
    async test(request: Request, response: Response) {
        return response.json({message: "Entrei na rota teste de usuário"})
    }
}