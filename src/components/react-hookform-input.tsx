import { ValidationError } from './validation-error';
import { UseFormRegisterReturn } from 'react-hook-form';

export const ReactHookFormInput = ({
  register,
  name,
  title,
  error,
  children,
  type,
}: {
  register: UseFormRegisterReturn;
  name: string;
  title: string;
  error: string | undefined;
  children?: React.ReactNode;
  type: string;
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{title}:</label>
      <input {...register} id={name} type={type} />
      {(!children || error) && <ValidationError text={error} />}
      {!error && children}
    </div>
  );
};
