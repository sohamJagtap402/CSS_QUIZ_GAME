// Define the quiz questions and answers
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Madrid", "Berlin", "Paris", "Rome"],
        correctAnswer: 2, // Index of the correct option (Paris)
    },
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Mars", "Jupiter", "Venus", "Saturn"],
        correctAnswer: 0, // Index of the correct option (Mars)
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
        correctAnswer: 2, // Index of the correct option (Blue Whale)
    },
    {
        question: "How many continents are there in the world?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2, // Index of the correct option (7)
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: 1, // Index of the correct option (Carbon Dioxide)
    },
];

const quizForm = document.getElementById("quiz-form");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const quizResults = document.getElementById("quiz-results");
const viewResultButton = document.getElementById("view-result-button");

const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const submitButton = document.getElementById("submit-button");

prevButton.addEventListener("click", () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();

        if (userAnswers[currentQuestion] !== undefined) {
            // If the user has previously selected an answer for this question, re-select it
            selectOption(userAnswers[currentQuestion]);
        }
    } else {
        alert("You are at the first question.");
    }

});

nextButton.addEventListener("click", () => {
    if (userAnswers[currentQuestion] !== undefined) {
        if (currentQuestion < quizData.length - 1) {
            currentQuestion++;
            loadQuestion();
            // Disable the "Next" button after loading the next question
            nextButton.classList.add("disabled");
        } else {
            // Show the "Submit" button on the last question
            nextButton.style.display = "none";
            submitButton.style.display = "inline-block";
        }
    } else {
        alert("Please select an answer before proceeding.");
    }
});

submitButton.addEventListener("click", () => {
    const selectedOption = document.querySelector('.option.selected');
    if (selectedOption) {
        // Store the selected option in the userAnswers array
        userAnswers[currentQuestion] = parseInt(selectedOption.getAttribute("data-index"));
        showResults();
    } else {
        alert("Please select an answer before submitting.");
    }
});

let currentQuestion = 0;
let userAnswers = [];

function loadQuestion() {
    if (currentQuestion < quizData.length) {
        const question = quizData[currentQuestion];
        questionContainer.innerHTML = `
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option" onclick="selectOption(${index})" id="option${index}">
                        ${option}
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        showResults();
    }
}

// function loadQuestion() {
//     if (currentQuestion < quizData.length) {
//         const question = quizData[currentQuestion];
//         questionContainer.innerHTML = `
//             <h3>${question.question}</h3>
//                 ${question.options.map((option, index) => `
//                     <li>
//                         <input type="radio" name="answer" value="${index}" id="option${index}">
//                         <label for="option${index}">${option}</label>
//                     </li>
//                 `).join('')}
//         `;
//     } else {
//         showResults();
//     }
// }
function selectOption(index) {
    const selectedOption = document.getElementById(`option${index}`);
    if (!selectedOption.classList.contains("selected")) {
        // Remove the "selected" class from all options
        const options = document.querySelectorAll(".option");
        options.forEach((option) => option.classList.remove("selected"));

        // Add the "selected" class to the clicked option
        selectedOption.classList.add("selected");

        // Enable the "Next" button
        document.getElementById("next-button").classList.remove("disabled");

        // Store the selected option in the userAnswers array
        userAnswers[currentQuestion] = index;
    }
}

function showResults() {
    quizForm.style.display = "none";
    resultContainer.style.display = "block";

    let correctCount = 0;
    for (let i = 0; i < quizData.length; i++) {
        if (userAnswers[i] === quizData[i].correctAnswer) {
            correctCount++;
        }
    }

    quizResults.innerHTML = `
        <p>Correct Answers: ${correctCount}</p>
        <p>Incorrect Answers: ${quizData.length - correctCount}</p>
    `;
}

quizForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers.push(parseInt(selectedOption.value));
        currentQuestion++;
        loadQuestion();
    }
});

viewResultButton.addEventListener("click", () => {
    // Show the user's answers for review
    const review = quizData.map((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        return `
            <div>
                <p>${index + 1}. ${question.question}</p>
                <p>Your Answer: ${question.options[userAnswer]}</p>
                <p>${isCorrect ? "Correct" : "Incorrect"}</p>
                <br>
            </div>
        `;
    });
    quizResults.innerHTML = review.join('');
});

loadQuestion();


