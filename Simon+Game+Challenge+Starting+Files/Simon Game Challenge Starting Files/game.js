var buttonColors =["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern =[];
var startCount=0;
var level =0;

function nextSequence(){
    
    userClickedPattern = [];
    level++;
    $("h1").text ("Level " + level);

    var randomNumber =Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    

}

function playSound(Name){
    var audio = new Audio("sounds/" + Name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      playSound("wrong");
      
      $("body").addClass("game-over");  

      setTimeout(function(){
      $("body").removeClass("game-over");                
      },200);

      $("h1").text("Game Over, Press Any Key to Restart");
      console.log("wrong");

      startOver();
    }

}

function startOver(){
  level =0;
  gamePattern=[];
  startCount =0;
}


$(".btn").on("click" , function(event){
    var userChosenColor = $(this).attr("id") ;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

});

$(document).on("keydown",function(){ 
      if(startCount===0){
        nextSequence();
        startCount++;
    }});






