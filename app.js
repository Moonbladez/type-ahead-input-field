const searchInput = document.querySelector(".search")
const suggestions = document.querySelector(".suggestions")


const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []

fetch(endpoint)
    .then(response =>
        response.json()
    )
    .then(data =>
        cities.push(...data)
    )

const findMatches = (wordToMatch, cities) => {
    return cities.filter(place => {
        //check word passed matches what was searched
        const regex = new RegExp(wordToMatch, "gi");
        return place.city.match(regex) || place.state.match(regex)
    })
}

//format population with commas
const numbersWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function displayMatches() {
    const matchArray = findMatches(this.value, cities)
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, "gi")
        const cityName = place.city.replace(regex, `<span class="bg-yellow-400">${this.value}</span>`)
        const stateName = place.state.replace(regex, `<span class="bg-yellow-400">${this.value}</span>`)
        return `
            <li class="flex justify-between hover:bg-teal-300  focus:bg-teal-300 focus:outline-none p-1" tabindex="0">
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numbersWithCommas(place.population)}</span>
            </li>
        `
    }).join("");

    suggestions.innerHTML = html
}





//event listeners
searchInput.addEventListener("change", displayMatches)
searchInput.addEventListener("keyup", displayMatches)