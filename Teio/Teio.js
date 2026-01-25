// Theme toggle (same behavior as your other page)
const themeToggle = document.getElementById("themeToggle");

// Load saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.documentElement.classList.add("light");
}

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");
  localStorage.setItem("theme", document.documentElement.classList.contains("light") ? "light" : "dark");
});

// ---- Data placeholders (edit these) ----
const teioStats = {
  speed: "??",
  stamina: "??",
  power: "??",
  guts: "??",
  wisdom: "??"
};

const startsWithSkills = [
  "Placeholder starting skill",
  "Placeholder starting skill",
  "Placeholder starting skill"
];

const canLearnSkills = [
  "Placeholder learnable skill",
  "Placeholder learnable skill",
  "Placeholder learnable skill",
  "Placeholder learnable skill"
];

// ---- Render into page ----
document.getElementById("statSpeed").textContent = teioStats.speed;
document.getElementById("statStamina").textContent = teioStats.stamina;
document.getElementById("statPower").textContent = teioStats.power;
document.getElementById("statGuts").textContent = teioStats.guts;
document.getElementById("statWisdom").textContent = teioStats.wisdom;

const startsWithList = document.getElementById("startsWithList");
const canLearnList = document.getElementById("canLearnList");

startsWithList.innerHTML = startsWithSkills.map(s => `<li>${s}</li>`).join("");
canLearnList.innerHTML = canLearnSkills.map(s => `<li>${s}</li>`).join("");
