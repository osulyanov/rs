import { ValidationError } from '../validation-error';

export const UncontrolledInput = ({
  children,
  ...props
}: {
  type: string;
  name: string;
  title: string;
  error: string | undefined;
  children?: React.ReactNode;
}) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.title}:</label>
      <input type={props.type} id={props.name} name={props.name} />
      {(!children || props.error) && <ValidationError text={props.error} />}
      {!props.error && children}
    </div>
  );
};
