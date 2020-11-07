"use strict";
var L04_Hexenkessel_DataStructure;
(function (L04_Hexenkessel_DataStructure) {
    window.addEventListener("load", handleLoad);
    let total = 0;
    function handleLoad(_event) {
        L04_Hexenkessel_DataStructure.generateContent(L04_Hexenkessel_DataStructure.data);
        let btnGeneral = document.querySelector("#btnGeneral");
        let btnIngredients = document.querySelector("#btnIngredients");
        let btnTemperature = document.querySelector("#btnTemperature");
        let btnStir = document.querySelector("#btnStir");
        let slider = document.querySelector("input#duration");
        let slider2 = document.querySelector("input#intensity");
        btnGeneral.addEventListener("click", displayGeneral);
        btnIngredients.addEventListener("click", displayIngredients);
        btnTemperature.addEventListener("click", displayTemperature);
        btnStir.addEventListener("click", displayStir);
        slider.addEventListener("input", displayDuration);
        slider2.addEventListener("input", displayIntensity);
    }
    function displayGeneral() {
        let effect = false;
        let outputGeneral = document.querySelector("div#outputGeneral");
        outputGeneral.innerHTML = "";
        let formData2 = new FormData(document.querySelector("#formGeneral"));
        for (let entry of formData2) {
            switch (entry[0]) {
                case "Name":
                    if (entry[1] != "")
                        outputGeneral.innerHTML += "Trankname: " + entry[1] + "<br>";
                    break;
                case "Beschreibung":
                    if (entry[1] != "")
                        outputGeneral.innerHTML += "Beschreibung: " + entry[1] + "<br>";
                    break;
                case "Trankwirkung":
                    if (entry[1] != "Unbekannt") {
                        outputGeneral.innerHTML += entry[0] + ": " + entry[1] + "<br>";
                        effect = true;
                    }
                    break;
                case "Duration":
                    if (entry[1] != "0" && effect) {
                        outputGeneral.innerHTML += "Wirkungsdauer: " + entry[1] + " Minute(n)" + "<br>";
                    }
                    break;
                default:
            }
        }
    }
    function displayIngredients() {
        let outputInstructions = document.querySelector("div#outputInstructions");
        let totalSpan = document.querySelector("#totalSpan");
        let formData = new FormData(document.querySelector("#formInstructions"));
        // totalSpan.innerHTML = "";
        for (let entry of formData) {
            if (entry[0] == "Zutaten") {
                let selector = "[value='" + entry[1] + "']";
                let item = document.querySelector(selector);
                let associatedAmount = entry[1] + "Menge";
                let amount = Number(formData.get(associatedAmount));
                let itemprice = Number(item.getAttribute("price"));
                total += amount * itemprice;
                outputInstructions.innerHTML += amount + " " + entry[1] + " hinzugeben." + "<br>";
            }
        }
        outputInstructions.innerHTML += "<br>";
        let adjustedPrice = convertCurrency(total);
        totalSpan.innerHTML = "<p><strong>Preis: " + adjustedPrice;
    }
    function displayStir() {
        let outputInstructions = document.querySelector("div#outputInstructions");
        let intensity = false;
        let formData = new FormData(document.querySelector("#formInstructions"));
        for (let entry of formData) {
            switch (entry[0]) {
                case "Intensity":
                    if (entry[1] != "0") {
                        outputInstructions.innerHTML += "Rühren mit einer Intensität von " + entry[1] + "/10." + "<br>";
                        intensity = true;
                    }
                    break;
                case "RührenDauer":
                    if (entry[1] != "0" && intensity)
                        outputInstructions.innerHTML += "➔ Rühren bis " + entry[1] + " Minute(n) vergangen sind." + "<br>";
                    break;
                case "RührenFarbe":
                    if (entry[1] != "keine Angabe" && intensity)
                        outputInstructions.innerHTML += "➔ Rühren bis die Trankfarbe " + entry[1] + " ist." + "<br>";
                    break;
                case "RührenKonsistenz":
                    if (entry[1] != "keine Angabe" && intensity)
                        outputInstructions.innerHTML += "➔ Rühren bis die Konsistenz " + entry[1] + " ist." + "<br>";
                    break;
                default:
            }
        }
        outputInstructions.innerHTML += "<br>";
    }
    function displayTemperature() {
        let outputInstructions = document.querySelector("div#outputInstructions");
        let temperature = false;
        let formData = new FormData(document.querySelector("#formInstructions"));
        for (let entry of formData) {
            switch (entry[0]) {
                case "Temperatur":
                    if (entry[1] != "") {
                        outputInstructions.innerHTML += "Zaubertrank " + entry[1] + "." + "<br>";
                        temperature = true;
                    }
                    break;
                case "TemperaturGrad":
                    if (entry[1] != "" && temperature) {
                        outputInstructions.innerHTML += "➔ Befolgen bis " + entry[1] + " °C erreicht sind." + "<br>";
                    }
                    break;
                case "TemperaturDauer":
                    if (entry[1] != "0" && temperature)
                        outputInstructions.innerHTML += "➔ Befolgen bis " + entry[1] + " Minute(n) vergangen sind." + "<br>";
                    break;
                case "TemperaturFarbe":
                    if (entry[1] != "keine Angabe" && temperature)
                        outputInstructions.innerHTML += "➔ Befolgen bis die Trankfarbe " + entry[1] + " ist." + "<br>";
                    break;
                case "TemperaturKonsistenz":
                    if (entry[1] != "keine Angabe" && temperature)
                        outputInstructions.innerHTML += "➔ Befolgen bis die Konsistenz " + entry[1] + " ist." + "<br>";
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
})(L04_Hexenkessel_DataStructure || (L04_Hexenkessel_DataStructure = {}));
function convertCurrency(_total) {
    let adjustedPrice = "";
    let knut;
    let sickel;
    let galleonen;
    if (_total < 29) {
        adjustedPrice = _total.toFixed(0) + " Knut";
    }
    if (_total < 493) {
        sickel = (_total / 29).toFixed(0);
        knut = (_total % 29).toFixed(0);
        adjustedPrice = sickel + " Sickel und " + knut + " Knut";
    }
    if (_total > 493) {
        galleonen = (_total / 493).toFixed(0);
        _total %= 493;
        sickel = (_total / 29).toFixed(0);
        knut = (_total % 29).toFixed(0);
        adjustedPrice = galleonen + " Galleonen, " + sickel + " Sickel und " + knut + " Knut";
    }
    return adjustedPrice;
}
//# sourceMappingURL=Hexenkessel.js.map