let started = false
let userClickedPattern = []
let actualPattern = []
let colors = ['green', 'yellow', 'red', 'blue']
let level = 0
let highScore = localStorage.getItem("highScore");
if(highScore==null){
    highScore = 0;
}
document.getElementById("highScore").innerHTML = `High Score = ${highScore}`;


$(document).keypress(function(){
    if(!started){
        started = true;
        nextSequence();
    }
})

$(".box").on("click", function(e){
    let color = e.target.id;
    userClickedPattern.push(color)
    playSound(color);
    animate(color);
    // console.log(userClickedPattern)
    let currentLevel = userClickedPattern.length-1;
    checkAnswer(currentLevel);
})

function nextSequence(){
    let highScore = localStorage.getItem("highScore");
    if(highScore==null){
        highScore = 0;
    }
    document.getElementById("highScore").innerHTML = `High Score = ${highScore}`;
    // startGame();
    level++;
    title.innerHTML = `Level ${level}`;
    userClickedPattern = [];
    let random = Math.floor(Math.random() * 4);
    let color = colors[random];
    actualPattern.push(color);
    animate(color);

    if(level>highScore){
        localStorage.setItem("highScore", level);
    }

    // console.log(actualPattern);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===actualPattern[currentLevel]){
        if(userClickedPattern.length===actualPattern.length){
            // console.log("correct")
            setTimeout(nextSequence, 1000);
        }
    }else{
        // console.log("wrong")
        playSound("wrong")
        title.innerHTML = `Game over, press any key to restart...`;
        $("body").addClass("gameOver");
        setTimeout(function(){
            $("body").removeClass("gameOver")
        }, 200)
        resetGame()
        let highScore = localStorage.getItem("highScore");
        if(highScore==null){
            highScore = 0;
        }
        document.getElementById("highScore").innerHTML = `High Score = ${highScore}`;
    }
}

function resetGame(){
    actualPattern = []
    userClickedPattern = []
    level = 0
    started = false
}

function playSound(color){
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play()
}

function animate(color){
    $(`#${color}`).addClass("pressed");
    
    setTimeout(function(){
        $(`#${color}`).removeClass("pressed");
    }, 200)
}

//local storage