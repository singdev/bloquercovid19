import { AutoTest, Question } from "./autotest.js";

const questions = [
    new Question("Avez vous voyagé il y' a un mois ?", ["Oui", "Non"], [5, 0], null, null),
    new Question("Avez vous l'un des symptomes suivant: Fièvre, toux, maux de tête ", ["Oui", "Non"], [5, 0], null, null),
    new Question("Avez vous été en contact avec quelqu'un qui revient de l'étrangé ou qui présente des symptomes de grippe depuis plusieurs jour ?", ["Oui", "Non"], [5, 0], null, null),
    new Question("Pensez-vous avoir ou avoir eu de la fièvre ces derniers jours (frissons, sueurs) ?",
     ["Oui","Non" ], [5, 0],
     [ new Question("quelle température ? ", ["37°c a 38°c", "38°C a 39°C", "Plus de 39°C"], [2, 3, 5], null,null)], (reponse) => {
         if(reponse == 0) {
             return 0;
         } else {
             return -1;
         }
     }),
    
    new Question("Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?", ["Oui", "Non"], [5, 0], null, null),
    new Question("Ces derniers jours, avez-vous noté une forte diminution ou perte de votre goût ou de votre odorat ?", ["Oui", "Non"], [5, 0], null, null),
    new Question("Ces derniers jours, avez-vous un mal de gorge ?", ["Oui", "Non"], [5, 0], null, null),
    new Question("Ces dernières 24 heures, avez-vous de la diarrhée ? Avec au moins 3 selles molles.", ["Oui", "Non"], [5, 0],null, null),
    new Question("Ces derniers jours, avez-vous une fatigue inhabituelle ?", ["Oui", "Non"],[5, 0], [
        new Question("Si oui, Cette fatigue vous oblige-t-elle à vous reposer plus de la moitié de la journée ?", ["Oui", "Non"], [5, 0],null, null)],
        (response) => {
            if(response == 0){
                return 0;
            } else {
                return -1;
            }
        }),
    new Question("Avez-vous des difficultés importantes pour vous alimenter ou boire, depuis plus de 24h ?", ["Oui", "Non"],[5, 0], null, null),
    new Question("Êtes-vous essoufflé lorsque vous parlez ou faites un petit effort ?", ["Oui", "Non"],[5, 0], null, null),
    new Question("En ce moment, comment vous sentez-vous, physiquement ?", ["Bien", "Assez bien", "Mal", "Très mal"],[0, 2, 4, 5], null, null),
    new Question("Quel est votre âge ? Ceci, afin de calculer un facteur de risque spécifique. :", ["Entre 0 et 12 ans", "Entre 13 et 24 ans", "Entre 25 et 48 ans", "Entre 49 et 64 ans", "Plus de 65 ans"],[1, 1, 2, 4, 5], null, null),
    new Question("Quel est votre poids ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection. (en Kg)", ["0-25 kg", "26-50 kg", "51-75 kg", "76 au 100 kg", "Plus de 100 kg"  ], [4, 3, 2, 1, 0], null, null),
    new Question("Avez-vous de l’hypertension artérielle ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez-vous un traitement à visée cardiologique ?", ["Oui", "Non", "Ne sait pas"], [5, 0, 2], null, null),
    new Question("Êtes-vous diabétique ?", ["Oui", "Non"], [5, 0], null, null),
    new Question("Avez-vous ou avez-vous eu un cancer ?", ["Oui", "Non"], [5, 0], null, null),
    new Question("Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?", ["Oui", "Non"], [5, 0], null, null),
    new Question("Avez-vous une insuffisance rénale chronique dialysée ?", ["Oui", "Non"], [5, 0], null, null),
    new Question("Avez-vous une maladie chronique du foie ?", ["Oui", "Non"], [5, 0], null, null),
    new Question("Êtes-vous enceinte ?", ["Oui", "Non", "Non applicable (Je suis un homme)"], [5, 0, 0], null, null),
    new Question("Avez-vous une maladie connue pour diminuer vos défenses immunitaires ?", ["Oui", "Non", "Ne sais pas"], [5, 0, 2], null, null),
    new Question("Prenez-vous un traitement immunosuppresseur ? C’est un traitement qui diminue vos défenses contre les infections. Voici quelques exemples : corticoïdes, méthotrexate, ciclosporine, tacrolimus, azathioprine, cyclophosphamide (liste non exhaustive).", ["Oui", "Non", "Ne sait pas"], [5, 0, 2], null, null),
];

document.querySelector('.next-btn').addEventListener('click', (e) => onBtnQuesiontSuivantClick(e));

const autoTest = new AutoTest(questions);
displayQuestionCourante();

let score = 0;
let canNext = false;

function displayQuestionCourante(){
    if(autoTest.indexQuestionCourante == 3 && score == 0) {
        finish();
    } else if(autoTest.estFini() == false){
        const question = autoTest.getQuestionCourante();
        displayQuestion(question.question);
        const container = document.querySelector('.suggestions');
        while(container.firstChild){
            container.removeChild(container.firstChild);
        }
        for(let i = 0; i < question.suggestions.length; i++){
            displaySuggestion(question.suggestions[i], i);
        }
    
        updateProgressBar();
    } else {
        finish();
    }
}

function finish(){
    const url = decodeURI(window.location);
    const ville = url.split('?ville=')[1].split('&')[0];
    const quartier = url.split('&quartier=')[1];

    autoTest.postAutoTest(ville, quartier, () => {
        window.location = "score.html?value=" + score;
    });
}

function updateProgressBar(){
    const percent = (autoTest.indexQuestionCourante / autoTest.questions.length) * 100;
    document.getElementById('pbv').style.width = `${percent}%`;
}

function displayQuestion(question){
    document.querySelector('.question').innerHTML = question;
}

function displaySuggestion(suggestion, index){
    const template = `
    <div class="form-suggestion">
        <input type="radio" name="suggestion" id="i-${index}">
        <label id="${index}" for="i-${index}">${suggestion}</label>
    </div>
    `;
    const container = document.querySelector('.suggestions');
    const domParser = new DOMParser();
    const element = domParser.parseFromString(template, 'text/html');
    
    element.querySelectorAll('label').forEach(label => {
        console.log("count label");
        label.addEventListener('click', (e) => suggestionClick(e));
    });

    container.appendChild(element.querySelector('.form-suggestion'));
}

function onBtnQuesiontSuivantClick(e){
    if(canNext){
        score += autoTest.getQuestionCourante().getNote();
        autoTest.questionSuivante();
        displayQuestionCourante();
        disableNextBtn();
    }
}

function suggestionClick(e){
    autoTest.getQuestionCourante().reponse = e.target.id;
    enableNextBtn();
}

function disableNextBtn(){
    document.querySelector('.next-btn').classList.add('disable');
    canNext = false;
}

function enableNextBtn(){
    document.querySelector('.next-btn').classList.remove('disable');
    canNext = true;
}