import { ValidationError } from './validation-error';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';

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
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    if (register.onChange) {
      register.onChange(e);
    }
  };

  const inputClassName = `form-input ${error ? 'invalid' : isDirty ? 'valid' : ''}`;

  return (
    <div className="form-group">
      <label htmlFor={name}>{title}:</label>
      <input
        {...register}
        id={name}
        type={type}
        className={inputClassName}
        onChange={handleChange}
      />
      <ValidationError text={error} />
      {children}
    </div>
  );
};
