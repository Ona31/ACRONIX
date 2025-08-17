// importation des datas 

//changement du mode 

const toggleBtn = document.getElementById('toggleTheme');

    // Appliquer la préférence sauvegardée
    const currentTheme = localStorage.getItem('theme');
    if(currentTheme === 'white'){
        document.body.classList.add('white-mode');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Mode';
    }

    // Bascule du thème
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('white-mode');

        if(document.body.classList.contains('white-mode')){
            localStorage.setItem('theme','white');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Mode';
        } else {
            localStorage.setItem('theme','dark');
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i> Mode';
        }
    });
    //===================================================================
    const searchInput = document.getElementById("input");
const results = document.getElementById("results");
const nb = document.getElementById("nb");

let data = []; // stockage des données
let timeout;

// Fonction pour afficher les résultats
function render(list) {
  results.innerHTML = "";
  if(list.length === 0){
    results.innerHTML = "<p><i class='fas fa-question'></i> Aucun résultat trouvé</p>";
    nb.innerHTML = "0";
    return;
  }
  list.forEach(item => {
    results.innerHTML += `
      <div class="card">
        <div class="title">${item.title}</div>
        <div class="type">${item.type}</div>
        <div class="description">${item.description}</div>
        <a href="${item.link}" target="_blank"><i class="fas fa-link"></i> Voir plus</a>
      </div>
    `;
  });
  nb.innerHTML = list.length; // afficher le nombre de résultats
}

// Fonction de recherche
function search(query) {
  const filtered = data.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query) ||
    item.type.toLowerCase().includes(query)
  );
  render(filtered);
}

// Charger le fichier JSON
fetch("data.json")
  .then(response => response.json())
  .then(json => {
    data = json;          // stocker les données
    render(data);         // affichage initial
    nb.innerHTML = data.length; // nombre total d'entrées
  })
  .catch(error => console.error("Erreur de chargement JSON :", error));

// Détecter la saisie avec debounce (300ms)
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    search(query);
  }, 300);
});
// Récupération des éléments
const devButton = document.getElementById("devButton");
const modal = document.getElementById("devModal");
const closeBtn = document.querySelector(".modal .close");

// Ouvrir modal
devButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// Fermer modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Fermer modal si clic en dehors
window.addEventListener("click", (e) => {
  if(e.target === modal){
    modal.style.display = "none";
  }
});
