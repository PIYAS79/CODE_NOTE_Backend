import { z } from 'zod';

export const Zod_Create_Token_Data_Type = z.object({
    body: z.object({
        password: z.string(),
        email: z.string()
    })
})

export const Zod_Cookie_Data_Type = z.object({
    cookie: z.object({
        refreshToken: z.string({
            required_error: "Refresh Token is required for create an access token *"
        })
    })
})

export const Zod_Password_Change_Data_Type = z.object({
    body: z.object({
        oldPassword: z.string(),
        newPassword: z.string()
    })
})