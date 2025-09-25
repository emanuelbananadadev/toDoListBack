import express from "express"
import { routes } from "./routes"
import { errorHandler } from "./middleware/errorHandler"

const app = express()
app.use(express.json())

const PORT = 3333

app.use(routes)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Rodando na porta ${PORT}`)
})