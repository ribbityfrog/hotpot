import { z } from 'zod'

const id = z.string().uuid()
const email = z.string().email('Email mandatory')
const password = z
    .string()
    .min(8, '8 characters minimum')
    .max(31, '31 characters maximum')
    .refine((pass) => /\d/.test(pass), 'At least 1 number')

export const userIdSchema = z
    .object({
        id,
    })
    .strict()

export const userEmailSchema = z
    .object({
        email,
    })
    .strict()

export const userPasswordSchema = z
    .object({
        password,
    })
    .strict()

export const userCredentialsSchema = z
    .object({
        email,
        password,
    })
    .strict()

export const userAdminUpdateSchema = z
    .object({
        id,
        isVerified: z.boolean().optional(),
        isBanned: z.boolean().optional(),
    })
    .strict()

export type UserCredentialsSchema = z.infer<typeof userCredentialsSchema>
export type UserEmailSchema = z.infer<typeof userEmailSchema>
export type UserPasswordSchema = z.infer<typeof userPasswordSchema>
