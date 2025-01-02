var i = 0;
var score = 0;
var selectedValue = 1;

function afficherResultat(score, nombretotalMots) {
    let contenuzoneScore = document.querySelector(".zoneScore span");
    contenuzoneScore.textContent = score + " / " + nombretotalMots;
}

// Affichage des phrases
function afficheMotPhrases(tableauMotsPhrases) {
    let contenuPropositions = document.getElementsByClassName('zoneProposition');
    for (let j = 0; j < contenuPropositions.length; j++) {
        if (i < tableauMotsPhrases.length) {
            contenuPropositions[j].textContent = tableauMotsPhrases[i];
        } else {
            contenuPropositions[j].textContent = "Il n'y a plus rien à taper";

        }
    }
}
//Fonction affiché Mot et phrase selon le mode séléctionné
function affichageSeulonChoix(selectedValue){
    if (selectedValue === "1") { 
        afficheMotPhrases(listeMots)
        afficherResultat(score,listeMots.length)
    } else{
        afficheMotPhrases(listePhrases)
        afficherResultat(score,listePhrases.length)
    }
}
//Fonction parcourir tableau selon choix
function parcourirTableauChoix(entreeUtilisateur){
    if (selectedValue === "1") {
        afficherResultat(score, listeMots.length);
        parcourirTableau(entreeUtilisateur.value, listeMots);
    } else {
        afficherResultat(score, listePhrases.length);
        parcourirTableau(entreeUtilisateur.value, listePhrases);
    }
    document.getElementById('inputEcriture').value = "";
}

// Parcours du tableau et mise à jour du score
function parcourirTableau(entreeUtilisateur, tableauMotsPhrases) {
    if (i < tableauMotsPhrases.length) {
        if (entreeUtilisateur === tableauMotsPhrases[i]) {
            ++score;
        }
        i++; // Incrémentation de l'index ici
        afficheMotPhrases(tableauMotsPhrases);
        afficherResultat(score, tableauMotsPhrases.length);
    }
    
    // Désactiver le bouton si le tableau est complètement parcouru
    if (i >= tableauMotsPhrases.length) {
        document.getElementById('btnValiderMot').disabled = true;
    }
}

// Fonction pour démarrer le jeu
function lancerJeu() {
    let selectedValue = getSelectedValue();
    eventAddChoix();
    eventAddValider();
    //Supporter l'entrée clavier ENTER
    let entreeUtilisateur = document.getElementById('inputEcriture')
    entreeUtilisateur.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
            event.preventDefault;
            parcourirTableauChoix(entreeUtilisateur);
        }
    });
    initAddEventListenerPopup();
    gererFormulaire();
}

// Obtention de la valeur sélectionnée des boutons radio
function getSelectedValue() {
    const radios = document.getElementsByName('optionSource');
    for (const radio of radios) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }
    affichageSeulonChoix(selectedValue)
    return selectedValue;
}

// Ajout des écouteurs d'événement aux boutons radio
function eventAddChoix() {
    const radios = document.getElementsByName('optionSource');
    for (const radio of radios) {
        radio.addEventListener('change', () => {
            score = 0
            i=0
            let selectedValue = getSelectedValue();
            affichageSeulonChoix(selectedValue);
        });
    }
}

// Ajout de l'événement au bouton de validation
function eventAddValider() {
    document.getElementById("btnValiderMot").addEventListener('click', (event)=> {
        let selectedValue = getSelectedValue();
        let entreeUtilisateur = document.getElementById('inputEcriture')
        parcourirTableauChoix(entreeUtilisateur);
    });
}


