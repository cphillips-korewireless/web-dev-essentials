console.log("works");

/*** Frameworks like Angular manage DOM interaction for you so you don't have to do things like this.
 * In fact when using any framework with a vdom you should interact with that exclusively and never
 * refer directly to document.
 ***/
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    //for (var i = 0; i < 10000000000; i++) {}
    exampleRequest();
});

var exampleRequest = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ghibliapi.herokuapp.com/films/", true);
    xhr.responseType = 'json';
    xhr.onload = function(e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                mapResults(xhr.response);
            }
            else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function(e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
};

var mapResults = function(results) {
    console.log(results);
    results.forEach((movie) => {
        var containerElem = document.querySelector("div.ghibli-container");
        var movieWrapper = document.createElement("div");
        var movieTitle = document.createElement("div");
        var movieDescription = document.createElement("div");
        movieWrapper.classList.add('movie-wrapper');
        movieTitle.classList.add('movie-title');
        movieDescription.classList.add('movie-description');
        var titleNode = document.createElement("h3");
        var textNode = document.createTextNode(movie.title);

        var listNode = document.createElement("div");
        var description = document.createTextNode(movie.description);

        titleNode.appendChild(textNode);
        movieTitle.appendChild(titleNode);
        movieWrapper.appendChild(movieTitle);
        movieDescription.appendChild(description);
        movieWrapper.appendChild(movieDescription);
        containerElem.appendChild(movieWrapper);
    });
};
