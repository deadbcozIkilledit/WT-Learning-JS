const jokeContent = document.querySelector( '#joke-content' );
const jokeTopic = document.querySelector( '#joke-topic' );
const button = document.querySelector( '#get-joke' );

button.addEventListener( 'click', function() {
    getRandomJoke();
})

function getRandomJoke() {
    const numJokes = jokes.length;
    let randomJoke = Math.floor(Math.random() * numJokes);
    jokeContent.textContent = jokes[randomJoke].joke;
    jokeTopic.textContent = jokes[randomJoke].name;
}