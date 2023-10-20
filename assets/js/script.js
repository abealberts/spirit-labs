const apiKey = "9973533"
const requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?appid=9973533';
var resultsArr = [];
var randomArr = [];

//requestUrl changed -- add onto requestUrl in API calls
async function searchDrinks(){
    const response = await fetch(requestUrl)
    var data = await response.json();

    resultsArr = data.drinks;
    
    console.log(resultsArr);
    dotd();
    
}

async function getRandomDrink(){
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/randomselection.php")
    var data = await response.json();

    randomArr = data.drinks;

    console.log(randomArr);

}

function dotd(){

    $("#dotdName").text(resultsArr[2].strDrink);
    $("#dotdImage").attr("src", resultsArr[2].strDrinkThumb);
    $("#dotdLiquor").text(resultsArr[2].strIngredient1);
    $("#dotdFlavor").text(resultsArr[2].strIngredient2);

    console.log(resultsArr[0].strDrinkThumb);
};

$("randomButton").click(function(){
    var rand = Math.floor(Math.random() * 9);
   $("#randomImage").attr("src", randomArr[rand].strDrinkThumb);
   $("#randomLiquor").text(randomArr[rand].strIngredient1);
   $("#randomFlavor").text(randomArr[rand].strIngredient2);
   console.log(rand);
});

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
