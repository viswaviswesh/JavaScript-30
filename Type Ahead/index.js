const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then (res => {
        return res.json()
    })
    .then (data => cities.push(...data))

function findMatches (wordSearched,cities){
    return cities.filter(place =>{
        const regExp = new RegExp (wordSearched,"ig");
        return place.city.match(regExp) || place.state.match(regExp) 
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

function displayMatches (){
    const matchArray = findMatches(this.value,cities);
    const html = matchArray.map(place =>{
        const regex = new RegExp(this.value,"ig");
        const cityName = place.city.replace(regex,`<span class=hl>${this.value}</span>`);
        const stateName = place.state.replace(regex,`<span class=hl>${this.value}</span>`);
        return `
        <li>
        <span class="name ">${cityName},${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
        </li>
        `
    })
    suggestions.innerHTML = html.join("");
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change",displayMatches);
searchInput.addEventListener("keyup",displayMatches); 
