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
  // MOBILE MENU CLASS!
let scrollY = 0;

const openMenu = () => {
  scrollY = window.scrollY;
  document.body.classList.add("menu-open");
  document.body.style.top = `-${scrollY}px`;
};

const closeMenu = () => {
  document.body.classList.remove("menu-open");
  document.body.style.top = "";
  window.scrollTo(0, scrollY);
};

mobileMenuBtn.addEventListener("click", () => {
  const isOpen = mobileDrawer.classList.toggle("open");
  mobileMenuOverlay.classList.toggle("show");

  isOpen ? openMenu() : closeMenu();
});

mobileMenuOverlay.addEventListener("click", () => {
  mobileDrawer.classList.remove("open");
  mobileMenuOverlay.classList.remove("show");
  closeMenu();
});

}

// ---- Teio Data & Rendering ----
const teioStats = {
  speed: "90",
  stamina: "89",
  power: "83",
  guts: "92",
  wit: "96"
};

const renderStats = () => {
  if (document.getElementById("statSpeed")) {
    document.getElementById("statSpeed").textContent = teioStats.speed;
    document.getElementById("statStamina").textContent = teioStats.stamina;
    document.getElementById("statPower").textContent = teioStats.power;
    document.getElementById("statGuts").textContent = teioStats.guts;
    document.getElementById("statWit").textContent = teioStats.wit;
  }
};

// Run everything
loadHeader();
renderStats();