"use strict";
$(document).ready(function () {


const URL = 'https://innate-dent-tadpole.glitch.me/movies';
fetch(URL).then(res => {
    document.getElementById("movieDisplay").innerHTML = ("Loading...");
    return res.json()})
    .then(movies => { document.getElementById("movieDisplay").innerHTML = ("");
    console.log(movies);
    movies.map((movie) => {
        document.getElementById("movieDisplay")
            .innerHTML += enterMovie(movie);
    })
});

//write a function that displays the title and rating on HTML

function enterMovie (movieName){
    let html = "";
    html+= `<div>
  <div class="card-header">
     <h1>Title: ${movieName.title}</h1>
  </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">
    <h3> Rating: ${movieName.rating}</h3>
    </li>
    <li class="list-group-item">
    <h3>ID: ${movieName.id}</h3>
    </li>
    </ul>
</div>`;
    return html;
}

/// enter movie to URL ///

    function postMovie (movieObj) {
        const url = URL;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieObj),
        };
        fetch(url, options)
            .then(console.log("You're movie was successfully entered!"))
            .catch(/* handle errors */);

    }
   //////

    $('#submit').click(function (e) {
        e.preventDefault();
        console.log($('#title').val());
        console.log($('#rating').val());
        console.log($('#genre').val());
        let title;
        let rating;
        let genre;
        if ($('#title').val() === "") {
            title = "N/A";
        } else {
            title = $('#title').val();
        }
        if ($('#rating').val() === "") {
            rating = "N/A";
        } else {
            rating = $('#rating').val();
        }
        if ($('#genre').val() === "") {
            genre = "N/A";
        } else {
            genre = $('#genre').val();
        }
        const newMovieObj =
            { title: title,
                rating: rating,
                genre: genre
            }
            console.log(newMovieObj);
        postMovie(newMovieObj);
    })



////// end of jquery
});

