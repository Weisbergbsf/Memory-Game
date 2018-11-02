var Game = Game || {}

Game.MemoryGame = (function () {

    let cards = null;
    let facingCards = [];
    let count = 0;
    let cardsMatched = 0;

    function MemoryGame() {
        this.card = $('.card');
        this.restart = $('.restart');
    }

    MemoryGame.prototype.start = function () {
        cards = [...this.card];
        startGame();
        this.card.on('click', onClickCard.bind(this));
        this.restart.on('click', restartGame.bind(this));
    }

    restartGame = () => {
        startGame();
        cards.map( card => { $(card).off('click').on('click',onClickCard); })
    }

    startGame = () => {
        count = 0;
        $('.moves').text(count);
        cardsMatched = 0;
        cards = shuffle(cards);
        cards.map((card) => { $('.deck').append(card); })
        cards.map((card) => card.classList.remove('open', 'show', 'match', 'animated', 'bounceIn', 'hide'))
    }

    onClickCard = () => {
        if (facingCards.length <= 1){
            compareCards(event);
        }
    }

    compareCards = (event) => {
        
        if (facingCards.length <= 1){
            facingCards.push(event.currentTarget)
        }
        showCard(event);
       
        if (facingCards.length === 2) {
            totalCardsClicked();
            
            if (facingCards[0].type === facingCards[1].type) {
                matched();
            }
            else {
                unmatched();
            }
        }
    }

    showCard = (event) => {
        $(event.currentTarget).addClass('open show animated flipInY faster ');
        //Block the click of the first card to prevent it from being compared to itself.
        $(event.currentTarget).off( "click" )
    }

    matched = () => {
        $(facingCards[0]).removeClass('flipInY faster');
        $(facingCards[1]).removeClass('flipInY faster');

        $(facingCards[0]).addClass('match bounceIn ');
        $(facingCards[1]).addClass('match bounceIn ');
        
        //Disable event click
        $(facingCards[0]).off("click", onClickCard);
        $(facingCards[1]).off("click", onClickCard);

        facingCards = [];

        finishGame();
    }

    finishGame = () => {
        cardsMatched++;
        
        if(cardsMatched === 8) {
            $('.score-panel').addClass('hide');
            $('.deck').addClass('hide');
            
            swal({
                title: "Good job!",
                text: `With ${count} moves.`,
                icon: "success",
                button: "Play again!",
              }).then(() => {
                  cardsMatched = 0;
                  $('.score-panel').removeClass('hide');
                  $('.deck').removeClass('hide');
                  restartGame();
              });
        }
    }

    unmatched = () => {
        //Enable event click
        $(facingCards[0]).on("click", onClickCard);
        $(facingCards[1]).on("click", onClickCard);

        $(facingCards[0]).removeClass('flipInY faster');
        $(facingCards[1]).removeClass('flipInY faster');
        $(facingCards[0]).addClass('animated shake unmatch');
        $(facingCards[1]).addClass('animated shake unmatch');
        setTimeout(() => {
            let style = 'delay-5s bounceIn open show animated shake faster unmatch'
            $(facingCards[0]).removeClass(style);
            $(facingCards[1]).removeClass(style);
            facingCards = [];
        }, 1000);
    }

    totalCardsClicked = () => {
        count++
        $('.moves').text(count);
    }

    shuffle = (array) => {
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

$(() => { new Game.MemoryGame().start(); })