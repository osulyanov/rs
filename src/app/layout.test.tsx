import { render, screen } from '@testing-library/react';
import Layout from './layout';

jest.mock('./header', () => {
  const MockedHeader = () => <div>Mocked Header</div>;
  MockedHeader.displayName = 'MockedHeader';
  return MockedHeader;
});
jest.mock('react-router', () => ({
  Outlet: () => <div>Mocked Outlet</div>,
}));

describe('Layout', () => {
  it('renders Header component', () => {
    render(<Layout />);
    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
  });

  it('renders Outlet component', () => {
    render(<Layout />);
    expect(screen.getByText('Mocked Outlet')).toBeInTheDocument();
  });
});
