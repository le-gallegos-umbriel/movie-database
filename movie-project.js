"use strict";
$(document).ready(function () {

const MOVIE_URL = `http://www.omdbapi.com/?t=&apikey=73698e9a`;

function returnMovieURL(str){
    return `http://www.omdbapi.com/?t=${str}&apikey=73698e9a`
}

function returnMoviePromise(movieLink){
    return fetch(movieLink);
}

    // console.log(returnMovieURL(''));

    function getImageLink(promise){
        return promise.then(res => res.json()).then(finale => (finale.Poster));
    }


    const URL = 'https://innate-dent-tadpole.glitch.me/movies';
    function refreshMovies () {
        fetch(URL).then(res => {
            document.getElementById("movieDisplay").innerHTML = ("<img src= img/loading_gif.gif>");
            return res.json()
        })
            .then(movies => {
                document.getElementById("movieDisplay").innerHTML = ("");
                console.log(movies);
                movies.forEach((movie) => {
                    getImageLink(returnMoviePromise(returnMovieURL(movie.title))).then(link => movie.poster = link).then(() => document.getElementById("movieDisplay")
                        .innerHTML += enterMovie(movie)).then(result => {
                        $('.delete').each(function () {
                            $(this).click(function () {
                                const movieNumber = $(this).attr("data-id");
                                console.log(parseInt(movieNumber));
                                deleteMovie(movieNumber);
                            });
                        });
                        $('.edit').each(function () {
                            $(this).click(function () {
                                const movieNumber = $(this).attr("data-id");
                                editMovie(movieNumber);
                            });
                        });
                    });
                });
            });
    }
    refreshMovies();


//write a function that displays the title and rating on HTML

    function enterMovie(movieName) {
        let html = "";
        html += `
<div class="cardbrdr col-5 mb-2">
<div class="card bg-dark" style="">
<img src="${movieName.poster}" height="300" alt="noimagelink">
  <div class="card-header text-light">
     <h2>Title: ${movieName.title}</h2>
  </div>
    <ul class="list-group list-group-flush bg-dark">
    <li class="list-group-item bg-dark text-light">
    <h4> Rating: ${movieName.rating}</h4>
    </li>
    <li class="list-group-item bg-dark text-light">
    <h4>ID: ${movieName.id}</h4>
    </li>
        <li class="list-group-item bg-dark text-light">
    <h4>Genre: ${movieName.genre}</h4>
    </li>
    </ul>
    <button class="delete btn btn-danger m-auto" style="width: 100px" data-id="${movieName.id}"> delete </button>
    <button class="edit mt-2 btn btn-success m-auto"  style="width: 100px;" data-id="${movieName.id}"> edit </button>
</div>
</div> `;  //end div col

        return html;
    }

//// edit movie ////
    function editMovie(num) {
        const url = `${URL}/${num}`;
        console.log(url)
        const options = {
            method: 'GET'
        };
        fetch(url, options)
            .then(res => {
                console.log(res);
                return res.json();
            }).then(movie => {
            let title;
            let rating;
            let genre;
            if (movie.title === ""  || movie.title === undefined) {
                title = "N/A";
            } else {
                title = movie.title;
            }
            if (movie.rating === "" || movie.rating === undefined) {
                rating = "N/A";
            } else {
                rating = movie.rating;
            }
            if (movie.genre === "" || movie.genre === undefined) {
                genre = "N/A";
            } else {
                genre = movie.genre;
            }
            $("#title").val(title);
            $("#rating").val(rating);
            $("#genre").val(genre);
            $("#id").val(movie.id);
        })
            .catch(/* handle errors */);
    }

//// delete movie ////

    function deleteMovie(num) {
        const url = `${URL}/${num}`;
        console.log(url)
        const options = {
            method: 'DELETE'
        };
        fetch(url, options)
            .then(console.log("You're movie was successfully deleted!"))
            .then(refreshMovies)
            .catch(/* handle errors */);
    }

    ////
    function editSubmit(movieObj, num) {
        const url = `${URL}/${num}`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieObj),
        };
        fetch(url, options)
            .then(console.log("You're movie was successfully edited!"))
            .catch(/* handle errors */);
    }

    function editBackgroundSubmit(movieObj, num) {
        const url = `${URL}/${num}`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieObj),
        };
        fetch(url, options)
            .then(console.log("You're movie was successfully edited!"))
            .catch(/* handle errors */);
    }


/// enter movie to URL ///
///edit submit button /////
    function postMovie(movieObj) {
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
            .then(refreshMovies)
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
            {
                title: title,
                rating: rating,
                genre: genre
            }
        console.log(newMovieObj);
        postMovie(newMovieObj);
        refreshMovies(newMovieObj);
    });

    //submit edit
    $('#editrightside').click(function (e) {
        e.preventDefault();
        console.log($('#title').val());
        console.log($('#rating').val());
        console.log($('#genre').val());
        let title;
        let rating;
        let genre;
        let id;
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
            {
                title: title,
                rating: rating,
                genre: genre
            }
        console.log(newMovieObj);
        editNewMovie(newMovieObj,$('#id').val());
    })

    ///////////
    function editNewMovie(movieObj, num) {
        const url = `${URL}/${num}`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieObj),
        };
        fetch(url, options)
            .then(console.log("Your edit has been processed."))
            .then (res => refreshMovies())
            .catch(/* handle errors */);
    }


    $('#searchbtn').click(function (e) {
        e.preventDefault();
        const searchinput = document.getElementById('searchinput').value;
        console.log(searchinput);
        fetch(URL).then(res => {
            document.getElementById("movieDisplay").innerHTML = ("Loading...");
            return res.json()
        })
            .then(movies => {
                document.getElementById("movieDisplay").innerHTML = ("");
                console.log(movies);
                movies.forEach((movie) => {
                    if (movie.title === searchinput)
                    {
                        getImageLink(returnMoviePromise(returnMovieURL(movie.title))).then(link => movie.poster = link).then(() => document.getElementById("movieDisplay")
                            .innerHTML += enterMovie(movie)).then(result => {
                            $('.delete').each(function () {
                                $(this).click(function () {
                                    const movieNumber = $(this).attr("data-id");
                                    console.log(parseInt(movieNumber));
                                    deleteMovie(movieNumber);
                                });
                            });
                            $('.edit').each(function () {
                                $(this).click(function () {
                                    const movieNumber = $(this).attr("data-id");
                                    editMovie(movieNumber);
                                });
                            });
                        });
                    }
                });
            });
    });


    ////refresh button///
    $('#refreshbtn').click(function (e) {
        e.preventDefault();
        refreshMovies();
    });

////// end of jquery
});

