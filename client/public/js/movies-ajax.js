var apikey = "539ccda6c942a1dfd00efc7df43be0d1"




$(document).ready(function () {

    // these will be buttons most likely
    var getRecommended = $(".rec-movies");
    var searchMovies = $("#movie-search");
    var nowPlaying = $(".now-playing");
    // search box for movies
    var movieInput = $("#movie-search-title");


    // ajax for searching a specific movie that the user can then vote on
    searchMovies.on("submit", function (event) {

        var movieInputVal = movieInput.val();
        event.preventDefault();
        var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=" + apikey + "&language=en-US&query=" + movieInputVal + "&page=1";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (result) {

            for (var i = 0; i < 5; i++) {
                var moviePoster = result.results[i].poster_path;
                var movieTitle = result.results[i].title;
                var movieId = result.results[i].id;
                var movieOverview = result.results[i].overview;
                var movieReleaseDate = result.results[i].release_date;

                // do stuff with the results here (fill divs add info elsewhere etc)
                var mediaDiv = $("<div>");
                mediaDiv.attr("class", "media col-6 offset-3");
                var imgDiv = $("<img>");
                var imgLink = $("<a>");
                imgLink.attr("href", "/movie/" + movieId);
                imgDiv.attr("src", "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + moviePoster);
                imgLink.append(imgDiv);

                mediaDiv.append(imgLink);

                var mediaBody = $("<div>");
                mediaBody.attr("class", "col-8");
                var titleHeader = $("<h5>");
                titleHeader.text(movieTitle);
                mediaBody.append(titleHeader);
                mediaBody.append("Plot: " + movieOverview);
                mediaDiv.append(mediaBody);

                $("#searchResults").append(mediaDiv);

            }
        }).catch(function (err) {
            if (err) throw err;
            console.log(err);
        })
    });

    // recommended movie button ajax
    getRecommended.on("click", function (event) {
        // movieId is from the searched movie 
        var movieId;

        event.preventDefault();
        var queryURL = "https://api.themoviedb.org/3/movie/" + movieId + "/recommendations?api_key=" + apikey + "&language=en-US&page=1"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (results) {
        }).catch(function (err) {
            if (err) throw err;
            console.log(err);
        })

    })



})