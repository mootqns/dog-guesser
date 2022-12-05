/* Author: Matt Nguyen
Course: CPSC332
Assignment: Web Project Deliverable 2
Last Modifed: 12.05.2022 */

window.onload = function() {
    const user = document.getElementById("username");
    const saveScoreBtn = document.getElementById("save-score-btn");
    const finalScore = document.getElementById("final-score");
    const scoreForm = document.getElementById("score");
    const recentScore = localStorage.getItem("recentScore");
    const finalTime = document.getElementById("final-time");
    const recentTime = localStorage.getItem("recentTime");
    const timeForm = document.getElementById("time");

    finalScore.innerText = "score: " + recentScore;
    scoreForm.value = recentScore;

    if(recentTime > 0){
        finalTime.classList.remove('hidden');
        finalTime.innerText = "time: " + recentTime + "s";
        timeForm.value = recentTime;
    }

    user.addEventListener('keyup', () => {
        saveScoreBtn.disabled = !user.value;
    });
}