import {Request, Response, NextFunction} from "express"

export function validateUpdateTask(request: Request, response: Response, next: NextFunction) {

    type DataUpdate = {
        title?: string
        completed?: boolean
    }

    const {...data} = request.body as DataUpdate

    if(data.title !== undefined && (data.title.trim() === "" || data.title.trim().length <= 3)) {
        return response.status(400).json({message: "Título precisa ter mais de 3 caracteres"})
    }

    if(data.completed !== undefined && (typeof data.completed !== "boolean")) {
        return response.status(400).json({message: "Completed precisa ser booleano"})
    }

    next()

}