namespace L07_Hexenkessel_Database {
    window.addEventListener("load", handleLoad);
    let total: number = 0;
    let formDataSend: FormData = new FormData();
    // let url: string = "http://localhost:5001";
    let url: string = "https://potion-editor.herokuapp.com/";

    async function handleLoad(_event: Event): Promise<void> {

        let response: Response = await fetch("newData.json");
        let item: string = await response.text();
        let data: Data = JSON.parse(item);

        generateContent(data);

        let send: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnSend");
        send.addEventListener("click", sendRecipe);

        let btnShow: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnShow");
        btnShow.addEventListener("click", retrieveRecipes);

        let btnGeneral: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnGeneral");
        let btnIngredients: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnIngredients");
        let btnTemperature: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnTemperature");
        let btnStir: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnStir");
        let btnDelete: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#delete");

        let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input#duration");
        let slider2: HTMLInputElement = <HTMLInputElement>document.querySelector("input#intensity");
    
        slider.addEventListener("input", displayDuration);
        slider2.addEventListener("input", displayIntensity);  

        btnGeneral.addEventListener("click", displayGeneral);
        btnIngredients.addEventListener("click", displayIngredients);
        btnTemperature.addEventListener("click", displayTemperature);
        btnStir.addEventListener("click", displayStir);
        btnDelete.addEventListener("click", askBeforeDelete);
    }

    function displayDuration(_event: Event): void {
        let progress: HTMLProgressElement = <HTMLProgressElement>document.querySelector("#durationSlider");
        let duration: string = (<HTMLInputElement>_event.target).value;
        progress.value = parseFloat(duration);
    }

    function displayIntensity(_event: Event): void {
        let progress: HTMLProgressElement = <HTMLProgressElement>document.querySelector("#intensitySlider");
        let intensity: string = (<HTMLInputElement>_event.target).value;
        progress.value = parseFloat(intensity);
    }

    async function retrieveRecipes(): Promise<void> {
        let respone: Response = await fetch(url + "?" + "command=retrieve");
        let responseText: string = await respone.text();
        alert(responseText.replace(/<br>/g, " "));
        // createDiv(responseText);
    }

    // function createDiv(_responseText: string): void {
    //     var e: HTMLElement = <HTMLElement>document.getElementById("popupBoxOnePosition");
    //     var f: HTMLElement = <HTMLElement>document.getElementById("popupBoxContent");
    //     var g: HTMLButtonElement = <HTMLButtonElement>document.getElementById("btnClose");
    //     if (e.style.display != "block") {
    //         e.style.display = "block";
    //         f.textContent = _responseText.replace(/<br>/g, " ");
    //         g.addEventListener("click", hideDiv);
    //     }
    // }

    // function hideDiv(): void {
    //     var e: HTMLElement = <HTMLElement>document.getElementById("popupBoxOnePosition");
    //     if (e.style.display == "block") {
    //         e.style.display = "none";
    //     }
    // }

    async function sendRecipe(): Promise<void> {
        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        let recipeContent: string = outputInstructions.innerHTML;
        formDataSend.append("Rezept", recipeContent);

        let query: URLSearchParams = new URLSearchParams(<any>formDataSend);
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        alert(responseText.replace(/<br>/g, " "));
    }

    function askBeforeDelete(): void {
        let outputGeneral: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputGeneral");
        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        if (outputGeneral.innerHTML && outputInstructions.innerHTML != "" && confirm("Bist du sicher, dass du alles löschen möchtest?")) {
            deleteAll();
        }
    }

    function deleteAll(): void {
        let outputGeneral: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputGeneral");
        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        let totalSpan: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#totalSpan");
        outputGeneral.innerHTML = "...";
        outputInstructions.innerHTML = "";
        totalSpan.innerHTML = "";
        formDataSend = new FormData();
    }

    function displayGeneral(): void {
        
        let effect: boolean = false;
        let outputGeneral: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputGeneral");
        outputGeneral.innerHTML = "";
        let formDataGeneral: FormData = new FormData(<HTMLFormElement>document.querySelector("#formGeneral"));

        for (let entry of formDataGeneral) {

            switch (entry[0]) {
                case "Name":
                    if (entry[1] != "") {
                        outputGeneral.innerHTML += "Trankname: " + entry[1] + "<br>";
                        formDataSend.set(entry[0], entry[1]);
                    }
                    break;

                case "Beschreibung":
                    if (entry[1] != "") {
                        outputGeneral.innerHTML += "Beschreibung: " + entry[1] + "<br>";
                        formDataSend.set(entry[0], entry[1]);
                    }
                    break;

                case "Trankwirkung":
                    if (entry[1] != "Unbekannt") {
                        outputGeneral.innerHTML += entry[0] + ": " + entry[1] + "<br>";
                        effect = true;
                        formDataSend.set(entry[0], entry[1]);
                    }
                    break;
                
                case "Wirkungsdauer (Minuten)":
                    if (entry[1] != "0" && effect) {
                        outputGeneral.innerHTML += "Wirkungsdauer: " + entry[1] + " Minute(n)" + "<br>";
                        formDataSend.set(entry[0], entry[1]);
                    }
                    break;
                    
                default:
                }  
            }
        }

