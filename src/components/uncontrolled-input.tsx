import { ValidationError } from './validation-error';

export const UncontrolledInput = ({
  children,
  ...props
}: {
  type: string;
  name: string;
  title: string;
  error: string | undefined;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLInputElement | null>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.title}:</label>
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        ref={props.ref}
        onChange={props.onChange}
      />
      {(!children || props.error) && <ValidationError text={props.error} />}
      {!props.error && children}
    </div>
  );
};
