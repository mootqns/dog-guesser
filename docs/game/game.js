// Author: Matt Nguyen
// Course: CPSC332
// Assignment: Web Project Deliverable 2
// Last Modifed: 11.04.2022

// --- script for game.html ---
if (typeof window !== "undefined") {
    window.onload = function() {
        const question = document.getElementById("question");
        // const progressText = document.getElementById("progress-text");
        const scoreText = document.getElementById("score");
        const progressBarFull = document.getElementById("progress-bar-full");
        const choices = Array.from(document.querySelectorAll(".choice-text"));
    
        // timer js ---
        const timeSession = document.getElementById('timed-session');
        const minutesElem = document.getElementById('minutes');
        const secondsElem = document.getElementById('seconds');
        const timerBox = document.getElementById('timer-box');
        minutesElem.classList.add('hidden');
        secondsElem.classList.add('hidden');
    
        var totalSeconds = 0;
        function setTime() {
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
            timerBox.classList.add('hidden');
            minutesElem.classList.remove('hidden');
            secondsElem.classList.remove('hidden');
            timer = setInterval(setTime, 1000);  
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
                localStorage.setItem("recentTime", totalSeconds); 
                return window.location.assign('../finish/finish.html');
            }
            
            if(questionCounter > 0){
                timerBox.classList.add('hidden'); 
            }
            
            questionCounter++;

            // progress-bar live updates 
            progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)* 100}%`
    
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

        // function httpGet(url)
        // {
        //     var xmlHttp = new XMLHttpRequest();
        //     xmlHttp.open( "GET", url, false );
        //     xmlHttp.send( null );
        //     return xmlHttp.responseText;
        // }

        function getDogImage()
        {
            // var json = httpGet('https://dog.ceo/api/breeds/image/random');
            var json = ($.ajax({ type: "GET",   
                            url: "/api",   
                            async: false,
                            }).responseText);

            var array = JSON.parse(json);
            
            var url = array.message;

            // getting correct breed through string methods
            var urlArr = url.split("/");
            var answer = urlArr[4];
            answer = answer.split("-");
            if(!(answer[1] === undefined)){
                answer = answer[1] + ' ' + answer[0];
            }
            else 
                answer = answer[0];

            // setting src of dog image
            dogImage.src = url;
    
            // setting correct answers
            function generateBreed() {
                var breed = breeds[Math.floor(Math.random() * (breeds.length - 1))];
                if(breed == answer) {
                    generateBreed();
                } 
                else {
                    return breed;
                }
            }

            for(let i = 0; i < 6; i++){
                questions[i]["choice1"] = generateBreed();
                questions[i]["choice2"] = generateBreed();
                questions[i]["choice3"] = generateBreed();
                questions[i]["choice4"] = generateBreed();
            }

            console.log(answer);
            
            questions[0]["choice" + answer1] = answer;
            questions[1]["choice" + answer2] = answer;
            questions[2]["choice" + answer3] = answer;
            questions[3]["choice" + answer4] = answer;
            questions[4]["choice" + answer5] = answer;
            questions[5]["choice" + answer6] = answer;
        }

        function getBreed(){
            // var json = httpGet('https://dog.ceo/api/breeds/list');
            
            var json = ($.ajax({ type: "GET",   
            url: "/api-breeds",   
            async: false,
            }).responseText);
     
            var array = JSON.parse(json);
            
            var breeds = array.message;
            
            return breeds;
        }
        // end api js ---
        var answer1 = Math.floor(Math.random() * (4 - 1 + 1) + 1);
        var answer2 = Math.floor(Math.random() * (4 - 1 + 1) + 1);
        var answer3 = Math.floor(Math.random() * (4 - 1 + 1) + 1);
        var answer4 = Math.floor(Math.random() * (4 - 1 + 1) + 1);
        var answer5 = Math.floor(Math.random() * (4 - 1 + 1) + 1);
        var answer6 = Math.floor(Math.random() * (4 - 1 + 1) + 1);

        var questions = [
            {
                question: "what dog breed?",
                choice1: "choice",
                choice2: "choice",
                choice3: "choice",
                choice4: "choice",
                answer: answer1,
            },
            {
                question: "what dog breed?",
                choice1: "choice",
                choice2: "choice",
                choice3: "choice",
                choice4: "choice",
                answer: answer2,
            },
            {
                question: "what dog breed?",
                choice1: "choice",
                choice2: "choice",
                choice3: "choice",
                choice4: "choice",
                answer: answer3,
            },
            {
                question: "what dog breed?",
                choice1: "choice",
                choice2: "choice",
                choice3: "choice",
                choice4: "choice",
                answer: answer4,
            },
            {
                question: "what dog breed?",
                choice1: "choice",
                choice2: "choice",
                choice3: "choice",
                choice4: "choice",
                answer: answer5,
            },
            {
                question: "what dog breed?",
                choice1: "choice",
                choice2: "choice",
                choice3: "choice",
                choice4: "choice",
                answer: answer6,
            }
        ]
    
        const SCORE_POINTS = 50;
        const MAX_QUESTIONS = 6;
    
        // end game js ---

        startGame();
    }
}