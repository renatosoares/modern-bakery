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

// FIXME enviar o preview dos pães para o banco