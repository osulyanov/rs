import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ClearButton from './clear-button';

describe('ClearButton', () => {
  it('renders correctly with search params', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/?page=1&term=test']}>
        <Routes>
          <Route path="/" element={<ClearButton />} />
        </Routes>
      </MemoryRouter>
    );

    const linkElement = getByText('X');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/?page=1&term=test');
  });

  it('renders correctly without term param', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <Routes>
          <Route path="/" element={<ClearButton />} />
        </Routes>
      </MemoryRouter>
    );

    const linkElement = getByText('X');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/?page=1');
  });
});
