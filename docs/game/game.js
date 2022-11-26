// Author: Matt Nguyen
// Course: CPSC332
// Assignment: Web Project Deliverable 2
// Last Modifed: 11.04.2022

// --- script for game.html ---
if (typeof window !== "undefined") {
    window.onload = function() {
        const question = document.getElementById("question");
        const progressText = document.getElementById("progress-text");
        const scoreText = document.getElementById("score");
        const progressBarFull = document.getElementById("progress-bar-full");
        const choices = Array.from(document.querySelectorAll(".choice-text"));
    
        // settings js ---
        const timeSession = document.getElementById('timed-session');
        const stopTimer = document.getElementById('stop-timer')
        const minutesElem = document.getElementById('minutes');
        const secondsElem = document.getElementById('seconds');
        minutesElem.classList.add('hidden');
        secondsElem.classList.add('hidden');
    
        var totalSeconds = 0;
        var timer = false;
        function setTime() {
            localStorage.setItem("recentTime", totalSeconds); 
            totalSeconds++;
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
        timeSession.addEventListener('click', () => {
            minutesElem.classList.remove('hidden');
            secondsElem.classList.remove('hidden');
            timer = setInterval(setTime, 1000);  
        });

        stopTimer.addEventListener('click', () => {
            clearInterval(timer);
            totalSeconds= 0;
        });
        // end settings js ---
    
        // game js ---
        let score = 0;
        let questionCounter = 0;
        let availibleQuestions = [];
        let currentQuestion = {};
        let acceptingAnswers = true;
        
        function startGame() {
            answer = getDogImage();
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
        
        // api js ---
        const dogImage = document.getElementById('luna');
        var breeds = getBreed();

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
            // console.log(json);
            
            var array = JSON.parse(json);
            // console.log(array);
            
            var url = array.message;
            // console.log(url);
    
            // getting correct breed through string methods
            var urlArr = url.split("/");
            var answer = urlArr[4];
            answer = answer.split("-");
            if(!(answer[1] === undefined)){
                answer = answer[1] + ' ' + answer[0];
            }
            else 
                answer = answer[0];

            console.log(answer);
            
            // setting src of dog image
            dogImage.src = url;
    
            // setting correct answer
            for(let i = 0; i < MAX_QUESTIONS; i++){
                questions[i]["choice" + (i + 1)] = answer;
            }
        }

        function getBreed(){
            var json = httpGet('https://dog.ceo/api/breeds/list');
            // console.log(json);
            
            var array = JSON.parse(json);
            // console.log(array);
            
            var breeds = array.message;
            // console.log(breeds);
            
            return breeds;
        }
        // end api js ---
    
        var questions = [
            {
                question: "what dog breed?",
                choice1: breeds[Math.floor(Math.random() * breeds.length)],
                choice2: breeds[Math.floor(Math.random() * breeds.length)],
                choice3: breeds[Math.floor(Math.random() * breeds.length)],
                choice4: breeds[Math.floor(Math.random() * breeds.length)],
                answer: 1,
            },
            {
                question: "what dog breed?",
                choice1: breeds[Math.floor(Math.random() * breeds.length)],
                choice2: breeds[Math.floor(Math.random() * breeds.length)],
                choice3: breeds[Math.floor(Math.random() * breeds.length)],
                choice4: breeds[Math.floor(Math.random() * breeds.length)],
                answer: 2,
            },
            {
                question: "what dog breed?",
                choice1: breeds[Math.floor(Math.random() * breeds.length)],
                choice2: breeds[Math.floor(Math.random() * breeds.length)],
                choice3: breeds[Math.floor(Math.random() * breeds.length)],
                choice4: breeds[Math.floor(Math.random() * breeds.length)],
                answer: 3,
            },
            {
                question: "what dog breed?",
                choice1: breeds[Math.floor(Math.random() * breeds.length)],
                choice2: breeds[Math.floor(Math.random() * breeds.length)],
                choice3: breeds[Math.floor(Math.random() * breeds.length)],
                choice4: breeds[Math.floor(Math.random() * breeds.length)],
                answer: 4,
            }
        ]
    
        const SCORE_POINTS = 50;
        const MAX_QUESTIONS = 4;
    
        // end game js ---
    
        startGame();
    }
}