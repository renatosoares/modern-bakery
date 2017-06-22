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
function getNewTotals() {
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
    // retorna um array de todos os elementos <img>  existentes no elemento <div>
    var breadLi = selectBreadList.getElementsByTagName("li");
    for (var i=0; i<breadLi.length; i++) {
        breadLi[i].onclick = addToTop5;
    }
}

function addToTop5() {
    var liElement = this;
    var selectBreadListElement = document.getElementById("select-bread-list");
    var numCDs = 0;

    for (var i=0; i<selectBreadListElement.childNodes.length; i++) {
        if (selectBreadListElement.childNodes[i].nodeName.toLowerCase() == "img") {
            numCDs = numCDs + 1;
        }
    }
    if (numCDs >= 5) {
        alert("You already have 5 CDs. Click \"Start Over\" to try again.");
        return;
    }

    //adicionar depois de todos os filhos de id selectBreadList
    selectBreadListElement.appendChild(liElement);

    // evita que a imagem ja selecionada chame addToTop5
    liElement.onclick = null;

    // cria um elemento span
    var newSpanElement = document.createElement("span");
    // adiciona uma classe a ele
    newSpanElement.className = "rank";
    // cria um no de string
    var newTextElement = document.createTextNode(numCDs + 1);
    // adiciona o no string como filho de span
    newSpanElement.appendChild(newTextElement);
    selectBreadListElement.insertBefore(newSpanElement, liElement);
}