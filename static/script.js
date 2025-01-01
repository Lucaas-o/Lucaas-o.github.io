document.addEventListener("DOMContentLoaded", () => {
   const expandButtons = document.querySelectorAll(".expand-button");

   expandButtons.forEach((button) => {
      button.addEventListener("click", () => {
         const projectDetails = button.nextElementSibling;
         const isVisible = projectDetails.style.display === "block";
         projectDetails.style.display = isVisible ? "none" : "block";
      });
   });
});
