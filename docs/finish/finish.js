/* Author: Matt Nguyen
Course: CPSC332
Assignment: Web Project Deliverable 2
Last Modifed: 11.04.2022 */

window.onload = function() {
    const user = document.getElementById("username");
    const saveScoreBtn = document.getElementById("save-score-btn");
    const finalScore = document.getElementById("final-score");
    const recentScore = localStorage.getItem("recentScore");
    // const profileImage = document.getElementById("profile-image");
    // const imageUpload = document.getElementById("image-upload");

    // add savescore event listener
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    const MAX_SCORES = 4;

    finalScore.innerText = recentScore;

    user.addEventListener('keyup', () => {
        saveScoreBtn.disabled = !user.value;
    });


    saveScoreBtn.addEventListener("click", saveHighScore(e));

    function saveHighScore(e){
        e.preventDefault();

        const score = {
            score: recentScore,
            name: username.value
        }

        highScores.push(score);
        highScores.sort((a,b) => {
            return b.score - a.score;
        });

        highScores.splice(5);

        localStorage.setItem("highscores", JSON.stringify(highScores));
        window.location.assign("/");

    }


}