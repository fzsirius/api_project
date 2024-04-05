const axios = require('axios');
const { getLyrics } = require('./lyrics'); // Import the getLyrics function

jest.mock('axios'); // Mock axios module

describe('getLyrics', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it('should return lyrics when lyrics are found', async () => {
    // Mock axios.get to return a sample response
    axios.get.mockResolvedValue({ status: 200, data: { lyrics: 'Sample lyrics' } });

    // Call getLyrics function
    const result = await getLyrics('ArtistName', 'SongTitle');

    // Log the response for debugging
    console.log('Response from getLyrics:', result);

    // Assert that lyrics are returned
    expect(result.lyrics).toBe('Sample lyrics'); // Adjusted assertion to check the 'lyrics' property of the result
  });

  it('should throw error 404 when lyrics are not found', async () => {
    // Mock axios.get to simulate lyrics not found
    axios.get.mockRejectedValue({ response: { status: 404 } });

    // Call getLyrics function and expect it to throw a 404 error
    await expect(getLyrics('ArtistName', 'SongTitle')).rejects.toThrowError('Lyrics not found');
  });

  it('should return error when artist or title is missing or empty', async () => {
    // Call getLyrics function with missing or empty artist and title
    await expect(getLyrics('', '')).rejects.toThrowError('Both artist and title must be provided');
    await expect(getLyrics('ArtistName', '')).rejects.toThrowError('Both artist and title must be provided');
    await expect(getLyrics('', 'SongTitle')).rejects.toThrowError('Both artist and title must be provided');
  });
});
