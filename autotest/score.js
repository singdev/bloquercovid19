const decoded = decodeURI(window.location);

console.log(decoded);

const result = decoded.split("value=")[1];

console.log(result);

let resultStr = "";
if (result < 114) {
    resultStr = "Votre état ne nécessite pas un avis médical";
} else {
    resultStr = "Votre état nécessite un avis médical.";
}

document.querySelector('.resultat').innerHTML = resultStr;