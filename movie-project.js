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


    console.log(getImageLink(returnMoviePromise(returnMovieURL("spirited away"))).then(res => console.log(res)));

    const URL = 'https://innate-dent-tadpole.glitch.me/movies';
function refreshMovies () {
    fetch(URL).then(res => {
        document.getElementById("movieDisplay").innerHTML = ("Loading...");
        return res.json()
    })
        .then(movies => {
            document.getElementById("movieDisplay").innerHTML = ("");
            console.log(movies);
            movies.map((movie) => {
                document.getElementById("movieDisplay")
                    .innerHTML += enterMovie(movie);
            })
        }).then(result => {
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
                // const movieNumber = $(this).attr("data-id");
                // let title;
                // let rating;
                // let genre;
                // if ($('#title').val() === "") {
                //     title = "N/A";
                // } else {
                //     title = $('#title').val();
                // }
                // if ($('#rating').val() === "") {
                //     rating = "N/A";
                // } else {
                //     rating = $('#rating').val();
                // }
                // if ($('#genre').val() === "") {
                //     genre = "N/A";
                // } else {
                //     genre = $('#genre').val();
                // }
                // const newMovieObj =
                //     {
                //         title: title,
                //         rating: rating,
                //         genre: genre
                //     }
                // console.log(parseInt(movieNumber));
                // editMovie(newMovieObj, movieNumber);

            });

        });

    });
}
    refreshMovies();

function patchMovieLinks(){
    $
}

//write a function that displays the title and rating on HTML

    function enterMovie(movieName) {
        let html = "";

        html += `
<div class="col-5 mb-2">
<div class="card bg-dark" style="">
<img src="${movieName.poster}" height="300" alt="noimagelink">
  <div class="card-header text-light">
     <h1>Title: ${movieName.title}</h1>
  </div>
    <ul class="list-group list-group-flush bg-dark">
    <li class="list-group-item bg-dark text-light">
    <h3> Rating: ${movieName.rating}</h3>
    </li>
    <li class="list-group-item bg-dark text-light">
    <h3>ID: ${movieName.id}</h3>
    </li>
        <li class="list-group-item bg-dark text-light">
    <h3>Genre: ${movieName.genre}</h3>
    </li>

    </ul>
    <button class="delete btn btn-danger" data-id="${movieName.id}"> delete </button>
    <button class="edit mt-2 btn btn-success" data-id="${movieName.id}"> edit </button>
</div>
</div> `;  //end div col

        return html;
    }

//// edit movie ////
    function editMovie(num) {
        // fetch(`${URL}/${num}`).then(res => res.json());
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
// editMovie(274);

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

////// end of jquery
});

