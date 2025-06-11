document.addEventListener("DOMContentLoaded", () => {
  const startPage = document.querySelector(".startPage");
  const questionnairePage = document.querySelector(".questionnairePage");
  const resultPage = document.querySelector(".resultPage");

  const startBtn = document.querySelector("#startGame");
  const restartBtn = document.querySelector("#restartGame");

  const questionsCount = document.querySelector("#question-count");
  const correctAnswersCount = document.querySelector("#correct-answers-count");

  const questionDisplay = document.querySelector(".questionDisplay");

  let questionIndex = 0;
  let correctAnswers = 0;

  const quiz = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "Madrid", "Berlin", "Rome"],
      result: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Earth", "Mars", "Jupiter", "Venus"],
      result: "Mars",
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      choices: [
        "Charles Dickens",
        "Mark Twain",
        "William Shakespeare",
        "Jane Austen",
      ],
      result: "William Shakespeare",
    },
    {
      question: "What is the largest mammal in the world?",
      choices: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
      result: "Blue Whale",
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      choices: ["Oxygen", "Gold", "Iron", "Osmium"],
      result: "Oxygen",
    },
  ];

  startBtn.addEventListener("click", () => {
    startPage.classList.add("hidden");
    questionnairePage.classList.remove("hidden");
    resultPage.classList.add("hidden");
    questionIndex = 0;
    correctAnswers = 0;
    displayQuestion();
  });

  restartBtn.addEventListener("click", () => {
    resultPage.classList.add("hidden");
    startPage.classList.remove("hidden");
  });

  function displayQuestion() {
    questionDisplay.innerHTML = ""; // Clear previous question/choices

    if (questionIndex >= quiz.length) {
      displayResult();
      return;
    }

    const currentQ = quiz[questionIndex];

    // Display question
    const questionEl = document.createElement("div");
    questionEl.textContent = currentQ.question;
    questionEl.classList.add("questionDisplay");
    questionDisplay.appendChild(questionEl);

    // Display choices
    currentQ.choices.forEach((choiceText) => {
      const choiceEl = document.createElement("div");
      choiceEl.textContent = choiceText;
      choiceEl.classList.add("choice");

      choiceEl.addEventListener("click", () => {
        handleChoice(choiceEl, currentQ.result);
      });

      questionDisplay.appendChild(choiceEl);
    });

    // Update remaining question count
    questionsCount.textContent = quiz.length - questionIndex;
  }

  function handleChoice(choiceEl, correctAnswer) {
    const userAnswer = choiceEl.textContent;

    if (userAnswer === correctAnswer) {
      choiceEl.classList.add("correct");
      correctAnswers++;
    } else {
      choiceEl.classList.add("wrong");

      // Highlight correct choice
      document.querySelectorAll(".choice").forEach((el) => {
        if (el.textContent === correctAnswer) {
          el.classList.add("correct");
        }
      });
    }

    // Disable all choices after answering
    document.querySelectorAll(".choice").forEach((el) => {
      el.style.pointerEvents = "none";
    });

    // Show next question after delay
    setTimeout(() => {
      questionIndex++;
      displayQuestion();
    }, 1000);
  }

  function displayResult() {
    questionnairePage.classList.add("hidden");
    resultPage.classList.remove("hidden");
    correctAnswersCount.textContent = correctAnswers;
  }
});
