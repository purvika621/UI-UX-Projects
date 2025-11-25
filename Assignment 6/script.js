// ------------------ Packages Data -------------------
let packages = [
  { id: 1, destination: "Paris, France", durationDays: 7, basePrice: 120000, season: "peak" },
  { id: 2, destination: "Maldives", durationDays: 5, basePrice: 20000, season: "off" },
  { id: 3, destination: "Tokyo, Japan", durationDays: 10, basePrice: 500000, season: "peak" }
];

// ------------------ Pricing Logic -------------------
function calculateFinalPrice(pkg) {
  let price = pkg.basePrice;
  if (pkg.season === "peak") price *= 1.2;    // 20% hike
  if (pkg.durationDays > 7) price *= 1.1;    // long trip surcharge
  return price;
}

// ------------------ Render Packages Table -------------------
function renderTable() {
  let html = "<table><tr><th>Destination</th><th>Duration</th><th>Base Price</th><th>Season</th><th>Final Price</th></tr>";
  packages.forEach(pkg => {
    html += `<tr>
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays} Days</td>
      <td>₹${pkg.basePrice}</td>
      <td>${pkg.season}</td>
      <td>₹${calculateFinalPrice(pkg)}</td>
    </tr>`;
  });
  html += "</table>";
  document.getElementById("packagesTable").innerHTML = html;
}

// ------------------ Populate Booking Dropdown -------------------
function populatePackages() {
  let select = document.getElementById("packageSelect");
  if (!select) return;
  packages.forEach(pkg => {
    let opt = document.createElement("option");
    opt.value = pkg.id;
    opt.textContent = `${pkg.destination} - ₹${pkg.basePrice}`;
    select.appendChild(opt);
  });
}

// ------------------ Estimate Booking Price -------------------
function estimatePrice() {
  let pkgId = parseInt(document.getElementById("packageSelect").value);
  let pkg = packages.find(p => p.id === pkgId);

  let checkIn = new Date(document.getElementById("checkIn").value);
  let checkOut = new Date(document.getElementById("checkOut").value);
  let nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);

  if (isNaN(nights) || nights <= 0) {
    document.getElementById("priceOutput").innerHTML = "❌ Please enter valid dates!";
    return;
  }

  let guests = parseInt(document.getElementById("guests").value);
  let basePrice = calculateFinalPrice(pkg);
  let total = basePrice * nights;

  if (guests > 2) total *= 1.2;

  let promo = document.getElementById("promo").value.trim().toUpperCase();
  switch (promo) {
    case "EARLYBIRD": total *= 0.9; break;
    case "FESTIVE": total *= 0.85; break;
  }

  document.getElementById("priceOutput").innerHTML =
    "✅ Estimated Price: ₹" + total.toFixed(2);
}


// ------------------ Gallery Modal -------------------
// -------- Gallery Modal --------
window.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImg");

  // Open modal when clicking thumbnail
  document.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", function() {
      modal.style.display = "flex";
      modalImg.src = this.getAttribute("data-large");
      modalImg.alt = this.alt;
      modalImg.title = this.title;
    });
  });

  // Close modal when clicking anywhere
  if (modal) {
    modal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  // -------- Nav Highlight --------
  let links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    if (window.location.href.includes(link.getAttribute("href"))) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

