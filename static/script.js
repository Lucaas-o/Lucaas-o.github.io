document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.querySelector("#theme-toggle");
    const expandButtons = document.querySelectorAll(".expand-button");
    const scrollToTopBtn = document.querySelector("#scroll-to-top");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project");
    const greeting = document.querySelector("#dynamic-greeting");

    // Theme toggle fix
    const savedTheme = localStorage.getItem("theme") || "dark";
    body.dataset.theme = savedTheme;
    themeToggle.addEventListener("click", () => {
        body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", body.dataset.theme);
    });

    // Dynamic greeting
    const hour = new Date().getHours();
    let timeGreeting = "Hello";
    if (hour < 12) timeGreeting = "Good Morning";
    else if (hour < 18) timeGreeting = "Good Afternoon";
    else timeGreeting = "Good Evening";
    greeting.textContent = `${timeGreeting}, Welcome to My Projects`;

    // Project details toggle fix
    expandButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const project = button.closest(".project");
            const details = project.querySelector(".project-details");
            const isExpanded = button.getAttribute("aria-expanded") === "true";

            // Collapse all other details
            document.querySelectorAll(".project-details").forEach((d) => {
                if (d !== details) {
                    d.style.display = "none";
                    d.previousElementSibling.setAttribute("aria-expanded", "false");
                }
            });

            button.setAttribute("aria-expanded", !isExpanded);
            details.style.display = isExpanded ? "none" : "block";
            details.style.opacity = isExpanded ? "0" : "1";
        });
    });

    // Scroll-to-top button
    window.addEventListener("scroll", () => {
        scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Project filter
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            const filter = btn.dataset.filter;

            projects.forEach((project) => {
                const category = project.dataset.category;
                project.style.display =
                    filter === "all" || category === filter ? "block" : "none";
            });
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
});

// Dynamically add theme toggle button
document.body.insertAdjacentHTML(
    "beforeend",
    `<button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">Toggle Theme</button>`
);