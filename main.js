/* ==========================================================
   GAMING CAFE — INTERACTIVE LOGIC (main.js)
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initScrollSpy();
    initTournamentCountdown();
    initCostCalculator();
    initGameFilter();
    initBackToTop();
    initFormValidation();
});

/* ----------------------------------------------------------
   1. SCROLLSPY (Highlight Active Navigation Link on Scroll)
   ---------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a[href^='#']");

    window.addEventListener("scroll", () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active-nav");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active-nav");
                    }
                });
            }
        });
    });
}

/* ----------------------------------------------------------
   2. TOURNAMENT LIVE COUNTDOWN TIMERS
   ---------------------------------------------------------- */
function initTournamentCountdown() {
    // Target dates for tournaments
    const tournaments = [
        { id: "timer-valorant", date: "August 15, 2026 10:00:00" },
        { id: "timer-bgmi", date: "August 22, 2026 14:00:00" },
        { id: "timer-fifa", date: "August 30, 2026 12:00:00" }
    ];

    tournaments.forEach(t => {
        const timerElement = document.getElementById(t.id);
        if (!timerElement) return;

        const targetTime = new Date(t.date).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetTime - now;

            if (difference < 0) {
                clearInterval(interval);
                timerElement.innerHTML = "Tournament Live Now!";
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            timerElement.innerHTML = `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    });
}

/* ----------------------------------------------------------
   3. INTERACTIVE GAMING COST CALCULATOR
   ---------------------------------------------------------- */
function initCostCalculator() {
    const hoursInput = document.getElementById("calc-hours");
    const platformSelect = document.getElementById("calc-platform");
    const snacksCheck = document.getElementById("calc-snacks");
    const totalDisplay = document.getElementById("calc-total");

    if (!hoursInput || !platformSelect || !totalDisplay) return;

    function calculateTotal() {
        const hours = parseInt(hoursInput.value) || 0;
        const ratePerHour = parseInt(platformSelect.value) || 100;
        let total = hours * ratePerHour;

        if (snacksCheck && snacksCheck.checked) {
            total += 150; // Flat combo snack charge
        }

        totalDisplay.innerText = `₹${total}`;
    }

    hoursInput.addEventListener("input", calculateTotal);
    platformSelect.addEventListener("change", calculateTotal);
    if (snacksCheck) snacksCheck.addEventListener("change", calculateTotal);
}

/* ----------------------------------------------------------
   4. LIVE GAME SEARCH & GENRE FILTER
   ---------------------------------------------------------- */
function initGameFilter() {
    const searchInput = document.getElementById("game-search");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const gameCards = document.querySelectorAll(".game-container .card");

    if (!gameCards.length) return;

    // Search bar input
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            gameCards.forEach(card => {
                const title = card.querySelector("h3").innerText.toLowerCase();
                const genre = card.querySelector("p").innerText.toLowerCase();
                if (title.includes(query) || genre.includes(query)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // Genre filter buttons
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active-filter"));
            button.classList.add("active-filter");

            const filterValue = button.getAttribute("data-filter").toLowerCase();

            gameCards.forEach(card => {
                const genre = card.querySelector("p").innerText.toLowerCase();
                if (filterValue === "all" || genre.includes(filterValue)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

/* ----------------------------------------------------------
   5. BACK TO TOP FLOATING BUTTON
   ---------------------------------------------------------- */
function initBackToTop() {
    const topBtn = document.createElement("button");
    topBtn.id = "backToTopBtn";
    topBtn.innerHTML = "↑";
    topBtn.title = "Go to top";
    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ----------------------------------------------------------
   6. CONTACT & TOURNAMENT FORM VALIDATION
   ---------------------------------------------------------- */
function initFormValidation() {
    const contactForm = document.querySelector("form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (e) => {
        const phoneInput = contactForm.querySelector("input[name='phone']");
        if (phoneInput) {
            const phoneVal = phoneInput.value.trim();
            // Validate 10-digit Indian phone number
            const phonePattern = /^[6-9]\d{9}$/;
            if (!phonePattern.test(phoneVal)) {
                e.preventDefault();
                alert("⚠️ Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.");
                phoneInput.focus();
                return false;
            }
        }
    });
}