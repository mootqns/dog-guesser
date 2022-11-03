// Author: Matt Nguyen
// Course: CPSC332
// Assignment: Web Project Deliverable 2
// Last Modifed: 11.04.2022

window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded(){
    const startBtn = $("#play-btn")
    startBtn.on("click", ()=>{
        console.log("click!")
    })
    
}