import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Header', () => {
  it('renders successfully', () => {
    render(<Header />);
    const element = screen.getByText(/______/);
    expect(element).toBeInTheDocument();
  });
});
