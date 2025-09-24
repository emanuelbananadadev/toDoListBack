import {z} from "zod"

export const createTaskSchema = z.object({
    title: z.string().min(3, {message: "Título precisa no mínimo 3 caracteres"}),
    completed: z.boolean().optional()
})

export const updateTaskSchema = z.object({
    title: z.string().min(3, {message: "Título precisa no mínimo 3 caracteres"}).optional(),
    completed: z.boolean().optional()
})

export const idSchema = z.object({
    id: z.string().uuid({message: "Id inválido, precisa ser um UUID"})
})



