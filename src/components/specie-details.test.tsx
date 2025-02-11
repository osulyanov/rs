import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SpecieDetails from '../components/specie-details';
import useFetchSpecie from '../hooks/use-fetch-specie';
import userEvent from '@testing-library/user-event';

jest.mock('../hooks/use-fetch-specie');

const mockUseFetchSpecie = useFetchSpecie as jest.MockedFunction<
  typeof useFetchSpecie
>;

describe('SpecieDetails', () => {
  it('displays a loading indicator while fetching data', () => {
    mockUseFetchSpecie.mockReturnValue({
      specie: null,
      loadingState: 'loading',
    });

    render(
      <MemoryRouter initialEntries={['/species/1']}>
        <Routes>
          <Route path="/species/:specieId" element={<SpecieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays the detailed specie data', async () => {
    const mockSpecie = {
      name: 'Human',
      classification: 'Mammal',
      designation: 'Sentient',
      average_height: '180',
      skin_colors: 'caucasian, black, asian, hispanic',
      hair_colors: 'blonde, brown, black, red',
      eye_colors: 'brown, blue, green, hazel, grey, amber',
      average_lifespan: '120',
      language: 'Galactic Basic',
    };

    mockUseFetchSpecie.mockReturnValue({
      specie: mockSpecie,
      loadingState: 'idle',
    });

    render(
      <MemoryRouter initialEntries={['/species/1']}>
        <Routes>
          <Route path="/species/:specieId" element={<SpecieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Name: Human')).toBeInTheDocument();
      expect(screen.getByText('Classification: Mammal')).toBeInTheDocument();
      expect(screen.getByText('Designation: Sentient')).toBeInTheDocument();
      expect(screen.getByText('Average Height: 180')).toBeInTheDocument();
      expect(
        screen.getByText('Skin Colors: caucasian, black, asian, hispanic')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Hair Colors: blonde, brown, black, red')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Eye Colors: brown, blue, green, hazel, grey, amber')
      ).toBeInTheDocument();
      expect(screen.getByText('Average Lifespan: 120')).toBeInTheDocument();
      expect(screen.getByText('Language: Galactic Basic')).toBeInTheDocument();
    });
  });

  it('hides the component when the close button is clicked', async () => {
    mockUseFetchSpecie.mockReturnValue({ specie: null, loadingState: 'idle' });

    render(
      <MemoryRouter initialEntries={['/species/1']}>
        <Routes>
          <Route path="/species/:specieId" element={<SpecieDetails />} />
          <Route path="*" element={<div />} />
        </Routes>
      </MemoryRouter>
    );

    const closeButton = screen.getByRole('link', { name: 'X' });
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('SPECIE DETAILS')).not.toBeInTheDocument();
    });
  });
});
