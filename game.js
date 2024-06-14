let gamePattern = [];
let userClickedPattern = [];
let gameIsOn = false;
let gameLevel = 0;

function getRandomColor() {
  let randomNumber = Math.floor(Math.random() * 4);
  const buttonColors = ['red', 'blue', 'green', 'yellow'];
  const randomChosenColor = buttonColors[randomNumber];
  return randomChosenColor;
}

function startSequence() {
  let chosenColor = getRandomColor();
  gamePattern.push(chosenColor);
  gameIsOn = true;
  gameLevel += 1;
  userClickedPattern = [];
  $("#level-title").text("Level " + gameLevel);
  continueSequence();
}

function continueSequence() {
  gamePattern.forEach((element, index) => {
    setTimeout(() => {
      $('#' + element).fadeOut(100).fadeIn(100);
      let sound = new Audio(`sounds/${element}.mp3`);
      sound.play();
    }, index * 500); // ms delay between each element
  });
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        startSequence();
      }, 1000);
    }
    return true;
  } else {
    let wrongSound = new Audio('sounds/wrong.mp3');
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    return false;
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  gameIsOn = false;
  gameLevel = 0;
}

$(document).ready(function() {
  $(document).on('keydown', function() {
    if (!gameIsOn) {
      $("#level-title").text("Level " + gameLevel);
      startSequence();
    }
  });

  $("[type='button']").on('click', function() {
    let id = $(this).attr('id');
    $(this).fadeOut(100).fadeIn(100);
    let sound = new Audio(`sounds/${id}.mp3`);
    sound.play();
    userClickedPattern.push(id);

    checkAnswer(userClickedPattern.length - 1);
  });
});
