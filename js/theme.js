document.addEventListener("click", (e) => {
  // 1. HAMBURGER TOGGLE
  if (e.target.closest("#hamburger")) {
    document.getElementById("hamburger").classList.toggle("active");
    document.getElementById("nav-menu").classList.toggle("active");
  }

  // 2. THEME TOGGLE
  if (e.target.closest("#theme-toggle")) {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("madsplat-theme", next);
  }

  // 3. CATEGORY FILTERING (Updated for Clean URLs)
  const catBtn = e.target.closest(".nav-cat");
  if (catBtn) {
    const category = catBtn.getAttribute("data-cat");

    // Check if we are on the home page (root or index.html)
    const isHomePage =
      window.location.pathname === "/" ||
      window.location.pathname.endsWith("index.html") ||
      window.location.pathname === "/madsplat/"; // For GH Pages subfolder

    if (!isHomePage) {
      // Redirect to root with the filter parameter
      window.location.href = `${window.location.origin}/madsplat/?filter=${category}`;
    } else {
      renderGallery(category);
      document.getElementById("hamburger").classList.remove("active");
      document.getElementById("nav-menu").classList.remove("active");
    }
  }
});

// Detect filter on load
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get("filter");
  if (filter && typeof renderGallery === "function") {
    // Delay slightly to ensure app.js data is ready
    setTimeout(() => renderGallery(filter), 50);
  }
});

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("madsplat-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Check for URL parameters on load (for cross-page filtering)
  const params = new URLSearchParams(window.location.search);
  const filter = params.get("filter");
  if (filter && typeof renderGallery === "function") {
    renderGallery(filter);
  }
});
