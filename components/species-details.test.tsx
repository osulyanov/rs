import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpeciesDetails from './species-details';

describe('SpeciesDetails', () => {
  it('renders the header and species information when provided', () => {
    const mockSpeciesList = [
      {
        id: '1',
        name: 'Human',
        classification: 'mammal',
        designation: 'sentient',
        average_height: '180',
        skin_colors: 'pale, brown',
        hair_colors: 'brown, black, blonde',
        eye_colors: 'blue, green, brown',
        average_lifespan: '120',
        language: 'Galactic Basic'
      }
    ];
    
    render(<SpeciesDetails speciesList={mockSpeciesList} />);
    
    expect(screen.getByText('SPECIES DETAILS')).toBeInTheDocument();
    expect(screen.getByText('class: mammal, designation: sentient')).toBeInTheDocument();
  });
});