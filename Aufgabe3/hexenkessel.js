"use strict";
var L03_Hexenkessel;
(function (L03_Hexenkessel) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log("Start");
        let form = document.querySelector("div#form");
        form.addEventListener("change", handleInfo);
    }
    function handleInfo(_event) {
        let spinnen = document.querySelector("#spinnenbeine");
        let kröten = document.querySelector("#krötenaugen");
        let würmer = document.querySelector("#glibberwürmer");
        let schuppen = document.querySelector("#schlangenschuppen");
        let heat = document.querySelector("#heat");
        let cool = document.querySelector("#cool");
        let intensity = false;
        let recipe = document.querySelector("#result");
        recipe.innerHTML = "";
        let formData = new FormData(document.forms[0]);
        let price = 0;
        for (let entry of formData) {
            switch (entry[0]) {
                case "Trankname":
                    if (entry[1] != "") {
                        recipe.innerHTML += "Name des Tranks: " + entry[1] + "<br>";
                    }
                    break;
                case "Trankbeschreibung":
                    if (entry[1] != "")
                        recipe.innerHTML += "Beschreibung: " + entry[1] + "<br>";
                    break;
                case "Trankwirkung":
                    if (entry[1] != "Unbekannt")
                        recipe.innerHTML += "Trankwirkung: " + entry[1] + "<br>";
                    break;
                case "Dauer der Wirkung":
                    if (entry[1] != "")
                        recipe.innerHTML += "Wirkungsdauer: " + entry[1] + " Minute(n)" + "<br>" + "<br>";
                    break;
                case "Zutat":
                    if (entry[1] != "")
                        recipe.innerHTML += "Zutat: " + entry[1] + "<br>";
                    break;
                case "Spinnen Menge":
                    if (entry[1] != "" && spinnen.checked) {
                        recipe.innerHTML += " • Stückzahl: " + entry[1] + "<br>";
                        price += (4.20 * Number(entry[1]));
                    }
                    break;
                case "Kröten Menge":
                    if (entry[1] != "" && kröten.checked) {
                        recipe.innerHTML += " • Stückzahl: " + entry[1] + "<br>";
                        price += 2.10 * Number(entry[1]);
                    }
                    break;
                case "Würmer Menge":
                    if (entry[1] != "" && würmer.checked) {
                        recipe.innerHTML += " • Stückzahl: " + entry[1] + "<br>";
                        price += 1.50 * Number(entry[1]);
                    }
                    break;
                case "Schlangen Menge":
                    if (entry[1] != "" && schuppen.checked) {
                        recipe.innerHTML += " • Stückzahl: " + entry[1] + "<br>";
                        price += 3.00 * Number(entry[1]);
                    }
                    break;
                case "Temperaturanweisung":
                    if (entry[1] != "")
                        recipe.innerHTML += "<br>" + "Temperaturanweisung: " + entry[1] + "<br>";
                    break;
                case "Grad":
                    if (entry[1] != "" && heat.checked || cool.checked)
                        recipe.innerHTML += "• Anweisung befolgen bis der Trank " + entry[1] + "°C erreicht hat" + "<br>";
                    break;
                case "Dauer":
                    if (entry[1] != "" && heat.checked || cool.checked)
                        recipe.innerHTML += "• Anweisung befolgen bis " + entry[1] + " Minuten vergangen sind" + "<br>";
                    break;
                case "TemperaturKonsistenz":
                    if (entry[1] != "" && heat.checked || cool.checked)
                        recipe.innerHTML += "• Anweisung befolgen bis die Konsistenz " + entry[1] + " ist" + "<br>";
                    break;
                case "TemperaturFarbe":
                    if (entry[1] != "" && heat.checked || cool.checked)
                        recipe.innerHTML += "• Anweisung befolgen bis der Trank die Farbe " + entry[1] + " hat" + "<br>";
                    break;
                case "Rührintensität":
                    if (Number(entry[1]) != 0) {
                        recipe.innerHTML += "<br>" + "Rührintensität: " + entry[1] + "<br>";
                        intensity = true;
                    }
                    break;
                case "Rührdauer":
                    if (entry[1] != "" && intensity)
                        recipe.innerHTML += "• Rühren bis " + entry[1] + " Minuten vergangen sind" + "<br>";
                    break;
                case "RührenKonsistenz":
                    if (entry[1] != "" && intensity)
                        recipe.innerHTML += "• Rühren bis die Konsistenz " + entry[1] + " ist" + "<br>";
                    break;
                case "RührenFarbe":
                    if (entry[1] != "" && intensity)
                        recipe.innerHTML += "• Rühren bis der Trank die Farbe " + entry[1] + " hat" + "<br>";
                    break;
            }
            if (recipe.innerHTML != null) {
                recipe.style.backgroundColor = "rgb(236, 239, 243)";
                recipe.style.border = "0.5px solid black";
            }
        }
        recipe.innerHTML += "<br>" + "Kosten: " + price.toFixed(2) + " Galleonen (ka wie HP-Währung funktioniert tbh)";
    }
})(L03_Hexenkessel || (L03_Hexenkessel = {}));
//# sourceMappingURL=hexenkessel.js.map