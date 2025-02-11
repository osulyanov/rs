import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Header', () => {
  test('renders successfully', () => {
    render(<Header />);
    const element = screen.getByText(/______/);
    expect(element).toBeInTheDocument();
  });
});
