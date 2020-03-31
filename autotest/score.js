const decoded = decodeURI(window.location);

console.log(decoded);

const result = decoded.split("value=")[1];

console.log(result);

let resultStr = "";
if (result < 80) {
    resultStr = " votre état ne nécessite pas un avis médical, toutefois si vos symptômes évoluent, si vous avez des inquiétudes par rapport à votre état personnel ou votre historique médical, programmez une visite chez votre médecin traitant. Ne vous déplacez pas au cabinet, appelez pour demander conseil avant votre venue.";
    document.querySelector('.good').classList.add("show");
} else {
    resultStr = "Votre état nécessite un avis médical.";
    document.querySelector('.bad').classList.add("show");

}

document.querySelector('.resultat').innerHTML = resultStr;