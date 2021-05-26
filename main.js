const problemElement = document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const progressInner = document.querySelector(".progress-inner")
const endGameMessage  = document.querySelector(".end-game-message")
const resetButton = document.querySelector(".reset-button")

let state = {
    score:0,
    wrongAnswers:0
}

function updateProblem(){
    state.currentProblem = generateProblem()
    problemElement.innerHTML = `${state.currentProblem.number1} ${state.currentProblem.operator} ${state.currentProblem.number2}`
    ourField.value = ""
    ourField.focus()
}
updateProblem()

function generateNumber(max){
    return Math.floor(Math.random()*(max+1))
}

function generateProblem(){
    return {
        number1: generateNumber(10),
        number2: generateNumber(10),
        operator: ['+',"-",'x'][generateNumber(2)]
    }
}

ourForm.addEventListener("submit", handleSubmit)

function handleSubmit(e){
    e.preventDefault()

    let correctAnswer
    const  p = state.currentProblem
    if (p.operator == '+') correctAnswer = p.number1 + p.number2
    if (p.operator == '-') correctAnswer = p.number1 - p.number2
    if (p.operator == 'x') correctAnswer = p.number1 * p.number2


    if(parseInt(ourField.value,10) === correctAnswer){
        state.score++
        pointsNeeded.innerHTML = 10-state.score
        progressInner.style.transform = `scaleX(${state.score/10})`
        updateProblem()
    } else {

        problemElement.classList.add("animate-wrong")
        setTimeout(()=>problemElement.classList.remove("animate-wrong"),1000)
        state.wrongAnswers++
        if (state.wrongAnswers<=2){
            mistakesAllowed.innerHTML = 2-state.wrongAnswers
        }
        

        ourField.value = ""
        ourField.focus()

        }

    check_logic()
    }

function check_logic(){
    //if win
    if(state.score == 10){
        endGameMessage.textContent = "Congrats, You won!"
        document.body.classList.add('overlay-is-open')
        setTimeout(()=>resetButton.focus(),350)
    }
    //if loss

    if(state.wrongAnswers == 3){
        endGameMessage.textContent = "Try Again, You lost!"
        document.body.classList.add('overlay-is-open')
        setTimeout(()=>resetButton.focus(),350)    
    }  
}

resetButton.addEventListener("click",resetGame)

function resetGame(){
    document.body.classList.remove("overlay-is-open")
    updateProblem()
    state.score = 0
    state.wrongAnswers = 0
    pointsNeeded.textContent = 10
    mistakesAllowed.textContent = 2
    progressInner.style.transform = `scaleX(0)`
}