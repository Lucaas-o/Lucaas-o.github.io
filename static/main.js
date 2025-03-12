// main.js
const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");
const scrollToTopBtn = document.querySelector("#scroll-to-top");

// Theme toggle
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

const updateThemeLogos = () => {
    const themeLogos = document.querySelectorAll(".theme-logo");
    themeLogos.forEach(logo => {
        if (logo.classList.contains("github-logo")) {
            logo.src = body.dataset.theme === "dark" ? "media/github-mark-white.png" : "media/github-mark.png";
        } else if (logo.classList.contains("x-logo")) {
            logo.src = body.dataset.theme === "dark" ? "media/logo-white.png" : "media/logo-black.png";
        }
    });
};

// Menu toggle
menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
});

// Scroll-to-top
window.addEventListener("scroll", () => {
    scrollToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Featured projects
const loadFeaturedProjects = () => {
    const projectsContainer = document.querySelector(".projects-container");
    if (!projectsContainer) return;
    const featuredProjects = [
        { title: "Pomodoro App", img: "media/PomodoroTimerPreview.png", link: "https://github.com/Lucaas-o/pomodoro-app" },
        { title: "Python Mini-Projects", img: "media/python-miniprojects.png", link: "https://github.com/Lucaas-o/python-miniprojects" },
        { title: "Human-like Typer", img: "media/human-like-typer.png", link: "https://github.com/Lucaas-o/human-like-typer" },
        { title: "Expenses Tracker", img: "media/ExpensesTracker.png", link: "https://github.com/Lucaas-o/ExpensesTracker" },
        { title: "Universal Decryptor", img: "media/Universal-Decryptor.png", link: "https://github.com/Lucaas-o/Universal-Decryptor" }
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
};

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Typing animation
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

// Scroll reveal animation
const handleScrollAnimation = () => {
    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top <= windowHeight * 0.9) {
            el.classList.add("active");
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    loadFeaturedProjects();
    typeHeroSubtitle();
    handleScrollAnimation();
});

window.addEventListener("scroll", handleScrollAnimation);