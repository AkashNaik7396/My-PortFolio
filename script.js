// Corrected JavaScript code for portfolio interactions

// Intersection Observer for sections
const sections = document.querySelectorAll(".section");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        entry.target.classList.remove("hidden");
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Lightbox functionality
const certificates = document.querySelectorAll(".certificate-img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
let currentIndex = 0;

certificates.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showLightbox(img.src);
  });
});

function showLightbox(src) {
  lightboxImg.src = src;
  lightbox.style.display = "flex";
  lightboxImg.classList.remove("zoomed");
  document.body.style.overflow = "hidden"; // Prevent scroll
}

function closeLightbox() {
  lightbox.style.display = "none";
  document.body.style.overflow = "auto"; // Restore scroll
}

function nextCertificate() {
  currentIndex = (currentIndex + 1) % certificates.length;
  lightboxImg.src = certificates[currentIndex].src;
}

function prevCertificate() {
  currentIndex = (currentIndex - 1 + certificates.length) % certificates.length;
  lightboxImg.src = certificates[currentIndex].src;
}

lightboxImg.addEventListener("click", () => {
  lightboxImg.classList.toggle("zoomed");
});

// Swipe gestures for lightbox
let startX = 0;
lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextCertificate(); // Swipe left
  else if (endX - startX > 50) prevCertificate(); // Swipe right
});

// Dark mode toggle
const toggleBtn = document.getElementById("mode-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️";
}

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}
