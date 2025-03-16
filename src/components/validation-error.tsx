export const ValidationError = (props: { text: string | undefined }) => {
  return (
    <div className={`error-message ${props.text && 'visible'}`}>
      {props.text}
    </div>
  );
};
