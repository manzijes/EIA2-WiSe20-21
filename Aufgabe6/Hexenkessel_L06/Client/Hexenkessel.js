"use strict";
var L06_Hexenkessel_Server;
(function (L06_Hexenkessel_Server) {
    window.addEventListener("load", handleLoad);
    let total = 0;
    let formDataSendInstructions = new FormData();
    let formDataSendGeneral = new FormData();
    let x = 1;
    // let url: string = "http://localhost:5001";
    let url = "https://potion-editor.herokuapp.com/";
    async function handleLoad(_event) {
        let response = await fetch("newData.json");
        let item = await response.text();
        let data = JSON.parse(item);
        L06_Hexenkessel_Server.generateContent(data);
        let send = document.querySelector("#btnSend");
        send.addEventListener("click", sendRecipe);
        let btnGeneral = document.querySelector("#btnGeneral");
        let btnIngredients = document.querySelector("#btnIngredients");
        let btnTemperature = document.querySelector("#btnTemperature");
        let btnStir = document.querySelector("#btnStir");
        let btnDelete = document.querySelector("#delete");
        let slider = document.querySelector("input#duration");
        let slider2 = document.querySelector("input#intensity");
        slider.addEventListener("input", displayDuration);
        slider2.addEventListener("input", displayIntensity);
        btnGeneral.addEventListener("click", displayGeneral);
        btnIngredients.addEventListener("click", displayIngredients);
        btnTemperature.addEventListener("click", displayTemperature);
        btnStir.addEventListener("click", displayStir);
        btnDelete.addEventListener("click", askBeforeDelete);
    }
    function displayDuration(_event) {
        console.log("hallo");
        let progress = document.querySelector("#durationSlider");
        let duration = _event.target.value;
        progress.value = parseFloat(duration);
    }
    function displayIntensity(_event) {
        let progress = document.querySelector("#intensitySlider");
        let intensity = _event.target.value;
        progress.value = parseFloat(intensity);
    }
    async function sendRecipe() {
        // let outputGeneral: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputGeneral");
        // let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        // if (outputGeneral.innerHTML && outputInstructions.innerHTML == "") {
        //     alert("Professor Snape wird sich nicht freuen, wenn du eine leere Seite abgibst...");
        // } else {
        let querySendGeneral = new URLSearchParams(formDataSendGeneral);
        let querySendInstructions = new URLSearchParams(formDataSendInstructions);
        let responseGeneral = await fetch(url + "?" + querySendGeneral.toString());
        let responseInstructions = await fetch(url + "?" + querySendInstructions.toString());
        let responseGeneralText = await responseGeneral.text();
        let responseInstructionsText = await responseInstructions.text();
        alert(responseGeneralText + responseInstructionsText);
        //When recipe has been sent by user, delete all contents of output and all keys, values of formDataSends
        // deleteAll();
    }
    function askBeforeDelete() {
        let outputGeneral = document.querySelector("div#outputGeneral");
        let outputInstructions = document.querySelector("div#outputInstructions");
        if (outputGeneral.innerHTML && outputInstructions.innerHTML != "" && confirm("Bist du sicher, dass du alles löschen möchtest?")) {
            deleteAll();
        }
    }
    function deleteAll() {
        let outputGeneral = document.querySelector("div#outputGeneral");
        let outputInstructions = document.querySelector("div#outputInstructions");
        let totalSpan = document.querySelector("#totalSpan");
        outputGeneral.innerHTML = "...";
        outputInstructions.innerHTML = "";
        totalSpan.innerHTML = "";
        formDataSendGeneral = new FormData();
        formDataSendInstructions = new FormData();
        x = 1;
    }
    function displayGeneral() {
        let effect = false;
        let outputGeneral = document.querySelector("div#outputGeneral");
        outputGeneral.innerHTML = "";
        let formDataGeneral = new FormData(document.querySelector("#formGeneral"));
        for (let entry of formDataGeneral) {
            switch (entry[0]) {
                case "Name":
                    if (entry[1] != "") {
                        outputGeneral.innerHTML += "Trankname: " + entry[1] + "<br>";
                        formDataSendGeneral.delete(entry[0]);
                        formDataSendGeneral.append(entry[0], entry[1]);
                    }
                    break;
                case "Beschreibung":
                    if (entry[1] != "") {
                        outputGeneral.innerHTML += "Beschreibung: " + entry[1] + "<br>";
                        formDataSendGeneral.delete(entry[0]);
                        formDataSendGeneral.append(entry[0], entry[1]);
                    }
                    break;
                case "Trankwirkung":
                    if (entry[1] != "Unbekannt") {
                        outputGeneral.innerHTML += entry[0] + ": " + entry[1] + "<br>";
                        effect = true;
                        formDataSendGeneral.delete(entry[0]);
                        formDataSendGeneral.append(entry[0], entry[1]);
                    }
                    break;
                case "Wirkungsdauer (Minuten)":
                    if (entry[1] != "0" && effect) {
                        outputGeneral.innerHTML += "Wirkungsdauer: " + entry[1] + " Minute(n)" + "<br>";
                        formDataSendGeneral.delete(entry[0]);
                        formDataSendGeneral.append(entry[0], entry[1]);
                    }
                    break;
                default:
            }
        }
    }
    function displayIngredients() {
        let outputInstructions = document.querySelector("div#outputInstructions");
        let totalSpan = document.querySelector("#totalSpan");
        let formDataInstructions = new FormData(document.querySelector("#formInstructions"));
        for (let entry of formDataInstructions) {
            if (entry[0] == "Zutaten") {
                let selector = "[value='" + entry[1] + "']";
                let item = document.querySelector(selector);
                let associatedAmount = entry[1] + " Menge";
                let amount = Number(formDataInstructions.get(associatedAmount));
                let itemprice = Number(item.getAttribute("price"));
                total += amount * itemprice;
                outputInstructions.innerHTML += amount + " " + entry[1] + " hinzugeben." + "<br>";
                formDataSendInstructions.append(x + ". " + entry[0], entry[1]);
                formDataSendInstructions.append(associatedAmount, amount.toString());
                x++;
            }
        }
        outputInstructions.innerHTML += "<br>";
        let adjustedPrice = convertCurrency(total);
        totalSpan.innerHTML = "<p><strong>Preis: " + adjustedPrice;
    }
    function displayStir() {
        let outputInstructions = document.querySelector("div#outputInstructions");
        let intensity = false;
        let formDataInstructions = new FormData(document.querySelector("#formInstructions"));
        for (let entry of formDataInstructions) {
            switch (entry[0]) {
                case "Rühren mit Intensität":
                    if (entry[1] != "0") {
                        outputInstructions.innerHTML += "Rühren mit einer Intensität von " + entry[1] + "/10." + "<br>";
                        intensity = true;
                        formDataSendInstructions.append(x + ". " + entry[0], entry[1]);
                        x++;
                    }
                    break;
                case "Rühren bis Dauer (Minuten)":
                    if (entry[1] != "0" && intensity) {
                        outputInstructions.innerHTML += "➔ Rühren bis " + entry[1] + " Minute(n) vergangen sind." + "<br>";
                        formDataSendInstructions.append(x + ". " + entry[0], entry[1]);
                        x++;
                    }
                    break;
                case "Rühren bis Farbe":
                    if (entry[1] != "keine Angabe" && intensity) {
                        outputInstructions.innerHTML += "➔ Rühren bis die Trankfarbe " + entry[1] + " ist." + "<br>";
                        formDataSendInstructions.append(x + ". " + entry[0], entry[1]);
                        x++;
                    }
                    break;
                case "Rühren bis Konsistenz":
                    if (entry[1] != "keine Angabe" && intensity) {
                        outputInstructions.innerHTML += "➔ Rühren bis die Konsistenz " + entry[1] + " ist." + "<br>";
                        formDataSendInstructions.append(x + ". " + entry[0], entry[1]);
                        x++;
                    }
                    break;
                default:
            }
        }
        outputInstructions.innerHTML += "<br>";
    }
    function displayTemperature() {
        let outputInstructions = document.querySelector("div#outputInstructions");
        let temperature = false;
        let formDataInstructions = new FormData(document.querySelector("#formInstructions"));
        for (let entry of formDataInstructions) {
            switch (entry[0]) {
                case "Temperaturanweisung":
                    if (entry[1] != "") {
                        outputInstructions.innerHTML += "Zaubertrank " + entry[1] + "." + "<br>";
                        temperature = true;
                        formDataSendInstructions.append(x + ". " + entry[0], entry[1]);
                        x++;
                    }
                    break;
                case "Gradzahl (Celsius)":
                    if (entry[1] != "" && temperature) {
                        outputInstructions.innerHTML += "➔ Befolgen bis " + entry[1] + " °C erreicht sind." + "<br>";
                        formDataSendInstructions.append(x + ". " + entry[0], entry[1]);
                        x++;
                    }
                    break;
                case "Erhitzen/Abkühlen bis Dauer (Minuten)":
                    if (entry[1] != "0" && temperature) {
                        outputInstructions.innerHTML += "➔ Befolgen bis " + entry[1] + " Minute(n) vergangen sind." + "<br>";
                        formDataSendInstructions.append(x + ". " + entry[0], entry[1]);
                        x++;
                    }
                    break;
                case "Erhitzen/Abkühlen bis Farbe":
                    if (entry[1] != "keine Angabe" && temperature) {
                        outputInstructions.innerHTML += "➔ Befolgen bis die Trankfarbe " + entry[1] + " ist." + "<br>";
                        formDataSendInstructions.append(x + ". " + entry[0], entry[1]);
                        x++;
                    }
                    break;
                case "Erhitzen/Abkühlen bis Konsistenz":
                    if (entry[1] != "keine Angabe" && temperature) {
                        outputInstructions.innerHTML += "➔ Befolgen bis die Konsistenz " + entry[1] + " ist." + "<br>";
                        formDataSendInstructions.append(x + ". " + entry[0], entry[1]);
                        x++;
                    }
                    break;
                default:
            }
        }
        outputInstructions.innerHTML += "<br>";
    }
    function convertCurrency(_total) {
        let adjustedPrice = "";
        let knut;
        let sickel;
        let galleonen;
        let remainder;
        galleonen = (Math.floor(_total / 493)).toString();
        remainder = _total % 493;
        sickel = (Math.floor(remainder / 29)).toString();
        remainder = remainder % 29;
        knut = remainder.toString();
        if (galleonen != "0") {
            adjustedPrice = galleonen + " Galleonen, " + sickel + " Sickel und " + knut + " Knut";
        }
        else if (sickel != "0") {
            adjustedPrice = sickel + " Sickel und " + knut + " Knut";
        }
        else {
            adjustedPrice = knut + " Knut";
        }
        return adjustedPrice;
    }
})(L06_Hexenkessel_Server || (L06_Hexenkessel_Server = {}));
//# sourceMappingURL=Hexenkessel.js.map