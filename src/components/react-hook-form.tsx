import { PasswordStrengthMeter } from './password-strength-meter';
import { ReactHookFormInput } from './react-hookform-input';
import { useForm } from 'react-hook-form';
import { ValidationError } from './validation-error';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormData } from '../schemas/form-schema';
import { useSelector } from 'react-redux';
import { selectCountries } from '../slices/countries-slice';

export const ReactHookForm = () => {
  const countries = useSelector(selectCountries);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const password = watch('password', '');

  const submit = (data: FormData) => {
    console.log(data);
  };
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
        />
        <ValidationError text={errors.profilePicture?.message as string} />
      </div>

      <div className="form-group checkbox-group">
        <input type="checkbox" id="terms" {...register('terms')} />
        <label htmlFor="terms">I accept the Terms and Conditions</label>
        <ValidationError text={errors.terms?.message as string} />
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn" disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
};
