import {Request, Response, NextFunction} from "express"

export function validateTask(request: Request, response: Response, next: NextFunction) {
    type taskProps = {
        title: string
        completed?: boolean
    }

    const {title} = request.body as taskProps
    
    if(title.trim() === "" || title.trim().length <= 3) {
        return response.status(400).json({message: "Título precisa ter mais de 3 caracteres"})
    }

    next()

}

