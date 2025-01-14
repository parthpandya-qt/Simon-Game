




var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;

var level = 0;


$(document).on("keydown", function(){
    if(!started){
        $("#level-title").text("Level"+ level);
        nextSequence();
        started = true;
    }
   
});


$('.btn').on("click", function(){
    var userChosenColor = $(this).attr("id");   // pata karne ke liyr ki kon si id hai
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
       if(userClickedPattern.length === gamePattern.length){
           setTimeout(function(){nextSequence();},1000);
       }
    
   }else{
       
       var audio1 = new Audio("./sounds/wrong.mp3");
       audio1.play();
       $("body").addClass("game-over");
       $("#level-title").text("Game Over, Press Any Key to Restart");
       setTimeout(function(){
           $("body").removeClass("game-over");
           
         },200);
       
       startOver();
        }
}
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level - "+ level);

    var randomNumber = Math.random();
    randomNumber = Math.floor((randomNumber *4));
    var randomChoosenColour  = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
   $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColour);
}   
function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}



   function playSound(name){
     var audio = new Audio("sounds/" + name + ".mp3");
     audio.play();
   }
   
    



function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
    