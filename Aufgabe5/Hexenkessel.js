"use strict";
var L05_Hexenkessel_Client;
(function (L05_Hexenkessel_Client) {
    window.addEventListener("load", handleLoad);
    let total = 0;
    // let formGeneral: HTMLFormElement;
    // let formInstructions: HTMLFormElement;
    let formDataSendInstructions = new FormData();
    let formDataSendGeneral = new FormData();
    async function handleLoad(_event) {
        let response = await fetch("Data.json");
        let allIngredients = await response.text();
        let data = JSON.parse(allIngredients);
        // formGeneral = <HTMLFormElement>document.querySelector("#formGeneral");
        // formInstructions = <HTMLFormElement>document.querySelector("#formInstructions");
        let send = document.querySelector("#btnSend");
        send.addEventListener("click", sendRecipe);
        L05_Hexenkessel_Client.generateContent(data);
        let btnGeneral = document.querySelector("#btnGeneral");
        let btnIngredients = document.querySelector("#btnIngredients");
        let btnTemperature = document.querySelector("#btnTemperature");
        let btnStir = document.querySelector("#btnStir");
        let btnDelete = document.querySelector("#delete");
        let slider = document.querySelector("input#duration");
        let slider2 = document.querySelector("input#intensity");
        btnGeneral.addEventListener("click", displayGeneral);
        btnIngredients.addEventListener("click", displayIngredients);
        btnTemperature.addEventListener("click", displayTemperature);
        btnStir.addEventListener("click", displayStir);
        btnDelete.addEventListener("click", askBeforeDelete);
        slider.addEventListener("input", displayDuration);
        slider2.addEventListener("input", displayIntensity);
    }
    async function sendRecipe() {
        let outputGeneral = document.querySelector("div#outputGeneral");
        let outputInstructions = document.querySelector("div#outputInstructions");
        if (outputGeneral.innerHTML && outputInstructions.innerHTML == "") {
            alert("Professor Snape wird sich nicht freuen, wenn du eine leere Seite abgibst...");
        }
        else {
            console.log("Send Recipe");
            // let formDataGeneral: FormData = new FormData(formGeneral);
            // let formDataInstructions: FormData = new FormData(formInstructions);
            // let queryGeneral: URLSearchParams = new URLSearchParams(<any>formDataGeneral);
            // let queryInstructions: URLSearchParams = new URLSearchParams(<any>formDataInstructions);
            let querySendGeneral = new URLSearchParams(formDataSendGeneral);
            let querySendInstructions = new URLSearchParams(formDataSendInstructions);
            await fetch("index.html?" + querySendGeneral.toString());
            await fetch("index.html?" + querySendInstructions.toString());
            //When recipe has been sent by user, delete all contents of output and all keys, values of formDataSends
            deleteAll();
            alert("Rezept gesendet!");
        }
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
                        formDataSendGeneral.append(entry[0], entry[1]);
                    }
                    break;
                case "Beschreibung":
                    if (entry[1] != "") {
                        outputGeneral.innerHTML += "Beschreibung: " + entry[1] + "<br>";
                        formDataSendGeneral.append(entry[0], entry[1]);
                    }
                    break;
                case "Trankwirkung":
                    if (entry[1] != "Unbekannt") {
                        outputGeneral.innerHTML += entry[0] + ": " + entry[1] + "<br>";
                        effect = true;
                        formDataSendGeneral.append(entry[0], entry[1]);
                    }
                    break;
                case "Duration":
                    if (entry[1] != "0" && effect) {
                        outputGeneral.innerHTML += "Wirkungsdauer: " + entry[1] + " Minute(n)" + "<br>";
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
                let associatedAmount = entry[1] + "Menge";
                let amount = Number(formDataInstructions.get(associatedAmount));
                let itemprice = Number(item.getAttribute("price"));
                total += amount * itemprice;
                outputInstructions.innerHTML += amount + " " + entry[1] + " hinzugeben." + "<br>";
                formDataSendInstructions.append(entry[0], entry[1]);
                formDataSendInstructions.append(associatedAmount, amount.toString());
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
                case "Intensity":
                    if (entry[1] != "0") {
                        outputInstructions.innerHTML += "Rühren mit einer Intensität von " + entry[1] + "/10." + "<br>";
                        intensity = true;
                        formDataSendInstructions.append(entry[0], entry[1]);
                    }
                    break;
                case "RührenDauer":
                    if (entry[1] != "0" && intensity) {
                        outputInstructions.innerHTML += "➔ Rühren bis " + entry[1] + " Minute(n) vergangen sind." + "<br>";
                        formDataSendInstructions.append(entry[0], entry[1]);
                    }
                    break;
                case "RührenFarbe":
                    if (entry[1] != "keine Angabe" && intensity) {
                        outputInstructions.innerHTML += "➔ Rühren bis die Trankfarbe " + entry[1] + " ist." + "<br>";
                        formDataSendInstructions.append(entry[0], entry[1]);
                    }
                    break;
                case "RührenKonsistenz":
                    if (entry[1] != "keine Angabe" && intensity) {
                        outputInstructions.innerHTML += "➔ Rühren bis die Konsistenz " + entry[1] + " ist." + "<br>";
                        formDataSendInstructions.append(entry[0], entry[1]);
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
                case "Temperatur":
                    if (entry[1] != "") {
                        outputInstructions.innerHTML += "Zaubertrank " + entry[1] + "." + "<br>";
                        temperature = true;
                        formDataSendInstructions.append(entry[0], entry[1]);
                    }
                    break;
                case "TemperaturGrad":
                    if (entry[1] != "" && temperature) {
                        outputInstructions.innerHTML += "➔ Befolgen bis " + entry[1] + " °C erreicht sind." + "<br>";
                        formDataSendInstructions.append(entry[0], entry[1]);
                    }
                    break;
                case "TemperaturDauer":
                    if (entry[1] != "0" && temperature) {
                        outputInstructions.innerHTML += "➔ Befolgen bis " + entry[1] + " Minute(n) vergangen sind." + "<br>";
                        formDataSendInstructions.append(entry[0], entry[1]);
                    }
                    break;
                case "TemperaturFarbe":
                    if (entry[1] != "keine Angabe" && temperature) {
                        outputInstructions.innerHTML += "➔ Befolgen bis die Trankfarbe " + entry[1] + " ist." + "<br>";
                        formDataSendInstructions.append(entry[0], entry[1]);
                    }
                    break;
                case "TemperaturKonsistenz":
                    if (entry[1] != "keine Angabe" && temperature) {
                        outputInstructions.innerHTML += "➔ Befolgen bis die Konsistenz " + entry[1] + " ist." + "<br>";
                        formDataSendInstructions.append(entry[0], entry[1]);
                    }
                    break;
                default:
            }
        }
        outputInstructions.innerHTML += "<br>";
    }
    function displayDuration(_event) {
        let progress = document.querySelector("#durationSlider");
        let duration = _event.target.value;
        progress.value = parseFloat(duration);
    }
    function displayIntensity(_event) {
        let progress = document.querySelector("#intensitySlider");
        let intensity = _event.target.value;
        progress.value = parseFloat(intensity);
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
})(L05_Hexenkessel_Client || (L05_Hexenkessel_Client = {}));
//# sourceMappingURL=Hexenkessel.js.map