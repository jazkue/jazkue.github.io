// Placeholder JS
// Safe to expand later (Three.js, interactions, etc.)

document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio loaded");

  const cards = document.querySelectorAll(".work-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("active");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("active");
    });
  });
});
