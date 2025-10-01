import {Router} from "express"
import {TaskController} from "../controller/TaskController"
import { validateTask } from "../middleware/validateTask"
import { validateTaskId } from "../middleware/validateTaskId"
import { validateUpdateTask } from "../middleware/validateUpdateTask"
import { authMiddleware } from "../middleware/authMiddleware"

const taskRouter = Router()
const taskController = new TaskController()

taskRouter.get('/', authMiddleware ,taskController.list)
taskRouter.post('/', authMiddleware ,validateTask ,taskController.create)
taskRouter.get('/:id', authMiddleware ,validateTaskId,taskController.find)
taskRouter.delete('/:id', authMiddleware ,validateTaskId ,taskController.deleteTask)
taskRouter.put('/:id', authMiddleware ,validateTaskId, validateUpdateTask, taskController.update)

export {taskRouter}