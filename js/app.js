// ART DATA - 3 per category
const artworks = [
  // Paintings
  {
    id: 1,
    title: "Midnight Oil",
    category: "Paintings",
    price: 86000,
    img: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
  },
  {
    id: 2,
    title: "Canvas Flow",
    category: "Paintings",
    price: 150000,
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
  },
  {
    id: 3,
    title: "Urban Texture",
    category: "Paintings",
    price: 120000,
    img: "https://images.unsplash.com/photo-1549490349-8643362247b5",
  },

  // Digital Art
  {
    id: 4,
    title: "Cyber Pulse",
    category: "Digital Art",
    price: 100000,
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
  },
  {
    id: 5,
    title: "Neon Static",
    category: "Digital Art",
    price: 38000,
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
  },
  {
    id: 6,
    title: "Vector Void",
    category: "Digital Art",
    price: 108000,
    img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2",
  },

  // Oil Pastel
  {
    id: 7,
    title: "Soft Grit",
    category: "Oil Pastel",
    price: 196000,
    img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
  },
  {
    id: 8,
    title: "Pastel Dusk",
    category: "Oil Pastel",
    price: 46000,
    img: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb",
  },
  {
    id: 9,
    title: "Chroma Choice",
    category: "Oil Pastel",
    price: 65000,
    // Vibrant rainy street with heavy "pastel" texture
    img: "https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&w=800&q=80",
  },
];

// GALLERY LOGIC
function renderGallery(filter = "All") {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const filtered =
    filter === "All" ? artworks : artworks.filter((a) => a.category === filter);

  filtered.forEach((art) => {
    grid.innerHTML += `
            <div class="art-card">
                <img src="${art.img}" alt="${art.title}">
                <div style="padding: 15px 0;">
                    <small style="text-transform:uppercase; color:var(--text-sub); font-size:0.7rem;">${
                      art.category
                    }</small>
                    <h3 style="font-family:var(--font-heading); margin:5px 0;">${
                      art.title
                    }</h3>
                    <span class="price">KES ${art.price.toLocaleString()}</span>
                    <button onclick="buyNow(${art.id})">Buy Now</button>
                </div>
            </div>`;
  });
}

function buyNow(id) {
  const art = artworks.find((a) => a.id === id);
  localStorage.setItem("selectedArtwork", JSON.stringify(art));
  window.location.href = "checkout.html";
}

// ADMIN LOGIC
function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  // UPDATED CREDENTIALS
  if (u === "admin" && p === "csvadmin96!") {
    localStorage.setItem("madsplat_auth", "true");
    location.reload();
  } else {
    alert("Denied");
  }
}

function logout() {
  localStorage.removeItem("madsplat_auth");
  window.location.href = "../index.html";
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderGallery === "function") {
    const params = new URLSearchParams(window.location.search);
    renderGallery(params.get("filter") || "All");
  }

  const loginForm = document.getElementById("login-form");
  const adminContent = document.getElementById("admin-content");

  if (localStorage.getItem("madsplat_auth") === "true") {
    if (loginForm) loginForm.style.display = "none";
    if (adminContent) {
      adminContent.style.display = "block";
      document.getElementById("dashboard").style.display = "block";
      loadAdminData();
    }
  } else {
    if (loginForm) loginForm.style.display = "block";
    if (adminContent) adminContent.style.display = "none";
  }
});

function loadAdminData() {
  const balanceEl = document.getElementById("balance");
  const historyEl = document.getElementById("history");

  // 1. Calculate balance based on successful transactions
  // For now, we simulate this by checking if a lastTx exists
  const lastTx = JSON.parse(localStorage.getItem("lastTx") || "null");
  let currentBal = parseFloat(localStorage.getItem("madsplat_balance") || "0");

  if (lastTx && !localStorage.getItem("tx_processed")) {
    // If there is a new transaction from Paystack, add it to balance
    const art = JSON.parse(localStorage.getItem("selectedArtwork"));
    if (art) {
      currentBal += art.price;
      localStorage.setItem("madsplat_balance", currentBal);
      localStorage.setItem("tx_processed", "true"); // Prevent double counting on refresh
    }
  }

  if (balanceEl) {
    balanceEl.innerText = `KES ${currentBal.toLocaleString()}`;
  }

  // 2. Display Paystack History
  if (historyEl) {
    if (lastTx) {
      // Show the Paystack reference as requested
      historyEl.innerHTML = `
        <li style="list-style:none; border:1px solid var(--divider); padding:15px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong style="color:var(--cta);">SUCCESS</strong><br>
              <small style="color:var(--text-sub);">Ref: ${
                lastTx.reference
              }</small>
            </div>
            <div style="text-align:right;">
              <strong>KES ${currentBal.toLocaleString()}</strong><br>
              <small style="color:var(--text-sub);">${new Date().toLocaleDateString()}</small>
            </div>
          </div>
        </li>`;
    } else {
      historyEl.innerHTML = `<p style="color:var(--text-sub); text-align:center;">No recent transactions found.</p>`;
    }
  }
}

// New function to save account changes locally
function saveAccountSettings() {
  const name = document.getElementById("studio-name").value;
  const email = document.getElementById("studio-email").value;
  localStorage.setItem("studio_info", JSON.stringify({ name, email }));
  alert("Account settings updated locally!");
}

// TAB TOGGLE
document.querySelectorAll(".admin-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-target");
    document.querySelectorAll(".tab-content").forEach((section) => {
      section.style.display = "none";
    });
    document.getElementById(target).style.display = "block";
  });
});

function adminDeposit() {
  const amountInput = document.getElementById("admin-deposit-amount");
  const currencyInput = document.getElementById("admin-currency");

  const amt = parseFloat(amountInput.value);
  const selectedCurrency = currencyInput.value;

  if (!amt || amt <= 0) {
    return alert("Please enter a valid amount.");
  }

  const adminEmail = "trevomaina@gmail.com";
  const adminPhone = "254718009811";

  if (typeof PaymentService !== "undefined") {
    // Pass the selected currency to the service
    PaymentService.initiatePayment(
      amt,
      adminEmail,
      adminPhone,
      selectedCurrency
    );
  } else {
    alert("Error: Payment system (payment.js) not loaded.");
  }
}
