const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Which of these is English?",
        choice1:"Richard",
        choice2:"Rishar",
        choice3:"Ricardo",
        choice4:"Rikerd",
        answer: 1
    },

    {
        question: "How many months have 28 days?",
        choice1:"one",
        choice2:"twelve",
        choice3:"three and a half",
        choice4:"none",
        answer: 2
    },

    {
        question: "Spider Girl?",
        choice1:"N'kitongo",
        choice2:"??-'/",
        choice3:"third answer",
        choice4:"Wub-Wub-Wub",
        answer: 1
    }

];

const CORRECT_BONUS = 10;
const MAX_Questions = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_Questions){
        //go to finaly
        return window.location.assign("../FAQ.html")
    }

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_Questions}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"; 

        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
          getNewQuestion();
        }, 1000);

    })
})

incrementScore = num =>{
    score +=num;
    scoreText.innerText = score;
}

startGame();