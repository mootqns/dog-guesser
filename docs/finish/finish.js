/* Author: Matt Nguyen
Course: CPSC332
Assignment: Web Project Deliverable 2
Last Modifed: 11.04.2022 */

window.onload = function() {
    const user = document.getElementById("username");
    const saveScoreBtn = document.getElementById("save-score-btn");
    const finalScore = document.getElementById("final-score");
    const scoreForm = document.getElementById("score");
    const recentScore = localStorage.getItem("recentScore");
    const finalTime = document.getElementById("final-time");
    const recentTime = localStorage.getItem("recentTime");
    const timeForm = document.getElementById("time");

    finalScore.innerText = recentScore;
    scoreForm.value = recentScore;

    finalTime.innerText = recentTime + " seconds";
    timeForm.value = recentTime;

    user.addEventListener('keyup', () => {
        saveScoreBtn.disabled = !user.value;
    });
}