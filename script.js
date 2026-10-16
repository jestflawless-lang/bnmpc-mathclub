// BNPMC Math Club demo interactions. Edit the arrays below to update sample content.
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Add or edit verified winners here. The current entries are examples only.
const winners = [
  {event:"Mathletics 8", category:"General", first:"Shadman Kabir", second:"Redoyanul Haque", third:"Afia Nawar Ava"},
  {event:"Mathletics 9", category:"General", first:"Redoyanul Haque", second:"Reduan Talukder", third:"Shadman Kabir"},
  {event:"Mathletics 10", category:"General", first:"Shadman Kabir", second:"Wasik Fida Chowdhury", third:"Fahmida Alam Bithi"},
  {event:"Mathletics 11", category:"General", first:"Syed Farhan Islam Nehan", second:"Alif Shahin Islam", third:"Farah Sharmin"},
  {event:"Mathletics 12", category:"College", first:"Reduan Talukder", second:"Farah Sharmin", third:"Shadman Kabir"},
  {event:"Mathletics 12", category:"School", first:"Md. Isfar Farhan", second:"Argha Sarkar", third:"—"},
  {event:"Mathletics 13", category:"College", first:"Alif Shahin Islam", second:"Wasik Fida Chowdhury", third:"Binita Paul"},
  {event:"Mathletics 13", category:"School", first:"Rushama Nourozi Aroshi", second:"—", third:"—"},
  {event:"Mathletics 14", category:"College", first:"Alif Shahin Islam", second:"Farah Sharmin", third:"—"},
  {event:"Mathletics 14", category:"School", first:"Argha Sarkar", second:"Farhan Toha", third:"Afnan Alam"},
  {event:"Mathletics 15", category:"College", first:"Farah Sharmin", second:"Syed Farhan Islam Nehan", third:"—"},
  {event:"Mathletics 15", category:"School", first:"Argha Sarkar", second:"Afnan Alam", third:"—"},
  {event:"Mathletics 16", category:"College", first:"Wasik Fida Chowdhury", second:"Muhtadi Muhib", third:"MD Yousuf"},
  {event:"Mathletics 16", category:"School", first:"Afnan Alam", second:"Rushama Nourozi Aroshi", third:"—"},
  {event:"Mathletics 17", category:"College", first:"Afia Siddique Ope", second:"—", third:"—"},
  {event:"Mathletics 17", category:"School", first:"Farhan Toha", second:"—", third:"—"},
  {event:"Mathletics 18", category:"College", first:"Alif Shahin Islam", second:"Farah Sharmin", third:"Wasik Fida Chowdhury"},
  {event:"Mathletics 19", category:"College", first:"Alif Shahin Islam", second:"—", third:"—"},
  {event:"Mathletics 19", category:"School", first:"Afnan Alam", second:"—", third:"—"},
  {event:"No. 20", category:"College", first:"Faisal Habib", second:"Arhan Karim", third:"Alif S. Islam & Farah Sharmin"},
  {event:"No. 20.5", category:"College", first:"Rukaiya Tabassum Jahin", second:"Alif Shahin Islam", third:"—"},
  {event:"No. 21", category:"College", first:"Raika Hasan", second:"—", third:"—"},
  {event:"No. 21", category:"School", first:"Prithwiraj Nath", second:"—", third:"—"},
  {event:"No. 22", category:"College", first:"S K Shoeb Hossain", second:"Fahim Tazwar Sneho", third:"Alif Shahin Islam"},
  {event:"No. 22", category:"School", first:"M. Shabbir & M. Shahan", second:"Prithwiraj Nath", third:"—"},
  {event:"No. 23", category:"College", first:"Raika Hasan", second:"Alif Islam & Irat Jahan", third:"Fahim Tawser Sneho"}
];
const winnerRows = document.querySelector("#winnerRows");
const winnerSearch = document.querySelector("#winnerSearch");
const winnerCategory = document.querySelector("#winnerCategory");
function renderWinners() {
  const query = winnerSearch.value.trim().toLowerCase();
  const category = winnerCategory.value;
  const filtered = winners.filter(w => (category === "all" || w.category === category) &&
    Object.values(w).some(value => value.toLowerCase().includes(query)));
  winnerRows.innerHTML = filtered.length ? filtered.map(w => `<tr><td>${escapeHTML(w.event)}</td><td>${escapeHTML(w.category)}</td><td>${escapeHTML(w.first)}</td><td>${escapeHTML(w.second)}</td><td>${escapeHTML(w.third)}</td></tr>`).join("") :
    '<tr><td colspan="5">No matching results. Try another search.</td></tr>';
}
function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
winnerSearch.addEventListener("input", renderWinners);
winnerCategory.addEventListener("change", renderWinners);
renderWinners();

// Interactive Math Sprint: new randomized questions each round.
const quiz = document.querySelector("#quiz");
const quizResult = document.querySelector("#quizResult");
const timerDisplay = document.querySelector("#timer");
const checkButton = document.querySelector("#checkAnswers");
const resetButton = document.querySelector("#resetQuiz");
let gameQuestions = [];
let gameSeconds = 90;
let gameTimer = null;
let gameFinished = false;

