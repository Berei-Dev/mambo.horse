// ---- Data & State ----
const horses = [
  { id: 1, name: "Special Week", slug: "special_week", rarity: 3, distance: ["Medium", "Long"], role: ["Pace", "Late"], track: "Turf" },
  { id: 1.01, name: "Special Week (Summer)", slug: "special_week", rarity: 3, distance: ["Medium", "Long"], role: ["Pace", "Late"], track: "Turf" },
  { id: 2, name: "Silence Suzuka", slug: "silence_suzuka", rarity: 3, distance: ["Mile", "Medium"], role: ["Front"], track: "Turf" },
  { id: 3, name: "Tokai Teio", slug: "tokai_teio", rarity: 3, distance: ["Medium"], role: ["Pace"], track: "Turf" },
  { id: 3.01, name: "Tokai Teio (Anime)", slug: "tokai_teio", rarity: 3, distance: ["Medium"], role: ["Pace"], track: "Turf"},
  { id: 4, name: "Maruzensky", slug: "maruzensky", rarity: 3, distance: ["Mile"], role: ["Front"], track: "Turf" },
  { id: 4.01, name: "Maruzensky (Summer)", slug: "maruzensky", rarity: 3, distance: ["Mile"], role: ["Front"], track: "Turf" },
  { id: 5, name: "Oguri Cap", slug: "oguri_cap", rarity: 3, distance: ["Mile", "Medium"], role: ["Pace", "Late"], track: "Both" },
  { id: 5.01, name: "Oguri Cap (Christmas)", slug: "oguri_cap", rarity: 3, distance: ["Mile", "Medium"], role: ["Pace", "Late"], track: "Both" },
  { id: 6, name: "Gold Ship", slug: "gold_ship", rarity: 2, distance: ["Medium", "Long"], role: ["End"], track: "Turf"},
  { id: 7, name: "Vodka", slug: "vodka", rarity: 2, distance: ["Mile", "Medium"], role: ["Late"], track: "Turf"},
  { id: 8, name: "Daiwa Scarlet", slug: "daiwa scarlet", rarity: 2, distance: ["Mile", "Medium"], role: ["Front", "Pace"], track: "Turf"},
  { id: 9, name: "Taiki Shuttle", slug: "taiki_shuttle", rarity: 3, distance: ["Sprint", "Mile"], role: ["Pace"], track: "Both"},
  { id: 10, name: "Grass Wonder", slug: "grass_wonder", rarity: 2, distance: ["Mile", "Long"], role: ["Pace", "Late"], track: "Turf"},
  { id: 10.01, name: "Grass Wonder (Fantasy)", slug: "grass_wonder", rarity: 3, distance: ["Mile", "Long"], role: ["Pace", "Late"], track: "Turf"},
  { id: 11, name: "Mejiro McQueen", slug: "mejiro_mcqueen", rarity: 3, distance: ["Medium", "Long"], role: ["Pace"], track: "Turf"},
  { id: 11.01, name: "Mejiro McQueen (Anime)", slug: "mejiro_mcqueen", rarity: 3, distance: ["Medium", "Long"], role: ["Pace"], track: "Turf"},
  { id: 12, name: "El Condor Pasa", slug: "el_condor_pasa", rarity: 2, distance: ["Mile", "Medium"], role: ["Pace", "Late"], track: "Both"},
  { id: 12.01, name: "El Condor Pasa (Fantasy)", slug: "el_condor_pasa", rarity: 3, distance: ["Mile", "Medium"], role: ["Pace", "Late"], track: "Both"},
  { id: 13, name: "Symboli Rudolf", slug: "symboli_rudolf", rarity: 3, distance: ["Medium", "Long"], role: ["Pace", "Late"], track: "Turf"},
  { id: 13.01, name: "Symboli Rudolf (Festival)", slug: "symboli_rudolf", rarity: 3, distance: ["Medium", "Long"], role: ["Pace", "Late"], track: "Turf"},
  { id: 14, name: "Air Groove", slug: "air_groove", rarity: 2, distance: ["Medium"], role: ["Pace", "Late"], track: "Turf"},
  { id: 14.01, name: "Air Groove (Wedding)", slug: "air_groove", rarity: 3, distance: ["Medium"], role: ["Pace", "Late"], track: "Turf"},
  { id: 15, name: "Mayano Top Gun", slug: "mayano_top_gun", rarity: 2, distance: ["Medium", "Long"], role: ["Front", "Pace"], track: "Turf"},
  { id: 15.01, name: "Mayano Top Gun (Wedding)", slug: "mayano_top_gun", rarity: 3, distance: ["Medium", "Long"], role: ["Front", "Pace"], track: "Turf"},
  { id: 16, name: "Mejiro Ryan", slug: "mejiro_ryan", rarity: 1, distance: ["Medium"], role: ["Pace", "Late"], track: "Turf"},
  { id: 17, name: "Rice Shower", slug: "rice_shower", rarity: 3, distance: ["Medium", "Long"], role: ["Pace"], track: "Turf"},
  { id: 17.01, name: "Rice Shower (Halloween)", slug: "rice_shower", rarity: 3, distance: ["Medium", "Long"], role: ["Pace"], track: "Turf"},
  { id: 18, name: "Agnes Tachyon", slug: "agnes_tachyon", rarity: 1, distance: ["Medium"], role: ["Pace"], track: "Turf"},
  { id: 19, name: "Winning Ticket", slug: "winning_ticket", rarity: 1, distance: ["Medium"], role: ["Late"], track: "Turf"},
  { id:20, name: "Sakura Bakushin O", slug: "sakura_bakushin_o", rarity: 1, distance: ["Short"], role: ["Front", "Pace"], track: "Turf"},
  { id:21, name: "Super Creek", slug: "super_creek", rarity: 2, distance: ["Medium", "Long"], role: ["Pace"], track: "Turf"},
  { id:21.01, name: "Super Creek (Halloween)", slug: "super_creek", rarity: 3, distance: ["Medium", "Long"], role: ["Pace"], track: "Turf"},
  { id: 22, name: "Haru Urara", slug: "haru_urara", rarity: 1, distance: ["Sprint"], role: ["Late"], track: "Dirt" },
  { id: 23, name: "Matikanefukukitaru", slug: "matikanefukukitaru", rarity: 1, distance: ["Medium", "Long"], role: ["Late"], track: "Turf"},
  { id: 23.01, name: "Matikanefukukitaru (Full)", slug: "matikanefukukitaru", rarity: 3, distance: ["Medium", "Long"], role: ["Late"], track: "Turf"},
  { id: 24, name: "Nice Nature", slug: "nice_nature", rarity: 1, distance: ["Medium", "Long"], role: ["Late"], track: "Turf"},
  { id: 25, name: "King Halo", slug: "king_halo", rarity: 1, distance: ["Short"], role: ["Late"], track: "Turf"},
  { id: 26, name: "TM Opera O", slug: "tm_opera_o", rarity: 3, distance: ["Medium", "Long"], role: ["Pace", "Late"], track: "Turf"},
  { id: 27, name: "Mihono Bourbon", slug: "mihono_bourbon", rarity: 3, distance: ["Medium"], role: ["Front"], track: "Turf"},
  { id: 28, name: "Biwa Hayahide", slug: "biwa_hayahide", rarity: 3, distance: ["Medium", "Long"], role: ["Pace"], track: "Turf"},
  { id: 28.01, name: "Biwa Hayahide (Christmas)", slug: "biwa_hayahide", rarity: 3, distance: ["Medium", "Long"], role: ["Pace"], track: "Turf"},
  { id: 29, name: "Curren Chan", slug: "curren_chan", rarity: 3, distance: ["Short"], role: ["Pace"], track: "Turf"},
  { id: 30, name: "Narita Taishin", slug: "narita_taishin", rarity: 3, distance: ["Medium", "Long"], role: ["End"], track: "Turf"},
  { id: 31, name: "Smart Falcon", slug: "smart_falcon", rarity: 3, distance: ["Mile", "Medium"], role: ["Front"], track: "Dirt"},
  { id: 32, name: "Narita Brian", slug: "narita_brian", rarity: 3, distance: ["Medium", "Long"], role: ["Pace", "Late"], track: "Turf"},
  { id: 33, name: "Seiun Sky", slug: "seiun_sky", rarity: 3, distance: ["Medium", "Long"], role: ["Front"], track: "Turf"},
  { id: 34, name: "Hishi Amazon", slug: "hishi_amazon", rarity: 3, distance: ["Mile", "Medium"], role: ["End"], track: "Turf"},
  { id: 35, name: "Fuji Kiseki", slug: "fuji_kiseki", rarity: 3, distance: ["Mile"], role: ["Pace"], track: "Turf"},
  { id: 36, name: "Gold City", slug: "gold_city", rarity: 3, distance: ["Mile"], role: ["Pace", "Late"], track: "Turf"},
  { id: 36.01, name: "Gold City (Festival)", slug: "gold_city", rarity: 3, distance: ["Mile"], role: ["Pace", "Late"], track: "Turf"},
  { id: 37, name: "Meisho Doto", slug: "meisho_doto", rarity: 3, distance: ["Medium", "Long"], role: ["Pace"], track: "Turf"},
  { id: 38, name: "Eishin Flash", slug: "eishin_flash", rarity: 3, distance: ["Medium", "Long"], role: ["Late"], track: "Turf"},
  { id: 39, name: "Hishi Akebono", slug: "hishi_akebono", rarity: 3, distance: ["Short"], role: ["Pace"], track: "Turf"},
  { id: 40, name: "Agnes Digital", slug: "agnes_digital", rarity: 3, distance: ["Mile", "Medium"], role: ["Pace", "Late"], track: "Both"},
  { id: 41, name: "Kawakami Princess", slug: "kawakami_princess", rarity: 3, distance: ["Medium"], role: ["Late"], track: "Turf"},
  { id: 42, name: "Manhattan Cafe", slug: "manhattan_cafe", rarity: 3, distance: ["Long"], role: ["Late"], track: "Turf"},
  { id: 43, name: "Tosen Jordan", slug: "tosen_jordan", rarity: 3, distance: ["Medium"], role: ["Pace"], track: "Turf"},
  { id: 44, name: "Mejiro Dober", slug: "mejiro_dober", rarity: 3, distance: ["Mile", "Medium"], role: ["Late"], track: "Turf"},
  { id: 45, name: "Fine Motion", slug: "fine_motion", rarity: 3, distance: ["Mile", "Medium"], role: ["Pace"], track: "Turf"},
  { id: 46, name: "Tamamo Cross", slug: "tamamo_cross", rarity: 3, distance: ["Medium", "Long"], role: ["Pace", "Late", "End"], track: "Turf"}
];

