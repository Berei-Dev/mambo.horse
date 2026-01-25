// ---- Theme Logic ----
const themeToggleBtn = () => document.getElementById("themeToggle");

const applyTheme = (theme) => {
  if (theme === "light") {
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("light");
  }
};

// Initialize Theme
applyTheme(localStorage.getItem("theme"));

// ---- Header Loader & Interaction ----
async function loadHeader() {
  const headerContainer = document.getElementById("mainHeader");
  if (!headerContainer) return;

  try {
    // Adjust path: ../../ if in /characters/name/
    const response = await fetch("../../header.html"); 
    const html = await response.text();
    headerContainer.innerHTML = html;

    // After loading HTML, attach listeners to header buttons
    attachHeaderListeners();
  } catch (err) {
    console.error("Failed to load header:", err);
  }
}

function attachHeaderListeners() {
  const themeBtn = document.getElementById("themeToggle");
  const filtersToggle = document.getElementById("filtersToggle");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  // Theme Toggle
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isLight = document.documentElement.classList.toggle("light");
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }

  // Sidebar/Filters Toggle (Prevents errors if user clicks on character page)
  if (filtersToggle) {
    filtersToggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("filters-open");
      if (sidebarOverlay) {
        isOpen ? sidebarOverlay.classList.remove("hidden") : sidebarOverlay.classList.add("hidden");
      }
    });
  }
  
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => {
      document.body.classList.remove("filters-open");
      sidebarOverlay.classList.add("hidden");
    });
  }
}

// ---- Teio Data & Rendering ----
const teioStats = {
  speed: "1200",
  stamina: "800",
  power: "1000",
  guts: "400",
  wisdom: "600"
};

const renderStats = () => {
  if (document.getElementById("statSpeed")) {
    document.getElementById("statSpeed").textContent = teioStats.speed;
    document.getElementById("statStamina").textContent = teioStats.stamina;
    document.getElementById("statPower").textContent = teioStats.power;
    document.getElementById("statGuts").textContent = teioStats.guts;
    document.getElementById("statWisdom").textContent = teioStats.wisdom;
  }
};

// Run everything
loadHeader();
renderStats();