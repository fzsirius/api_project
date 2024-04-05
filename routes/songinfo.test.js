const axios = require('axios');
const { getSongInfo } = require('./songinfo'); // Import the getSongInfo function

jest.mock('axios'); // Mock axios module

describe('getSongInfo', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it('should return song info when found', async () => {
    // Mock axios.get to return a sample response
    const mockResponse = {
      data: {
        response: {
          hits: [
            {
              result: {
                title: 'Sample Title',
                artist: 'Sample Artist',
                // Add more relevant properties here
              }
            }
          ]
        }
      }
    };

    axios.get.mockResolvedValue(mockResponse);

    // Call getSongInfo function
    const songInfo = await getSongInfo('Sample Artist', 'Sample Title');

    // Assert that song info is returned correctly
    expect(songInfo.title).toBe('Sample Title');
    expect(songInfo.artist).toBe('Sample Artist');
    // Add more assertions for other properties
  });

  it('should throw error when song info not found', async () => {
    // Mock axios.get to simulate empty hits array
    const mockResponse = {
      data: {
        response: {
          hits: [] // Simulate empty hits array
        }
      }
    };

    axios.get.mockResolvedValue(mockResponse);

    // Call getSongInfo function and expect it to throw an error
    await expect(getSongInfo('Nonexistent Artist', 'Nonexistent Title')).rejects.toThrowError('An error occurred while fetching song info');
  });

  it('should throw error when artist or title is missing or empty', async () => {
    // Call getSongInfo function with missing or empty artist and title
    await expect(getSongInfo('', '')).rejects.toThrowError('Both artist and title must be provided');
    await expect(getSongInfo('ArtistName', '')).rejects.toThrowError('Both artist and title must be provided');
    await expect(getSongInfo('', 'SongTitle')).rejects.toThrowError('Both artist and title must be provided');
  });
});
