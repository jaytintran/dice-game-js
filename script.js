'use strict';

const player1 = document.querySelector(".player--0")
const player2 = document.querySelector(".player--1")

const totalScoreP1El = document.getElementById("score--0")
const totalScoreP2El = document.getElementById("score--1")
const currentScoreP1El = document.getElementById("current--0")
const currentScoreP2El = document.getElementById("current--1")

const theDice = document.getElementById("dice")
const theNewBtn = document.querySelector(".btn--new")
const theRollBtn = document.querySelector(".btn--roll")
const theHoldBtn = document.querySelector(".btn--hold")

theDice.classList.add("hidden")

let currentPlayer = 0
let currentScore = 0

let scores = [0, 0]
let playing = true

// SWITCH THE PLAYER
function switchPlayer () {
    document.getElementById(`current--${currentPlayer}`).textContent = 0
    currentScore = 0
    currentPlayer = currentPlayer === 0 ? 1 : 0
    player1.classList.toggle('player--active')
    player2.classList.toggle('player--active')
}

// ROLL!!!
function rollTheDice () {
    // Generate a random number
    const diceNum = Math.floor(Math.random() * 6) + 1

    // Display the dice
    theDice.setAttribute("src", `./dice-${diceNum}.png`)
    theDice.classList.remove("hidden")

    // Else add the score for the current player
    switch (currentPlayer) {
        case 0:
            // Check if the result is one
            if (diceNum == 1) {
                switchPlayer()
            } 
            else {
                currentScore += diceNum
                currentScoreP1El.textContent = currentScore    
            }
            break
        case 1:
            if (diceNum == 1) {
                switchPlayer()
            } 
            else {
                currentScore += diceNum
                currentScoreP2El.textContent = currentScore      
            }
            break
    }
}

// ROLL CLICK!!!
theRollBtn.addEventListener("click", () => {
    if (playing) {
        rollTheDice()
    }
})

// HOLD!!!
theHoldBtn.addEventListener('click', () => {
    if (playing) {
        // Which player pressed this button? The Add the current score to their total score
        scores[currentPlayer] += currentScore
        // Then update the HTML - The total score display
        document.getElementById(`score--${currentPlayer}`).textContent = scores[currentPlayer]
        
        // If someone won
        if (scores[currentPlayer] >= 10) {
            // Finish the game
            playing = false
            theDice.classList.add("hidden")
            document.querySelector(`.player--${currentPlayer}`).classList.add("player--winner")
            document.querySelector(`.player--${currentPlayer}`).classList.remove("player--active")
        } else {
            // Switch to the next player
            switchPlayer()
        }
    }
})

// RESET!!!
theNewBtn.addEventListener('click', () => {
    scores = [0, 0]
    playing = true
    currentScore = 0
    currentScoreP1El.innerText = 0
    currentScoreP2El.innerText = 0
    totalScoreP1El.innerText = 0
    totalScoreP2El.innerText = 0
    player1.classList.add("player--active")
    player2.classList.remove("player--active")
    player1.classList.remove("player--winner")
    player2.classList.remove("player--winner")
    theDice.classList.add('hidden')
})