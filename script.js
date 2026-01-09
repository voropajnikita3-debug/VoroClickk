let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let record = localStorage.getItem("record") ? parseInt(localStorage.getItem("record")) : 0;

const scoreEl = document.getElementById("score");
const recordEl = document.getElementById("record");
const btn = document.getElementById("clickBtn");
const bonusEl = document.getElementById("bonus");

const shop = document.getElementById("shop");
const shopBtn = document.getElementById("shopBtn");
const closeShop = document.getElementById("closeShop");
const styleBtns = document.querySelectorAll(".styleBtn");

function updateDisplay() {
  scoreEl.textContent = score + " 💰";
  recordEl.textContent = "🏆 Рекорд: " + record;
}

updateDisplay();

// Клик TAP
btn.addEventListener("click", () => {
  if (shop.style.display === "block") return; // не считаем клики когда магазин открыт
  score++;
  if (score > record) record = score;
  localStorage.setItem("score", score);
  localStorage.setItem("record", record);
  updateDisplay();
});

// Открыть магазин
shopBtn.addEventListener("click", () => {
  shop.style.display = "block";
});

// Закрыть магазин
closeShop.addEventListener("click", () => {
  shop.style.display = "none";
});

// Эффекты при покупке
function purchaseEffect(button) {
  button.style.transform = "scale(1.2)";
  setTimeout(() => { button.style.transform = "scale(1)"; }, 200);
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
      switch(style){
        case "bronze": btn.style.background = "#cd7f32"; scoreEl.style.color = "#cd7f32"; break;
        case "gold": btn.style.background = "#ffd700"; scoreEl.style.color = "#ffd700"; break;
        case "diamond": btn.style.background = "#00ffff"; scoreEl.style.color = "#00ffff"; break;
      }
      bonusEl.textContent = "✅ Куплено!";
      setTimeout(() => { bonusEl.textContent = ""; }, 1000);
      purchaseEffect(btn);
      shop.style.display = "none"; // закрываем магазин после покупки
    } else {
      bonusEl.textContent = "❌ Недостаточно монет!";
      setTimeout(() => { bonusEl.textContent = ""; }, 1000);
    }
    localStorage.setItem("score", score);
    localStorage.setItem("record", record);
    updateDisplay();
  });
});