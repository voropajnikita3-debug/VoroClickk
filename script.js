let score = 0;

const scoreEl = document.getElementById("score");
const btn = document.getElementById("clickBtn");

btn.addEventListener("click", () => {
  score++;
  scoreEl.textContent = score;
});