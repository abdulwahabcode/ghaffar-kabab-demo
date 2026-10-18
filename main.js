/* Shaikh Abdul Ghaffar Kabab House — menu data + interactions */
const MENU = [
  // --- Kababs ---
  {cat:"kababs", name:"Fry Kabab (Special)", desc:"The 1952 legend — hand-minced, crisped in desi ghee over coal fire.", price:750, pick:true},
  {cat:"kababs", name:"Seekh Kabab (Beef) — 4 pcs", desc:"Smoky, juicy, straight off the seekh.", price:450},
  {cat:"kababs", name:"Seekh Kabab (Chicken) — 4 pcs", desc:"Leaner cut, same coal-kissed flavour.", price:400},
  {cat:"kababs", name:"Malai Boti — 8 pcs", desc:"Cream-marinated, melts in the mouth.", price:550},
  {cat:"kababs", name:"Chapli Kabab — 2 pcs", desc:"Peshawari style, tomato and anardana punch.", price:350},
  {cat:"kababs", name:"Shami Kabab — 4 pcs", desc:"Soft-centred classic, old-recipe spice mix.", price:300},
  // --- Nihari & Paye ---
  {cat:"nihari", name:"Special Nihari (Beef)", desc:"Slow-cooked overnight; the dish Karachi wakes up for.", price:550, pick:true},
  {cat:"nihari", name:"Maghaz Nihari", desc:"With brain masala, ginger juliennes and green chillies.", price:650},
  {cat:"nihari", name:"Paye (Beef) — 2 pcs", desc:"Rich trotters curry, desi-ghee tarka.", price:600},
  {cat:"nihari", name:"Chicken Nihari", desc:"Lighter take on the house classic.", price:450},
  // --- BBQ ---
  {cat:"bbq", name:"Chicken Tikka (Leg / Chest)", desc:"Overnight marinade, blistered over open flame.", price:380},
  {cat:"bbq", name:"Behari Boti", desc:"Thin strips, mustard-oil marinade, Karachi street classic.", price:600},
  {cat:"bbq", name:"Chicken Malai Tikka", desc:"Mild, creamy, charred at the edges.", price:420},
  {cat:"bbq", name:"Mutton Chops — 4 pcs", desc:"Tender ribs, finished with lemon and chaat masala.", price:900},
  {cat:"bbq", name:"Chicken Wings — 8 pcs", desc:"Smoked wings tossed in house masala.", price:450},
  {cat:"bbq", name:"Family BBQ Platter", desc:"Tikka, malai boti, seekh kabab & wings — serves 4–5.", price:2200},
  // --- Karahi ---
  {cat:"karahi", name:"Chicken Karahi (Half)", desc:"Wok-tossed with tomatoes, ginger and green chillies.", price:950},
  {cat:"karahi", name:"Chicken Karahi (Full)", desc:"The full wok — built for sharing.", price:1800},
  {cat:"karahi", name:"Mutton Karahi (Half)", desc:"Slow-tendered mutton, desi-ghee finish.", price:1400},
  {cat:"karahi", name:"Mutton Karahi (Full)", desc:"Our most ordered sharing dish.", price:2400},
  {cat:"karahi", name:"White Karahi (Chicken)", desc:"Cream, yoghurt and black pepper — mild and rich.", price:1000},
  {cat:"karahi", name:"Daal Fry", desc:"Comfort bowl with desi-ghee tarka.", price:350},
  // --- Breads ---
  {cat:"breads", name:"Roghni Naan", desc:"Sesame-topped, tandoor fresh.", price:80},
  {cat:"breads", name:"Tandoori Naan", desc:"Blistered and bubbly, straight from the clay oven.", price:60},
  {cat:"breads", name:"Garlic Naan", desc:"Brushed with garlic butter.", price:120},
  {cat:"breads", name:"Cheese Naan", desc:"Stuffed with molten cheese.", price:180},
  {cat:"breads", name:"Puri Paratha", desc:"Flaky, ghee-laminated layers.", price:100},
  {cat:"breads", name:"Tandoori Roti", desc:"Whole-wheat, tandoor-baked.", price:40},
  // --- Drinks & Dessert ---
  {cat:"drinks", name:"Fresh Lime Soda", desc:"Hand-shaken, salted or sweet.", price:200},
  {cat:"drinks", name:"Doodh Patti", desc:"Slow-brewed milky chai, karak style.", price:150},
  {cat:"drinks", name:"Kashmiri Chai", desc:"Pink tea with crushed pistachio.", price:200},
  {cat:"drinks", name:"Cold Drink", desc:"Chilled soft drink.", price:120},
  {cat:"drinks", name:"Shahi Kheer", desc:"Slow-cooked rice pudding, cardamom and silver leaf.", price:250},
  {cat:"drinks", name:"Gulab Jamun — 2 pcs", desc:"Warm, syrup-soaked, rose-kissed.", price:200},
];

const TABS = [
  {id:"all", label:"All"},
  {id:"kababs", label:"Kababs"},
  {id:"nihari", label:"Nihari & Paye"},
  {id:"bbq", label:"BBQ"},
  {id:"karahi", label:"Karahi"},
  {id:"breads", label:"Breads"},
  {id:"drinks", label:"Drinks & Dessert"},
];

const grid = document.getElementById("menuGrid");
const tabsWrap = document.getElementById("menuTabs");
const searchInput = document.getElementById("menuSearch");
let activeCat = "all";

function rs(n){ return "Rs " + n.toLocaleString("en-PK"); }

function renderTabs(){
  tabsWrap.innerHTML = TABS.map(t =>
    `<button class="tab${t.id===activeCat?" active":""}" data-cat="${t.id}">${t.label}</button>`
  ).join("");
  tabsWrap.querySelectorAll(".tab").forEach(btn =>
    btn.addEventListener("click", () => { activeCat = btn.dataset.cat; renderTabs(); renderMenu(); })
  );
}

function renderMenu(){
  const q = (searchInput.value || "").trim().toLowerCase();
  const items = MENU.filter(it =>
    (activeCat === "all" || it.cat === activeCat) &&
    (!q || it.name.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q))
  );
  if(!items.length){
    grid.innerHTML = `<p class="menu-note" style="grid-column:1/-1">No dishes found — try another search.</p>`;
    return;
  }
  grid.innerHTML = items.map(it => `
    <article class="menu-item">
      <div class="mi-top">
        <span class="mi-name">${it.name}${it.pick ? `<span class="mi-pick">Chef's pick</span>` : ""}</span>
        <span class="mi-dots"></span>
        <span class="mi-price">${rs(it.price)}</span>
      </div>
      <p class="mi-desc">${it.desc}</p>
    </article>
  `).join("");
}

searchInput.addEventListener("input", renderMenu);
renderTabs();
renderMenu();

// Sticky nav shadow
const nav = document.getElementById("nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 8), {passive:true});

// Mobile menu
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
