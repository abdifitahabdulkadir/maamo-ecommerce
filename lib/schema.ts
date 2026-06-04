import z from "zod";


export const RegisterSchema =  z.object({
  email: z.email("Please provide valid Email address"),
  password: z.
    string().min(1, "Password is required").
    max(20, "Passoword must be less than 20 characters.").
    regex(/^[A-Za-z][A-Za-z0-9]*$/),
  name: z.string().min(1, "Name is required").max(30, "Name must be less than 30 characters"),
  gender:z.enum(["Female","Male"])
})

export const LoginSchema = RegisterSchema.omit({
  name: true,
  gender:true
})



// types
export  type   RegisterSchemaType = z.infer<typeof RegisterSchema>
export  type   LoginSchemaType = z.infer<typeof LoginSchema>
