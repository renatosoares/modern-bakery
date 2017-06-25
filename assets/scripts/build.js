var request = null;
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
    // informa ao servidor que os dados estão codificados
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send("breadSendValue=" + encodeURI(breadSendValue));
}

function showConfirmationQueue() {
    if (request.readyState == 4) {
        if (request.status == 200) {
            // var response = request.responseText;
            // // localizar o formulário na página
            // var mainDiv = document.getElementById("main-page");
            // var orderForm = document.getElementById("order-form");
            //
            // // Criar um texto de confirmação
            // pElement = document.createElement("p");
            // textNode = document.createTextNode("Your order should arrive within " +
            //     response + " minutes. Enjoy your pizza!");
            // pElement.appendChild(textNode);
            //
            // // substituir o formulário com a confirmação
            // mainDiv.replaceChild(pElement, orderForm);

            var jsonData = JSON.parse(request.responseText);
            var breadQueueElement = document.getElementById("bread-queue");

            for(var i = 0; i < jsonData.length; i++){
                var textNodeLi = jsonData[i].product;
                var newElementLi = document.createElement("li");
                newElementLi.className = "col-sm-12";
                var newTextElement = document.createTextNode(textNodeLi);
                newElementLi.appendChild(newTextElement);
                breadQueueElement.appendChild(newElementLi);
            } // FIXME reordenar lista em um novo envio
            // FIXME apagar selecionados envidados e listar novamente os pães
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