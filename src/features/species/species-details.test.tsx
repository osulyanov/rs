import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpeciesDetails from './species-details';
import { SpeciesResult } from '../../services/sw-api';

const mockSpeciesList: SpeciesResult[] = [
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
    url: '',
  },
  {
    id: '2',
    name: 'Wookiee',
    classification: 'Mammal',
    designation: 'Sentient',
    average_height: '210',
    skin_colors: 'gray',
    hair_colors: 'brown, black',
    eye_colors: 'blue, green, yellow, brown, golden, red',
    average_lifespan: '400',
    language: 'Shyriiwook',
    url: '',
  },
];

describe('SpeciesDetails', () => {
  test('renders species details header', () => {
    render(<SpeciesDetails speciesList={mockSpeciesList} />);
    expect(screen.getByText('SPECIES DETAILS')).toBeInTheDocument();
  });

  test('renders species details', () => {
    render(<SpeciesDetails speciesList={mockSpeciesList} />);
    const speciesDetails = screen.getAllByText(
      'class: Mammal, designation: Sentient'
    );
    expect(speciesDetails).toHaveLength(2);
  });

  test('renders no species details when speciesList is empty', () => {
    render(<SpeciesDetails speciesList={[]} />);
    expect(screen.queryByText('class:')).not.toBeInTheDocument();
  });

  test('renders no species details when speciesList is undefined', () => {
    render(<SpeciesDetails />);
    expect(screen.queryByText('class:')).not.toBeInTheDocument();
  });
});
