const express = require("express")
const ejs = require("ejs")
const axios = require("axios")

const { getToken } = require("./spotify.js")
const app = express()
app.use(express.static("public"))
app.use(express.json())

app.post("/api/search", async (req, res) => {
    const token = await getToken()
    const response = await axios.get("https://api.spotify.com/v1/search/?type=artist&limit=5&q=" + req.body.q,
    {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    console.log(response)
    res.send(JSON.stringify(response.data.artists.items))
})

app.get("/:artistId", async (req, res) => {
    const artistId = req.params.artistId
    const token = await getToken()

    const artistResponse = await axios.get("https://api.spotify.com/v1/artists/" + artistId, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    const albumResponse = await axios.get("https://api.spotify.com/v1/artists/" + artistId + "/albums", {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    
    const html = await ejs.renderFile("./templates/artist.ejs", {
        artist: artistResponse.data,
        releases: albumResponse.data.items
    })

    console.log(albumResponse.data.items)

    res.send(html)
})

app.listen(3000, () => {
    console.log("Open http://localhost:3000")
})
