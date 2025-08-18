// importation des datas

//changement du mode

const toggleBtn = document.getElementById("toggleTheme");

// Appliquer la préférence sauvegardée
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "white") {
  document.body.classList.add("white-mode");
  toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Mode';
}

// Bascule du thème
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("white-mode");

  if (document.body.classList.contains("white-mode")) {
    localStorage.setItem("theme", "white");
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Mode';
  } else {
    localStorage.setItem("theme", "dark");
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
  if (list.length === 0) {
    results.innerHTML =
      "<p><i class='fas fa-question'></i> Aucun résultat trouvé</p>";
    nb.innerHTML = "0";
    return;
  }
  list.forEach((item) => {
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
  const filtered = data.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query)
  );
  render(filtered);
}

// Charger le fichier JSON
fetch("data.json")
  .then((response) => response.json())
  .then((json) => {
    data = json; // stocker les données
    render(data); // affichage initial
    nb.innerHTML = data.length; // nombre total d'entrées
  })
  .catch((error) => console.error("Erreur de chargement JSON :", error));

// Détecter la saisie avec debounce (300ms)
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    search(query);
  }, 300);
});
// Récupération des éléments
const input = document.getElementById("input");
const texts = [
  "Rechercher un mot ...",
  "Exemple : API, CSS, HTTP",
  "Besoin d’un acronyme ?",
  "Tapez un terme informatique",
  "Découvrez la signification des mots",
  "Apprenez en un clic",
  "Devenez incollable en informatique",
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function typeWriter() {
  current = texts[j];

  if (!isDeleting) {
    // écrire
    input.setAttribute("placeholder", current.substring(0, i + 1));
    i++;
    if (i === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, 2000);
      return;
    }
  } else {
    // effacer
    input.setAttribute("placeholder", current.substring(0, i - 1));
    i--;
    if (i === 0) {
      isDeleting = false;
      j = (j + 1) % texts.length;
    }
  }

  setTimeout(typeWriter, isDeleting ? 50 : 100);
}

typeWriter();
