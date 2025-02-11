import fetchSpecie, { SpecieResult } from './fetch-specie';

global.fetch = jest.fn();

describe('fetchSpecie', () => {
  const mockUrl = 'https://swapi.dev/api/species/1/';
  const mockSpecie: SpecieResult = {
    name: 'Human',
    classification: 'mammal',
    designation: 'sentient',
    average_height: '180',
    skin_colors: 'caucasian, black, asian, hispanic',
    hair_colors: 'blonde, brown, black, red',
    eye_colors: 'brown, blue, green, hazel, grey, amber',
    average_lifespan: '120',
    language: 'Galactic Basic',
  };

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should fetch specie data successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSpecie,
    });

    const result = await fetchSpecie(mockUrl);
    expect(result).toEqual(mockSpecie);
    expect(fetch).toHaveBeenCalledWith(mockUrl);
  });

  it('should throw an error if the network response is not ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchSpecie(mockUrl)).rejects.toThrow(
      'Network response was not ok'
    );
    expect(fetch).toHaveBeenCalledWith(mockUrl);
  });
});
