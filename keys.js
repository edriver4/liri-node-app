
const keys = {
  spotify: {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  },
  bands: {
    apikey: process.env.Bands_API_Key
  },
  omdb: {
    apikey: process.env.OMDB_API_KEY
  }
}

module.exports = keys;
console.log('this is loaded %j', keys);
