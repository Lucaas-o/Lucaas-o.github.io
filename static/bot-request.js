document.addEventListener('DOMContentLoaded', () => {
  const featuresSelect = document.getElementById('features');

  featuresSelect.addEventListener('change', () => {
      const selectedOptions = Array.from(featuresSelect.selectedOptions);
      if (selectedOptions.length > 5) {
          selectedOptions[selectedOptions.length - 1].selected = false;
          alert('Pick up to 5 features so I can build it fast! Keep custom commands simple too if you want the bot soon!');
      }
  });
});