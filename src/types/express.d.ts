declare module Express {
    interface Request {
        user?: {
            id: string
            email: string
        }
    }
}