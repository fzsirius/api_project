document.getElementById('song-search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const artist = document.getElementById('artist').value;
    const title = document.getElementById('title').value;
    
    // Effectuer une requête GET vers la route songProfile en utilisant les valeurs saisies par l'utilisateur
    fetch(`/songProfile/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Afficher les données renvoyées par la route songProfile dans la console
            console.log('Données renvoyées par songProfile:', data);

            // Mettre à jour l'interface utilisateur avec les données
            document.getElementById('song-profile').innerHTML = `
                <h2>${data.songInfo.full_title}</h2>
                <p>${data.lyrics.lyrics}</p>
            `;
        })
        .catch(error => console.error('An error occurred:', error));
});
