import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpecieDetails from './specie-details';
import { useRouter } from 'next/router';
import { useGetSpecieQuery } from './sw-api';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('./sw-api', () => ({
  useGetSpecieQuery: jest.fn(),
}));

jest.mock('./clear-button', () => {
  const ClearButton = () => <button data-testid="clear-button" />;
  ClearButton.displayName = 'ClearButton';
  return ClearButton;
});

describe('SpecieDetails', () => {
  it('renders specie details when data is loaded', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { specieId: '1' },
    });

    (useGetSpecieQuery as jest.Mock).mockReturnValue({
      data: {
        name: 'Human',
        classification: 'mammal',
        designation: 'sentient',
        average_height: '180',
        language: 'Galactic Basic',
      },
      error: undefined,
      isFetching: false,
    });

    render(<SpecieDetails />);

    expect(screen.getByText('SPECIE DETAILS')).toBeInTheDocument();
    expect(screen.getByText('Name: Human')).toBeInTheDocument();
    expect(screen.getByText('Classification: mammal')).toBeInTheDocument();
  });
});
