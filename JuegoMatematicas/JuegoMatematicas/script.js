const startBtn = document.getElementById("start-btn");
const questionEl = document.getElementById("question");
const optionBtns = document.querySelectorAll(".option-btn");
const feedbackEl = document.getElementById("feedback");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener("click", startGame);
optionBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => checkAnswer(index));
});

function startGame() {
  score = 0;
  currentQuestionIndex = 0;
  questions = generateQuestions(5);
  startBtn.style.display = "none";
  feedbackEl.textContent = "";
  showQuestion();
}

function generateQuestions(num) {
  const operations = ["+", "-", "×", "÷"];
  const generated = [];
  for (let i = 0; i < num; i++) {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 20) + 1;
    const op = operations[Math.floor(Math.random() * operations.length)];
    let question = `${a} ${op} ${b}`;
    let correct;
    switch (op) {
      case "+": correct = a + b; break;
      case "-": correct = a - b; break;
      case "×": correct = a * b; break;
      case "÷": correct = parseFloat((a / b).toFixed(1)); break;
    }

    const options = shuffle([correct,
      correct + 1,
      correct - 1,
      correct + Math.floor(Math.random() * 5) + 2
    ]);

    generated.push({ question, correct, options });
  }
  return generated;
}

function showQuestion() {
  const current = questions[currentQuestionIndex];
  questionEl.textContent = `Pregunta ${currentQuestionIndex + 1}: ¿Cuánto es ${current.question}?`;
  optionBtns.forEach((btn, i) => {
    btn.textContent = current.options[i];
    btn.disabled = false;
  });
  feedbackEl.textContent = "";
}

function checkAnswer(index) {
  const current = questions[currentQuestionIndex];
  const selected = parseFloat(optionBtns[index].textContent);

  if (selected === current.correct) {
    feedbackEl.textContent = "✅ ¡Correcto!";
    score += 10;
  } else {
    feedbackEl.textContent = `❌ Incorrecto. Era ${current.correct}`;
  }

  optionBtns.forEach(btn => btn.disabled = true);
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, 1500);
}

function endGame() {
  questionEl.textContent = `Juego finalizado. Tu puntuación fue: ${score} puntos.`;
  feedbackEl.textContent = "¡Puedes volver a intentarlo! 🚀";
  startBtn.textContent = "Reiniciar";
  startBtn.style.display = "inline-block";
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
