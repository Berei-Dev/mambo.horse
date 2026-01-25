// ---- Placeholder data (replace later with your real Uma Musume list) ----
const horses = [
  { id: 1, name: "Special Week", rarity: 3, distance: "Middle", role: "Runner" },
  { id: 2, name: "Silence Suzuka", rarity: 3, distance: "Mile", role: "Front" },
  { id: 3, name: "Tokai Teio", rarity: 3, distance: "Middle", role: "Betweener" },
  { id: 4, name: "Oguri Cap", rarity: 3, distance: "Mile", role: "Chaser" },
  { id: 5, name: "Haru Urara", rarity: 1, distance: "Sprint", role: "Runner" },
  { id: 6, name: "Mejiro McQueen", rarity: 2, distance: "Long", role: "Front" }
];

// ---- DOM ----
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

const sidebar = document.querySelector(".sidebar"); // <--- add this

sidebar.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Modal
const addHorseBtn = document.getElementById("addHorseBtn");
const modalBackdrop = document.getElementById("modalBackdrop");
const closeModal = document.getElementById("closeModal");
const closeModal2 = document.getElementById("closeModal2");

// Theme
const themeToggle = document.getElementById("themeToggle");

// ---- State ----
let state = {
  q: "",
  sort: "name-asc",
  rarities: new Set(["1", "2", "3"]),
  distances: new Set(["Sprint", "Mile", "Middle", "Long"])
};

// ---- Helpers ----
function rarityStars(n){
  return "★".repeat(n);
}

function initials(name){
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0].toUpperCase())
    .join("");
}

function compareBy(sortKey){
  switch(sortKey){
    case "name-desc":
      return (a,b) => b.name.localeCompare(a.name);
    case "rarity-desc":
      return (a,b) => b.rarity - a.rarity || a.name.localeCompare(b.name);
    case "rarity-asc":
      return (a,b) => a.rarity - b.rarity || a.name.localeCompare(b.name);
    case "name-asc":
    default:
      return (a,b) => a.name.localeCompare(b.name);
  }
}

function matchesFilters(h){
  const q = state.q.trim().toLowerCase();
  const qMatch = !q || h.name.toLowerCase().includes(q);

  const rarityMatch = state.rarities.has(String(h.rarity));
  const distanceMatch = state.distances.has(h.distance);

  return qMatch && rarityMatch && distanceMatch;
}

function render(){
  countAll.textContent = String(horses.length);

  const filtered = horses
    .filter(matchesFilters)
    .sort(compareBy(state.sort));

  countShown.textContent = String(filtered.length);

  grid.innerHTML = filtered.map(h => {
    return `
      <article class="card" data-id="${h.id}">
        <div class="avatar" aria-hidden="true">${initials(h.name)}</div>

        <div class="card-body">
          <div class="card-title">
            <h3 title="${h.name}">${h.name}</h3>
            <div class="badges">
              <span class="badge good">${rarityStars(h.rarity)}</span>
              <span class="badge">${h.distance}</span>
            </div>
          </div>

          <div class="card-meta">
            <span>Role: ${h.role}</span>
            <span>•</span>
            <span>ID: ${h.id}</span>
          </div>

          <div class="card-actions">
            <button class="icon-btn viewBtn" type="button">View</button>
            <button class="icon-btn favBtn" type="button">☆ Favorite</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  // attach listeners to new buttons
  grid.querySelectorAll(".viewBtn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      const id = Number(card.dataset.id);
      const horse = horses.find(x => x.id === id);
      alert(`Placeholder: open detail page for ${horse.name}\n\nLater: navigate to /horse.html?id=${id}`);
    });
  });

  grid.querySelectorAll(".favBtn").forEach(btn => {
    btn.addEventListener("click", () => alert("Placeholder: add to favorites"));
  });
}

// ---- Events ----
searchInput.addEventListener("input", (e) => {
  state.q = e.target.value;
  render();
});

sortSelect.addEventListener("change", (e) => {
  state.sort = e.target.value;
  render();
});

rarityChecks.forEach(chk => {
  chk.addEventListener("change", () => {
    if (chk.checked) state.rarities.add(chk.value);
    else state.rarities.delete(chk.value);
    render();
  });
});

distanceChecks.forEach(chk => {
  chk.addEventListener("change", () => {
    if (chk.checked) state.distances.add(chk.value);
    else state.distances.delete(chk.value);
    render();
  });
});

clearFiltersBtn.addEventListener("click", () => {
  // reset state
  state.q = "";
  state.sort = "name-asc";
  state.rarities = new Set(["1", "2", "3"]);
  state.distances = new Set(["Sprint", "Mile", "Middle", "Long"]);

  // reset UI
  searchInput.value = "";
  sortSelect.value = "name-asc";
  rarityChecks.forEach(c => c.checked = true);
  distanceChecks.forEach(c => c.checked = true);

  render();
});

// Modal open/close
function openModal(){
  modalBackdrop.classList.remove("hidden");
  modalBackdrop.setAttribute("aria-hidden", "false");
}
function closeModalFn(){
  modalBackdrop.classList.add("hidden");
  modalBackdrop.setAttribute("aria-hidden", "true");
}

addHorseBtn.addEventListener("click", openModal);
closeModal.addEventListener("click", closeModalFn);
closeModal2.addEventListener("click", closeModalFn);
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModalFn();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModalFn();
});

// Theme toggle (simple)
themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("light");
});
function setDefaultFiltersState() {
  const isMobile = window.matchMedia("(max-width: 980px)").matches;

  // Desktop default: open. Mobile default: closed.
  if (isMobile) document.body.classList.remove("filters-open");
  else document.body.classList.add("filters-open");
}

function isMobile() {
  return window.matchMedia("(max-width: 980px)").matches;
}

function closeFilters() {
  document.body.classList.remove("filters-open");
  sidebarOverlay.classList.add("hidden");
  sidebarOverlay.setAttribute("aria-hidden", "true");
}

function openFilters() {
  document.body.classList.add("filters-open");

  // Only show overlay on mobile
  if (isMobile()) {
    sidebarOverlay.classList.remove("hidden");
    sidebarOverlay.setAttribute("aria-hidden", "false");
  } else {
    sidebarOverlay.classList.add("hidden");
    sidebarOverlay.setAttribute("aria-hidden", "true");
  }
}

function toggleFilters() {
  const isOpen = document.body.classList.contains("filters-open");
  if (isOpen) closeFilters();
  else openFilters();
}

filtersToggle.addEventListener("click", toggleFilters);
sidebarOverlay.addEventListener("click", closeFilters);

window.addEventListener("resize", () => {
  // on resize, re-apply default rules and keep overlay correct
  setDefaultFiltersState();
  const isOpen = document.body.classList.contains("filters-open");
  if (isOpen && window.matchMedia("(max-width: 980px)").matches) openFilters();
  else closeFilters();
});

// run on load
setDefaultFiltersState();
closeFilters(); // ensures overlay starts hidden


// ---- Init ----
render();
