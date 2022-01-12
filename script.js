var button = document.getElementById("button");

var doc_movie1 = document.getElementById("movie1");
var doc_movie2 = document.getElementById("movie2");

var doc_movie1Title = movie1.getElementsByTagName("p")[0];
var doc_movie2Title = movie2.getElementsByTagName("p")[0];

var doc_movie1Vote = movie1.getElementsByTagName("p")[1];
var doc_movie2Vote = movie2.getElementsByTagName("p")[1];

var doc_movie1Img = movie1.getElementsByTagName("img")[0];
var doc_movie2Img = movie2.getElementsByTagName("img")[0];

var left = document.getElementById("left");
var right = document.getElementById("right");

var result = document.getElementById("result");
var doc_score = document.getElementById("score");


voteLeft = "";
voteRight = "";
score=0;

doc_score.innerHTML = "Score : " + score;

async function getMovies(title1, img1, title2, img2) {

    result.innerHTML = "";
    result.style.color = "black";
    doc_movie1Vote.innerHTML = "";
    doc_movie2Vote.innerHTML = "";
    button.style.visibility = "hidden";
    left.style.visibility = "visible";
    right.style.visibility = "visible";

    // Movie 1
    randomPage1 = Math.floor(Math.random() * 33 + 1);

    const url1 = "https://api.themoviedb.org/3/discover/movie?api_key=4eecb89413c21f5343f7cc3c9bece60a&vote_count.gte=5000&page=" + randomPage1;
    const response1 = await fetch(url1)

    if(response1.status == 404){
        getMovie();
    }

    const result1 = await response1.json();

    randomMovie = Math.floor(Math.random() * result1.results.length);

    movieTitleLeft = result1.results[randomMovie].original_title;
    movieVoteLeft = result1.results[randomMovie].vote_average *10;
    voteLeft = movieVoteLeft;
    moviePosterLeft = "https://image.tmdb.org/t/p/w500" + result1.results[randomMovie].poster_path;

    title1.innerHTML = movieTitleLeft;
    img1.src = moviePosterLeft;



    // Movie 2
    randomPage2 = Math.floor(Math.random() * 33 + 1);

    const url2 = "https://api.themoviedb.org/3/discover/movie?api_key=4eecb89413c21f5343f7cc3c9bece60a&vote_count.gte=5000&page=" + randomPage2;
    const response2 = await fetch(url2)

    if(response2.status == 404){
        getMovie();
    }

    const result2 = await response2.json();

    randomMovie = Math.floor(Math.random() * result2.results.length);

    movieTitleRight = result2.results[randomMovie].original_title;
    movieVoteRight = result2.results[randomMovie].vote_average *10;
    voteRight = movieVoteRight;
    moviePosterRight = "https://image.tmdb.org/t/p/w500" + result2.results[randomMovie].poster_path;

    title2.innerHTML = movieTitleRight;
    //vote2.innerHTML = movieVoteRight;
    img2.src = moviePosterRight;

}

function start() {
    getMovies(doc_movie1Title, doc_movie1Img, doc_movie2Title, doc_movie2Img);
}

function userVoteLeft() {

    left.style.visibility = "hidden";
    right.style.visibility = "hidden";
    button.style.visibility = "visible";

    if(voteLeft > voteRight){
        result.innerHTML = "You win!";
        result.style.color = "green";
        score = score + 1;
    } else if(voteRight > voteLeft){
        result.innerHTML = "You lose!";
        result.style.color = "red";
        score = score - 1;
    } else {
        result.innerHTML = "Draw";

    }

    doc_score.innerHTML = "Score : " + score;
    doc_movie1Vote.innerHTML = "Rate : " + movieVoteLeft + "%";
    doc_movie2Vote.innerHTML = "Rate : " + movieVoteRight + "%";
}

function userVoteRight() {

    left.style.visibility = "hidden";
    right.style.visibility = "hidden";
    button.style.visibility = "visible";

    if(voteRight > voteLeft){
        result.innerHTML = "You win!";
        result.style.color = "green";
        score = score + 1;
    } else if(voteLeft > voteRight){
        result.innerHTML = "You lose!";
        result.style.color = "red";
        score = score - 1;
    } else {
        result.innerHTML = "Draw";
    }

    doc_score.innerHTML = "Score : " + score;
    doc_movie1Vote.innerHTML = "Rate : " + movieVoteLeft + "%";
    doc_movie2Vote.innerHTML = "Rate : " + movieVoteRight + "%";
}


button.addEventListener("click", start);

left.addEventListener("click", userVoteLeft);
right.addEventListener("click", userVoteRight);

