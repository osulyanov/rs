import { PasswordStrengthMeter } from './password-strength-meter';
import { ReactHookFormInput } from './react-hookform-input';
import { useForm } from 'react-hook-form';
import { ValidationError } from './validation-error';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormData } from '../schemas/form-schema';
import { useSelector } from 'react-redux';
import { selectCountries } from '../slices/countries-slice';
import { useRef, useCallback } from 'react';
import { FormSubmissionData } from '../app/app';

export const ReactHookForm = ({
  saveSubmission,
}: {
  saveSubmission: (data: FormSubmissionData) => Promise<void>;
}) => {
  const countries = useSelector(selectCountries);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'all',
    delayError: 0,
  });

  const password = watch('password', '');

  const submit = useCallback(
    (data: FormData) => {
      const fileInput = fileInputRef.current;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        saveSubmission({
          ...data,
          profilePicture: file,
        });
      } else {
        saveSubmission(data);
      }
    },
    [saveSubmission]
  );

  return (
    <form noValidate={true} onSubmit={handleSubmit(submit)}>
      <ReactHookFormInput
        register={register('name')}
        type="text"
        name="name"
        title="Name"
        error={errors.name?.message as string}
      />
      <ReactHookFormInput
        register={register('age')}
        type="number"
        name="age"
        title="Age"
        error={errors.age?.message as string}
      />
      <ReactHookFormInput
        register={register('email')}
        type="email"
        name="email"
        title="Email"
        error={errors.email?.message as string}
      />
      <ReactHookFormInput
        register={register('password')}
        type="password"
        name="password"
        title="Password"
        error={errors.password?.message as string}
      >
        <PasswordStrengthMeter password={password} />
      </ReactHookFormInput>
      <ReactHookFormInput
        register={register('passwordConfirmation')}
        type="password"
        name="passwordConfirmation"
        title="Password Confirmation"
        error={errors.passwordConfirmation?.message as string}
      />

      <div className="form-group">
        <label>Gender:</label>
        <div className="radio-group">
          <input type="radio" id="male" value="male" {...register('gender')} />
          <label htmlFor="male">Male</label>

          <input
            type="radio"
            id="female"
            value="female"
            {...register('gender')}
          />
          <label htmlFor="female">Female</label>

          <input
            type="radio"
            id="other"
            value="other"
            {...register('gender')}
          />
          <label htmlFor="other">Other</label>
        </div>
        <ValidationError text={errors.gender?.message as string} />
      </div>

      <div className="form-group">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          id="country"
          list="countries"
          {...register('country')}
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option value={country} key={country} />
          ))}
        </datalist>
        <ValidationError text={errors.country?.message as string} />
      </div>

      <div className="form-group">
        <label htmlFor="profile-picture">Profile Picture:</label>
        <input
          type="file"
          id="profile-picture"
          accept="image/jpeg, image/png"
          {...register('profilePicture')}
          ref={(e) => {
            register('profilePicture').ref(e);
            fileInputRef.current = e;
          }}
        />
        <ValidationError text={errors.profilePicture?.message as string} />
      </div>

      <div className="form-group checkbox-group">
        <input type="checkbox" id="terms" {...register('terms')} />
        <label htmlFor="terms">I accept the Terms and Conditions</label>
        <ValidationError text={errors.terms?.message as string} />
      </div>

      <div className="form-actions">
        <div className="validation-status">
          <span className={isValid ? 'valid-message' : 'invalid-message'}>
            {isValid ? 'Form is valid' : 'Please fill in all fields correctly'}
          </span>
        </div>
        <button type="submit" className="submit-btn" disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
};
