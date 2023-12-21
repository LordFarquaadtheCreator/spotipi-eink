import express from 'express';
import cors from 'cors';
import 'dotenv/config';
const SPOTIFY_CLIENTID = process.env.SPOTIFY_CLIENTID;
const SPOTIFY_CLIENTSECRET = process.env.SPOTIFY_CLIENTSECRET;
const SPOTIFY_REDIRECT_URI = 'http://localhost:4000/auth/callback'
const port = 4000;
global.access_token = ''

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173/' }));

/**
 * Spotify Login
 * https://github.com/spotify/spotify-web-playback-sdk-example/blob/main/server/index.js
 */

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/auth/login', (req, res) => {
  var scope = "streaming user-read-email user-read-private"
  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENTID,
    scope: scope,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state: state
  })

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})

app.get('/auth/callback', (req, res) => {

  var code = req.query.code;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(SPOTIFY_CLIENTID + ':' + SPOTIFY_CLIENTSECRET).toString('base64')),
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.redirect('/')
    }
  });

})

app.get('/auth/token', (req, res) => {
  res.json({ access_token: access_token})
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