function makeQuestion() {
  const ops = ["+", "−", "×"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a = Math.floor(Math.random() * 12) + 2;
  let b = Math.floor(Math.random() * 12) + 2;
  let answer;
  if (op === "+") answer = a + b;
  else if (op === "−") { if (b > a) [a,b] = [b,a]; answer = a-b; }
  else answer = a*b;
  const choices = new Set([answer]);
  while (choices.size < 4) {
    const offset = Math.floor(Math.random()*13)-6 || 3;
    choices.add(Math.max(0, answer + offset));
  }
  return {q:`${a} ${op} ${b} = ?`, answer:String(answer), options:[...choices].sort(()=>Math.random()-.5).map(String)};
}
function stopGame() {
  clearInterval(gameTimer);
  gameTimer = null;
  gameFinished = true;
  checkButton.disabled = true;
}
function updateGameTimer() {
  timerDisplay.textContent = `${String(Math.floor(gameSeconds/60)).padStart(2,"0")}:${String(gameSeconds%60).padStart(2,"0")}`;
}
function startGame() {
  clearInterval(gameTimer);
  gameQuestions = Array.from({length:8}, makeQuestion);
  gameSeconds = 90;
  gameFinished = false;
  checkButton.disabled = false;
  quizResult.textContent = "";
  quiz.innerHTML = gameQuestions.map((item,index) =>
    `<div class="question"><p>${index+1}. ${escapeHTML(item.q)}</p><div class="answer-options">${item.options.map(option =>
      `<label><input type="radio" name="q${index}" value="${escapeHTML(option)}"> ${escapeHTML(option)}</label>`
    ).join("")}</div></div>`
  ).join("");
  updateGameTimer();
  gameTimer = setInterval(() => {
    if (gameSeconds > 0) { gameSeconds--; updateGameTimer(); }
    if (gameSeconds <= 0) {
      stopGame();
      quizResult.textContent = "Time is up! Start a new round to try again.";
    }
  },1000);
}
checkButton.addEventListener("click", () => {
  if (gameFinished) return;
  let score = 0;
  gameQuestions.forEach((item,index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === item.answer) score++;
  });
  stopGame();
  quizResult.textContent = `Your score: ${score}/${gameQuestions.length}. ${score === gameQuestions.length ? "Perfect round — brilliant!" : score >= 6 ? "Great work! Try another round to beat your score." : "Keep practising — a new set of questions is waiting."}`;
});
resetButton.addEventListener("click", startGame);
startGame();

// Student applications are handled by the embedded Google Form in index.html.
document.querySelector("#year").textContent = new Date().getFullYear();
const backToTop = document.querySelector("#backToTop");
window.addEventListener("scroll", () => backToTop.classList.toggle("visible", window.scrollY > 450));
backToTop.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));

// Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll("main section[id]");
const navLinks = mainNav.querySelectorAll('a[href^="#"]');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, {rootMargin:"-25% 0px -60% 0px"});
sections.forEach(section => observer.observe(section));


// Interactive Math Sprint game
(() => {
  const form = document.querySelector("#mathGameForm");
  if (!form) return;
  const questionEl = document.querySelector("#gameQuestion");
  const answerEl = document.querySelector("#gameAnswer");
  const submitBtn = document.querySelector("#gameSubmit");
  const startBtn = document.querySelector("#startGame");
  const restartBtn = document.querySelector("#restartGame");
  const timerEl = document.querySelector("#gameTimer");
  const scoreEl = document.querySelector("#gameScore");
  const questionNoEl = document.querySelector("#gameQuestionNo");
  const bestEl = document.querySelector("#gameBest");
  const statusEl = document.querySelector("#gameStatus");
  const feedbackEl = document.querySelector("#gameFeedback");
  let score = 0, questionNo = 0, best = 0, seconds = 60, answer = 20;
  let running = false, interval = null;

  function nextQuestion() {
    const ops = ["+", "−", "×", "÷"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b;
    if (op === "+") { a = rand(2, 50); b = rand(2, 50); answer = a + b; }
    else if (op === "−") { a = rand(10, 70); b = rand(1, a); answer = a - b; }
    else if (op === "×") { a = rand(2, 12); b = rand(2, 12); answer = a * b; }
    else { b = rand(2, 12); answer = rand(2, 12); a = b * answer; }
    questionEl.textContent = `${a} ${op} ${b} = ?`;
    questionNoEl.textContent = questionNo;
    answerEl.value = "";
    answerEl.focus();
  }
  function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function finish() {
    running = false; clearInterval(interval); interval = null;
    answerEl.disabled = true; submitBtn.disabled = true;
    startBtn.textContent = "Play Again";
    statusEl.textContent = "Round complete!";
    questionEl.textContent = `Final score: ${score}`;
    feedbackEl.textContent = score > 0 ? `Great effort! You scored ${score} point${score === 1 ? "" : "s"}. Try again to beat your best.` : "Good try! Start another round and see how many you can solve.";
    best = Math.max(best, score); bestEl.textContent = best;
  }
  function start() {
    clearInterval(interval);
    score = 0; questionNo = 0; seconds = 60; running = true;
    scoreEl.textContent = "0"; questionNoEl.textContent = "0"; timerEl.textContent = "60s";
    feedbackEl.textContent = ""; statusEl.textContent = "Game on! Solve as many as you can.";
    answerEl.disabled = false; submitBtn.disabled = false; startBtn.textContent = "Game Running…";
    nextQuestion();
    interval = setInterval(() => {
      seconds--; timerEl.textContent = `${seconds}s`;
      if (seconds <= 0) finish();
    }, 1000);
  }
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!running || answerEl.value.trim() === "") return;
    if (Number(answerEl.value) === answer) {
      score++; feedbackEl.textContent = "Correct! +1 point";
      feedbackEl.classList.remove("incorrect"); feedbackEl.classList.add("correct");
    } else {
      feedbackEl.textContent = `Not quite — the answer was ${answer}. Keep going!`;
      feedbackEl.classList.remove("correct"); feedbackEl.classList.add("incorrect");
    }
    questionNo++; scoreEl.textContent = score; questionNoEl.textContent = questionNo;
    nextQuestion();
  });
  startBtn.addEventListener("click", start);
  restartBtn.addEventListener("click", start);
})();
