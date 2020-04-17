

window.addEventListener('load', () => {

    document.querySelectorAll('.nav-item').forEach(n => {
        n.addEventListener('click', () => {
            document.querySelector('nav').classList.remove('show-nav');

        });
    })

    fetchCovid19Data();
})

function toggleShowDropdown(e){
    e.target.querySelector('dropdown').classList.toggle('show-dropdown');
}

function toogleNavMenu(){
    document.querySelector('nav').classList.toggle('show-nav');
}

function addVilleAndQuartierOnPath(e){
    const ville = document.querySelector('#ville').value;
    const quartier = document.querySelector('#quartier').value;
    if(ville.trim() != "" && quartier.trim() != ""){
        window.location = "autotest/index.html" + '?ville=' + ville + '&quartier=' + quartier;
    }
}

document.querySelector('#ville').addEventListener('keyup', (e) => {
    if(document.querySelector('#quartier').value != "" && e.target.value != ""){
        document.querySelector(".custom-link").classList.remove("disable");
    } else {
        document.querySelector(".custom-link").classList.add("disable");
    }
});

document.querySelector('#quartier').addEventListener('keyup', (e) => {
    if(document.querySelector('#ville').value.trim() != "" && e.target.value.trim() != ""){
        document.querySelector(".custom-link").classList.remove("disable");
    } else {
        document.querySelector(".custom-link").classList.add("disable");
    }
    
});

document.querySelector(".custom-link").addEventListener('click', function (event) {
    if (event.target.classList.contains('disable')) {
      event.preventDefault();
    }
});

function fetchCovid19Data(){
    fetch('https://app.bloquercovid19.com/bat/api').then(response => response.json())
    .then(json => {
        if(json){
            const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novemnbre", "Décembre"];

            const result = json.data.find(s =>  s.Country_Region == "Gabon");
            console.log(result);
            const date = new Date(result.Last_Update);
            document.querySelector('#confirmed').innerHTML = "Gabon: " + result.Confirmed;
            document.querySelector('#deces').innerHTML = result.Deaths;
            document.querySelector('#stat-cas-gabon').innerHTML = result.Confirmed;
            document.querySelector("#stat-date-gabon").innerHTML = "Mise à jour le " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

        }
    }).catch(err => {
        console.log(err);
    });
}
