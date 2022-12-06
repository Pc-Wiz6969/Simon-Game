
var gamePattern=[];
var buttonColors=["red", "blue", "green", "yellow"];
var userClickedPattern=[];

var userChosenColour;
var name;

var level = 0;
var started = false;


$(".btn").click(function() {
  userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+ level);

    nextSequence();
    started = true;
}
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){

       setTimeout(function(){
         nextSequence();

       }, 1000);

    }
  } else{
    console.log("wrong");
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $(document.body).addClass("game-over");
    setTimeout(function(){
      $(document.body).removeClass("game-over");
    },200);

    startOver();
  }
}

function startOver(){
  started = false;
  level = 0;
  gamePattern=[];
}

function nextSequence(){
  //resetting the user clicked pattern---->
  userClickedPattern =[];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  // JQUERY
  $('#'+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  $("#"+currentColour).addClass("first_button");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
  setTimeout(function(){
    $("#"+currentColour).removeClass("first_button");
  },500);
}
