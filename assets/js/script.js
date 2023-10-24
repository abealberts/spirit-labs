const apiKey = "9973533"
const requestUrl = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?';
var resultsArr = [];
var randomArr = [];
var dotdArr = []
var favoritesArr = [];

//requestUrl changed -- add onto requestUrl in API calls
async function searchDrinks() {

    const response = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/list.php?c=list")
    var data = await response.json();

    resultsArr = data.drinks;

    console.log(data);
}

async function getRandomDrink() {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php");
    var data = await response.json();

    randomArr = data.drinks;
}

async function fetchFavoritesData(){
    const response = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/search.php" + "?i=" + drinkId)
    var data = await response.json();
}

async function getDOTD() {
    // fetch gets a random drink from the api
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    var data = await response.json();

    dotdArr = data.drinks

    $(document).ready(function(){
    
        
        function updateTime () {
        
        const currentIndex = 0;

            $("#dotdImage").attr("src", dotdArr[currentIndex].strDrinkThumb),
            $("#dotdName").text(dotdArr[currentIndex].strDrink),
            $("#dotdIngredient1").text(dotdArr[currentIndex].strIngredient1),
            $("#dotdIngredient2").text(dotdArr[currentIndex].strIngredient2),
            $("#dotdIngredient3").text(dotdArr[currentIndex].strIngredient3),
            $("#dotdIngredient4").text(dotdArr[currentIndex].strIngredient4),
            $("#dotdIngredient5").text(dotdArr[currentIndex].strIngredient5),
            $("#dotdIngredient6").text(dotdArr[currentIndex].strIngredient6),
            $("#dotdIngredient7").text(dotdArr[currentIndex].strIngredient7)

            // increment the index or reset to 0 if it exceeds the array length
            currentIndex = (currentIndex + 1) % dotdArr.length;

            // set the next update to start after 5 seconds
            setTimeout(updateTime, 5000);
        }
        // initial content change
        updateTime();
    })
}

$("#randButton").click(async function () {
    await getRandomDrink();
    var rand = Math.floor(Math.random() * 9);
    $("#randImage").attr("src", randomArr[rand].strDrinkThumb);
    $("#randName").text(randomArr[rand].strDrink);
    $("#randIngredient1").text(randomArr[rand].strIngredient1);
    $("#randIngredient2").text(randomArr[rand].strIngredient2);
    $("#randIngredient3").text(randomArr[rand].strIngredient3);
    $("#randIngredient4").text(randomArr[rand].strIngredient4);
    $("#randIngredient5").text(randomArr[rand].strIngredient5);
    $("#randIngredient6").text(randomArr[rand].strIngredient6);
    $("#randIngredient7").text(randomArr[rand].strIngredient7);
    console.log(rand);
});

$("#randFavoriteBtn").click(function(){
    drinkName = $(this).parents(".box").children("#randName").text();
    console.log(drinkName);
});

$("#serveDrinks").click(async function(){

    var liquor = $("#liquor").val();
    var ingredient1 = $("#ingredient1").val();
    var ingredient2 = $("#ingredient2").val();
    var ingredientsUrl = "";
    var liquorUrl = "";
    var searchUrl = "";

    $("#searchError").hide();

    //Formats ingredients for URL
    if (ingredient1 && ingredient2){
        ingredientsUrl = ingredient1 + "," + ingredient2;
    } else if (ingredient1 && !ingredient2){
        ingredientsUrl = ingredient1;
    } else if (!ingredient1 && ingredient2){
        ingredientsUrl = ingredient2;
    };

    //Formats Liquor for URL
    if (liquor && ingredientsUrl){
        liquorUrl = liquor + ",";
    } else if (liquor && !ingredientsUrl){
        liquorUrl = liquor;
    };

    //Send API Request with the selected ingredients assuming at least one selection is made
    if (!liquor && !ingredient1 && !ingredient2){
        $("#searchError").show();
    } else {
        searchUrl = requestUrl + "i=" + liquorUrl + ingredientsUrl;

        console.log(searchUrl);

        const response = await fetch(searchUrl)
        var data = await response.json();
    
        resultsArr = data.drinks;
    
        console.log(data);
    };    
;})

searchDrinks()
getDOTD();