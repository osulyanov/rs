import { render, screen } from '@testing-library/react';
import Layout from './layout';

jest.mock('./header', () => {
  return () => {
    '<div>Mocked Header</div>';
  };
});
jest.mock('react-router', () => ({
  Outlet: () => <div>Mocked Outlet</div>,
}));

describe('Layout', () => {
  test('renders Header component', () => {
    render(<Layout />);
    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
  });

  test('renders Outlet component', () => {
    render(<Layout />);
    expect(screen.getByText('Mocked Outlet')).toBeInTheDocument();
  });
});
