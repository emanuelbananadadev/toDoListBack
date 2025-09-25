import {Router} from "express"
import {TaskController} from "../controller/TaskController"
import { validateTask } from "../middleware/validateTask"
import { validateTaskId } from "../middleware/validateTaskId"
import { validateUpdateTask } from "../middleware/validateUpdateTask"

const taskRouter = Router()
const taskController = new TaskController()

taskRouter.get('/', taskController.list)
taskRouter.post('/', validateTask ,taskController.create)
taskRouter.get('/:id', validateTaskId,taskController.find)
taskRouter.delete('/:id', validateTaskId ,taskController.deleteTask)
taskRouter.put('/:id', validateTaskId, validateUpdateTask, taskController.update)

export {taskRouter}