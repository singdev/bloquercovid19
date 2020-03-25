const decoded = decodeURI(window.location);

console.log(decoded);

const result = decoded.split("value=")[1];

console.log(result);

let resultStr = "";
if (result < 80) {
    resultStr = "Votre état ne nécessite pas un avis médical";
    document.querySelector('.good').classList.add("show");
} else {
    resultStr = "Votre état nécessite un avis médical.";
    document.querySelector('.bad').classList.add("show");

}

document.querySelector('.resultat').innerHTML = resultStr;