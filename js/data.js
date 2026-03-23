/* ── data.js — Kenya Counties + Sub-counties (static) ────────────
   API_BASE is defined HERE so it is available when initDropdowns()
   is called on DOMContentLoaded (before app.js runs its own copy).
─────────────────────────────────────────────────────────────────── */

// ── API base URL (must be defined before initDropdowns is called) ──
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://127.0.0.1:5000'
  : 'https://foodpredictor-backend.onrender.com';

const COUNTIES = {
  "Nairobi":   ["Westlands","Dagoretti North","Dagoretti South","Langata","Kibra","Roysambu","Kasarani","Ruaraka","Embakasi South","Embakasi North","Embakasi Central","Embakasi East","Embakasi West","Makadara","Kamukunji","Starehe","Mathare"],
  "Mombasa":   ["Changamwe","Jomvu","Kisauni","Nyali","Likoni","Mvita"],
  "Kisumu":    ["Kisumu East","Kisumu West","Kisumu Central","Seme","Nyando","Muhoroni","Nyakach"],
  "Nakuru":    ["Nakuru Town East","Nakuru Town West","Naivasha","Gilgil","Kuresoi South","Kuresoi North","Molo","Njoro","Rongai","Subukia","Bahati"],
  "Eldoret":   ["Kapsaret","Kesses","Moiben","Ainabkoi","Soy","Turbo","Wareng"],
  "Thika":     ["Gatanga","Githunguri","Juja","Kabete","Kiambu","Kikuyu","Limuru","Lari","Ruiru","Thika Town"],
  "Nyeri":     ["Tetu","Kieni East","Kieni West","Mathira East","Mathira West","Nyeri Town","Othaya","Mukurweini"],
  "Meru":      ["Igembe South","Igembe Central","Igembe North","Tigania West","Tigania East","North Imenti","Buuri","Central Imenti","South Imenti"],
  "Kisii":     ["Bonchari","South Mugirango","Bomachoge Borabu","Bobasi","Bomachoge Chache","Nyaribari Masaba","Nyaribari Chache","Kitutu Chache North","Kitutu Chache South"],
  "Kakamega":  ["Lugari","Likuyani","Malava","Lurambi","Navakholo","Mumias West","Mumias East","Matungu","Butere","Khwisero","Shinyalu","Ikolomani"],
  "Garissa":   ["Garissa Township","Balambala","Lagdera","Dadaab","Fafi","Ijara"],
  "Machakos":  ["Masinga","Yatta","Kangundo","Matungulu","Kathiani","Mavoko","Machakos Town","Mwala"],
  "Kitale":    ["Kiminini","Cherangany","Saboti","Kwanza","Endebess"],
  "Malindi":   ["Kilifi North","Kilifi South","Kaloleni","Rabai","Ganze","Malindi","Magarini"],
  "Lamu":      ["Lamu East","Lamu West"],
  "Wajir":     ["Wajir North","Wajir East","Tarbaj","Wajir West","Eldas","Wajir South"],
  "Marsabit":  ["Moyale","North Horr","Saku","Laisamis"],
  "Isiolo":    ["Isiolo North","Isiolo South"],
  "Embu":      ["Manyatta","Runyenjes","Mbeere South","Mbeere North"],
  "Murang'a":  ["Kangema","Mathioya","Kiharu","Kigumo","Maragwa","Kandara","Gatanga"],
};

const MONTHS_FULL  = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// Built-in fallback commodity list (used when backend is offline)
const FALLBACK_CATEGORIES = {
  "Legumes & Pulses":    ["Cauli Local","Cauli Local(Jyapu)","French Bean(Local)","French Bean(Hybrid)","French Bean(Rajma)","Cow pea(Long)","Cowpea(Short)","Green Peas","Soyabean Green","Beans Dry","Lentils","Green Gram"],
  "Vegetables":          ["Brinjal Long","Brinjal Round","Raddish White(Local)","Raddish White(Hybrid)","Tomato Local","Tomato Hybrid","Onion Dry(Local)","Onion Dry(Imported)","Potato White","Potato Red","Cabbage Local","Spinach Local","Carrot Local","Carrot Hybrid","Cucumber Local","Capsicum Mixed"],
  "Grains & Cereals":    ["Maize Dry","Wheat","Rice (Coarse)","Rice (Medium)","Rice (Fine)"],
  "Fruits":              ["Banana Local","Mango Local","Orange Local","Avocado"],
  "Dairy & Eggs":        ["Milk Fresh","Eggs (Tray)"],
  "Meat & Fish":         ["Beef Bone-in","Goat Meat"],
  "Spices & Condiments": ["Sugar","Salt Iodized","Cooking Oil (Sunflower)","Tea Leaves"],
};

// Loaded from backend API — populated by initDropdowns()
let FOOD_CATEGORIES = {};

/* ── Populate county dropdown ── */
function populateCounties() {
  const sel = document.getElementById('sel-county');
  if (!sel) return;
  sel.innerHTML = '<option value="">Select county</option>';
  Object.keys(COUNTIES).forEach(c => {
    const o = document.createElement('option');
    o.value = c; o.textContent = c;
    sel.appendChild(o);
  });
}

/* ── Load sub-counties when county changes ── */
function loadSubCounties() {
  const county = document.getElementById('sel-county').value;
  const sel    = document.getElementById('sel-subcounty');
  sel.innerHTML = '<option value="">Select sub-county</option>';
  if (county && COUNTIES[county]) {
    sel.disabled = false;
    COUNTIES[county].forEach(sc => sel.add(new Option(sc, sc)));
  } else {
    sel.disabled = true;
  }
}

/* ── Load food types when category changes ── */
function loadFoodTypes() {
  const cat = document.getElementById('sel-category').value;
  const sel = document.getElementById('sel-foodtype');
  sel.innerHTML = '<option value="">Select food type</option>';
  if (cat && FOOD_CATEGORIES[cat] && FOOD_CATEGORIES[cat].length) {
    sel.disabled = false;
    FOOD_CATEGORIES[cat].forEach(f => sel.add(new Option(f, f)));
  } else {
    sel.disabled = true;
    sel.innerHTML = '<option value="">Select food category first</option>';
  }
}

/* ── Populate category dropdown from a categories object ── */
function _populateCategories(catSel, categories) {
  catSel.innerHTML = '<option value="">Select food category</option>';
  Object.keys(categories).sort().forEach(cat => {
    catSel.add(new Option(cat, cat));
  });
}

/* ── Fetch categories from backend, populate dropdowns ── */
async function initDropdowns() {
  // Counties are always populated from static data — no backend needed
  populateCounties();

  const catSel = document.getElementById('sel-category');
  if (!catSel) return;

  // Show a loading state while we try the backend
  catSel.innerHTML = '<option value="">Loading categories…</option>';
  catSel.disabled = true;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const res = await fetch(`${API_BASE}/api/commodities`, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    FOOD_CATEGORIES = await res.json();

    catSel.disabled = false;
    _populateCategories(catSel, FOOD_CATEGORIES);

    console.log('✅ Loaded', Object.keys(FOOD_CATEGORIES).length,
                'categories from backend,',
                Object.values(FOOD_CATEGORIES).flat().length, 'commodities');
  } catch (e) {
    console.warn('⚠️ Backend offline or unreachable — using built-in commodity list:', e.message);

    // Use the built-in fallback so the UI is always functional
    FOOD_CATEGORIES = FALLBACK_CATEGORIES;
    catSel.disabled = false;
    _populateCategories(catSel, FOOD_CATEGORIES);
  }
}
