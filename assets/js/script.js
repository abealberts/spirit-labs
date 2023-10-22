const apiKey = "9973533"
const requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?appid=9973533';
var resultsArr = [];
var randomArr = [];

//requestUrl changed -- add onto requestUrl in API calls
async function searchDrinks(){
    const response = await fetch(requestUrl + "&f=a")
    var data = await response.json();

    resultsArr = data.drinks;
    
    console.log(resultsArr);
    dotd();
}

async function getRandomDrink(){
    const response = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php")
    var data = await response.json();

    randomArr = data.drinks;

    console.log(data);

}

function dotd(){

    $("#dotdName").text(resultsArr[2].strDrink);
    $("#dotdImage").attr("src", resultsArr[2].strDrinkThumb);
    $("#dotdLiquor").text(resultsArr[2].strIngredient1);
    $("#dotdFlavor").text(resultsArr[2].strIngredient2);

    console.log(resultsArr[0].strDrinkThumb);
};

$("#randButton").click(async function(){
    await getRandomDrink();
    var rand = Math.floor(Math.random() * 9);
   $("#randImage").attr("src", randomArr[rand].strDrinkThumb);
   $("#randName").text(randomArr[rand].strDrink);
   $("#randIngredient1").text(randomArr[rand].strIngredient1);
   $("#randIngredient2").text(randomArr[rand].strIngredient2);
   $("#randIngredient3").text(randomArr[rand].strIngredient3);
   console.log(rand);
});

searchDrinks();

//SOME PSUEDO CODE FOR SEARCH FUNCTIONALITY
// $("#searchButton").click(function(){
//     Build api link based on each dropdowns

//     endpoint url + searchAlcoholic + Liquor + etc

//     if ($("#searchAlcoholic").val()){
//         If theres a value for this dropdown, add to url
//     }

//     if ($("#searchAlcoholic").val() = No){
//         searchLiquor = disabled
//     }
// })