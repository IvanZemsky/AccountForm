import { z } from 'zod'

export const AuthFormSchema = z.object({
  tags: z.string().trim().min(0).max(50, { message: 'Максимум 50 символов' }).optional(),
  type: z.enum(['local', 'ldap'], { message: 'Выберите тип' }),
  login: z
    .string({ message: 'Введите логин' })
    .trim()
    .min(4, { message: 'Минимум 4 символа' })
    .max(100, { message: 'Максимум 100 символов' }),
  password: z
    .string({ message: 'Введите пароль' })
    .trim()
    .min(4, { message: 'Минимум 4 символа' })
    .max(100, { message: 'Максимум 100 символов' })
    .nullable(),
})

export type AccountForm = z.infer<typeof AuthFormSchema>
