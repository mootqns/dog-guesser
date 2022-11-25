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

    finalScore.innerText = recentScore;
    scoreForm.value = recentScore;

    user.addEventListener('keyup', () => {
        saveScoreBtn.disabled = !user.value;
    });
}