import { z } from 'zod';

export const Zod_UserNameTypeSchema = z.object({
  f_name: z.string(),
  m_name: z.string().optional(),
  l_name: z.string()
});

export const Zod_UserTypeSchema = z.object({
  email: z.string().email(),
  status: z.enum(["ACTIVE", "BLOCK"]),
  role: z.enum(["STUDENT", "TEACHER", "ADMIN", "SUPER"]),
//   isDeleted: z.boolean(),
  userId: z.string(),
  password: z.string(),
//   passwordChangeAt: z.date()
});


