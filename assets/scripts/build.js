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
                newElementLi.className = "col-sm-4 btn btn-outline-info";
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
    liElement.className = "col-sm-12 btn btn-outline-warning"
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
function createNodeBreads(orderId, orderProduct, parentElement, functionSendRequest, listGroup) {
    var textNodeLi = " " + orderId + " - " + orderProduct;
    var newElementLi = document.createElement("li");
    var newTextElement = document.createTextNode(textNodeLi);
    newElementLi.className = "col-sm-12 "+listGroup;
    newElementLi.id = "bread" + orderId;
    newElementLi.appendChild(newTextElement);
    newElementLi.addEventListener("click", function (e){
        updateBreadsOrder(functionSendRequest, e.currentTarget.id );
    });
    parentElement.appendChild(newElementLi);
}
function showConfirmationQueue() {
    if (request.readyState == 4) {
        if (request.status == 200) {
            removeBreadsList();
            var jsonData = JSON.parse(request.responseText);
            var breadQueueElement = document.getElementById("bread-queue");
            var breadAvailableElement = document.getElementById("bread-available");
            var breadDeliveredElement = document.getElementById("bread-delivered");
            removeBreadsListSelected(breadQueueElement);
            removeBreadsListSelected(breadAvailableElement);
            removeBreadsListSelected(breadDeliveredElement);

            for(var i = 0; i < jsonData.length; i++){
                if (jsonData[i].queue == true)
                    createNodeBreads(jsonData[i].id, jsonData[i].product, breadQueueElement, "update-to-available", "list-group-item list-group-item-action list-group-item-info ");
                else if (jsonData[i].available == true)
                    createNodeBreads(jsonData[i].id, jsonData[i].product, breadAvailableElement, "update-to-delivered", "list-group-item list-group-item-action list-group-item-success");
                else if( jsonData[i].delivered == true)
                    createNodeBreads(jsonData[i].id, jsonData[i].product, breadDeliveredElement, "destroy-order","list-group-item list-group-item-action list-group-item-warning");
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

function updateBreadsOrder(urlUpdate, idElement){
    if (typeof idElement != 'undefined'){
        var id = idElement.substr(5,2);
        var url = "/middleware/" + urlUpdate;
        request.open("POST", url, true);
        request.onreadystatechange = showConfirmationQueue;
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send("id=" + encodeURI(id));
    }
}
// FIXME adicionar typescript para melhorar organização do código
