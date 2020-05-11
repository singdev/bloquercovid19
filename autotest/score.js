const decoded = decodeURI(window.location);


const result = decoded.split("value=")[1];


let resultStr = "";
if (result < 70) {
    resultStr = " votre état ne nécessite pas un avis médical, toutefois si vos symptômes évoluent, si vous avez des inquiétudes par rapport à votre état personnel ou votre historique médical, programmez une visite chez votre médecin traitant. Ne vous déplacez pas au cabinet, appelez pour demander conseil avant votre venue.";
    document.querySelector('.good').classList.add("show");
} else {
    resultStr = `<p style="text-align: center;"><span style="text-align: center; font-weight: bold">Votre état nécessite un avis médical</span> <br>
   Si vos symptômes évoluent, si vous avez des inquiétudes par rapport à votre état personnel ou votre historique médical, programmez une visite chez votre médecin traitant. Ne vous déplacez pas au cabinet, appelez pour demander conseil avant votre venue.
   Restez à la maison
   Pour vous protéger et protéger les autres, dans la mesure du possible, restez chez vous et limitez les contacts avec d'autres personnes. Vous avez des questions sur la prise de vos médicaments ?
    Pour vérifier si un médicament pourrait présenter un risque potentiel d'aggraver vos symptômes : <a href="https://covid19-medicaments.com">Visitez ce lien.</a>
    Vous avez des questions additionnelles ? 
    Appelez le <strong>1410</strong> </p>`;
    document.querySelector('.bad').classList.add("show");

}

document.querySelector('.resultat').innerHTML = resultStr;