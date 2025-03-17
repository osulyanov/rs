import { z } from 'zod';

const genders = ['male', 'female', 'other'] as const;
const nameRegexp = /^[\p{Lu}]+/u;
const maxFileSizeMb = 5;
const acceptedFileTypes = ['image/jpeg', 'image/png'];

export const formSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: 'Name is required' })
      .regex(nameRegexp, {
        message: 'Name should start with a capital letter',
      }),
    age: z.coerce
      .number()
      .int({ message: 'Age must be a whole number' })
      .min(1, { message: 'Age must be at least 1' })
      .max(120, { message: 'Age must be at most 120' }),
    email: z
      .string()
      .nonempty({ message: 'Email is required' })
      .email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .nonempty({ message: 'Password is required' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
    passwordConfirmation: z
      .string()
      .nonempty({ message: 'Please confirm your password' }),
    gender: z.enum(genders, {
      errorMap: () => ({ message: 'Please select a gender' }),
    }),
    country: z.string().nonempty({ message: 'Please select a country' }),
    profilePicture: z.any().refine(
      (value) => {
        if (!value || (value instanceof FileList && value.length === 0)) {
          return false;
        }
        const file = value instanceof FileList ? value[0] : value;
        return (
          file &&
          file.size <= maxFileSizeMb * 1024 * 1024 &&
          acceptedFileTypes.includes(file.type)
        );
      },
      {
        message: `Profile picture is required. Only JPEG and PNG files less than ${maxFileSizeMb}MB are allowed`,
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
