// Sports Quiz Questions
const sportsQuestions = [
    { question: "What is the most popular sport in the world?", options: ["Soccer", "Basketball", "Cricket", "Tennis"], answer: 0 },
    // Add more questions here
];

let currentQuestionIndex = 0;
let timer;

function displayQuestion() {
    if (currentQuestionIndex < sportsQuestions.length) {
        const questionElement = document.getElementById("question");
        questionElement.textContent = sportsQuestions[currentQuestionIndex].question;

        // Display answer options and handle user selection
        // ...

        // Start the timer for this question
        startTimer(30);
    } else {
        // Quiz is over
        // ...
    }
}

function startTimer(seconds) {
    const timerElement = document.getElementById("timer");
    timer = seconds;
    timerElement.textContent = timer;

    const countdown = setInterval(function() {
        timer--;
        timerElement.textContent = timer;

        if (timer <= 0) {
            clearInterval(countdown);
            // Handle time's up
            // ...
        }
    }, 1000);
}

// Call displayQuestion to start the quiz
displayQuestion();
