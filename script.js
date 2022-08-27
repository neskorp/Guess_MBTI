const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const imageElement = document.getElementById('mainImage')
const scoreElement = document.getElementById('score')

let shuffledQuestions, currentQuestionIndex
let score
let current_correct

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    score = 0
    scoreElement.innerText ="Score: " + score
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    imageElement.src = question.img_link
    questionElement.innerText = question.name
    current_correct = question.correct_answer

    types_array.types.forEach(type => {
        const button = document.createElement('button')
        button.innerText = type.text

        button.classList.add('btn')
        if (type.text === current_correct) {
            button.dataset.correct = true
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide') 
    while (answerButtonsElement.firstChild)
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    if (correct) {
        score++
        scoreElement.innerText ="Score: " + score
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        name: 'Jim_Carrey',
        img_link: "./images/Jim_Carrey.png",
        correct_answer: 'ENFP',
    },
    {
        name: 'Albert Einstein',
        img_link: "./images/Einstein.png",
        correct_answer: 'INTP'
    },    
    {
        name: 'Lady Gaga',
        img_link: "./images/Lady_Gaga.jpg",
        correct_answer: 'ISFP',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },    
    {
        name: 'Emma Watson',
        img_link: "./images/Emma_Watson.jpg",
        correct_answer: 'ESTJ',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    }
]
 
let types_array = {
    types: [
        { text: 'ISTJ'},
        { text: 'ESTJ'},
        { text: 'ISFJ'},
        { text: 'ESFJ'},
        { text: 'ESFP'},
        { text: 'ISFP'},
        { text: 'ESTP'},
        { text: 'ISTP'},
        { text: 'INFJ'},
        { text: 'ENFJ'},
        { text: 'INFP'},
        { text: 'ENFP'},
        { text: 'INTP'},
        { text: 'ENTP'},
        { text: 'INTJ'},
        { text: 'ENTJ'}
    ]
}

 