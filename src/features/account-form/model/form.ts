import { z } from "zod"

export const AuthFormSchema = z
  .object({
    tags: z
      .string()
      .trim()
      .min(0)
      .max(50, { message: "Максимум 50 символов" })
      .default(""),
    type: z.enum(["local", "ldap"], { message: "Выберите тип" }),
    login: z
      .string({ message: "Введите логин" })
      .trim()
      .min(4, { message: "Минимум 4 символа" })
      .max(100, { message: "Максимум 100 символов" }),
    password: z
      .string({ message: "Введите пароль" })
      .trim()
      .min(4, { message: "Минимум 4 символа" })
      .max(100, { message: "Максимум 100 символов" })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "local") {
      if (!data.password) {
        ctx.addIssue({
          code: "custom",
          message: "Введите пароль",
          path: ["password"],
        })
      }
    }
    if (data.type === "ldap") {
      data.password = undefined
    }
  })

export type AccountFormData = z.infer<typeof AuthFormSchema>

export type AccountFormsInLS = {
  tags: { text: string }[]
  type: "local" | "ldap"
  login: string
  password?: string | undefined
}
