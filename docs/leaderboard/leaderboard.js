/* Author: Matt Nguyen
Course: CPSC332
Assignment: Web Project Deliverable 2
Last Modifed: 11.04.2022 */

const highScoresList = document.getElementById("high-scores-list");
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

highScoresList.innerHTML = 
    highScores.map(score => {
        return `<li class="high-score>${score.name} - ${score.score}</li>`
    }).join('');