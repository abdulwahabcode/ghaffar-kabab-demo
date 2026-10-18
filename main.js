/* Khan Baba Restaurant — interactive: sticky nav, mobile menu, menu tabs, scrollspy */
(function () {
  "use strict";

  /* ---------- Menu data (prices in PKR) ---------- */
  var MENU = [
    // Desi Specials
    { cat: "desi", name: "Mutton Qorma", desc: "Slow-cooked mutton in a rich, aromatic desi-ghee gravy.", price: "Rs 650", badge: "Most Loved" },
    { cat: "desi", name: "Beef Qorma", desc: "Tender beef simmered with browned onions and garam masala.", price: "Rs 550" },
    { cat: "desi", name: "Chicken Qorma", desc: "Classic home-style qorma with a silky, spiced gravy.", price: "Rs 450" },
    { cat: "desi", name: "Qeema Naan Special", desc: "Tandoor-baked naan stuffed with spiced minced beef.", price: "Rs 400" },
    { cat: "desi", name: "Daal Fry Tadka", desc: "Yellow daal tempered with garlic, cumin and desi ghee.", price: "Rs 350" },
    { cat: "desi", name: "Daal Makhani", desc: "Creamy black lentils, slow-simmered overnight.", price: "Rs 380" },
    { cat: "desi", name: "Aloo Qeema", desc: "Minced beef with soft potatoes — a desi favourite.", price: "Rs 420" },
    { cat: "desi", name: "Mix Sabzi", desc: "Seasonal vegetables tossed in light desi masala.", price: "Rs 320" },
    // Karahi
    { cat: "karahi", name: "Mutton Karahi (Half)", desc: "Fresh mutton, tomatoes, ginger — cooked to order in iron karahi.", price: "Rs 1,150" },
    { cat: "karahi", name: "Mutton Karahi (Full)", desc: "The full experience — serves 3 to 4, desi ghee finish.", price: "Rs 2,250", badge: "Chef's Special" },
    { cat: "karahi", name: "Chicken Karahi (Half)", desc: "Juicy chicken with fresh tomatoes and green chillies.", price: "Rs 750" },
    { cat: "karahi", name: "Chicken Karahi (Full)", desc: "Serves 3 to 4 — Lahore's favourite, done right.", price: "Rs 1,450" },
    { cat: "karahi", name: "White Chicken Karahi", desc: "Creamy white gravy with black pepper and yoghurt.", price: "Rs 850" },
    // BBQ
    { cat: "bbq", name: "Seekh Kabab — Beef (4 pcs)", desc: "Hand-rolled, charcoal-grilled, served with onion rings.", price: "Rs 450" },
    { cat: "bbq", name: "Chicken Tikka", desc: "Overnight-marinated leg piece, smoky and tender.", price: "Rs 380" },
    { cat: "bbq", name: "Chicken Malai Boti", desc: "Cream-cheese marinade — soft, mild, melts in the mouth.", price: "Rs 480" },
    { cat: "bbq", name: "Chicken Boti", desc: "Spicy masala boti cubes grilled over open flame.", price: "Rs 420" },
    { cat: "bbq", name: "Mutton Chops", desc: "Premium chops with a charred, peppery crust.", price: "Rs 650" },
    { cat: "bbq", name: "Khan Baba BBQ Platter", desc: "Tikka, seekh kabab, malai boti & chops — serves 4.", price: "Rs 1,800", badge: "Family Deal" },
    // Breads
    { cat: "breads", name: "Qeema Naan", desc: "Stuffed with spiced qeema, brushed with desi ghee.", price: "Rs 380" },
    { cat: "breads", name: "Roghni Naan", desc: "Soft, sesame-topped — perfect with qorma.", price: "Rs 80" },
    { cat: "breads", name: "Garlic Naan", desc: "Fresh garlic and coriander, tandoor-hot.", price: "Rs 120" },
    { cat: "breads", name: "Kulcha Naan", desc: "Flaky, layered, slightly crisp edges.", price: "Rs 100" },
    { cat: "breads", name: "Tandoori Roti", desc: "Whole-wheat, straight from the tandoor wall.", price: "Rs 50" },
    // Drinks & Dessert
    { cat: "drinks", name: "Sweet Lassi", desc: "Thick Punjabi lassi with a malai topping.", price: "Rs 180" },
    { cat: "drinks", name: "Salted Lassi", desc: "Classic namkeen lassi — the desi cooler.", price: "Rs 180" },
    { cat: "drinks", name: "Doodh Patti", desc: "Slow-brewed milky chai, karak style.", price: "Rs 120" },
    { cat: "drinks", name: "Fresh Lime Soda", desc: "Sweet, salted or mixed — fresh lime only.", price: "Rs 150" },
    { cat: "drinks", name: "Soft Drink", desc: "Chilled — regular and diet.", price: "Rs 150" },
    { cat: "drinks", name: "Mineral Water", desc: "Sealed bottled water.", price: "Rs 120" },
    { cat: "drinks", name: "Gulab Jamun (2 pcs)", desc: "Warm, soft, soaked in rose syrup.", price: "Rs 200" },
    { cat: "drinks", name: "Shahi Tukray", desc: "Royal bread pudding with rabri and nuts.", price: "Rs 280" },
    { cat: "drinks", name: "Kheer", desc: "Slow-cooked rice pudding, cardamom-kissed.", price: "Rs 250" }
  ];

  /* ---------- Render menu ---------- */
  var grid = document.getElementById("menuGrid");
  var tabs = document.querySelectorAll("#menuTabs .tab");

  function cardHTML(item) {
    var badge = item.badge ? '<span class="menu-badge">' + item.badge + "</span>" : "";
    return (
      '<article class="menu-card">' + badge +
      '<div class="menu-card-head"><h3>' + item.name + '</h3>' +
      '<span class="menu-price">' + item.price + "</span></div>" +
      '<div class="menu-dots" aria-hidden="true"></div>' +
      "<p>" + item.desc + "</p></article>"
    );
  }

  function renderMenu(cat) {
    grid.classList.add("fading");
    setTimeout(function () {
      var items = MENU.filter(function (m) { return m.cat === cat; });
      grid.innerHTML = items.map(cardHTML).join("");
      grid.classList.remove("fading");
    }, 180);
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      if (tab.classList.contains("active")) return;
      tabs.forEach(function (t) {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      renderMenu(tab.getAttribute("data-cat"));
    });
  });

  // initial render
  grid.innerHTML = MENU.filter(function (m) { return m.cat === "desi"; }).map(cardHTML).join("");

  /* ---------- Sticky nav shadow ---------- */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Scrollspy ---------- */
  var spyLinks = document.querySelectorAll(".nav-link");
  var sections = ["home", "story", "menu", "reviews", "visit"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            spyLinks.forEach(function (l) {
              var on = l.getAttribute("href") === "#" + e.target.id;
              l.classList.toggle("active", on);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (s) { obs.observe(s); });
  }
})();
