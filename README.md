# Song Lyrics  API

## Project Objective

The objective of this project is to create an API that allows users to search for song lyrics and retrieve information related to the song, such as the author, release date, etc.

When a user searches for a song, the API fetches the lyrics from the Lyrics.ovh API and retrieves additional information about the song using the Genius API. This includes details like the author, release date, and more.

This API is designed to be simple to use, providing developers with easy access to song information for integration into their applications.

- The Lyrics.ovh API provides lyrics for songs but without additional information.
- The Genius API provides song information but not lyrics.
- By combining these two APIs, this API offers both lyrics and information about songs simultaneously, providing a comprehensive solution for developers.

## Usage
To use the API, follow these steps:

- Clone the repository to your local machine.
- Install the dependencies by running npm install.
- Obtain API keys:
    For the Genius API, visit the Genius API Client management page to create an API client for your application. This will provide you with a client_id and a client_secret.
- Configure your API keys:
    Create a .env file in the root directory of the project.
    Add your Genius API client_id and client_secret to the .env file
- Launch the server by running npm start.
- Access the API endpoints using the provided routes.

## API Documentation
This API provides the following endpoints:

GET /lyrics/{artist}/{title}: Retrieve the lyrics of a song.
GET /songinfo/{artist}/{title}: Get information about the song.
GET /songprofile/{artist}/{title}: Get the song profile, including lyrics and information.

For more details on how to use these endpoints, refer to the Swagger documentation provided by the API. The Swagger documentation can be accessed by visiting the root URL of the deployed API.

## Acknowledgments
This project utilizes the Lyrics.ovh API for fetching song lyrics and the Genius API for retrieving additional information about songs. Special thanks to the developers of these APIs for providing access to their services.

