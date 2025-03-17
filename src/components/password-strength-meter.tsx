import { useEffect, useState } from 'react';

export const PasswordStrengthMeter = ({ ...props }: { password: string }) => {
  const [criteria, setCriteria] = useState({
    hasNumber: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    setCriteria({
      hasNumber: /\d/.test(props.password),
      hasUpperCase: /[A-Z]/.test(props.password),
      hasLowerCase: /[a-z]/.test(props.password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(props.password),
    });
  }, [props.password]);

  const calculateScore = (password: string) => {
    let score = 0;
    if (!password) {
      return score;
    }
    if (criteria.hasNumber) {
      score += 25;
    }
    if (criteria.hasUpperCase) {
      score += 25;
    }
    if (criteria.hasLowerCase) {
      score += 25;
    }
    if (criteria.hasSpecialChar) {
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
    <div>
      <div className={`password-strength-meter ${strength}`}>
        <div className="strength-segment"></div>
        <div className="strength-segment"></div>
        <div className="strength-segment"></div>
        <div className="strength-segment"></div>
        {strength && <div className="password-strength-label">{strength}</div>}
      </div>
    </div>
  );
};
