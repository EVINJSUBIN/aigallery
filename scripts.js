// Fetch JSON data and populate cards
fetch('jsond.json')
  .then(response => response.json())
  .then(tools => {
    const cardsContainer = document.getElementById('cardsContainer');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    function displayTools(filteredTools) {
      cardsContainer.innerHTML = '';
      filteredTools.forEach(tool => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <h2>${tool.name}</h2>
          <p>${tool.description}</p>
          <a href="${tool.link}" target="_blank">Visit</a>
        `;
        cardsContainer.appendChild(card);
      });
    }

    function filterTools() {
      const query = searchInput.value.toLowerCase();
      const sortedTools = [...tools].sort((a, b) => {
        const field = sortSelect.value;
        return a[field].localeCompare(b[field]);
      });
      const filteredTools = sortedTools.filter(tool => 
        tool.name.toLowerCase().includes(query) || 
        tool.description.toLowerCase().includes(query)
      );
      displayTools(filteredTools);
    }

    searchInput.addEventListener('input', filterTools);
    sortSelect.addEventListener('change', filterTools);

    // Initial display
    displayTools(tools);
  })
  .catch(error => console.error('Error loading the tools:', error));
