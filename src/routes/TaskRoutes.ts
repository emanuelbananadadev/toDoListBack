import {Router} from "express"
import {TaskController} from "../controller/TaskController"
import { validateTask } from "../middleware/validateTask"
import { validateTaskId } from "../middleware/validateTaskId"
import { validateUpdateTask } from "../middleware/validateUpdateTask"

const taskRouter = Router()
const taskController = new TaskController()

taskRouter.get('/task', taskController.list)
taskRouter.post('/task', validateTask ,taskController.create)
taskRouter.get('/task/:id', validateTaskId,taskController.find)
taskRouter.delete('/task/:id', validateTaskId ,taskController.deleteTask)
taskRouter.put('/task/:id', validateTaskId, validateUpdateTask, taskController.update)

export {taskRouter}