document.getElementById('song-search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // Get the values entered by the user for artist and title
    const artist = document.getElementById('artist').value;
    const title = document.getElementById('title').value;

    // Perform a GET request to the songProfile route using the user-entered values
    fetch(`/songProfile/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`)
        .then(response => {
            // Check if the response is okay
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            // Log the data returned by songProfile to the console for debugging
            console.log('Data returned by songProfile:', data);

            // Update the user interface with the returned data
            document.getElementById('song-profile').innerHTML = `
                <h2>${data.songInfo.full_title}</h2>
                <p>${data.lyrics.lyrics}</p>
                <p>Artist: ${data.songInfo.artist_names}</p>
                <p>Release Date: ${data.songInfo.release_date_for_display}</p>
                <!-- Add other information here as needed -->
            `;
        })
        .catch(error => console.error('An error occurred:', error)); // Catch any errors that occur during the process
});
