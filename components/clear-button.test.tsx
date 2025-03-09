import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/router';
import ClearButton from './clear-button';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ClearButton', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1', term: 'test' },
    });
  });

  it('renders ClearButton with correct href', () => {
    render(<ClearButton />);

    const link = screen.getByRole('link', { name: 'X' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/?page=1&term=test');
  });

  it('renders ClearButton without term in href if term is not present', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1', term: '' },
    });

    render(<ClearButton />);

    const link = screen.getByRole('link', { name: 'X' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/?page=1');
  });
});
