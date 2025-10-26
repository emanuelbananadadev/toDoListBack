import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export const resetPasswordSchema = z.object({
    email: z.string().email()
})

export const resetPasswordConfirmSchema = z.object({
    token: z.string().uuid({message: "Token de redefinição inválido"}),

    newPassword: z.string().min(6, {message: "A nova senha deve ter pelo menos 6 caracteres"}),
    confirmNewPassword: z.string(),
}).refine((data)=> data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem"
})