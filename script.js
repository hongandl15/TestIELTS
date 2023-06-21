const loadingOverlay = document.getElementById('loader-red');

loadingOverlay.style.visibility = 'hidden';

function showLoadingOverlay() {
loadingOverlay.style.visibility = 'visible';
}

function hideLoadingOverlay() {
loadingOverlay.style.visibility = 'hidden';
}

const loadingOverlayScore = document.getElementById('loader-blue');
loadingOverlayScore.style.visibility = 'hidden';

function showLoadingOverlayScore() {
    loadingOverlayScore.style.visibility = 'visible';
}

function hideLoadingOverlayScore() {
    loadingOverlayScore.style.visibility = 'hidden';
}




let topic = JSON.stringify(
            { 
                "model": "gpt-3.5-turbo",
                "messages": [
                {
                    "role": "user",
                    "content": "create one writing task 2 topic"
                }]
            })

function getScore(){
    const topicDiv = document.getElementById('topic').value
    const answer = document.getElementById('answer').value
    let messageContent = "Score my this ielts task 2 writing with 4 criteria Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range and Accuracy by number on 9 scale and show ielts overall for this topic: " + topicDiv + answer
    console.log(topicDiv)
    console.log(answer)
    let score = JSON.stringify(
        { 
            "model": "gpt-3.5-turbo",
            "messages": [
            {
                "role": "user",
                 "content": messageContent
            }]
        })
    if(topicDiv.trim().length === 0)
        renderError("Please create a topic first");
    else if(answer.trim().length === 0 )
            renderError("Please enter the answer");
    else{
        showLoadingOverlayScore();
        setTimeout(() => {
            fetch('https://api.openai.com/v1/chat/completions', {
                method: "POST", //do backend cung cấp
                headers: {
                    'Authorization': 'Bearer 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',
                    "Content-Type": "application/json"     
            },
                body: score
            }
            ).then(response => response.json())
            .then(response =>  {
                console.log(response)
                renderScore(response.choices[0].message.content)
            }).catch(error => {
                renderError("Có lỗi xảy ra trong quá trình xử lý hay thử lại sau 1 phút");
            })
            .finally(() => {
                hideLoadingOverlayScore();
            });
        }, 3000);
    }
}


function getSample(){
    const topicDiv = document.getElementById('topic').textContent
    let messageContent = "create Sample ielts taks 2 answer for this topic: " + topicDiv 
    console.log(topicDiv)
    let score = JSON.stringify(
        { 
            "model": "gpt-3.5-turbo",
            "messages": [
            {
                "role": "user",
                 "content": messageContent
            }]
        })
    if(topicDiv.trim().length === 0)
        renderError("Please create a topic first");
    else{
        showLoadingOverlay();
        setTimeout(() => {
            fetch('https://api.openai.com/v1/chat/completions', {
                method: "POST", //do backend cung cấp
                headers: {
                    'Authorization': 'Bearer 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',
                    "Content-Type": "application/json"     
            },
                body: score
            }
            ).then(response => response.json())
            .then(response =>  {
                console.log(response)
                renderSample(response.choices[0].message.content)
            }).catch(error => {
                renderError("Có lỗi xảy ra trong quá trình xử lý hay thử lại sau 1 phút");
            })
            .finally(() => {
                hideLoadingOverlay();
            });
        }, 1000);
    }
}

function getTopic(){
    showLoadingOverlay();
    setTimeout(() => {
        fetch('https://api.openai.com/v1/chat/completions', {
            method: "POST", //do backend cung cấp
            headers: {
                'Authorization': 'Bearer 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',
                "Content-Type": "application/json"     
        },
            body: topic
        }
        ).then(response => response.json())
        .then(response =>  {
            console.log(response)
            renderTopic(response.choices[0].message.content)
        }).catch(error => {
            renderTopic("Có lỗi xảy ra trong quá trình xử lý hãy thử lại sau 1 phút");
        })
        .finally(() => {
            hideLoadingOverlay();
        });
    }, 1000); 
}


function convertToHtmlWithLineBreaks(paragraph) {
    var lines = paragraph.split("\n");
    var html = "";
    for (var i = 0; i < lines.length; i++) html += lines[i] + "<br>";
    return html;
}

function renderScore(data) {
    response = document.getElementById('score')
    response.textContent = data
    response.innerHTML = convertToHtmlWithLineBreaks(data)
}

function renderTopic(data){
    response = document.getElementById('topic')
    response.textContent = data
    // response.innerHTML = convertToHtmlWithLineBreaks(data)
}

function renderSample(data){
    response = document.getElementById('answer')
    response.textContent = data
}

function renderError(data){
    response = document.getElementById('error')
    response.textContent = data
}

 let getTopicBtn = document.getElementById('getTopicBtn')
 getTopicBtn.addEventListener('click', getTopic);

 let getScoreBtn = document.getElementById('getScoreBtn')
 getScoreBtn.addEventListener('click', getScore);

 let getSampleBtn = document.getElementById('getSampleBtn')
 getSampleBtn.addEventListener('click', getSample);
