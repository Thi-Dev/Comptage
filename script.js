let totalVisitors = 0;
const churchCounts = {
    "Berlin": 0,
    "Stuttgart": 0,
    "Hamburg": 0,
    "Freiburg": 0,
    "Kehl": 0,
    "Luxembourg": 0,
    "Frankfurt": 0
};

// Fonction pour enregistrer les visiteurs
function registerVisitors() {
    const selectedChurch = document.getElementById("churchSelect").value;
    const visitorCount = parseInt(document.getElementById("visitorCount").value);

    // Vérifier que le nombre de visiteurs est valide (non null et positif)
    if (isNaN(visitorCount) || visitorCount <= 0) {
        alert("Veuillez entrer un nombre valide de visiteurs.");
        return;
    }

    // Ajouter les visiteurs au compteur de l'église sélectionnée
    churchCounts[selectedChurch] += visitorCount;
    totalVisitors += visitorCount;
    
    // Mettre à jour l'affichage
    updateDisplay();

    // Réinitialiser le champ de saisie de visiteurs pour un nouvel enregistrement
    document.getElementById("visitorCount").value = "";  // Réinitialise le champ

    // Sauvegarder les données dans localStorage
    saveToLocalStorage();
}

// Fonction pour annuler un enregistrement de visiteurs dans une église
function decrementCount(church) {
    const visitorCount = 1;  // Annule un visiteur à la fois
    if (churchCounts[church] >= visitorCount) {
        churchCounts[church] -= visitorCount;
        totalVisitors -= visitorCount;
        updateDisplay();
        saveToLocalStorage();
    }
}

// Fonction pour réinitialiser tous les compteurs
function resetCounts() {
    totalVisitors = 0;
    for (let church in churchCounts) {
        churchCounts[church] = 0;
    }
    updateDisplay();
    saveToLocalStorage();
}

// Mettre à jour l'affichage des compteurs
function updateDisplay() {
    document.getElementById("totalCount").innerText = totalVisitors;
    for (let church in churchCounts) {
        document.getElementById(church).innerText = `${church} : ${churchCounts[church]}`;
    }
}

// Sauvegarder les données dans le localStorage
function saveToLocalStorage() {
    localStorage.setItem("churchCounts", JSON.stringify(churchCounts));
    localStorage.setItem("totalVisitors", totalVisitors.toString());
}

// Charger les données depuis le localStorage au chargement de la page
window.onload = function() {
    if (localStorage.getItem("churchCounts")) {
        churchCounts = JSON.parse(localStorage.getItem("churchCounts"));
        totalVisitors = parseInt(localStorage.getItem("totalVisitors"));
        updateDisplay();
    }
};