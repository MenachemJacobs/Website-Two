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
        question: "Which NBA player has won the most championships?",
        choice1:"Michael B. Jordan",
        choice2:"Bill Russel",
        choice3:"Larry Bird",
        choice4:"Jerry Williams",
        answer: 2
    },

    {
        question: "Which MLB player has gotten the most hits?",
        choice1:"Ted Williams",
        choice2:"Tye Cobb",
        choice3:"Pete Rose",
        choice4:"Peter Griffen",
        answer: 3
    },

    {
        question: "Which team won the 1996 Stanley Cup?",
        choice1:"The Redwings",
        choice2:"The Stars",
        choice3:"The Devils",
        choice4:"The Avalanche",
        answer: 4
    },

    {
        question: "Where is my meatball?",
        choice1:"On top of spaghetti",
        choice2:"I don't eat meatball",
        choice3:"I think the dog got it",
        choice4:"Check your luggage",
        answer: 4
    },

    {
        question: "Which NHL player has scored the most powerplay goals?",
        choice1:"Alex Ovechkin",
        choice2:"Bret Hull",
        choice3:"Weather Vane Greatski",
        choice4:"Tim Curry",
        answer: 1
    },

    {
        question: "What shape is a football?",
        choice1:"Round",
        choice2:"Oblong",
        choice3:"Foot Shaped",
        choice4:"Ball Shaped",
        answer: 4
    },

    {
        question: "Which player won the NFL MVP ASW in 2016?",
        choice1:"Tom Brady",
        choice2:"Aaron Rodgers",
        choice3:"Matt Ryan",
        choice4:"Matthew Broderick",
        answer: 3
    },

    {
        question: "Who played The Mighty Ducks for the championship game in '92?",
        choice1:"The Beavers",
        choice2:"The Hawks",
        choice3:"The Hornets",
        choice4:"The Angry Ducks",
        answer: 2
    },

];

const CORRECT_BONUS = 10;
const MAX_Questions = 5;

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