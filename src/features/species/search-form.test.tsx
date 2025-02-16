import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './search-form';

describe('SearchForm', () => {
  const setSpecieNameMock = jest.fn();

  beforeEach(() => {
    setSpecieNameMock.mockClear();
  });

  test('renders input with default value', () => {
    render(
      <SearchForm setSpecieName={setSpecieNameMock} defaultValue="Human" />
    );
    const inputElement = screen.getByPlaceholderText('[ENTER SPECIE]');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('Human');
  });

  test('calls setSpecieName with the correct value on form submit', () => {
    render(<SearchForm setSpecieName={setSpecieNameMock} defaultValue="" />);
    const inputElement = screen.getByPlaceholderText('[ENTER SPECIE]');
    const formElement = screen.getByTestId('search-form');

    fireEvent.change(inputElement, { target: { value: 'Wookie' } });
    fireEvent.submit(formElement);

    expect(setSpecieNameMock).toHaveBeenCalledWith('Wookie');
  });
});
