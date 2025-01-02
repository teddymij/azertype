function afficherPopup(){
    let popupBackground = document.querySelector(".popupBackground");
    popupBackground.classList.add("active");
}  
function cacherPopup(){
    let popupBackground = document.querySelector(".popupBackground");
    popupBackground.classList.remove("active");
}

function initAddEventListenerPopup(){
    let btnPartager = document.querySelector(".zonePartage button")
    btnPartager.addEventListener("click", ()=>{
        afficherPopup()
    });
    let popup = document.querySelector(".popupBackground");
    popup.addEventListener("click", (event)=>{
        // cibler un élémemnt précis avec event.target
        if(event.target === popup){
            cacherPopup();
        }
});
}
function afficherEmail(nom,email,score){
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`;
    location.href = mailto;
}
//Annuler événement par défaut envoyer formulaire ET ENVOYA
function gererFormulaire(){
    let formulairePartager =document.querySelector("form");
    formulairePartager.addEventListener("submit", (event)=> {
        try{
            event.preventDefault();
            //afficherMessageErreur(" ");
            let nomPartager = document.getElementById("nom").value;
            let emailPartager = document.getElementById("email").value;
            validerNom(nomPartager);
            validerEmail(emailPartager);
            let scoreEmail  =`${score} / ${i}`;
            afficherEmail(nomPartager,emailPartager,scoreEmail);
        } catch (error){
            afficherMessageErreur(error.message);
        }
    });
}
//ajout d'erreur
function afficherMessageErreur(messageErreur){
    let spanErreurMessage = document.getElementById("erreurMessage");
    //pour éviter que le message ne se repéte
    if (!spanErreurMessage){
        let popupError = document.querySelector(".popup");
        spanErreurMessage = document.createElement("span");
        spanErreurMessage.id = "erreurMessage";

        popupError.append(spanErreurMessage);
    }
    //change juste le contenu du message son ajouter une nouvelle div
    spanErreurMessage.innerText = messageErreur;

}
//vérification nom
function validerNom(nomEntree){
    nomEntree = nomEntree.trim()
    let resultat = false;
    if (nomEntree<2) {
        throw new Error(`Le champ  est vide`);
    } else {
        let regex = new RegExp("^.{2,}$");
        resultat = regex.test(nomEntree);
        if (resultat === false) {
            throw new Error(`Le nom est mal tapé`);
        }
    }
}
//vérification email
function validerEmail(emailEntree){
    emailEntree = emailEntree.trim()
    let resultat = false;
    if (emailEntree === "") {
        throw new Error(`Le champ  est vide`);
    } else {
        let regex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
        resultat = regex.test(emailEntree);
        if (resultat === false) {
            throw new Error(`L'email est mal tapé`);
        }
    }
}
    