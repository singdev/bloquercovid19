const AUTO_TEST_URL = "http://localhost:19190";

function finish(){
    const data = getAllData();
    console.log(data);
    postForm(data, () => {
        window.location = "./finish.html";
    });
}

function getAllData(){
    const questions = document.querySelectorAll('.question');
    const data = {};
    console.log(questions);
    questions.forEach(question => {
        const title = question.querySelector('.title').innerHTML;
        const inputs = question.querySelectorAll('input');
        const select = question.querySelector('select');
        if(select){
            console.log(select.name);
            data[select.name] = { question: title, value: select.value };
        } else if(inputs[0].type == "radio"){
            inputs.forEach(input => {
                if(input.checked){
                    data[input.name] = { question: title, value: input.value };
                    return;
                }
            })
        } else if(inputs[0].type == "checkbox"){
            const array = [];
            inputs.forEach(input => {
                if(input.checked){
                    array.push(input.value);
                }
            });
            data[inputs[0].name] = { question: title, value: array };
        } else if(inputs[0].type == "text"){
            const array = [];
            inputs.forEach(input => {
                array.push(input.value);
            });
            data[inputs[0].name] = { question: title, value: array };
        }
    });
    return data;
}

function postForm(data, callback){
    fetch(`${AUTO_TEST_URL}/impact`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body:  JSON.stringify({ json: JSON.stringify(data) })
    }).then(response => response.json())
    .then(json => {
        callback();
    })
    .catch(err => {
        callback();
    });
}