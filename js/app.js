var Game = Game || {}

Game.MemoryGame = (function () {

    let facingCards = [];

    function MemoryGame() {
        this.card = $('.card');
        this.deck = $('.deck')
    }

    MemoryGame.prototype.start = function () {
        let cards = [...this.card];
        startGame(cards);
        this.card.on('click', onClickCard.bind(this));
    }

    function startGame(cards) {
        cards = shuffle(cards);
        cards.map((card) => { $('.deck').append(card); })
        cards.map((card) => card.classList.remove('open', 'show', 'match', 'disabled'))
    }

    function onClickCard() {
        if (facingCards.length <= 1){
            compareCards(event);
        }
    }

    function compareCards(event) {
        
        if (facingCards.length <= 1){
            facingCards.push(event.currentTarget)
        }
        showCard(event);
        $(event.currentTarget).unbind( "click" );
       
        if (facingCards.length === 2) {
            $(event.currentTarget).off("click");
            if (facingCards[0].type === facingCards[1].type) {
                matched();
            }
            else {
                unmatched();
            }
        }
    }

    function showCard(event) {
        $(event.currentTarget).addClass('open show animated flipInY faster ');
    }

    function matched() {
        $(facingCards[0]).removeClass('flipInY faster');
        $(facingCards[1]).removeClass('flipInY faster');

        $(facingCards[0]).addClass('match bounceIn ');
        $(facingCards[1]).addClass('match bounceIn ');
        
        //Disable event click
        $(facingCards[0]).unbind();
        $(facingCards[1]).unbind();
        facingCards = [];
    }

    function unmatched() {
        //Enable event click
        $(facingCards[0]).bind("click", onClickCard);
        $(facingCards[1]).bind("click", onClickCard);
        $(facingCards[0]).addClass('animated bounceIn ');
        $(facingCards[1]).addClass('animated bounceIn ');
        setTimeout(() => {
            let style = 'delay-5s bounceIn open show animated flipInY faster '
            $(facingCards[0]).removeClass(style);
            $(facingCards[1]).removeClass(style);
            facingCards = [];
        }, 1000);
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
