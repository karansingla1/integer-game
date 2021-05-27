const problemElement = document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const progressInner = document.querySelector(".progress-inner")
const endGameMessage = document.querySelector(".end-game-message")
const resetButton = document.querySelector(".reset-button")
const increaseNumbers = document.querySelector(".inc-numbers")
const decreaseNumbers = document.querySelector(".dec-numbers")
const numberOfTerms = document.querySelector(".number-of-terms")




let state = {
    score: 0,
    wrongAnswers: 0,
    maxExpLength: 4,
}

function updateProblem() {
    state.currentProblem = generateProblem()
    problemElement.innerHTML = `${state.currentProblem}`
    ourField.value = ""
    
}
updateProblem()
numberOfTerms.textContent = state.maxExpLength
ourField.focus()

function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1))
}

function generateProblem() {
    integers = []
    signs = []
    number_of_integers = generateNumber(state.maxExpLength)
    if (number_of_integers<2){
        number_of_integers=2
    }
    problem_string = ''

    //0 for +, 1 for -

    starting_sign = generateNumber(1)
    if (generateNumber(1) == 1) {
        problem_string = problem_string + ' - '
    }
    problem_string = problem_string + (generateNumber(10) + 3).toString()

    for (i = 0; i < number_of_integers - 1; i++) {

        if (generateNumber(1) == 0) {
            problem_string = problem_string + ' + '
        }
        else {
            problem_string = problem_string + ' - '
        }

        problem_string = problem_string + (generateNumber(10) + 3).toString()


    }

    return problem_string

}

ourForm.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    ourField.focus()

    let correctAnswer
    const p = state.currentProblem
    correctAnswer = eval(p)


    if (parseInt(ourField.value, 10) === correctAnswer) {
        state.score++
        pointsNeeded.innerHTML = 10 - state.score
        progressInner.style.transform = `scaleX(${state.score / 10})`
        updateProblem()
    } else {

        problemElement.classList.add("animate-wrong")
        setTimeout(() => problemElement.classList.remove("animate-wrong"), 450)
        state.wrongAnswers++
        if (state.wrongAnswers <= 2) {
            mistakesAllowed.innerHTML = 2 - state.wrongAnswers
        }


        ourField.value = ""
        ourField.focus()

    }

    check_logic()
}

function check_logic() {
    //if win
    if (state.score == 10) {
        endGameMessage.textContent = "Congrats, You won!"
        document.body.classList.add('overlay-is-open')
        setTimeout(() => resetButton.focus(), 350)
    }
    //if loss

    if (state.wrongAnswers == 3) {
        endGameMessage.textContent = "Try Again, You lost!"
        document.body.classList.add('overlay-is-open')
        setTimeout(() => resetButton.focus(), 350)
    }
}

resetButton.addEventListener("click", resetGame)

function resetGame() {
    document.body.classList.remove("overlay-is-open")
    updateProblem()
    state.score = 0
    state.wrongAnswers = 0
    pointsNeeded.textContent = 10
    mistakesAllowed.textContent = 2
    progressInner.style.transform = `scaleX(0)`
}

increaseNumbers.addEventListener("click", longerExp)
decreaseNumbers.addEventListener("click", shorterExp)

function longerExp() {
    if (state.maxExpLength < 9) {
        state.maxExpLength = state.maxExpLength + 1
        updateProblem()
        numberOfTerms.textContent = state.maxExpLength

    } else {
    
    }
}

function shorterExp() {
    if (state.maxExpLength > 2) {
        state.maxExpLength -= 1
        updateProblem()
        numberOfTerms.textContent = state.maxExpLength
    } else {

    }
}