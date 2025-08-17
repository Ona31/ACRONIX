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
    
// Cibler les éléments HTML
const searchInput = document.getElementById("input");
const results = document.getElementById("results");
let data = []; // on stockera les données ici

// Fonction pour afficher les résultats
function render(list) {
  results.innerHTML = "";

  if (list.length === 0) {
    results.innerHTML = "<p><i class ='fas fa-question '></i> Aucun résultat trouvé </p>";
    return;
  }

  list.forEach(item => {
    results.innerHTML += `
      <div class="card">
        <div class="title">${item.title}</div>
        <div class="type">${item.type}</div>
        <div class="description">${item.description}</div>
      </div>
    `;
  });
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
    data = json;          // on stocke les données
    render(data);         // affichage initial
  })
  .catch(error => console.error("Erreur de chargement JSON :", error));

// Détecter la saisie dans la barre de recherche
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  search(query);
});
