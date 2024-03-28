// Importer la fonction à tester
const { handleSubmit } = require('./app');

// Importer JSDOM pour simuler un environnement de navigateur
const { JSDOM } = require('jsdom');

// Mock de la méthode fetch pour les tests
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ 
            songInfo: { full_title: 'Test Song', artist_names: 'Test Artist', release_date_for_display: '2022-01-01' },
            lyrics: { lyrics: 'Test lyrics' }
        })
    })
);

// Configurez JSDOM
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;

// Créer les éléments nécessaires pour le test avant chaque test
beforeEach(() => {
    document.body.innerHTML = `
        <form id="song-search-form">
            <input id="artist" value="Test Artist">
            <input id="title" value="Test Song">
        </form>
        <div id="song-profile"></div>
    `;
});

describe('handleSubmit', () => {
    test('should update the UI with song profile data', async () => {
        // Appeler la fonction à tester
        await handleSubmit(new Event('submit'));

        // Vérifier que l'interface utilisateur a été mise à jour correctement
        expect(document.getElementById('song-profile').innerHTML).toContain('Test Song');
        expect(document.getElementById('song-profile').innerHTML).toContain('Test lyrics');
        expect(document.getElementById('song-profile').innerHTML).toContain('Test Artist');
        expect(document.getElementById('song-profile').innerHTML).toContain('2022-01-01');
    });
});
