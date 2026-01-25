// ---- Data & State ----
const horses = [
  { id: 1, name: "Special Week", slug: "special_week", rarity: 3, distance: "Medium", role: "Runner", track: "Turf" },
  { id: 101, name: "Special Week (Summer)", slug: "special_week", rarity: 3, distance: "Middle", role: "Runner", track: "Turf"},
  { id: 2, name: "Silence Suzuka", slug: "silence_suzuka", rarity: 3, distance: "Mile", role: "Front", track: "Turf" },
  { id: 3, name: "Tokai Teio", slug: "tokai_teio", rarity: 3, distance: "Medium", role: "Betweener", track: "Turf" },
  { id: 4, name: "Oguri Cap", slug: "oguri_cap", rarity: 3, distance: "Mile", role: "Chaser", track: "Both" },
  { id: 5, name: "Haru Urara", slug: "haru_urara", rarity: 1, distance: "Sprint", role: "Runner", track: "Dirt" },
  { id: 6, name: "Mejiro McQueen", slug: "mejiro_mcqueen", rarity: 2, distance: "Long", role: "Front", track: "Turf" }
];

let state = {
  q: "",
  sort: "name-asc",
  rarities: new Set(["1", "2", "3"]),
  distances: new Set(["Sprint", "Mile", "Medium", "Long"])
};

// ---- Favorite Storage Helpers ----
const getFavorites = () => JSON.parse(localStorage.getItem("mambo_favs") || "[]");
const saveFavorites = (favs) => localStorage.setItem("mambo_favs", JSON.stringify(favs));

// ---- Core Logic Function ----
async function init() {
  const headerContainer = document.getElementById("mainHeader");
  if (headerContainer) {
    const response = await fetch("header.html");
    const html = await response.text();
    headerContainer.innerHTML = html;
  }

  const grid = document.getElementById("horseGrid");
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const countAll = document.getElementById("countAll");
  const countShown = document.getElementById("countShown");
  const rarityChecks = Array.from(document.querySelectorAll(".rarityCheck"));
  const distanceChecks = Array.from(document.querySelectorAll(".distanceCheck"));
  const filtersToggle = document.getElementById("filtersToggle");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const themeToggle = document.getElementById("themeToggle");
  //const addHorseBtn = document.getElementById("addHorseBtn");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const closeModal = document.getElementById("closeModal");
  const closeModal2 = document.getElementById("closeModal2");

  const rarityStars = (n) => "★".repeat(n);
  const initials = (name) => name.split(" ").filter(Boolean).slice(0, 2).map(s => s[0].toUpperCase()).join("");

  function render() {
    const favorites = getFavorites();
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

    grid.innerHTML = filtered.map(h => {
  const isFav = favorites.includes(h.id);
  const charUrl = `/characters/${h.slug}/${h.slug}.html`;
  // Construct the image path using the slug
  const imgUrl = `/characters/${h.slug}/${h.slug}.png`; 

  return `
    <div class="card-container">
      <a href="${charUrl}" class="card-link">
        <article class="card">
          <div class="avatar">
            <img src="${imgUrl}" alt="${h.name}" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">
          </div>
          <div class="card-body">
            ...
                <div class="card-title">
                  <h3>${h.name}</h3>
                  <div class="badges">
                    <span class="badge good">${rarityStars(h.rarity)}</span>
                    <span class="badge">${h.distance}</span>
                  </div>
                </div>
                <div class="card-meta">
                  <span>Role: ${h.role}</span> • <span>Distance: ${h.distance}</span>  • <span>Distance: ${h.track}</span>
                </div>
                <div class="card-actions">
                   <span class="btn-fake">View Details</span>
                </div>
              </div>
            </article>
          </a>
          <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${h.id}" aria-label="Favorite">
            ${isFav ? '★' : '☆'}
          </button>
        </div>
      `;
    }).join("");

    // Re-attach Favorite Click Listeners
    grid.querySelectorAll(".fav-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault(); // Stop link navigation
        e.stopPropagation(); // Stop event bubbling
        const id = parseInt(btn.dataset.id);
        let currentFavs = getFavorites();
        
        if (currentFavs.includes(id)) {
          currentFavs = currentFavs.filter(favId => favId !== id);
        } else {
          currentFavs.push(id);
        }
        
        saveFavorites(currentFavs);
        render(); // Refresh the grid to show new star state
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

  //addHorseBtn.addEventListener("click", () => modalBackdrop.classList.remove("hidden"));
  [closeModal, closeModal2].forEach(b => b.addEventListener("click", () => modalBackdrop.classList.add("hidden")));

  render();
}

init();