const button = document.querySelector("#search-button")
const input = document.querySelector("#artist-name")
const results = document.querySelector("#results")

button.addEventListener("click", async () => {
    const response = await axios.post("/api/search", { q: input.value })
    const artists = response.data

    results.replaceChildren()
    artists.forEach((artist) => {
        const item = document.createElement("li")
        const link = document.createElement("a")
        link.href = "/" + artist.id
        link.textContent = artist.name
        item.append(link)
        results.append(item)
    })
})
