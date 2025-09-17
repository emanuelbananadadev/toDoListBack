import {Router} from "express"
import {TaskController} from "../controller/TaskController"

const taskRouter = Router()
const taskController = new TaskController()

taskRouter.get('/task', taskController.list)
taskRouter.post('/task', taskController.create)
taskRouter.get('/task/:id', taskController.find)
taskRouter.delete('/task/:id', taskController.deleteTask)

export {taskRouter}