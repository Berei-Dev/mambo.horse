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

// ---- Mambo Autoplay & Loop Logic ----
function initAutoplayAudio() {
  const audio = document.getElementById("mamboAudio");

  if (audio) {
    // Attempt to play immediately (will likely be muted by browser)
    audio.play().catch(err => {
      console.log("Autoplay waiting for interaction...");
    });

    // Unmute and play once the user clicks anywhere on the page
    const unmuteContext = () => {
      audio.muted = false;
      audio.play();
      // Remove listener so it only triggers once
      window.removeEventListener('click', unmuteContext);
    };

    window.addEventListener('click', unmuteContext);
  }
}

function initMamboChaos() {
  const container = document.getElementById("gifContainer");
  const audio = document.getElementById("mamboClickAudio");
  const gifUrl = "mambo.gif"; 
  const gifCount = 20; // Increased count
  const gifs = [];

  for (let i = 0; i < gifCount; i++) {
    const img = document.createElement("img");
    img.src = gifUrl;
    img.className = "flying-gif";
    
    // Initial State
    const size = 120; // Larger size
    const data = {
      el: img,
      x: Math.random() * (window.innerWidth - size),
      y: Math.random() * (window.innerHeight - size),
      dx: (Math.random() - 0.5) * 15, // Faster horizontal speed
      dy: (Math.random() - 0.5) * 15, // Faster vertical speed
      size: size
    };

    img.style.width = size + "px";
    img.style.position = "absolute";
    img.style.pointerEvents = "auto";
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    });

    container.appendChild(img);
    gifs.push(data);
  }

  // Physics Loop
  function update() {
    gifs.forEach(g => {
      g.x += g.dx;
      g.y += g.dy;

      // Bounce off Left/Right
      if (g.x <= 0 || g.x + g.size >= window.innerWidth) {
        g.dx *= -1;
      }
      // Bounce off Top/Bottom
      if (g.y <= 0 || g.y + g.size >= window.innerHeight) {
        g.dy *= -1;
      }

      g.el.style.transform = `translate(${g.x}px, ${g.y}px)`;
    });
    requestAnimationFrame(update);
  }

  update();
}

// Call this in your init sequence
initMamboChaos();

// Run everything
loadHeader();
renderStats();
initAutoplayAudio(); //
initMamboChaos();