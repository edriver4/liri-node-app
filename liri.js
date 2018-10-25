require("dotenv").config();
// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
// Need to install the following pacakages: request, moment, and fs
// How to do a npm install:
// npm install request moment fs
// External files.
const request = require('request');
const moment = require('moment');
const keys = require("./keys.js");
const fs = require("fs");

// labeling the arguments in the input array.  These will serve as the commands for spotify, bands in town, and movies
const command = process.argv[2];
const nodeArgs = process.argv;

// define search term string from process.argv input
let input = '';
let connector = "";

// This is the searchBands Fucntion
// This function returns an artist and the concert and the date that the artist plays
// To use this code type in the terminal node liri.js concert-this "artist" but dont use the quotes.
const searchBands = (artist) => {
    console.log('We made it to the search bands function ===>')
    console.log('Artist ====>', artist)
    const bandsURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=#";
    request(bandsURL, (error, response, body) => {
        const jsonData = JSON.parse(body);
        // console.log('response+++++', jsonData);
        console.log('response ===>', body.warn)
        if (!error && response.statusCode === 200) {

            // if (body.warn === undefined) {
            //     console.log(`No search results found for ${artist}`)
            //     return
            // }
            // const jsonData = JSON.parse(body)
            console.log(`Upcoming concerts for ${artist.toUpperCase()}: `)
            for (let i = 0; i < jsonData.length; i++) {
                let concert = jsonData[i]
                console.log('============================')
                console.log(
                    `${concert.venue.city},${concert.venue.region} at ${concert.venue.name} on ${moment(concert.venue.datetime).format('MM/DD/YYYY')}`
                )

            }
            if (body.warn === undefined) {
                console.log(`No search results found for ${artist}`);
                return;
            }
        }
    })
}

// Spotify function to search for songs
const searchSpotify = (song) => {
    console.log('We made it to search spotify function ===>');

    if (song === "") {
        searchSpotify("Changes");
    }

    // Install the Spotify npm package before running the spotify-this-song command.
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
console.log("New spotifiy===>", Spotify);
    spotify
    .search({ type: 'track', query: 'All the Small Things'})
    .then(function(response) {
        console.log(response);
    })
    .catch(function(err){
        console.log(err);
    })
}

// This function searches the OMDB for a movie's information.
const searchMovies = (movie) => {
    console.log("We were able to run the searchMovies function ===>");
    console.log("Movie ===>", movie);
    const queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=#"
    console.log(queryUrl);
    request(queryUrl, function(error, response, body) {
       const movieInformation = JSON.parse(body);
        if (movie === "") {
            searchMovies("Thor");
        } else if (error != null) {
            console.log(error);
        } else {
            console.log("-------------------------------------------Movie Info-----------------------------------------------------");
            console.log("Title: " + movieInformation.Title);
            console.log("Year Released: " + movieInformation.Year);
            console.log("IMDB Rating: " + movieInformation.Ratings[0].Value);
            console.log("Rotten Tamatoes Rating: " + movieInformation.Ratings[1].Value);
            console.log("Country produced: " + movieInformation.Country);
            console.log("Language: " + movieInformation.Language);
            console.log("Plot: " + movieInformation.Plot);
            console.log("Actors: " + movieInformation.Actors);
            console.log("-------------------------------------------Movie Info-----------------------------------------------------");
        }
        // If the request is successful
        // if (!error && response.statusCode === 200) {
      
        //   // Parse the body of the site and recover just the imdbRating
        //   // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
        //   console.log("Release Year: " + JSON.parse(body).Year);
        // }
      });
}

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        input = `${input}${connector}${nodeArgs[i]}`;
    } else {
        input += nodeArgs[i];
    }
}

runLiri(command, input);

function runLiri(command, input) {
    //this function runs the API Search based on what command it is given.
    switch (command) {
        case "concert-this":
            searchBands(input);
            break;
        case "spotify-this-song":
            searchSpotify(input);
            break;
        case "movie-this":
            searchMovies(input);
            break;
        case "do-what-it-says":
            searchFile();
            break;
        default:
            return null
            //findError(command, input);//
            break;
    }
}