    function displayIngredients(): void {

        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        let totalSpan: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#totalSpan");
        let formDataInstructions: FormData = new FormData(<HTMLFormElement>document.querySelector("#formInstructions"));

        for (let entry of formDataInstructions) {

            if (entry[0] == "Zutaten") {
                let selector: string = "[value='" + entry[1] + "']";
                let item: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);

                let associatedAmount: string = entry[1] + " Menge";
                let amount: number = Number(formDataInstructions.get(associatedAmount));

                let itemprice: number = Number(item.getAttribute("price"));
                total += amount * itemprice;

                outputInstructions.innerHTML += amount + " " + entry[1] + " hinzugeben." + "<br>";
            }
        }
        outputInstructions.innerHTML += "<br>";
        let adjustedPrice: string = convertCurrency(total);
        totalSpan.innerHTML = "<p><strong>Preis: " + adjustedPrice;
    }

    function displayStir(): void {

        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        let intensity: boolean = false;
        let formDataInstructions: FormData = new FormData(<HTMLFormElement>document.querySelector("#formInstructions"));

        for (let entry of formDataInstructions) {

            switch (entry[0]) {

                case "Rühren mit Intensität":
                    if (entry[1] != "0") {
                        outputInstructions.innerHTML += "Rühren mit einer Intensität von " + entry[1] + "/10." + "<br>";
                        intensity = true;
                    }
                    break;

                case "Rühren bis Dauer (Minuten)":
                    if (entry[1] != "0" && intensity) {
                        outputInstructions.innerHTML += "➔ Rühren bis " + entry[1] + " Minute(n) vergangen sind." + "<br>";
                    }
                    break;

                case "Rühren bis Farbe":
                    if (entry[1] != "keine Angabe" && intensity) {
                        outputInstructions.innerHTML += "➔ Rühren bis die Trankfarbe " + entry[1] + " ist." + "<br>";
                    }
                    break;

                case "Rühren bis Konsistenz":
                    if (entry[1] != "keine Angabe" && intensity) {
                        outputInstructions.innerHTML += "➔ Rühren bis die Konsistenz " + entry[1] + " ist." + "<br>";
                    }
                    break;

                default:
            }
        }
        outputInstructions.innerHTML += "<br>";
    }

    function displayTemperature(): void {

        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        let temperature: boolean = false;
        let formDataInstructions: FormData = new FormData(<HTMLFormElement>document.querySelector("#formInstructions"));

        for (let entry of formDataInstructions) {

            switch (entry[0]) {
                case "Temperaturanweisung":
                    if (entry[1] != "") {
                        outputInstructions.innerHTML += "Zaubertrank " + entry[1] + "." + "<br>";
                        temperature = true;
                    }
                    break;

                case "Gradzahl (Celsius)":
                    if (entry[1] != "" && temperature) {
                        outputInstructions.innerHTML += "➔ Befolgen bis " + entry[1] + " °C erreicht sind." + "<br>";
                    }
                    break;

                case "Erhitzen/Abkühlen bis Dauer (Minuten)":
                    if (entry[1] != "0" && temperature) {
                        outputInstructions.innerHTML += "➔ Befolgen bis " + entry[1] + " Minute(n) vergangen sind." + "<br>";
                    }
                    break;

                case "Erhitzen/Abkühlen bis Farbe":
                    if (entry[1] != "keine Angabe" && temperature) {
                        outputInstructions.innerHTML += "➔ Befolgen bis die Trankfarbe " + entry[1] + " ist." + "<br>";
                    }
                    break;

                case "Erhitzen/Abkühlen bis Konsistenz":
                    if (entry[1] != "keine Angabe" && temperature) {
                        outputInstructions.innerHTML += "➔ Befolgen bis die Konsistenz " + entry[1] + " ist." + "<br>";
                    }
                    break;

                default:
            }
        }
        outputInstructions.innerHTML += "<br>";
    }

    function convertCurrency(_total: number): string {
        let adjustedPrice: string = "";
        let knut: string;
        let sickel: string;
        let galleonen: string;
        let remainder: number;

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
}