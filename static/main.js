// Main JavaScript file for the website
// Handles theme toggling, navigation, scroll animations, and page-specific features

const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");
const scrollToTopBtn = document.querySelector("#scroll-to-top");

// Theme initialization and toggle
const initTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    body.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");
    updateThemeLogos();

    const themeToggle = document.querySelector("#theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";
            localStorage.setItem("theme", body.dataset.theme);
            updateThemeLogos();
        });
    }
};

// Update logos based on theme using data attributes for scalability
const updateThemeLogos = () => {
    const themeLogos = document.querySelectorAll(".theme-logo");
    themeLogos.forEach(logo => {
        const darkSrc = logo.getAttribute("data-dark");
        const lightSrc = logo.getAttribute("data-light");
        if (darkSrc && lightSrc) {
            logo.src = body.dataset.theme === "dark" ? darkSrc : lightSrc;
        }
    });
};

// Mobile menu toggle
if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
        navList.classList.toggle("active");
    });
}

// Scroll-to-top button visibility and smooth scroll
if (scrollToTopBtn) {
    window.addEventListener("scroll", () => {
        scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// Load featured projects dynamically (only on pages with .projects-container)
const loadFeaturedProjects = () => {
    const projectsContainer = document.querySelector(".projects-container");
    if (projectsContainer) {
        const featuredProjects = [
            { title: "Pomodoro App", img: "media/PomodoroTimerPreview.png", link: "https://github.com/Lucaas-o/pomodoro-app" },
            { title: "Python Mini-Projects", img: "media/python-miniprojects.png", link: "https://github.com/Lucaas-o/python-miniprojects" },
            { title: "Human-like Typer", img: "media/human-like-typer.png", link: "https://github.com/Lucaas-o/human-like-typer" },
            { title: "Expenses Tracker", img: "media/ExpensesTracker.png", link: "https://github.com/Lucaas-o/ExpensesTracker" },
            { title: "Universal Decryptor", img: "media/Universal-Decryptor.png", link: "https://github.com/Lucaas-o/Universal-Decryptor" },
            { title: "Password Generator", img: "media/PasswordGenerator.png", link: "https://github.com/Lucaas-o/PasswordGenerator" },
            { title: "Weather App", img: "media/WeatherApp.png", link: "https://github.com/Lucaas-o/WeatherDashboard" },
        ];
        featuredProjects.forEach(project => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("project", "scroll-reveal");
            projectCard.innerHTML = `
                <a href="${project.link}" target="_blank" aria-label="${project.title}">
                    <img src="${project.img}" alt="${project.title} Screenshot" loading="lazy">
                </a>
                <div class="project-title">${project.title}</div>
            `;
            projectsContainer.appendChild(projectCard);
        });
    }
};

// Smooth scrolling for navigation links with # anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Typing animation for hero subtitle (only on pages with .hero-subtitle)
const typeHeroSubtitle = () => {
    const heroSubtitle = document.querySelector(".hero-subtitle");
    if (heroSubtitle) {
        const text = "Coding the Future at 16";
        heroSubtitle.textContent = "";
        let index = 0;
        function typeText() {
            if (index < text.length) {
                heroSubtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 100);
            }
        }
        typeText();
    }
};

// Scroll reveal animation using IntersectionObserver for performance
const setupScrollReveal = () => {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1 // Trigger when 10% of the element is visible
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    document.querySelectorAll(".scroll-reveal").forEach(element => {
        observer.observe(element);
    });
};

// Basic form validation for contact form (only on pages with a form)
const setupFormValidation = () => {
    const contactForm = document.querySelector("form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");

            if (nameInput && emailInput && messageInput) {
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const message = messageInput.value.trim();

                if (!name || !email || !message) {
                    e.preventDefault();
                    alert("Please fill out all fields before sending!");
                }
            }
        });
    }
};

// Initialize everything when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    loadFeaturedProjects();
    typeHeroSubtitle();
    setupScrollReveal();
    setupFormValidation();
});