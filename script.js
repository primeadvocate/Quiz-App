const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ],
    },

    {
        question: "What is the capital of Japan?",
        answers: [
            { text: "Beijing", correct: false },
            { text: "Seoul", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Bangkok", correct: false },
        ],
    },

    {
        question: "What planet is known as the 'Red Planet'?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
            { text: "Mars", correct: true },
        ],
    },

    {
        question: "In computer programming, what does 'HTML' stand for?",
        answers: [
            { text: "Hyper Trainer Marking Language", correct: false },
            { text: "Hyper Text Managing Language", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Tool Markup Language", correct: false },
        ],
    },

    {
        question: "Which element has the highest melting point?",
        answers: [
            { text: "Iron", correct: false },
            { text: "Tungsten", correct: true },
            { text: "Carbon", correct: false },
            { text: "Titanium", correct: false },
        ],
    },

    {
        question: "What is the smallest unit of life?",
        answers: [
            { text: "Organ", correct: false },
            { text: "Tissue", correct: false },
            { text: "Atom", correct: false },
            { text: "Cell", correct: true },
        ],
    },

    {
        question: "In which year was the United Nations established?",
        answers: [
            { text: "1940", correct: false },
            { text: "1945", correct: true },
            { text: "1950", correct: false },
            { text: "1939", correct: false },
        ],
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block"
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else if(score == questions.length) {
        questionElement.innerHTML = `You have a perfect score, Kudos!`
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz();
    }
})

startQuiz()