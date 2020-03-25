
function toogleNavMenu(){
    document.querySelector('nav').classList.toggle('show-nav');
}

document.querySelector('#ville').addEventListener('change', (e) => {
    if(document.querySelector('#quartier').value != "" && e.target.value != ""){
        document.querySelector(".custom-link").classList.remove("disable");
    } else {
        document.querySelector(".custom-link").classList.add("disable");
    }
});

document.querySelector('#quartier').addEventListener('change', (e) => {
    if(document.querySelector('#ville').value != "" && e.target.value != ""){
        document.querySelector(".custom-link").classList.remove("disable");
    } else {
        document.querySelector(".custom-link").classList.add("disable");
    }
});