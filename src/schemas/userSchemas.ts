import {z} from 'zod'

export const changePasswordSchema = z.object({
    currentPassword: z.string(),
    newPassword: z.string().min(6, {message: "A nova senha deve ter no mínimo 6 caracteres"}),
    confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {message: "A nova senha e a confirmação devem ser iguais."})

const isoDateString = z.string().datetime({message: "Data de nascimento deve ser "})

export const updateProfileSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),

    phone: z.string().optional(),
    course: z.string().optional(),
    avatarUrl: z.string().url("URL do avatar inválida").optional(),

    birthDate: isoDateString.optional().nullable()
}).refine(data=> data.name !== undefined || data.email !== undefined || data.phone !== undefined || data.course !== undefined || data.birthDate !== undefined || data.avatarUrl !== undefined)

