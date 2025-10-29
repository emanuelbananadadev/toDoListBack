import {z} from "zod"

const TasktypeEnum = z.enum(["TRABALHO", "PROVA", "REUNIAO", "APRESENTACAO"])

const dataRegex = /^\d{4}-\d{2}-\d{2}$/

export const createTaskSchema = z.object({
    title: z.string().min(3, {message: "Título precisa no mínimo 3 caracteres"}),
    completed: z.boolean().optional(),

    dueDate: z.string().regex(dataRegex, {message: "Formato da data deve ser YYYY-MM-DD"}),
    type: TasktypeEnum,
    icon: z.string().min(1, {message: "O ícone da tarefa é obrigatório"}),
    color: z.string().min(4, {message: "A cor é obrigatória"}),

    hasReminder: z.boolean().optional(),
    reminderTime: z.string().optional().nullable(),
})

// export const updateTaskSchema = z.object({
//     title: z.string().min(3, {message: "Título precisa no mínimo 3 caracteres"}).optional(),
//     completed: z.boolean().optional()
// })

export const updateTaskSchema = createTaskSchema.partial()

export const idSchema = z.object({
    id: z.string().uuid({message: "Id inválido, precisa ser um UUID"})
})



