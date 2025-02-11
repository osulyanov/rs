import { render, screen } from '@testing-library/react';
import SpeciesDetails from './species-details';
import { SpeciesResult } from '../utils/fetch-species-list';

describe('SpeciesDetails', () => {
  const mockSpeciesList: SpeciesResult[] = [
    {
      classification: 'Mammal',
      designation: 'Sentient',
      url: 'url',
      name: 'name',
    },
    {
      classification: 'Reptile',
      designation: 'Non-sentient',
      url: 'url',
      name: 'name',
    },
  ];

  it('renders the header', () => {
    render(<SpeciesDetails />);
    expect(screen.getByText('SPECIES DETAILS')).toBeInTheDocument();
  });

  it('renders species details when speciesList is provided', () => {
    render(<SpeciesDetails speciesList={mockSpeciesList} />);
    expect(
      screen.getByText('class: Mammal, designation: Sentient')
    ).toBeInTheDocument();
    expect(
      screen.getByText('class: Reptile, designation: Non-sentient')
    ).toBeInTheDocument();
  });

  it('does not render species details when speciesList is not provided', () => {
    render(<SpeciesDetails />);
    expect(screen.queryByText('class:')).not.toBeInTheDocument();
  });
});
