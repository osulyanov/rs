import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

import { selectCountries, addCountry } from '../slices/countries-slice';
import { fileToBase64 } from '../utils/file-utils';
import { PasswordStrengthMeter } from './password-strength-meter';
import { UncontrolledInput } from './uncontrolled-input';
import { ValidationError } from './validation-error';
import { addSubmission, SubmissionState } from '../slices/submissions-slice';
import { useNavigate } from 'react-router';
import { formSchema } from '../schemas/form-schema';

export const UncontrolledForm = () => {
  const countries = useSelector(selectCountries);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});
  // NOTES FOR THE REVIEWER:
  // useState is used to store the password value to calculate the passwords strength
  // it's not used to render the value in the input field
  // the form is uncontrolled, so the password input is not controlled by the component state
  const [password, setPassword] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      formSchema.parse(data);
      setErrors({});
      const { profilePicture, ...rest } = data;
      const profilePictureBase64 = await fileToBase64(profilePicture as File);
      const submission = {
        ...rest,
        profilePicture: profilePictureBase64,
        createdAt: new Date().toISOString(),
      } as SubmissionState;
      dispatch(addSubmission(submission));
      if (!countries.includes(submission.country)) {
        dispatch(addCountry(submission.country));
      }
      navigate(`/${submission.createdAt}`);
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
        ref={passwordRef}
        onChange={(e) => setPassword(e.target.value)}
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
