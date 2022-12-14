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
        question: "What is the first Pokémon?",
        choice1:"Mew",
        choice2:"Arceus",
        choice3:"Rhydon",
        choice4:"Bulbasaur",
        answer: 3
    },

    {
        question: "What was the first set of games released?",
        choice1:"Blue & Yellow",
        choice2:"Red & Green",
        choice3:"Blue & Green",
        choice4:"Red & Blue",
        answer: 2
    },

    {
        question: "Which of these Professors in not in any game?",
        choice1:"Professor Willow",
        choice2:"Professor Mirror",
        choice3:"Professor Ivy",
        choice4:"Professor Magnolia",
        answer: 3
    },

    {
        question: "How many Pokémon are in the Pokédex (as of 12/11/2022)?",
        choice1:"151",
        choice2:"1051",
        choice3:"1000",
        choice4:"1008",
        answer: 4
    },

    {
        question: "What is the only unevolved starter with a unique BST?",
        choice1:"Fennekin",
        choice2:"Charmander",
        choice3:"Bulbasaur",
        choice4:"Froakie",
        answer: 1
    },

    {
        question: "What does Pokérus effect?",
        choice1:"Eevees",
        choice2:"IVs",
        choice3:"Intravenous Fluids",
        choice4:"EVs",
        answer: 4
    },

    {
        question: "Which of these Pokémon has a past form?",
        choice1:"Amoonguss",
        choice2:"Genesect",
        choice3:"Electrode",
        choice4:"Relicanth",
        answer: 3
    },

    {
        question: "Where is Bouffalant located in Pokémon GO?",
        choice1:"Helena, Montana",
        choice2:"Los Angeles, California",
        choice3:"Chicago, Illinois",
        choice4:"New York City, New York",
        answer: 4
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
    console.log(questionCounter)
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
        selectedChoice.parentElement.classList.remove(classToApply);
          getNewQuestion();
        }, 1000);

    })
})

incrementScore = num =>{
    score +=num;
    scoreText.innerText = score;
}

startGame();