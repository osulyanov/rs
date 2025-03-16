import { z } from 'zod';

const genders = ['male', 'female', 'other'] as const;
const nameRegexp = /^[\p{Lu}]+/u;
const maxFileSizeMb = 5;
const acceptedFileTypes = ['image/jpeg', 'image/png'];

export const formSchema = z
  .object({
    name: z.string().nonempty().regex(nameRegexp, {
      message: 'Name should start with a capital letter',
    }),
    age: z.coerce.number().int().min(1).max(120),
    email: z.string().email(),
    password: z.string().nonempty(),
    passwordConfirmation: z.string(),
    gender: z.enum(genders),
    country: z.string(),
    profilePicture: z
      .custom<File>()
      .refine((file) => file && file.size > 0, {
        message: 'Please upload a profile picture',
      })
      .refine(
        (file) =>
          file.size <= maxFileSizeMb * 1024 * 1024 &&
          acceptedFileTypes.includes(file.type),
        {
          message: `Only JPEG and PNG files less than ${maxFileSizeMb}MB are allowed`,
        }
      ),
    terms: z.coerce.boolean().refine((data) => data, {
      message: 'You must accept the Terms and Conditions',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.passwordConfirmation !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords don't match",
        path: ['passwordConfirmation'],
      });
    }
  });

export type FormData = z.infer<typeof formSchema>;
