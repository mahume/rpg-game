let whichCharacterPlayer; var whichCharacterOpponent; var playerReady; var 
opponentReady;
let opponentDefeatedArr = [];
let skywalker = {
  health: 225,
  attack: 5,
  'counter attack': 10,
  playerSelected: false,
  opponentSelected: false,
  displayStats: function () {
    document.querySelector('#skywalkerHealthBadge').textContent = this.health;
    document.querySelector('#skywalkerAttackBadge').textContent = this.attack;
  },
};
let kenobi = {
  health: 190,
  attack: 10,
  'counter attack': 20,
  playerSelected: false,
  opponentSelected: false,
  displayStats: function () {
    document.querySelector('#kenobiHealthBadge').textContent = this.health;
    document.querySelector('#kenobiAttackBadge').textContent = this.attack;
  },
};
let vader = {
  health: 380,
  attack: 30,
  'counter attack': 40,
  playerSelected: false,
  opponentSelected: false, 
displayStats: function () {
    document.querySelector('#vaderHealthBadge').textContent = this.health;
    document.querySelector('#vaderAttackBadge').textContent = this.attack;
  },
};
let sidious = {
  health: 350,
  attack: 25,
  'counter attack': 30,
  playerSelected: false,
  opponentSelected: false,
  displayStats: function () {
    document.querySelector('#sidiousHealthBadge').textContent = this.health;
    document.querySelector('#sidiousAttackBadge').textContent = this.attack;
  },
};

function reset() {
  skywalker.displayStats();
  kenobi.displayStats();
  vader.displayStats();
  sidious.displayStats();
  playerReady = false;
  opponentReady = false;
}
reset();

function gameOver() {
  if (opponentDefeatedArr.length === 3) {
    alert('You win!');
  }
}

// Hover Effect
$('img').on('mouseover', function () {
  if (!playerReady) {
    $(this).addClass('choosePlayer');
    if ($('img').hasClass('playerSelected')) {
      $(this).removeClass('choosePlayer');
    }
  } else {
    $(this).addClass('chooseOpponent');
    if ($('img').hasClass('opponentSelected')) {
      $(this).removeClass('chooseOpponent');
    }
  }
});
$('img').on('mouseleave', function () {
  if (!playerReady) {
    $(this).removeClass('choosePlayer');
  } else {
    $(this).removeClass('chooseOpponent');
  }
});

// Click to Choose Player & Opponent
$('img').on('click', function () {
  if (!playerReady) {
    if (!$('img').hasClass('playerSelected')) {
      $(this).addClass('playerSelected');
      $(this).siblings('ul').children('li:nth-child(3)').addClass('attackButton');
      $(this).parent().slideUp('slow', function () {
        $(this).appendTo('#playerFightArea');
        $(this).slideDown('slow');
      });
      playerReady = true;
    } else {
      $(this).removeClass('playerSelected');
    }
    // Add player selected state to object
    whichCharacterPlayer = $(this).attr('id');
    if ($(this).hasClass('playerSelected')) {
      window[whichCharacterPlayer].playerSelected = true;
    } else {
      window[whichCharacterPlayer].playerSelected = false;
    }
  } else {
    if (!$('img').hasClass('opponentSelected')) {
      $(this).addClass('opponentSelected');
      $(this).parent().slideUp('slow', function () {
        $(this).appendTo('#opponentFightArea');
        $(this).slideDown('slow');
      });
      opponentReady = true;
    } else {
      $(this).removeClass('opponentSelected');
    }
    // Add opponent selected state to object
    whichCharacterOpponent = $(this).attr('id');
    if ($(this).hasClass('opponentSelected')) {
      window[whichCharacterOpponent].opponentSelected = true;
    } else {
      window[whichCharacterOpponent].opponentSelected = false;
    }
    battle();
  }
});
// Game Play
function battle() {
  let attackButton = $('<button id="attackButton" class="btn btn-primary btn-lg d-block">Attack</button>');
  $('.attackButton').replaceWith(attackButton);

  $('#attackButton').on('click', () => {
        window[whichCharacterOpponent]['health'] -= window[whichCharacterPlayer]['attack'];
        window[whichCharacterPlayer]['attack'] += window[whichCharacterPlayer]['attack'];
        window[whichCharacterPlayer]['health'] -= window[whichCharacterOpponent]['counter attack'];
        
        window[whichCharacterPlayer].displayStats();
        window[whichCharacterOpponent].displayStats();

        if (window[whichCharacterPlayer].health <= 0) {
            alert('player loses');
            location.reload();
        } else if (window[whichCharacterOpponent].health <= 0) {
            $('.opponentSelected').parent().remove();
            opponentDefeatedArr.push(window[whichCharacterOpponent]);
            gameOver();
            opponentReady = false;
        }          
    });
}