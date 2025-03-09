import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpeciesDetails from './species-details';
import { SpeciesResult } from './sw-api';

describe('SpeciesDetails', () => {
  const speciesList: SpeciesResult[] = [
    {
      id: '1',
      name: 'Human',
      classification: 'Mammal',
      designation: 'Sentient',
      average_height: '180',
      skin_colors: 'caucasian, black, asian, hispanic',
      hair_colors: 'blonde, brown, black, red',
      eye_colors: 'brown, blue, green, hazel, grey, amber',
      average_lifespan: '120',
      language: 'Galactic Basic',
    },
  ];

  it('renders species details correctly', () => {
    render(<SpeciesDetails speciesList={speciesList} />);

    expect(
      screen.getByText('class: Mammal, designation: Sentient')
    ).toBeInTheDocument();
  });

  it('renders no species details when speciesList is empty', () => {
    render(<SpeciesDetails speciesList={[]} />);

    expect(screen.queryByText('class:')).not.toBeInTheDocument();
  });

  it('renders no species details when speciesList is undefined', () => {
    render(<SpeciesDetails />);

    expect(screen.queryByText('class:')).not.toBeInTheDocument();
  });
});
