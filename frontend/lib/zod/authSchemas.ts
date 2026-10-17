import z from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(5, "too short!").max(20, "username way too big!"),
  email: z.email(),
  password: z.string().min(8, "password too short!")
});


export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

// --------------------------------------------------------------------------------- //

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "password too short!")
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;