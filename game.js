const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let soundOn = true;
//to set the button text to sound on or off depending on the user choice
let textInButton = "Sound Off";
if (soundOn) textInButton = "Sound On";
$("#sound-toggler").text(textInButton);

//to check when a button is clicked
$(".btn").click(function () {
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //checking the inputted sequence
  if (started) checkAns(userClickedPattern.length - 1);
});

//to start the game
let level = 0;
let started = false;

function startTheGame() {
  $("#score-line").text("");
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
}

//game's logic
function checkAns(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    //playing th wrong sound
    playSound("wrong");
    //changing the background to red and back normal
    $("html").addClass("game-over");
    setTimeout(() => {
      $("html").removeClass("game-over");
    }, 350);
    //changing h1
    $("#score-line").text("Your score is " + (level - 1));
    //$("h1").html("<button id='start_button' onclick='startTheGame()'>Press to start the game</button>");

    //restart the game
    started = false;
    level = 0;
    gamePattern = [];
    $("h1").html(
      "<button id='start_button' onclick='startTheGame()'>Restart the game</button>"
    );
  }
}

//function to generate next color in the sequence
function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //setting userPattern to empty at before starting each level
  userClickedPattern = [];
  //changing the h1 text to corresponding level
  level++;
  $("h1").text("Level " + level);

  //chosen button is flashed
  $("#" + randomChosenColour)
    .fadeOut(200)
    .fadeIn(200);
  //respective audio is played
  playSound(randomChosenColour);
}

//function to play sounds when a button is flashed or clicked
function playSound(name) {
  if (soundOn) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }
}
//function to animate the process of clicking the button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}
//function to toggle the sound on off
function toggleSound() {
  soundOn = !soundOn;
  let textInButton = "Sound Off";
  if (soundOn) textInButton = "Sound On";
  $("#sound-toggler").text(textInButton);
}

//instructions menu
const expandButton = $("#InstructionsButton");
const expandContent = $("#expandContent");
expandButton.on("mouseenter", function () {
  expandContent.css("display", "block");
});
expandButton.on("mouseleave", function () {
  expandContent.css("display", "none");
});
