/**
 * LUCAS.O - Portfolio Logic 2026
 * Premium animations and interactivity using GSAP & Vanilla JS
 */

// --- Project Data ---
const projectData = [
    { title: "Pomodoro App", category: "web", img: "media/PomodoroTimerPreview.png", link: "https://github.com/Lucaas-o/pomodoro-app", desc: "Productivity tracker with custom intervals." },
    { title: "Python Mini-Projects", category: "python", img: "media/python-miniprojects.png", link: "https://github.com/Lucaas-o/python-miniprojects", desc: "Collection of automation scripts." },
    { title: "Human-like Typer", category: "python", img: "media/human-like-typer.png", link: "https://github.com/Lucaas-o/human-like-typer", desc: "AI-driven keyboard automation." },
    { title: "Expenses Tracker", category: "web", img: "media/ExpensesTracker.png", link: "https://github.com/Lucaas-o/ExpensesTracker", desc: "Financial management dashboard." },
    { title: "Universal Decryptor", category: "python", img: "media/Universal-Decryptor.png", link: "https://github.com/Lucaas-o/Universal-Decryptor", desc: "Cross-platform encryption tool." },
    { title: "Password Generator", category: "web", img: "media/PasswordGenerator.png", link: "https://github.com/Lucaas-o/PasswordGenerator", desc: "Secure cryptographic key builder." },
    { title: "Weather App", category: "web", img: "media/WeatherApp.png", link: "https://github.com/Lucaas-o/WeatherDashboard", desc: "Real-time global weather tracker." },
];

// --- Core Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    updateThemeLogos();
    initGSAP();
    renderProjects("all");
    initNavigation();
    setupFilters();
});

// --- Theme Management ---
function initTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme") || "dark";
    
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        
        updateThemeLogos();

        // GSAP transition effect on theme change
        gsap.fromTo("body", { opacity: 0.8 }, { opacity: 1, duration: 0.5 });
    });
}

function updateThemeLogos() {
    const theme = document.documentElement.getAttribute("data-theme");
    const logos = document.querySelectorAll(".theme-aware-logo");
    
    logos.forEach(logo => {
        const darkSrc = logo.getAttribute("data-dark");
        const lightSrc = logo.getAttribute("data-light");
        if (theme === "dark" && darkSrc) logo.src = darkSrc;
        if (theme === "light" && lightSrc) logo.src = lightSrc;
    });
}

// --- GSAP Animations ---
function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Page Wipe
    gsap.to(".page-wipe", {
        x: "100%",
        duration: 0.8,
        ease: "power2.inOut",
        delay: 0.2,
        onComplete: () => {
            document.querySelector(".page-wipe").style.display = "none";
        }
    });

    // Reveal on Scroll
    const reveals = document.querySelectorAll(".reveal");
    
    // Set initial state via GSAP to avoid CSS conflicts
    gsap.set(reveals, { opacity: 0, y: 50 });

    reveals.forEach((el, index) => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: (index % 5) * 0.1 // Staggered slightly
        });
    });

    // Hero Text Parallax
    if (document.querySelector(".hero-premium")) {
        gsap.to(".hero-title", {
            scrollTrigger: {
                trigger: ".hero-premium",
                start: "top top",
                end: "bottom top",
                scrub: true
            },
            y: 100,
            opacity: 0
        });
    }

    // Floating animation handle for non-CSS browsers if needed (already handled in CSS though)
}

// --- Navigation Logic ---
function initNavigation() {
    const menuTrigger = document.querySelector(".menu-trigger");
    const navLinks = document.querySelector(".nav-links");
    
    if (menuTrigger) {
        menuTrigger.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-active");
            
            // GSAP Mobile Menu Animation
            if (navLinks.classList.contains("mobile-active")) {
                gsap.from(".nav-links li", {
                    x: 50,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.4
                });
            }
        });
    }

    // Sticky Nav Hide/Show
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;
        const nav = document.querySelector(".nav-container");
        
        if (currentScroll <= 0) {
            nav.style.transform = "translateX(-50%) translateY(0)";
            return;
        }
        
        if (currentScroll > lastScroll) {
            // Scrolling down - hide
            nav.style.transform = "translateX(-50%) translateY(-150%)";
        } else {
            // Scrolling up - show
            nav.style.transform = "translateX(-50%) translateY(0)";
        }
        lastScroll = currentScroll;
    });
}

// --- Project Rendering ---
function renderProjects(filter) {
    const container = document.getElementById("projects-container") || document.getElementById("featured-projects");
    if (!container) return;

    // Clear and Animate Out
    gsap.to(container, { opacity: 0, scale: 0.95, duration: 0.3, onComplete: () => {
        container.innerHTML = "";
        
        const isFeaturedPage = container.id === "featured-projects";
        const targets = isFeaturedPage ? projectData.slice(0, 3) : projectData;
        
        const filtered = filter === "all" ? targets : targets.filter(p => p.category === filter);

        filtered.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card-premium glass-card reveal";
            card.innerHTML = `
                <div class="card-img-side">
                    <img src="${project.img}" alt="${project.title}" loading="lazy">
                    <div class="card-overlay">
                        <a href="${project.link}" target="_blank" class="btn-primary">View GitHub</a>
                    </div>
                </div>
                <div class="card-info-side">
                    <span class="category-tag">${project.category.toUpperCase()}</span>
                    <h3>${project.title}</h3>
                    <p>${project.desc}</p>
                </div>
            `;
            container.appendChild(card);
            
            // Add 3D Tilt Logic
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                gsap.to(card, {
                    rotateX,
                    rotateY,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });

        // Animate In
        gsap.to(container, { opacity: 1, scale: 1, duration: 0.5 });
    }});
}

// --- Setup Filters ---
function setupFilters() {
    const btns = document.querySelectorAll(".filter-btn");
    btns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            btns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderProjects(btn.dataset.filter);
        });
    });
}

// Mobile Nav Extra styles injection
const style = document.createElement('style');
style.textContent = `
    .nav-links.mobile-active {
        display: flex !important;
        flex-direction: column !important;
        position: absolute;
        top: 80px;
        left: 0;
        width: 100%;
        background: rgba(10, 10, 10, 0.95);
        padding: 2rem;
        gap: 2rem;
        border-radius: 20px;
        border: 1px solid var(--glass-border);
        text-align: center;
        backdrop-filter: blur(20px);
    }
    
    .project-card-premium {
        perspective: 1000px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        padding: 0;
    }
    .card-img-side {
        position: relative;
        height: 200px;
        overflow: hidden;
    }
    .card-img-side img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .card-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: 0.3s ease;
    }
    .project-card-premium:hover .card-overlay {
        opacity: 1;
    }
    .reveal {
        /* Reveal state handled by JS to prevent conflicts */
        will-change: transform, opacity;
    }
    .card-info-side {
        padding: 1.5rem;
    }
    .category-tag {
        font-size: 0.7rem;
        color: var(--clr-accent-cyan);
        font-weight: 800;
        letter-spacing: 2px;
        margin-bottom: 0.5rem;
        display: block;
    }
    .card-info-side h3 {
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
    }
    .card-info-side p {
        font-size: 0.9rem;
        opacity: 0.7;
    }
`;
document.head.appendChild(style);