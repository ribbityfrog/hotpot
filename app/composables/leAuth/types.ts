import { z } from 'zod'

export const authToken = z.object({
    type: z.string(),
    name: z.string(),
    token: z.string(),
    abilities: z.array(z.string()),
    expiresAt: z.date(),
})

export type AuthToken = z.infer<typeof authToken>

//export type Credentials = {
//     email: string,
//     password: string
// }

