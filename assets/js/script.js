const apiKey = "9973533"
const requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';
var resultsArr = [];


async function getApi(){
    const response = await fetch(requestUrl)
    var data = await response.json();

    resultsArr = data.drinks;
    
    console.log(resultsArr);
}

getApi(requestUrl);