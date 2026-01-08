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

// GALLERY LOGIC (Corrected to handle category switching)
function renderGallery(filter = "All") {
  const grid = document.getElementById("gallery-grid");
  if (!grid) return;

  grid.innerHTML = "";

  // Filter logic
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

  // Update active tab styling
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle(
      "active",
      btn.getAttribute("onclick").includes(`'${filter}'`)
    );
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
  if (u === "admin" && p === "madsplat2026") {
    localStorage.setItem("madsplat_auth", "true");
    location.reload();
  } else alert("Denied");
}

function processIntaSend(type) {
  const amt = parseFloat(document.getElementById("amount").value);
  if (!amt || amt <= 0) return alert("Invalid amount");

  let history = JSON.parse(localStorage.getItem("madsplat_history") || "[]");
  const tx = {
    id: "MS-" + Date.now(),
    type,
    amount: amt,
    date: new Date().toLocaleString(),
    status: "Completed",
  };
  history.unshift(tx);
  localStorage.setItem("madsplat_history", JSON.stringify(history));

  let bal = parseFloat(localStorage.getItem("madsplat_balance") || "0");
  localStorage.setItem(
    "madsplat_balance",
    type === "DEPOSIT" ? bal + amt : bal - amt
  );
  location.reload();
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  renderGallery("All");
  if (
    localStorage.getItem("madsplat_auth") === "true" &&
    document.getElementById("dashboard")
  ) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("balance").innerText = `KES ${parseFloat(
      localStorage.getItem("madsplat_balance") || "0"
    ).toLocaleString()}`;
    const hist = JSON.parse(localStorage.getItem("madsplat_history") || "[]");
    document.getElementById("history").innerHTML = hist
      .map(
        (t) =>
          `<li style="list-style:none; border-bottom:1px solid #333; padding:10px 0;">${t.type}: KES ${t.amount} (${t.status})</li>`
      )
      .join("");
  }
});
