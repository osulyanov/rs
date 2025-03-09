import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchForm from './search-form';

describe('SearchForm', () => {
  const setSpecieName = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the search form with default value', () => {
    render(<SearchForm setSpecieName={setSpecieName} defaultValue="test" />);

    const input = screen.getByPlaceholderText('[ENTER SPECIE]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test');
  });

  it('calls setSpecieName with the correct value on form submission', () => {
    render(<SearchForm setSpecieName={setSpecieName} defaultValue="" />);

    const input = screen.getByPlaceholderText('[ENTER SPECIE]');
    const button = screen.getByText('> SEARCH');

    fireEvent.change(input, { target: { value: 'new specie' } });
    fireEvent.click(button);

    expect(setSpecieName).toHaveBeenCalledWith('new specie');
  });
});
