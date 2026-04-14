const toggleBtn = document.getElementById("themeToggle");
const yearEl = document.getElementById("year");
const clockEl = document.getElementById("clock");
const typingText = document.getElementById("typingText");
const revealItems = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".chip");
const projectCards = document.querySelectorAll(".project-card");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

yearEl.textContent = new Date().getFullYear();

function updateClock() {
  const now = new Date();
  clockEl.textContent = `Current time: ${now.toLocaleTimeString()}`;
}

updateClock();
setInterval(updateClock, 1000);

const typingSentence = "I build learning-focused AI and web projects.";
let idx = 0;

function runTypingAnimation() {
  if (!typingText) {
    return;
  }

  typingText.textContent = typingSentence.slice(0, idx);
  idx += 1;

  if (idx > typingSentence.length) {
    idx = 0;
  }
}

runTypingAnimation();
setInterval(runTypingAnimation, 130);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");
    const type = btn.dataset.filter;

    projectCards.forEach((card) => {
      const isVisible = type === "all" || card.dataset.type === type;
      card.style.display = isVisible ? "block" : "none";
    });
  });
});
