import { describe, it } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../public/app.js'; // Assurez-vous que le chemin d'accès à votre application Express est correct

describe('GET /lyrics/:artist/:title', () => {
  it('should return lyrics with 200 status code for valid artist and title', async () => {
    const response = await request(app).get('/lyrics/artistName/songTitle');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.lyrics, 'Lyrics of the song');
  });

  it('should return 500 status code for invalid artist or title', async () => {
    const response = await request(app).get('/lyrics/invalidArtist/invalidTitle');
    assert.strictEqual(response.status, 500);
    assert.strictEqual(response.body.message, 'An error occurred');
  });
});
