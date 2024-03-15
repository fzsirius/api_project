// Importer la fonction à tester
const { handleSubmit } = require('./app');

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

describe('handleSubmit', () => {
    test('should update the UI with song profile data', async () => {
        // Créer les éléments nécessaires pour le test
        document.body.innerHTML = `
            <form id="song-search-form">
                <input id="artist" value="Test Artist">
                <input id="title" value="Test Song">
            </form>
            <div id="song-profile"></div>
        `;

        // Appeler la fonction à tester
        await handleSubmit(new Event('submit'));

        // Vérifier que l'interface utilisateur a été mise à jour correctement
        expect(document.getElementById('song-profile').innerHTML).toContain('Test Song');
        expect(document.getElementById('song-profile').innerHTML).toContain('Test lyrics');
        expect(document.getElementById('song-profile').innerHTML).toContain('Test Artist');
        expect(document.getElementById('song-profile').innerHTML).toContain('2022-01-01');
    });
});
