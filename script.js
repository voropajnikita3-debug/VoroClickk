// Получаем очки и рекорд
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let record = localStorage.getItem("record") ? parseInt(localStorage.getItem("record")) : 0;

const scoreEl = document.getElementById("score");
const recordEl = document.getElementById("record");
const btn = document.getElementById("clickBtn");
const bonusEl = document.getElementById("bonus");

// Магазин
const shop = document.getElementById("shop");
const shopBtn = document.getElementById("shopBtn");
const closeShop = document.getElementById("closeShop");
const styleBtns = document.querySelectorAll(".styleBtn");

// Обновление отображения
function updateDisplay() {
  scoreEl.textContent = score + " 💰";
  recordEl.textContent = "🏆 Рекорд: " + record;
}

// Начальное отображение
updateDisplay();

// Изначально магазин скрыт
shop.classList.add("hidden");

// Клик по кнопке TAP
btn.addEventListener("click", () => {
  // Если магазин открыт, клики не учитываем
  if (!shop.classList.contains("hidden")) return;

  score++;
  if (score > record) record = score;

  // бонус каждые 10 очков
  if (score % 10 === 0) {
    bonusEl.textContent = "🎉 Бонус! +5 💰";
    score += 5;
    if (score > record) record = score;
    setTimeout(() => { bonusEl.textContent = ""; }, 1000);
  }

  // фон каждые 20 очков
  if (score % 20 === 0) {
    document.body.style.background = `hsl(${Math.random()*360}, 50%, 10%)`;
  }

  localStorage.setItem("score", score);
  localStorage.setItem("record", record);
  updateDisplay();
});

// Открыть магазин
shopBtn.addEventListener("click", () => {
  shop.classList.remove("hidden");
});

// Закрыть магазин
closeShop.addEventListener("click", () => {
  shop.classList.add("hidden");
});

// Функция эффектов при покупке
function purchaseEffect(button) {
  // мигание кнопки
  button.style.transform = "scale(1.2)";
  setTimeout(() => { button.style.transform = "scale(1)"; }, 200);

  // маленькие искры
  const sparkle = document.createElement("div");
  sparkle.textContent = "✨";
  sparkle.style.position = "absolute";
  sparkle.style.fontSize = "24px";
  const rect = button.getBoundingClientRect();
  sparkle.style.top = rect.top - 20 + window.scrollY + "px";
  sparkle.style.left = rect.left + Math.random() * rect.width + window.scrollX + "px";
  document.body.appendChild(sparkle);
  setTimeout(() => { sparkle.remove(); }, 800);
}

// Покупка стиля
styleBtns.forEach(button => {
  button.addEventListener("click", () => {
    const style = button.dataset.style;
    const price = parseInt(button.dataset.price);

    if (score >= price) {
      score -= price;

      // применяем стиль
      switch(style){
        case "bronze":
          btn.style.background = "#cd7f32";
          scoreEl.style.color = "#cd7f32";
          break;
        case "gold":
          btn.style.background = "#ffd700";
          scoreEl.style.color = "#ffd700";
          break;
        case "diamond":
          btn.style.background = "#00ffff";
          scoreEl.style.color = "#00ffff";
          break;
      }

      bonusEl.textContent = "✅ Куплено!";
      setTimeout(() => { bonusEl.textContent = ""; }, 1000);

      // визуальные эффекты
      purchaseEffect(btn);

      // закрываем магазин после покупки
      shop.classList.add("hidden");

    } else {
      bonusEl.textContent = "❌ Недостаточно монет!";
      setTimeout(() => { bonusEl.textContent = ""; }, 1000);
    }

    localStorage.setItem("score", score);
    localStorage.setItem("record", record);
    updateDisplay();
  });
});