import { z } from "zod";

export const SignUpSchema = z.object({
  username: z.string().nonempty("Please enter username."),
  password: z.string().nonempty("Please enter your password."),
  roles: z.preprocess(
    (val) => {
      if (typeof val === "string") return [val]; // ✅ convert here
      return val;
    },
    z.array(z.string()).min(1, "Select at least one role"),
  ),
});

export const LoginSchema = z.object({
  username: z.string().nonempty("Please enter username."),
  password: z.string().nonempty("Please enter your password."),
});
