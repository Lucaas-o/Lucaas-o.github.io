document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const expandButtons = document.querySelectorAll(".expand-button");
    const themeToggle = document.getElementById('theme-toggle');
    const animationToggle = document.getElementById('animation-toggle');
    const body = document.body;

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', body.dataset.theme); // Persist theme choice
    });

    // Animation toggle functionality
    animationToggle.addEventListener('click', () => {
        if (body.style.animationName === 'none' || body.style.animationName === '') {
            body.style.animationName = 'gradientMove';
        } else {
            body.style.animationName = 'none';
        }
        // Store animation state
        localStorage.setItem('animation', body.style.animationName);
    });

    // Check for saved theme and animation state on page load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedAnimation = localStorage.getItem('animation') || 'gradientMove';
    
    if (savedTheme) {
        body.dataset.theme = savedTheme;
    }
    if (savedAnimation !== 'gradientMove') {
        body.style.animationName = savedAnimation;
    }

    // Expand button functionality for project details
    expandButtons.forEach(button => {
        button.addEventListener("click", () => {
            const projectDetails = button.nextElementSibling;
            if (projectDetails.style.display === "block") {
                projectDetails.style.display = "none";
                projectDetails.style.opacity = "0"; // Fade out
            } else {
                projectDetails.style.display = "block";
                projectDetails.style.opacity = "0"; // Reset opacity for fade in
                projectDetails.offsetHeight; // Trigger reflow for animation
                projectDetails.style.transition = "opacity 0.5s";
                projectDetails.style.opacity = "1"; // Fade in
            }
        });
    });

    // Generate descriptions based on project titles
    const descriptions = {
        "Personal Website": "Explore my personal portfolio website showcasing my skills and projects.",
        "Pomodoro App": "A productivity app implementing the Pomodoro technique for time management.",
        "Encryptor/Decryptor": "A basic tool for encrypting and decrypting text using custom algorithms.",
        "Batch Toolbox": "A collection of batch scripts to automate common tasks."
    };

    const projectsList = document.querySelectorAll('.project');
    projectsList.forEach(project => {
        const titleElement = project.querySelector('.project-title');
        if (titleElement) {
            const title = titleElement.textContent.trim();
            const description = descriptions[title] || "A fascinating project to explore!";
            const descElem = document.createElement("p");
            descElem.textContent = description;
            descElem.classList.add("project-description");
            project.appendChild(descElem);
        }
    });
});

// Add buttons to HTML
document.body.insertAdjacentHTML('beforeend', `
    <button id="theme-toggle" class="theme-toggle">Toggle Theme</button>
    <button id="animation-toggle" class="animation-toggle">Toggle Animation</button>
`);