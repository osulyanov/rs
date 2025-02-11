import fetchMock from 'jest-fetch-mock';
import fetchSpeciesList from './fetch-species-list';

fetchMock.enableMocks();

describe('fetchSpeciesList', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch species list successfully', async () => {
    const mockSpeciesList = [
      { id: 1, name: 'Species 1' },
      { id: 2, name: 'Species 2' },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockSpeciesList));

    const result = await fetchSpeciesList('specieName', 1);
    expect(result).toEqual(mockSpeciesList);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://swapi.dev/api/species/?search=specieName&page=1'
    );
  });

  it('should handle fetch error', async () => {
    fetchMock.mockReject(new Error('Failed to fetch'));

    await expect(fetchSpeciesList('specieName', 1)).rejects.toThrow(
      'Failed to fetch'
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://swapi.dev/api/species/?search=specieName&page=1'
    );
  });
});
