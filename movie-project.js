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
    <h1>Title: ${movieName.title}</h1>
    <h3> Rating: ${movieName.rating}</h3>
    <h3>ID: ${movieName.id}</h3>
</div>`;
    return html;
}


////// end of jquery
});

