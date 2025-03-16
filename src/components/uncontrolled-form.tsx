import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

import { selectCountries } from '../slices/countries-slice';
import { fileToBase64 } from '../utils/file-utils';
import { PasswordStrengthMeter } from './password-strength-meter';
import { UncontrolledInput } from './uncontrolled-form-elements/uncontrolled-input';
import { ValidationError } from './validation-error';
import { addSubmission, SubmissionState } from '../slices/submissions-slice';
import { useNavigate } from 'react-router';

export const UncontrolledForm = () => {
  const countries = useSelector(selectCountries);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genders = ['male', 'female', 'other'] as const;
  const nameRegexp = /^[\p{Lu}]+/u;
  const maxFileSizeMb = 5;
  const acceptedFileTypes = ['image/jpeg', 'image/png'];

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [password, setPassword] = useState('');

  const schema = z
    .object({
      name: z.string().nonempty().regex(nameRegexp, {
        message: 'Name should start with a capital letter',
      }),
      age: z.coerce.number().int().min(1).max(120),
      email: z.string().email(),
      password: z.string().nonempty(),
      passwordConfirmation: z.string(),
      gender: z.enum(genders),
      country: z.enum(countries as [string, ...string[]]),
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
    .refine((data) => data.password === data.passwordConfirmation, {
      message: "Passwords don't match",
      path: ['passwordConfirmation'],
    });

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    setPassword(data.password as string);
    try {
      schema.parse(data);
      setErrors({});
      const { profilePicture, ...rest } = data;
      const profilePictureBase64 = await fileToBase64(profilePicture as File);
      const submission = {
        ...rest,
        profilePicture: profilePictureBase64,
        createdAt: new Date().toISOString(),
      };
      dispatch(addSubmission(submission as SubmissionState));
      navigate('/');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.reduce((acc, error) => {
          return { ...acc, [error.path[0]]: error.message };
        }, {});
        setErrors(errors);
      }
    }
  };

  return (
    <form onSubmit={submit} noValidate={true}>
      <UncontrolledInput
        type="text"
        name="name"
        title="Name"
        error={errors.name}
      />
      <UncontrolledInput
        type="number"
        name="age"
        title="Age"
        error={errors.age}
      />
      <UncontrolledInput
        type="email"
        name="email"
        title="Email"
        error={errors.email}
      />
      <UncontrolledInput
        type="password"
        name="password"
        title="Password"
        error={errors.password}
      >
        <PasswordStrengthMeter password={password} />
      </UncontrolledInput>
      <UncontrolledInput
        type="password"
        name="passwordConfirmation"
        title="Confirm Password"
        error={errors.passwordConfirmation}
      />

      <div className="form-group">
        <label>Gender:</label>
        <div className="radio-group">
          <input type="radio" id="male" name="gender" value="male" />
          <label htmlFor="male">Male</label>

          <input type="radio" id="female" name="gender" value="female" />
          <label htmlFor="female">Female</label>

          <input type="radio" id="other" name="gender" value="other" />
          <label htmlFor="other">Other</label>
        </div>
        <ValidationError text={errors.gender} />
      </div>

      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" list="countries" />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <ValidationError text={errors.country} />
      </div>

      <div className="form-group">
        <label htmlFor="profile-picture">Profile Picture:</label>
        <input
          type="file"
          id="profile-picture"
          name="profilePicture"
          accept="image/*"
        />
        <ValidationError text={errors.profilePicture} />
      </div>

      <div className="form-group checkbox-group">
        <input type="checkbox" id="terms" name="terms" />
        <label htmlFor="terms">I accept the Terms and Conditions</label>
        <ValidationError text={errors.terms} />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </div>
    </form>
  );
};
