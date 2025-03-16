export const PasswordStrengthMeter = ({ ...props }: { password: string }) => {
  const calculateScore = (password: string) => {
    let score = 0;
    if (!password) {
      return score;
    }
    if (/\d/.test(password)) {
      score += 25;
    }
    if (/[A-Z]/.test(password)) {
      score += 25;
    }
    if (/[a-z]/.test(password)) {
      score += 25;
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      score += 25;
    }
    return score;
  };
  const checkPasswordStrength = (password: string) => {
    const score = calculateScore(password);
    if (score >= 100) {
      return 'strong';
    }
    if (score >= 75) {
      return 'good';
    }
    if (score >= 50) {
      return 'medium';
    }
    if (score >= 25) {
      return 'weak';
    }
    return '';
  };
  const strength = checkPasswordStrength(props.password);

  return (
    <div className={`password-strength-meter ${strength}`}>
      <div className="strength-segment"></div>
      <div className="strength-segment"></div>
      <div className="strength-segment"></div>
      <div className="strength-segment"></div>
      {strength && <div className="password-strength-label">{strength}</div>}
    </div>
  );
};
