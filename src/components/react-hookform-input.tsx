import { ValidationError } from './validation-error';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useState, useEffect } from 'react';

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
  const [isTouched, setIsTouched] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (error && !isTouched) {
      setIsTouched(true);
    }
  }, [error, isTouched]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
    if (register.onBlur) {
      register.onBlur(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDirty(true);
    if (register.onChange) {
      register.onChange(e);
    }
  };

  const inputClassName = `form-input ${isTouched && isDirty ? (error ? 'invalid' : 'valid') : ''}`;

  return (
    <div className="form-group">
      <label htmlFor={name}>{title}:</label>
      <input
        {...register}
        id={name}
        type={type}
        className={inputClassName}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <ValidationError text={error} />
      {children}
    </div>
  );
};
