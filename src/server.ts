import express from "express"
import { taskRouter } from "./routes/TaskRoutes"
import { userRouter } from "./routes/UserRoutes"
import { errorHandler } from "./middleware/errorHandler"

const app = express()
app.use(express.json())

const PORT = 3333

app.use(taskRouter)
app.use(userRouter)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Rodando na porta ${PORT}`)
})