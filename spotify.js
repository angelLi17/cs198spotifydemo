const axios = require("axios") //imports axios

async function getToken() { //async bc we want it to wait for server
    const response = await axios.post(
        "https://spotify-api.lehuy.dev/api/token",
        new URLSearchParams({
            grant_type: "client_credentials",
            client_id: SPOTIFY_ID,
            client_secret: SPOTIFY_SECRET //for real purpose secure put codes in secret file .env
        })
    )
    return response.data.access_token
}

module.exports = {
    getToken: getToken
}