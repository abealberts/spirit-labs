const apiKey = "9973533"
const requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?appid=9973533';
var resultsArr = [];
var randomArr = [];
var dotdArr = []

//requestUrl changed -- add onto requestUrl in API calls
async function searchDrinks() {
    const response = await fetch(requestUrl + "&f=a")
    var data = await response.json();

    resultsArr = data.drinks;

    console.log(resultsArr);

}

async function getRandomDrink() {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v2/9973533/randomselection.php")
    var data = await response.json();

    randomArr = data.drinks;

    console.log(data);

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
    console.log(rand);
});

getDOTD();
searchDrinks();

