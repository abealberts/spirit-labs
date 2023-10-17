$(function () {
    var requestUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';
    var resultsArr = [];

    function getApi(requestUrlArg) {
        fetch(requestUrlArg)
        .then(function (response) {
            var data = response.json();
            console.log(data);


            //DOES NOT WORK
            for (let i = 0; i < data.length; i++) {
                resultsArr.push(data.drinks[i]);
            }

            console.log(resultsArr);
            
            return data;
        });
    }

getApi(requestUrl);
});