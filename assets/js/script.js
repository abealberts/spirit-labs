const apiKey = "9973533"
const requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?appid=9973533&f=a';
var resultsArr = [];


async function searchDrinks(){
    const response = await fetch(requestUrl)
    var data = await response.json();

    resultsArr = data.drinks;
    
    console.log(resultsArr);
}

searchDrinks();

//SOME PSUEDO CODE FOR SEARCH FUNCTIONALITY
// $("#searchButton").click(function(){
//     Build api link based on each dropdown

//     endpoint url + searchAlcoholic + Liquor + etc

//     if ($("#searchAlcoholic").val()){
//         If theres a value for this dropdown, add to url
//     }

//     if ($("#searchAlcoholic").val() = No){
//         searchLiquor = disabled
//     }
// })