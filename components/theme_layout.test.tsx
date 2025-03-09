import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeLayout from './theme-layout';

describe('ThemeLayout', () => {
  it('renders children correctly', () => {
    render(
      <ThemeLayout>
        <div>Test Child</div>
      </ThemeLayout>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('sets initial theme from localStorage', () => {
    localStorage.setItem('theme', 'light');
    render(
      <ThemeLayout>
        <div>Test Child</div>
      </ThemeLayout>
    );

    expect(screen.getByText('Test Child').parentElement).toHaveClass(
      'light-theme'
    );
  });
});
