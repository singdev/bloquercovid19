
window.addEventListener('load', () => {

    document.querySelectorAll('.nav-item').forEach(n => {
        n.addEventListener('click', () => {
            console.log("Click");
            if(document.querySelectorAll('.humberger-btn').style.display != "none"){
                toogleNavMenu();
            }
        });
    })
})

function toogleNavMenu(){
    document.querySelector('nav').classList.toggle('show-nav');
}

function addVilleAndQuartierOnPath(e){
    const ville = document.querySelector('#ville').value;
    const quartier = document.querySelector('#quartier').value;
    window.location = "autotest/index.html" + '?ville=' + ville + '&quartier=' + quartier;
}

document.querySelector('#ville').addEventListener('keyup', (e) => {
    if(document.querySelector('#quartier').value != "" && e.target.value != ""){
        document.querySelector(".custom-link").classList.remove("disable");
    } else {
        document.querySelector(".custom-link").classList.add("disable");
    }
});

document.querySelector('#quartier').addEventListener('keyup', (e) => {
    if(document.querySelector('#ville').value != "" && e.target.value != ""){
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