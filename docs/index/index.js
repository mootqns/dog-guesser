// Author: Matt Nguyen
// Course: CPSC332
// Assignment: Web Project Deliverable 2
// Last Modifed: 11.04.2022

// --- script for index.html ---

window.onload = function() {
    const startBtn = document.getElementById("play-btn");
    const leaderboardBtn = document.getElementById("leaderboard-btn");
    const helpBtn = document.getElementById("help-btn");


    // start-game button active
    startBtn.addEventListener("click", ()=>{
        window.location.assign('../game/game.html');
    });

    // leaderboard button active
    leaderboardBtn.addEventListener("click", ()=>{
        window.location.assign('/leaderboard');
    });

    // help button active
    helpBtn.addEventListener("click", ()=>{
        window.location.assign('/help.html'); 
    });
}