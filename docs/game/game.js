// Author: Matt Nguyen
// Course: CPSC332
// Assignment: Web Project Deliverable 2
// Last Modifed: 11.04.2022

// --- script for game.html ---
window.onload = function() {
    const question = document.getElementById("question");
    const progressText = document.getElementById("progress-text");
    const scoreText = document.getElementById("score");
    const progressBarFull = document.getElementById("progress-bar-full");
    const choices = Array.from(document.querySelectorAll(".choice-text"));

    // settings js ---
    const timeSession = document.getElementById('timed-session');
    const minutesElem = document.getElementById('minutes');
    const secondsElem = document.getElementById('seconds');
    minutesElem.classList.add('hidden');
    secondsElem.classList.add('hidden');

    var totalSeconds = 0;

    function setTime() {
        ++totalSeconds;
        if (totalSeconds % 30 == 0 || (totalSeconds - 2) % 30 == 0) {
            if (totalSeconds != 2) {
                secondsElem.classList.add('flash');
            }
        }
        else {
            secondsElem.classList.remove('flash');
        }
        secondsElem.innerHTML = formatTime(totalSeconds % 60, "s");
        minutesElem.innerHTML = formatTime(parseInt(totalSeconds / 60), "m");
    }

    function formatTime(val, unit) {
        var valueString = val + unit + " ";
        if (valueString.length < 2) {
            return "0" + valueString;
        } else {
            return valueString;
        }
    }

    timeSession.addEventListener('change', () =>{
        if(timeSession.checked){
            minutesElem.classList.remove('hidden');
            secondsElem.classList.remove('hidden');
            setInterval(setTime, 1000);
        }
        else {
            minutesElem.classList.add('hidden');
            secondsElem.classList.add('hidden');
        }
    })

    // end settings js ---

    // game js ---
    let score = 0;
    let questionCounter = 0;
    let availibleQuestions = [];
    let currentQuestion = {};
    let acceptingAnswers = true;
    
    function startGame() {
        getDogImage();
        questionCounter = 0;
        score = 0;
        availibleQuestions = [...questions];
        getQuestion();
    }

    function getQuestion() {
        if(availibleQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
            localStorage.setItem("recentScore", score); 
            return window.location.assign('../finish/finish.html');
        }

        questionCounter++;
        progressText.innerText = `${(questionCounter/MAX_QUESTIONS)*100 - 25}% Complete`;
        // progress-bar live updates 
        progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100 - 25}%`

        const questionsIndex = Math.floor(Math.random() * availibleQuestions.length);
        currentQuestion = availibleQuestions[questionsIndex];
        question.innerText = currentQuestion.question;

        choices.forEach(choice => {
            const number = choice.dataset['number'];
            choice.innerText = currentQuestion['choice' + number];
        });

        availibleQuestions.splice(questionsIndex, 1);
        acceptingAnswers = true;
    }

    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if(!acceptingAnswers) return;

            getDogImage();
            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];

            if(selectedAnswer == currentQuestion.answer) {
                classToApply = 'correct';
            }
            else {
                classToApply = 'incorrect';
            }
            
            // live score-updates
            if(classToApply == 'correct'){
                 score += SCORE_POINTS;
                 scoreText.innerText = score;
            }

            selectedChoice.parentElement.classList.add(classToApply);


            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getQuestion();
            }, 1000);

        });
    });
  
    var questions = [
        {
            question: "1. what dog breed?",
            choice1: "answer",
            choice2: "answer",
            choice3: "answer",
            choice4: "answer",
            answer: 1,
        },
        {
            question: "2. what dog breed?",
            choice1: "answer",
            choice2: "answer",
            choice3: "answer",
            choice4: "answer",
            answer: 2,
        },
        {
            question: "3. what dog breed?",
            choice1: "answer",
            choice2: "answer",
            choice3: "answer",
            choice4: "answer",
            answer: 3,
        },
        {
            question: "4. what dog breed?",
            choice1: "answer",
            choice2: "answer",
            choice3: "answer",
            choice4: "answer",
            answer: 4,
        }
    ]

    const SCORE_POINTS = 50;
    const MAX_QUESTIONS = 4;
    // end game js ---
    
    // api js ---
    const dogImage = document.getElementById('luna');
    function httpGet(url)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    function getDogImage()
    {
        var json = httpGet('https://dog.ceo/api/breeds/image/random');
        console.log(json);
        
        var array = JSON.parse(json);
        console.log(array);
        
        var url = array.message;
        console.log(url);

        dogImage.src = url;
    }
    // end api js ---


    startGame();
}
