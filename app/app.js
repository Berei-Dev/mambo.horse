// ---- Data & State ----
const horses = [
  { id: 1, name: "Special Week", rarity: 3, distance: "Middle", role: "Runner" },
  { id: 2, name: "Silence Suzuka", rarity: 3, distance: "Mile", role: "Front" },
  { id: 3, name: "Tokai Teio", rarity: 3, distance: "Middle", role: "Betweener" },
  { id: 4, name: "Oguri Cap", rarity: 3, distance: "Mile", role: "Chaser" },
  { id: 5, name: "Haru Urara", rarity: 1, distance: "Sprint", role: "Runner" },
  { id: 6, name: "Mejiro McQueen", rarity: 2, distance: "Long", role: "Front" }
];

let state = {
  q: "",
  sort: "name-asc",
  rarities: new Set(["1", "2", "3"]),
  distances: new Set(["Sprint", "Mile", "Middle", "Long"])
};

// ---- Core Logic Function ----
async function init() {
  // 1. Load the Header
  const headerContainer = document.getElementById("mainHeader");
  if (headerContainer) {
    const response = await fetch("header.html");
    const html = await response.text();
    headerContainer.innerHTML = html;
  }

  // 2. Select Elements (Must happen after header is injected)
  const grid = document.getElementById("horseGrid");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const clearFiltersBtn = document.getElementById("clearFilters");
  const countAll = document.getElementById("countAll");
  const countShown = document.getElementById("countShown");
  const rarityChecks = Array.from(document.querySelectorAll(".rarityCheck"));
  const distanceChecks = Array.from(document.querySelectorAll(".distanceCheck"));
  const filtersToggle = document.getElementById("filtersToggle");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const themeToggle = document.getElementById("themeToggle");
  const addHorseBtn = document.getElementById("addHorseBtn");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const closeModal = document.getElementById("closeModal");
  const closeModal2 = document.getElementById("closeModal2");

  // ---- Helper Functions ----
  const rarityStars = (n) => "★".repeat(n);
  const initials = (name) => name.split(" ").filter(Boolean).slice(0, 2).map(s => s[0].toUpperCase()).join("");

  function render() {
    countAll.textContent = String(horses.length);
    const filtered = horses
      .filter(h => {
        const qMatch = !state.q || h.name.toLowerCase().includes(state.q.toLowerCase());
        return qMatch && state.rarities.has(String(h.rarity)) && state.distances.has(h.distance);
      })
      .sort((a, b) => {
        if (state.sort === "name-desc") return b.name.localeCompare(a.name);
        if (state.sort === "rarity-desc") return b.rarity - a.rarity || a.name.localeCompare(b.name);
        if (state.sort === "rarity-asc") return a.rarity - b.rarity || a.name.localeCompare(b.name);
        return a.name.localeCompare(b.name);
      });

    countShown.textContent = String(filtered.length);
    grid.innerHTML = filtered.map(h => `
      <article class="card" data-id="${h.id}">
        <div class="avatar">${initials(h.name)}</div>
        <div class="card-body">
          <div class="card-title">
            <h3>${h.name}</h3>
            <div class="badges">
              <span class="badge good">${rarityStars(h.rarity)}</span>
              <span class="badge">${h.distance}</span>
            </div>
          </div>
          <div class="card-meta"><span>Role: ${h.role}</span> • <span>ID: ${h.id}</span></div>
          <div class="card-actions">
            <button class="icon-btn viewBtn">View</button>
            <button class="icon-btn favBtn">☆ Favorite</button>
          </div>
        </div>
      </article>
    `).join("");

    // Re-attach card listeners
    grid.querySelectorAll(".viewBtn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.target.closest(".card").dataset.id;
        alert("Navigating to ID: " + id);
      });
    });
  }

  // ---- Event Listeners ----
  searchInput.addEventListener("input", (e) => { state.q = e.target.value; render(); });
  sortSelect.addEventListener("change", (e) => { state.sort = e.target.value; render(); });
  
  [...rarityChecks, ...distanceChecks].forEach(chk => {
    chk.addEventListener("change", () => {
      const set = chk.classList.contains("rarityCheck") ? state.rarities : state.distances;
      chk.checked ? set.add(chk.value) : set.delete(chk.value);
      render();
    });
  });

  themeToggle.addEventListener("click", () => document.documentElement.classList.toggle("light"));

  // Sidebar / Filter Toggle Logic
  const isMobile = () => window.matchMedia("(max-width: 980px)").matches;
  const toggleFilters = () => {
    const isOpen = document.body.classList.toggle("filters-open");
    if (isOpen && isMobile()) {
      sidebarOverlay.classList.remove("hidden");
    } else {
      sidebarOverlay.classList.add("hidden");
    }
  };

  filtersToggle.addEventListener("click", toggleFilters);
  sidebarOverlay.addEventListener("click", toggleFilters);

  // Modal Logic
  addHorseBtn.addEventListener("click", () => modalBackdrop.classList.remove("hidden"));
  [closeModal, closeModal2].forEach(b => b.addEventListener("click", () => modalBackdrop.classList.add("hidden")));

  // Initial Render
  render();
}

// Start the app
init();