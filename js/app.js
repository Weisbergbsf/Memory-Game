var Game = Game || {};

Game.MemoryGame = (function () {

    let cards = null;
    let facingCards = [];
    let count = 0;
    let cardsMatched = 0;
    let starRating = 3;
    //Properties for timer
    let timer;
    let minutes = 0;
    let seconds = 0;

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
        cards.map(card => { $(card).off('click').on('click', onClickCard); });
        starRating = 3;
        minutes = 0;
        seconds = 0;
        clearTimeout(timer);
        $('.timer').text('0 min(s)  0 sec(s)');
        $('.fa-star').parent().get(2).style = 'visibility: visible';
        $('.fa-star').parent().get(1).style = 'visibility: visible';
        $('.fa-star').parent().get(0).style = 'visibility: visible';
    }

    startGame = () => {
        count = 0;
        $('.moves').text(count);
        cardsMatched = 0;
        cards = shuffle(cards);
        cards.map((card) => { $('.deck').append(card); });
        cards.map((card) => card.classList.remove('open', 'show', 'match', 'animated', 'bounceIn', 'hide'));
    }

    onClickCard = () => {

        if (facingCards.length <= 1) {
            compareCards(event);
        }
    }

    compareCards = (event) => {

        if (facingCards.length <= 1) {
            facingCards.push(event.currentTarget);
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
        $(event.currentTarget).off('click');
    }
    //matched cards
    matched = () => {
        $(facingCards[0]).removeClass('flipInY faster');
        $(facingCards[1]).removeClass('flipInY faster');

        $(facingCards[0]).addClass('match bounceIn ');
        $(facingCards[1]).addClass('match bounceIn ');

        //Disable event click
        $(facingCards[0]).off('click', onClickCard);
        $(facingCards[1]).off('click', onClickCard);

        facingCards = [];
        //When you match all cards in less than 3 minutes
        gameWon();
    }

    //unmatched cards
    unmatched = () => {
        //Enable event click
        $(facingCards[0]).on('click', onClickCard);
        $(facingCards[1]).on('click', onClickCard);

        $(facingCards[0]).removeClass('flipInY faster');
        $(facingCards[1]).removeClass('flipInY faster');
        $(facingCards[0]).addClass('animated shake unmatch');
        $(facingCards[1]).addClass('animated shake unmatch');
        setTimeout(() => {
            let style = 'delay-5s bounceIn open show animated shake faster unmatch';
            $(facingCards[0]).removeClass(style);
            $(facingCards[1]).removeClass(style);
            facingCards = [];
        }, 1000);
    }

    chronometer = () => {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        $('.timer').text(minutes + ' min(s) ' + seconds + ' sec(s)');
        startTimer();
        //Loses when it reaches 3 minutes.
        gameOver();
    }

    startTimer = () => {
        timer = setTimeout(chronometer, 1000);
    }

    totalCardsClicked = () => {
        count++;
        $('.moves').text(count);

        if (count === 9) {
            $('.fa-star').parent().get(2).style = 'visibility: hidden';
            starRating -= 1;
        }
        if (count === 15) {
            $('.fa-star').parent().get(1).style = 'visibility: hidden';
            starRating -= 1;
        }
        if (count === 20) {
            $('.fa-star').parent().get(0).style = 'visibility: hidden';
            starRating -= 1;
        }

        //start the timer on the first click
        if (count === 1) {
            second = 0;
            minute = 0;
            hour = 0;
            startTimer();
        }
    }

    //When match all the cards
    gameWon = () => {
        cardsMatched++;
        if (cardsMatched === 8) {
            let title = 'Good job!'
            let message = `With ${count} moves and ${starRating} star(s) \nin ${minutes} min(s) ${seconds} sec(s)`;
            let icon = 'success';
            modal(title, message, icon);
        }
    }

    //Loses when it reaches 3 minutes.
    gameOver = () => {
        if (minutes === 3) {
            let title = 'Game over!'
            let message = `With ${count} moves in ${minutes} min(s) ${seconds} sec(s)`;
            let icon = 'error';
            modal(title, message, icon);
            clearTimeout(timer);
        }
    }

    modal = (title, message, icon) => {
        $('.score-panel').addClass('hide');
        $('.deck').addClass('hide');
        swal({
            title: title,
            text: message,
            icon: icon,
            button: 'Play again!',
        }).then(() => {
            cardsMatched = 0;
            $('.score-panel').removeClass('hide');
            $('.deck').removeClass('hide');
            restartGame();
        });
    }

    //shuffle the cards
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