# Artist explorer starter

Run these commands from this folder:

```sh
npm install
npm start
```

Open http://localhost:3000.

The client is finished. Add `app.use(express.json())` before the routes so Express can read the JSON search body, then complete the two empty handlers in `server.js`:

- `POST /api/search`: read `req.body.q`, search Spotify for artists, and return the artist array as JSON.
- `GET /:artistId`: read `req.params.artistId`, load the artist and their releases, and render `templates/artist.ejs` with `artist` and `releases`.

Use Axios for requests. The template expects `releases` to be an array of album objects. Search results link to `/:artistId`.

## Get an access token

You need an access token to make requests to Spotify. Choose one of the options below.

### If you have Spotify Premium

Create your own app and use your own API credentials. Spotify requires the app owner to have Premium for [Development Mode apps](https://developer.spotify.com/documentation/web-api/concepts/quota-modes).

Follow Spotify's [getting started guide](https://developer.spotify.com/documentation/web-api/tutorials/getting-started). The short version:

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and sign in.
2. Create a new app and select Web API.
3. Find your app's Client ID and Client Secret in its settings.

Next, request an access token. In Postman:

1. Make a POST request to `https://accounts.spotify.com/api/token`.
2. Under Authorization, select Basic Auth. Put your Client ID in Username and Client Secret in Password.
3. Under Body, select `x-www-form-urlencoded`. Add `grant_type` as the key and `client_credentials` as the value.
4. Send the request and find `access_token` in the response.

You can also use curl as shown in Spotify's [client credentials instructions](https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow). In your project, make the same request from Express using Axios. Axios supports Basic Auth through its `auth` option with `username` and `password`; use `new URLSearchParams(...)` for the form body.

### If you don't have Spotify Premium

Use the class token API. From Express, POST URL-encoded data to `https://spotify-api.lehuy.dev/api/token` with these values:

- `grant_type`: `client_credentials`
- `client_id`: `i_love_webdev`
- `client_secret`: `berkeley`

### Use your token

Both options return an `access_token`. Use it in the `Authorization` header as `Bearer YOUR_TOKEN` when calling the normal Spotify API endpoints below. Only the token request differs between the two options.

Keep credentials and token requests on the server. The browser should only call your Express `/api/search` endpoint.

Spotify endpoints:

- Search: `https://api.spotify.com/v1/search?type=artist&limit=5&q=SEARCH_TERM`
- Artist: `https://api.spotify.com/v1/artists/ARTIST_ID`
- Releases: `https://api.spotify.com/v1/artists/ARTIST_ID/albums?include_groups=album,single&market=US&limit=10`

The search button and artist pages will work after you complete the handlers.
