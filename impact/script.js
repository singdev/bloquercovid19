let currentQUestionIndex = 0;
const QUESTIONS = document.querySelectorAll('.question');
const BUTTON_NEXT = document.getElementById('next');
const BUTTON_PREVIOUS = document.getElementById('previous');

BUTTON_NEXT.addEventListener('click', () => {
    if(!isNotEmpty()){
       showWarning();
       setTimeout(() => {
           hideWarning();
       }, 5000);
        return;
    }
    const stepCount = calculateStepCount(currentQUestionIndex);
    if(hasNextQuestion(stepCount)){
        nextQuestion(stepCount);
        updateQuestionCount();
    } else {
        finish();
    }
});

BUTTON_PREVIOUS.addEventListener('click', () => {
    const stepCount = calculatePreviousStepCount();
    if(hasPreviousQUestion(stepCount)){
        previousQuestion(stepCount);
    }
});

/**
 * 
 * @param {Number} step 
 */
function nextQuestion(step){
    lastQuestionIndex = currentQUestionIndex;
    QUESTIONS[currentQUestionIndex].classList.remove('current-question');
    currentQUestionIndex += step;
    QUESTIONS[currentQUestionIndex].classList.add('current-question');
}

/**
 * 
 * @param {Number} step 
 */
function previousQuestion(step){
    QUESTIONS[currentQUestionIndex].classList.remove('current-question');
    currentQUestionIndex -= step;
    QUESTIONS[currentQUestionIndex].classList.add('current-question');
}

function updateQuestionCount(){
    const txt = document.querySelector('.text');
    const count = questionCount();
    if(count == 0){
        txt.innerHTML = "Dernière question";
    } else {
        txt.innerHTML = "Plus que " + count + " question" + (count  > 1 ? "s" : "");
    }
}

function hasNextQuestion(step){
    return currentQUestionIndex+step < QUESTIONS.length;
}

function hasPreviousQUestion(step){
    return currentQUestionIndex-step >= 0;
}

function calculatePreviousStepCount(){
    for(let i = 0; i < currentQUestionIndex; i += calculateStepCount(i)){
        const step = calculateStepCount(i);
        if(i+step == currentQUestionIndex){
            return step;
        }
    }
    return 1;
}

/**
 * @returns {Number}
 */
function calculateStepCount(index){
    const element = QUESTIONS[index].querySelector('input, select, textarea');
    const name = element.name;
    if(name == "anpi"){
        return anpiStepCount();
    } else if(name == "anpi-numero"){
        return 2;
    } else if(name == "effet" || name == "strategie" || name == "mesure-gouv") {
        if(verifyOther(QUESTIONS[index])){
            return 1;
        } else {
            return 2;
        }
    } else if(name == "secteur"){
        if(element.value == "Autre"){
            return 1;
        } else {
            return 2;
        }
    }
    return 1;
}

function anpiStepCount(){
    const hasAnpi = document.querySelector('#anpi-oui');
    if(hasAnpi.checked){
        return 1;
    }
    return 2;
}

/**
 * 
 * @param {Element} element 
 */
function verifyOther(element){
    const inputs = element.querySelectorAll('input');
    let inputWithAutreValue = null;
    inputs.forEach(input => {
        if(input.value == "Autre"){
            inputWithAutreValue = input;
        }
    });
    if(inputWithAutreValue){
        return inputWithAutreValue.checked;
    }
    return false;
}

function isNotEmpty(){
    const inputs = QUESTIONS[currentQUestionIndex].querySelectorAll("input, textarea");
    let result = false;
    inputs.forEach(input => {
        if(((input.type == "text" || input.type == "number" || input.tagName.toLowerCase() == "textarea")
         && input.value != "") || input.checked == true){
            result = true;
        }
    });
    const select = QUESTIONS[currentQUestionIndex].querySelector("select");
    if(select || (inputs[0] && inputs[0].type == "file")){
        result = true;
    }
    return result;
}

function questionCount(){
    return QUESTIONS.length - currentQUestionIndex -1;
}

function showWarning(){
    document.querySelector('.message-warning').classList.add('show-w');
}

function hideWarning(){
    document.querySelector('.message-warning').classList.remove('show-w');
}
