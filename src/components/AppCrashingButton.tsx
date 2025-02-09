import { useState } from 'react';

function AppCrashingButton() {
  const [error, setError] = useState(false);

  const handleClick = () => {
    setError(true);
  };
  if (error) {
    throw new Error('I crashed!');
  }
  return <button onClick={handleClick}>Crash me!</button>;
}

export default AppCrashingButton;
