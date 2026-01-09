let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
const scoreEl = document.getElementById("score");
const btn = document.getElementById("clickBtn");
const bonusEl = document.getElementById("bonus");

scoreEl.textContent = score;

// Магазин
const shop = document.getElementById("shop");
const shopBtn = document.getElementById("shopBtn");
const closeShop = document.getElementById("closeShop");
const styleBtns = document.querySelectorAll(".styleBtn");

// Открыть магазин
shopBtn.addEventListener("click", () => {
  shop.classList.remove("hidden");
});

// Закрыть магазин
closeShop.addEventListener("click", () => {
  shop.classList.add("hidden");
});

// Выбор стиля
styleBtns.forEach(button => {
  button.addEventListener("click", () => {
    const style = button.dataset.style;
    switch(style){
      case "bronze":
        btn.style.background = "#cd7f32"; // бронзовый
        scoreEl.style.color = "#cd7f32";
        break;
      case "gold":
        btn.style.background = "#ffd700"; // золотой
        scoreEl.style.color = "#ffd700";
        break;
      case "diamond":
        btn.style.background = "#00ffff"; // алмазный
        scoreEl.style.color = "#00ffff";
        break;
    }
    shop.classList.add("hidden"); // закрыть магазин после выбора
  });
});

// Клик по кнопке
btn.addEventListener("click", () => {
  score++;
  scoreEl.textContent = score;

  // бонус каждые 10 очков
  if (score % 10 === 0) {
    bonusEl.textContent = "🎉 Бонус! +5 очков!";
    score += 5;
    scoreEl.textContent = score;
    setTimeout(() => { bonusEl.textContent = ""; }, 1000);
  }

  // меняем фон каждые 20 очков
  if (score % 20 === 0) {
    document.body.style.background = `hsl(${Math.random()*360}, 50%, 10%)`;
  }

  // сохраняем очки
  localStorage.setItem("score", score);
});