import {validate} from "uuid"
import {Request, Response, NextFunction} from "express"

export function validateTaskId(request: Request, response: Response, next: NextFunction) {

    const {id} = request.params 

    if(!id || !validate(id)) {
        return response.status(404).json({message: "É necessário informar um id válido"})
    }

    next()
}
