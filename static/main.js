/**
 * Lucas O. Portfolio - Main Logic
 * Refactored for performance and modern UI features
 */

const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-list");
const scrollToTopBtn = document.querySelector("#scroll-to-top");

// --- 1. Theme Management ---
const initTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Set initial theme
    body.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");
    
    const themeToggle = document.querySelector("#theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const newTheme = body.dataset.theme === "dark" ? "light" : "dark";
            body.dataset.theme = newTheme;
            localStorage.setItem("theme", newTheme);
            updateThemeLogos();
        });
    }
    updateThemeLogos();
};

const updateThemeLogos = () => {
    document.querySelectorAll(".theme-logo").forEach(logo => {
        const src = body.dataset.theme === "dark" 
            ? logo.dataset.dark 
            : logo.dataset.light;
        if (src) logo.src = src;
    });
};

// --- 2. Dynamic Project Injection ---
const loadFeaturedProjects = () => {
    const projectsContainer = document.querySelector(".projects-container");
    if (!projectsContainer) return;

    const featuredProjects = [
        { 
            title: "Pomodoro App", 
            img: "media/PomodoroTimerPreview.png", 
            link: "https://github.com/Lucaas-o/pomodoro-app",
            status: "Live",
            tags: ["JS", "Focus"]
        },
        { 
            title: "Python Mini-Projects", 
            img: "media/python-miniprojects.png", 
            link: "https://github.com/Lucaas-o/python-miniprojects",
            status: "Archive",
            tags: ["Python", "Automation"]
        },
        { 
            title: "Human-like Typer", 
            img: "media/human-like-typer.png", 
            link: "https://github.com/Lucaas-o/human-like-typer",
            status: "Beta",
            tags: ["Security", "Python"]
        },
        { 
            title: "Expenses Tracker", 
            img: "media/ExpensesTracker.png", 
            link: "https://github.com/Lucaas-o/ExpensesTracker",
            status: "Live",
            tags: ["Logic", "Finance"]
        }
    ];

    projectsContainer.innerHTML = featuredProjects.map(project => `
        <div class="project scroll-reveal">
            <span class="status-badge">${project.status}</span>
            <a href="${project.link}" target="_blank" aria-label="${project.title}">
                <img src="${project.img}" alt="${project.title}" loading="lazy">
            </a>
            <div class="project-title">
                <h3>${project.title}</h3>
                <div class="project-tags">
                    ${project.tags.map(tag => `<small>#${tag}</small>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
};

// --- 3. Animations & Interactions ---
const typeHeroSubtitle = () => {
    const heroSubtitle = document.querySelector(".hero-subtitle");
    if (!heroSubtitle) return;

    const text = "Coding the Future at 16";
    heroSubtitle.textContent = "";
    let index = 0;

    const type = () => {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, 80);
        }
    };
    type();
};

const setupScrollReveal = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".scroll-reveal").forEach(el => observer.observe(el));
};

// --- 4. Event Listeners ---
const setupEventListeners = () => {
    // Mobile Menu
    if (menuToggle && navList) {
        menuToggle.addEventListener("click", () => {
            navList.classList.toggle("active");
            menuToggle.textContent = navList.classList.contains("active") ? "✕" : "☰";
        });
    }

    // Scroll to Top
    window.addEventListener("scroll", () => {
        if (scrollToTopBtn) {
            scrollToTopBtn.style.display = window.scrollY > 400 ? "flex" : "none";
        }
    });

    // Form Validation (Better UI)
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", (e) => {
            const inputs = form.querySelectorAll("input, textarea");
            let valid = true;
            inputs.forEach(i => {
                if (!i.value.trim()) {
                    i.style.borderColor = "var(--primary)";
                    valid = false;
                } else {
                    i.style.borderColor = "var(--glass-border)";
                }
            });
            if (!valid) {
                e.preventDefault();
                alert("Please fill in all fields.");
            }
        });
    }
};

// --- Initialize ---
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    loadFeaturedProjects();
    typeHeroSubtitle();
    setupScrollReveal();
    setupEventListeners();
});