let state = {
  q: "",
  sort: "id-desc",
  rarities: new Set(["1", "2", "3"]),
  distances: new Set(["Sprint", "Mile", "Medium", "Long"]),
  role: new Set(["Front", "Pace", "Late", "End"]),
  track: new Set(["Turf", "Dirt"])
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
  const roleChecks = Array.from(document.querySelectorAll(".roleCheck"));
  const trackChecks = Array.from(document.querySelectorAll(".trackCheck"));
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
    const rarityMatch = state.rarities.has(String(h.rarity));
    
    // Distance Filter (Array)
    const distMatch = h.distance.some(d => state.distances.has(d));

    // Role Filter (Array)
    // If a horse has no roles defined, you might want it to show by default or hide it
    const roleMatch = h.role.length === 0 || h.role.some(r => state.role.has(r));

    // Track Filter (String)
    // Handle "Both" by checking if either Turf or Dirt is selected
    const trackMatch = h.track === "Both" 
      ? (state.track.has("Turf") || state.track.has("Dirt"))
      : state.track.has(h.track);

    return qMatch && rarityMatch && distMatch && roleMatch && trackMatch;
  })
    .sort((a, b) => {
  if (state.sort === "name-desc") return b.name.localeCompare(a.name);
  if (state.sort === "rarity-desc") return b.rarity - a.rarity || a.name.localeCompare(b.name);
  if (state.sort === "rarity-asc") return a.rarity - b.rarity || a.name.localeCompare(b.name);
  
  // --- Add these two lines ---
  if (state.sort === "id-asc") return a.id - b.id;
  if (state.sort === "id-desc") return b.id - a.id;
  // ---------------------------

  return a.name.localeCompare(b.name);
});

  countShown.textContent = String(filtered.length);

  grid.innerHTML = filtered.map(h => {
    const isFav = favorites.includes(h.id);
    const charUrl = `/characters/${h.slug}/${h.slug}.html`;
    const imgUrl = `/characters/${h.slug}/${h.slug}.png`; 

    // Generate Distance Badges
    const distanceArray = Array.isArray(h.distance) ? h.distance : [h.distance];
    const distanceBadges = distanceArray.map(dist => `<span class="badge">${dist}</span>`).join("");

    // Generate Role Badges
    const roleArray = Array.isArray(h.role) ? h.role : [h.role];
    const roleBadges = roleArray.map(role => `<span class="badge role-badge">${role}</span>`).join("");

    return `
      <div class="card-container">
        <a href="${charUrl}" class="card-link">
          <article class="card">
            <div class="avatar">
              <img src="${imgUrl}" alt="${h.name}" style="width:100%; height:100%; object-fit:cover; border-radius:inherit;">
            </div>
            <div class="card-body">
              <div class="card-title">
                <h3>${h.name}</h3>
                <div class="badges">
                  <span class="badge good">${rarityStars(h.rarity)}</span>
                  ${distanceBadges}
                  ${roleBadges}
                </div>
              </div>
              <div class="card-meta">
                <span>Track: ${h.track}</span>
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
      e.preventDefault();
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      let currentFavs = getFavorites();
      
      if (currentFavs.includes(id)) {
        currentFavs = currentFavs.filter(favId => favId !== id);
      } else {
        currentFavs.push(id);
      }
      
      saveFavorites(currentFavs);
      render();
    });
  });
}

  // ---- Event Listeners ----
  searchInput.addEventListener("input", (e) => { state.q = e.target.value; render(); });
  sortSelect.addEventListener("change", (e) => { state.sort = e.target.value; render(); });

[...rarityChecks, ...distanceChecks, ...roleChecks, ...trackChecks].forEach(chk => {
  chk.addEventListener("change", () => {
    // Determine which state set to update
    let targetSet;
    if (chk.classList.contains("rarityCheck")) targetSet = state.rarities;
    else if (chk.classList.contains("distanceCheck")) targetSet = state.distances;
    else if (chk.classList.contains("roleCheck")) targetSet = state.role;
    else if (chk.classList.contains("trackCheck")) targetSet = state.track;

    if (targetSet) {
      chk.checked ? targetSet.add(chk.value) : targetSet.delete(chk.value);
      render();
    }
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