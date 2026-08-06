// =========================================
// GWIST TRIVIA GAME
// PART 1
// =========================================

// ---------- Screens ----------

const startScreen = document.getElementById("start-screen");
const categoryScreen = document.getElementById("category-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");

// ---------- Buttons ----------

const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again");
const categoryButtons = document.querySelectorAll(".category-btn");

// ---------- Quiz Elements ----------

const questionCounter = document.getElementById("question-counter");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const scoreDisplay = document.getElementById("score");
const finalScore = document.getElementById("final-score");

// ---------- Variables ----------

let score = 0;
let currentQuestion = 0;
let selectedCategory = "";

let gameQuestions = [];

let usedQuestions = {};

// =========================================
// QUESTION BANK
// =========================================

const questionBank = {

    "Women in Tech": womenInTech,

    "Women Nobel Prize Winners": womenNobel,

    "AI & Emerging Technology": aiTechnology,

    "Space & STEM": spaceStem,

    "Women Who Changed the World": changedWorld,

    "Pop Culture": popCulture,

    "Trivia Mix": triviaMix,

    "Scientific Innovations by Women": scienceWomen

};

// =========================================
// START BUTTON
// =========================================

startBtn.addEventListener("click", () => {

    startScreen.classList.remove("active");

    categoryScreen.classList.add("active");

});

// =========================================
// CATEGORY BUTTONS
// =========================================

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        selectedCategory = button.dataset.category;

        startQuiz(selectedCategory);

    });

});

// =========================================
// START QUIZ
// =========================================

function startQuiz(category) {

    categoryScreen.classList.remove("active");
    endScreen.classList.remove("active");
    quizScreen.classList.add("active");

    score = 0;
    currentQuestion = 0;

    scoreDisplay.textContent = "Score: 0";

    const pool = questionBank[category];

    if (!usedQuestions[category]) {
        usedQuestions[category] = [];
    }

    // Reset after all questions in this category have been used
    if (usedQuestions[category].length >= pool.length) {
        usedQuestions[category] = [];
    }

    // Get remaining unused question indexes
    let availableIndexes = [];

    for (let i = 0; i < pool.length; i++) {
        if (!usedQuestions[category].includes(i)) {
            availableIndexes.push(i);
        }
    }

    shuffleArray(availableIndexes);

    const numberOfQuestions = Math.min(3, availableIndexes.length);

    gameQuestions = [];

    for (let i = 0; i < numberOfQuestions; i++) {

        const index = availableIndexes[i];

        gameQuestions.push(pool[index]);

        usedQuestions[category].push(index);

    }

    loadQuestion();

}

// =========================================
// LOAD QUESTION
// =========================================

function loadQuestion() {

    answersElement.innerHTML = "";

    const q = gameQuestions[currentQuestion];

    questionCounter.textContent =
        `Question ${currentQuestion + 1} of ${gameQuestions.length}`;

    questionElement.textContent = q.question;

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.addEventListener("click", function () {

            checkAnswer(index);

        });

        answersElement.appendChild(button);

    });

}

// =========================================
// CHECK ANSWER
// =========================================

function checkAnswer(selectedIndex) {

    const q = gameQuestions[currentQuestion];

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(button => {

        button.disabled = true;

    });

    buttons[q.correct].classList.add("correct");

    if (selectedIndex !== q.correct) {

        buttons[selectedIndex].classList.add("wrong");

    } else {

        score++;

        scoreDisplay.textContent = "Score: " + score;

    }

    setTimeout(nextQuestion, 3000);

}

// =========================================
// PART 3
// NEXT QUESTION
// =========================================

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < gameQuestions.length) {

        loadQuestion();

    } else {

        showResults();

    }

}


// =========================================
// SHOW RESULTS
// =========================================

function showResults() {

    quizScreen.classList.remove("active");

    endScreen.classList.add("active");

    finalScore.textContent =
        `You scored ${score} out of ${gameQuestions.length}`;

}


// =========================================
// PLAY AGAIN
// =========================================

playAgainBtn.addEventListener("click", () => {

    endScreen.classList.remove("active");

    categoryScreen.classList.add("active");

    score = 0;

    currentQuestion = 0;

    gameQuestions = [];

});


// =========================================
// SHUFFLE ARRAY
// =========================================

function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

    return array;

}