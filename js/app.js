var Game = Game || {}

Game.MemoryGame = (function () {

    let facingCards = [];

    function MemoryGame() {
        this.card = $('.card');
    }

    MemoryGame.prototype.start = function () {
        let cards = [...this.card];
        startGame(cards);

        this.card.on('click', onClickCard.bind(this));


    }

    function startGame(cards) {

        cards = shuffle(cards);
        cards.map((card) => card.classList.remove('open', 'show', 'match', 'disabled'))

    }

    function onClickCard(event) {
        facingCards.push(event.currentTarget)
        showCard(event);
        console.log('cliquei..', event.currentTarget, 'size arrya facingCards: ', facingCards);

        if (facingCards.length === 2) {

            if (facingCards[0].type === facingCards[1].type) {

                console.log('combina ', facingCards[0], ' - ', facingCards[1], '     =>  ', facingCards)
                //$(event.currentTarget).addClass('open show animated bounceOut faster');
                matched();
                facingCards = [];
            }
            else {

                //$(facingCards[0]).removeClass('delay-5s open show animated flipInY disabled');
                //$(facingCards[1]).removeClass('delay-5s open show animated flipInY disabled');

                setTimeout(() => {
                    unmatched
                    console.log("setTimeout called!")
                }, 1000);
                facingCards = [];
            }
        }

    }

    function showCard(event) {
        $(event.currentTarget).addClass('open show animated flipInY faster disabled');
    }
    function matched() { 
        $(facingCards[0]).removeClass('flipInY faster');
        $(facingCards[1]).removeClass('flipInY faster');

        $(facingCards[0]).addClass('match bounceIn disabled');
        $(facingCards[1]).addClass('match bounceIn disabled');
    }
    function unmatched() {

        let style = 'open show animated flipInY faster disabled'

        $(facingCards[0]).removeClass('open show animated flipInY faster disabled');
        $(facingCards[1]).removeClass('open show animated flipInY faster disabled');

    }


    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    return MemoryGame;

}());

$(function () {
    var game = new Game.MemoryGame();
    game.start();
})

/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
