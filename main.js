//Variables
let revealedCards = 0
let card1 = null
let card2 = null
let result1 = null
let result2 = null
let movements = 0
let match = 0
let timer = false
let time = 30
let initialTime = time
let intervalId = null

let showMovements = document.getElementById('movements')
let showMatch = document.getElementById('match')
let showFinish = document.getElementById('finish')
let showTime = document.getElementById('time1')
let hurtfulMessage = document.getElementById('finish')
let finalMessage = document.getElementById('message')

let winAudio = new Audio('./sounds/win.wav')
let loseAudio = new Audio('./sounds/lose.wav')
let clickAudio = new Audio('./sounds/click.wav')
let rightAudio = new Audio('./sounds/right.wav')
let wrongAudio = new Audio('./sounds/wrong.wav')

//Random Numbers
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]
numbers = numbers.sort(()=>{return Math.random()-0.5})
console.log(numbers)

function remainingTime() {
    intervalId = setInterval(()=>{
        time--
        showTime.innerHTML = `Time: ${time} seconds`
        if (time == 0) {
            clearInterval(intervalId)
            blockCards()
        }
    },1000)
}

function blockCards() {
    for (let i = 0; i <= 15; i++) {
    let blockedCard = document.getElementById(i)
    blockedCard.innerHTML = `<img src="./images/${numbers[i]}.png" alt="">`
    blockedCard.disabled = true
    hurtfulMessage.innerHTML = `You ran out of time`
    loseAudio.play()
    }
}

//Main Function
function reveal(id) {
    if (timer == false) {
       remainingTime()
       timer = true 
    }
    revealedCards++
    console.log(revealedCards)

if (revealedCards == 1) {
    //Show First Number
    card1 = document.getElementById(id)
    result1 = numbers[id]
    card1.innerHTML = `<img src="./images/${result1}.png" alt="">`
    clickAudio.play()
    
    //Disable First Button
    card1.disabled = true
} else if(revealedCards == 2) {
    //Show Second Number
    card2 = document.getElementById(id)
    result2 = numbers[id]
    card2.innerHTML = `<img src="./images/${result2}.png" alt="">`

    //Disable Second Button
    card2.disabled = true

    //Movements
    movements++
    showMovements.innerHTML = `Movements: ${movements}`
    
    if(result1 == result2) {
        revealedCards = 0
        match++
        showMatch.innerHTML = `Match: ${match}`
        rightAudio.play()

        if (match == 8) {
            clearInterval(intervalId)
            showFinish.innerHTML = `Congratulations!!!
            Time: ${initialTime - time} seconds`
            winAudio.play()
            
        }    
    } else {
        wrongAudio.play()
        setTimeout(()=>{
            card1.innerHTML = ' '
            card2.innerHTML = ' '
            card1.disabled = false
            card2.disabled = false
            revealedCards = 0
            
        },700)
    }    
}
} 