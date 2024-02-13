const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var keyPressCounter = 0;
var level = 0;
var clicks = 0;
var lose = false;

$(document).keypress(function() {
    keyPressCounter +=1;
    if(keyPressCounter == 1) {
        nextSequence();
        $("h1").text("Level "+level);
    }
    if(lose == true) {
        startOver();
    }
})

function fail() {
    var bad = "wrong";
    lose = true;
    playSound(bad);
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 100);
    $("h1").text("Game Over! Press any key to restart!");
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
    keyPressCounter = 0;
    level = 0;
    clicks = 0;
    lose = false;
    $("h1").text("Press A Key to Start")
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if(gamePattern[clicks] == userClickedPattern[clicks]) {
        if(userClickedPattern.length == gamePattern.length) {
            userClickedPattern = [];
            setTimeout(() => {
                nextSequence();
            }, 400);
        }
    }
    else {
        fail();
    }
    clicks+=1;
});

function nextSequence(){
    clicks=0;
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).hide().fadeIn();
    playSound(randomChosenColour);
    level += 1;
    $("h1").text("level "+level);
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.volume = 0.025;
    audio.play();
}