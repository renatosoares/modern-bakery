var request = null;

var getBreadsBt = document.getElementById("get-new-breads");
getBreadsBt.addEventListener("click", getNewBreads);
var getHandlersBt = document.getElementById("get-handlers-breads");
getHandlersBt.addEventListener("click", addOnClickHandlers);
var sendBreadsBt = document.getElementById("send-breads");
sendBreadsBt.addEventListener("click", sendSelectedBreads);
var removeBreadListBt = document.getElementById("remove-breads-list");
removeBreadListBt.addEventListener("click", removeBreadsList);

var listBreadsQueueBt = document.getElementById("list-breads-queue");
listBreadsQueueBt.addEventListener("click", getlistBreadsQueue);


try {
    request = new XMLHttpRequest();
} catch (trymicrosoft) {
    try {
        request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (othermicrosoft) {
        try {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (failed) {
            request = null;
        }
    }
}

if (request == null) console.log("Error creating request object!");


// ======== pega os nomes dos pães no banco e gera elementos e dados
function getNewBreads() {
    var url = "/middleware/breadlist";
    request.open("GET", url, true);
    request.onreadystatechange = updatePage;
    request.send(null);
}
function updatePage() {
    if (request.readyState == 4) {
        if (request.status == 200) {
            var jsonData = JSON.parse(request.responseText);
            var breadListElement = document.getElementById("bread-list");

            for(var i = 0; i < jsonData.length; i++){
                var textNodeLi = jsonData[i].bread;
                var newElementLi = document.createElement("li");
                newElementLi.className = "col-3";
                var newTextElement = document.createTextNode(textNodeLi);
                newElementLi.appendChild(newTextElement);
                breadListElement.appendChild(newElementLi);
            }
        } else {
            var message = request.getResponseHeader("Status");
            if ((message.length == null) || (message.length <= 0)) {
                console.log("Error! Request status is " + request.status);
            } else {
                console.log(message);
            }
        }
    }
}

// ======== separa os pães pré selecionados
function addOnClickHandlers() {
    var BreadList = document.getElementById("bread-list");
    var breadLi = BreadList.getElementsByTagName("li");
    for (var i=0; i<breadLi.length; i++) {
        breadLi[i].onclick = addToPreview;
    }
}
function addToPreview() {
    var liElement = this;
    var selectBreadListElement = document.getElementById("select-bread-list");
    selectBreadListElement.appendChild(liElement);
    liElement.onclick = null;
}

// ======= enviar o preview dos pães para o banco e listar na fila
function getSelectedBreads() {
    var breadSend = "";
    var getSelect = document.getElementById("select-bread-list");
    // retorna um array de todos os elementos <img>  existentes no elemento <div>
    var breads = getSelect.getElementsByTagName("li");
    for (var i=0; i<breads.length; i++) {
        breadSend += breads[i].innerText + ", ";
    }
    return breadSend;
}
function sendSelectedBreads() {
    var breadSendValue = getSelectedBreads();
    var url = "/middleware/sendqueue";
    request.open("POST", url, true);
    request.onreadystatechange = showConfirmationQueue;
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send("breadSendValue=" + encodeURI(breadSendValue));
}
function removeBreadsList(){
    var breadList = document.getElementById("bread-list");
    var selectBreadList = document.getElementById("select-bread-list");
    for(var i = breadList.children.length; i > 0; i--){
        breadList.removeChild(breadList.children[0]);
    }
    for(var i = selectBreadList.children.length; i > 0; i--){
        selectBreadList.removeChild(selectBreadList.children[0]);
    }
}
function removeBreadsListSelected(breadElementNode){
    if(breadElementNode.hasChildNodes()){
        for(var i = breadElementNode.children.length; i > 0; i--){
            breadElementNode.removeChild(breadElementNode.children[0]);
        }
    }
}
function showConfirmationQueue() {
    if (request.readyState == 4) {
        if (request.status == 200) {

            removeBreadsList();
            var jsonData = JSON.parse(request.responseText);
            var breadQueueElement = document.getElementById("bread-queue");
            removeBreadsListSelected(breadQueueElement);

            for(var i = 0; i < jsonData.length; i++){
                var newElementBt = document.createElement("button");
                newElementBt.id = "bread"+ jsonData[i].id;
                var newTextElementBt = document.createTextNode("Disponível");
                newElementBt.appendChild(newTextElementBt);

                var textNodeLi = " " + jsonData[i].id + " - " + jsonData[i].product;
                var newElementLi = document.createElement("li");
                newElementLi.className = "col-sm-12";
                var newTextElement = document.createTextNode(textNodeLi);
                newElementLi.appendChild(newTextElement);
                newElementLi.insertBefore(newElementBt, newTextElement);
                breadQueueElement.appendChild(newElementLi);
            }
        } else {
            var message = request.getResponseHeader("Status");
            if ((message == null) || (message.length <= 0)) {
                alert("Error! Request status is " + request.status);
            } else {
                alert(message);
            }
        }
    }
}

function getlistBreadsQueue(){
    var url = "/middleware/listqueue";
    request.open("GET", url, true);
    request.onreadystatechange = showConfirmationQueue;
    request.send(null);
}

// FIXME adicionar typescript para melhorar organização do código
// FIXME fazer a listagem dos pães disponíveis
// FIXME fazer listagem dos pães entregues