const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function loadQuestion() {
    if (currentQuestionIndex < quizQuestions.length) {
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        const question = quizQuestions[currentQuestionIndex];

        questionElement.innerText = question.question;
        optionsElement.innerHTML = '';

        question.options.forEach(option => {
            const li = document.createElement('li');
            li.innerHTML = `<input type="radio" name="option" value="${option}"> ${option}`;
            optionsElement.appendChild(li);
        });

        timeLeft = 10;
        document.getElementById('time').innerText = timeLeft;
        timer = setInterval(updateTimer, 1000);
    } else {
        endQuiz();
    }
}

function updateTimer() {
    timeLeft--;
    document.getElementById('time').innerText = timeLeft;
    if (timeLeft === 0) {
        submitAnswer();
    }
}

function submitAnswer() {
    clearInterval(timer);
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizQuestions[currentQuestionIndex].correctAnswer) {
            score++;
        }
    }
    currentQuestionIndex++;
    loadQuestion();
}

function endQuiz() {
    document.querySelector('.quiz').style.display = 'none';
    const resultElement = document.getElementById('result');
    const scoreElement = document.getElementById('score');
    const summaryElement = document.getElementById('summary');

    scoreElement.innerText = `${score} / ${quizQuestions.length}`;
    summaryElement.innerHTML = '';

    quizQuestions.forEach((question, index) => {
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${question.question} - Correct Answer: ${question.correctAnswer}`;
        summaryElement.appendChild(li);
    });

    resultElement.style.display = 'block';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.querySelector('.quiz').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    loadQuestion();
}

window.onload = loadQuestion;
