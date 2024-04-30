export const errorResponse = (message: string): { error: { message: string } } => {
    return {
        error: { message}
    }
}