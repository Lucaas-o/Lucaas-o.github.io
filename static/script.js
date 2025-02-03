document.addEventListener("DOMContentLoaded", () => {
   const expandButtons = document.querySelectorAll(".expand-button");

   expandButtons.forEach((button) => {
       button.addEventListener("click", () => {
           const projectDetails = button.nextElementSibling;

           if (projectDetails.style.display === "block") {
               projectDetails.style.display = "none";
               projectDetails.style.opacity = "0"; // Fade out
           } else {
               projectDetails.style.display = "block";
               projectDetails.style.opacity = "0"; // Reset opacity
               // Trigger reflow for animation
               projectDetails.offsetHeight; 
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

   const projectsList = document.querySelectorAll('.project'); // Get all projects
   projectsList.forEach(project => {
       const title = project.querySelector('h2').textContent.trim();
       const description = descriptions[title] || "A fascinating project to explore!";
       const descElem = document.createElement("p");
       descElem.textContent = description;
       descElem.classList.add("project-description");
       project.appendChild(descElem);
   });
});
