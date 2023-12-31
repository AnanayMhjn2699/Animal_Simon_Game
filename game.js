const buttonColours=["red","blue","green","yellow"];
let gamePattern=[];
let userClickedPattern=[];

//to check when a button is clicked
$(".btn").click(function(){
    userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //checking the inputted sequence
    if(started)
        checkAns(userClickedPattern.length - 1);
});

//to start the game
let level=0;
let started=false;

$(document).on("keypress",function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});

//game's logic
function checkAns(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        //playing th wrong sound
        playSound("wrong");
        //changing the background to red and back normal
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);
        //changing h1
        $("h1").text("Game Over at level "+level+", Press Any Key to Restart");


        //restart the game but no need to put keypress bcoz once started is set to
        //0 the keypress functionality at 21 line overtakes it 
        started=false;
        level=0;
        gamePattern=[];
    }
}

//function to generate next color in the sequence
function nextSequence(){
    const randomNumber=Math.floor(Math.random()*4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //setting userPattern to empty at before starting each level
    userClickedPattern=[];
    //changing the h1 text to corresponding level
    level++;
    $("h1").text("Level "+level);

    //chosen button is flashed
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    //respective audio is played
    playSound(randomChosenColour);
}

//function to play sounds when a button is falshed or clicked
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
//function to animate the process of clicking the button  
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}


//instructions menu
const expandButton = $("#expandButton")
const expandContent = $('#expandContent');
expandButton.on("mouseenter",function(){
    expandContent.css("display","block");
});
expandButton.on("mouseleave",function(){
    expandContent.css("display","none");
});