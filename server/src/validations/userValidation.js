const { z } = require("zod");

const rolesEnum = z.enum(["Admin", "Manager", "Employee"]);

const userRegistrationSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  // roles: z
  //   .array(z.string())
  //   .default(["Employee"])
  //   .transform((val) => (val.length === 0 ? ["Employee"] : val)),
  roles: z.array(rolesEnum).nonempty("At least one role is required"),
  active: z.boolean().optional().default(true),
});

const userUpdationSchema = z.object({
  id: z.string().min(1, "User ID is required"), // Validate the ID string
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8).optional().or(z.literal("")), // Optional for updates
  roles: z.array(z.string()).nonempty("At least one role is required"),
  active: z.boolean(),
});

module.exports = { userRegistrationSchema, userUpdationSchema };

// or we can use below

// const { z } = require("zod");

// const userRegistrationSchema = z.object({
//   username: z.string().min(3, "Username must be at least 3 characters"),
//   password: z
//     .string()
//     .min(8, "Password must be at least 8 characters")
//     .regex(/[a-z]/, "Password must contain at least one lowercase letter")
//     .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .regex(/[0-9]/, "Password must contain at least one number")
//     .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
//   roles: z.array(z.string()).optional().default(["Employee"]),
//   active: z.boolean().optional().default(true),
// });

// module.exports = { userRegistrationSchema };
