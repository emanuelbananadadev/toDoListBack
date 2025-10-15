import {z} from 'zod'

export const changePasswordSchema = z.object({
    currentPassword: z.string(),
    newPassword: z.string().min(6, {message: "A nova senha deve ter no mínimo 6 caracteres"}),
    confirmNewPassword: z.string(),
}).refine(data => data.newPassword === data.confirmNewPassword, {message: "A nova senha e a confirmação devem ser iguais."})