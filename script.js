const questions = [{
        question: "1. What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Tech Machine Learning", correct: false },
            { text: "Hyperlink Transfer Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
    {
        question: "2. Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "JQuery", correct: false },
            { text: "CSS", correct: true },
            { text: "XML", correct: false }
        ]
    },
    {
        question: "3. Which language runs in the browser?",
        answers: [
            { text: "Python", correct: false },
            { text: "Java", correct: false },
            { text: "JavaScript", correct: true },
            { text: "C++", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

function showQuestion() {

    const currentQuestion = questions[currentQuestionIndex];

    questionElement.innerText = currentQuestion.question;

    answersElement.innerHTML = "";

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer");

        button.onclick = () => selectAnswer(answer);

        answersElement.appendChild(button);

    });

}

function selectAnswer(answer) {

    userAnswers.push(answer.text);

    if (answer.correct) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }

}

function showResults() {

    questionElement.innerText = `You scored ${score} out of ${questions.length}`;

    answersElement.innerHTML = "";

    questions.forEach((q, index) => {

        const correctAnswer = q.answers.find(a => a.correct).text;
        const userAnswer = userAnswers[index];

        const result = document.createElement("div");

        result.innerHTML = `
<p><strong>Question:</strong> ${q.question}</p>
<p>Your Answer: ${userAnswer}</p>
<p>Correct Answer: ${correctAnswer}</p>
<hr>
`;

        answersElement.appendChild(result);

    });

    nextBtn.innerText = "Restart Quiz";

    nextBtn.onclick = () => {
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        showQuestion();
    }

}

showQuestion();