import {Request, Response} from "express"

export class AdminController {
    async enter(request: Request, response: Response) {
        return response.json({message: "Bem-vindo admin!"})
    }
}