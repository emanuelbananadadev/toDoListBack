

import express from "express"
import { taskRouter } from "./routes/TaskRoutes"

const app = express()
app.use(express.json())

const PORT = 3333

app.use(taskRouter)

app.listen(PORT, ()=>{
    console.log(`Rodando na porta ${PORT}`)
})