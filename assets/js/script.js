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

async function fetchFavoritesData() {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/search.php" + "?i=" + drinkId)
    var data = await response.json();
    console.log(data);
}

async function getDOTD() {
    // Fetch a random drink from the api
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    const data = await response.json();
    const dotdArr = data.drinks;
    console.log(dotdArr);

    // Adds Drink of the Day data to page
    $("#dotdImage").attr("src", dotdArr[0].strDrinkThumb);
    $("#dotdName").text(dotdArr[0].strDrink);
    $("#dotdIngredient1").text(dotdArr[0].strIngredient1);
    $("#dotdIngredient2").text(dotdArr[0].strIngredient2);
    $("#dotdIngredient3").text(dotdArr[0].strIngredient3);
    $("#dotdIngredient4").text(dotdArr[0].strIngredient4);
    $("#dotdIngredient5").text(dotdArr[0].strIngredient5);
    $("#dotdIngredient6").text(dotdArr[0].strIngredient6);
    $("#dotdIngredient7").text(dotdArr[0].strIngredient7);

}
updateDOTDDaily()

function updateDOTDDaily() {
    var updateInterval = 10 * 1000;
    var lastUpdate = localStorage.getItem("dotdLastUpdate")

    // Updates time for the Drink of the Day
    if (!lastUpdate || dayjs().diff(dayjs(lastUpdate)) >= updateInterval) {
        getDOTD();
        localStorage.setItem("dotdLastUpdate", dayjs().format());

        // If it is not time to update, the existing data will remain on the page
    } else {

        getExistingDOTD();
    }
    // Schedule's the next update
    setTimeout(updateDOTDDaily, updateInterval);

}

function getExistingDOTD() {

    // Retreives the data from local storage
    const dotdImage = localStorage.getItem("dotdImage");
    const dotdName = localStorage.getItem("dotdName");
    const dotdIngredient1 = localStorage.getItem("dotdIngredient1");
    const dotdIngredient2 = localStorage.getItem("dotdIngredient2");
    const dotdIngredient3 = localStorage.getItem("dotdIngredient3");
    const dotdIngredient4 = localStorage.getItem("dotdIngredient4");
    const dotdIngredient5 = localStorage.getItem("dotdIngredient5");
    const dotdIngredient6 = localStorage.getItem("dotdIngredient6");
    const dotdIngredient7 = localStorage.getItem("dotdIngredient7");

    // Updates the HTML with the stored data 
    $("#dotdImage").attr(dotdImage);
    $("#dotdName").text(dotdName);
    $("#dotdIngredient1").text(dotdIngredient1);
    $("#dotdIngredient2").text(dotdIngredient2);
    $("#dotdIngredient3").text(dotdIngredient3);
    $("#dotdIngredient4").text(dotdIngredient4);
    $("#dotdIngredient5").text(dotdIngredient5);
    $("#dotdIngredient6").text(dotdIngredient6);
    $("#dotdIngredient7").text(dotdIngredient7);
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

$("#randFavoriteBtn").click(function () {
    drinkName = $(this).parents(".box").children("#randName").text();
    console.log(drinkName);
});

$("#serveDrinks").click(async function () {

    var liquor = $("#liquor").val();
    var ingredient1 = $("#ingredient1").val();
    var ingredient2 = $("#ingredient2").val();
    var ingredientsUrl = "";
    var liquorUrl = "";
    var searchUrl = "";

    $("#searchError").hide();

    //Formats ingredients for URL
    if (ingredient1 && ingredient2) {
        ingredientsUrl = ingredient1 + "," + ingredient2;
    } else if (ingredient1 && !ingredient2) {
        ingredientsUrl = ingredient1;
    } else if (!ingredient1 && ingredient2) {
        ingredientsUrl = ingredient2;
    };

    //Formats Liquor for URL
    if (liquor && ingredientsUrl) {
        liquorUrl = liquor + ",";
    } else if (liquor && !ingredientsUrl) {
        liquorUrl = liquor;
    };

    //Send API Request with the selected ingredients assuming at least one selection is made
    if (!liquor && !ingredient1 && !ingredient2) {
        $("#searchError").show();
    } else {
        searchUrl = requestUrl + "i=" + liquorUrl + ingredientsUrl;

        console.log(searchUrl);

        const response = await fetch(searchUrl)
        var data = await response.json();

        resultsArr = data.drinks;

        console.log(data);
    };
    ;
})


searchDrinks()
