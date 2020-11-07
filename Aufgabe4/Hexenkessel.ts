namespace L04_Hexenkessel_DataStructure {
    window.addEventListener("load", handleLoad);
    let total: number = 0;

    function handleLoad(_event: Event): void {
        generateContent(data);

        let btnGeneral: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnGeneral");
        let btnIngredients: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnIngredients");
        let btnTemperature: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnTemperature");
        let btnStir: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#btnStir");

        let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("input#duration");
        let slider2: HTMLInputElement = <HTMLInputElement>document.querySelector("input#intensity");

        btnGeneral.addEventListener("click", displayGeneral);
        btnIngredients.addEventListener("click", displayIngredients);
        btnTemperature.addEventListener("click", displayTemperature);
        btnStir.addEventListener("click", displayStir);
        slider.addEventListener("input", displayDuration);
        slider2.addEventListener("input", displayIntensity);
        
    }

    function displayGeneral(): void {
        
        let effect: boolean = false;
        let outputGeneral: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputGeneral");
        outputGeneral.innerHTML = "";

        let formData2: FormData = new FormData(<HTMLFormElement>document.querySelector("#formGeneral"));

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

    function displayIngredients(): void {
        
        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        let totalSpan: HTMLSpanElement = <HTMLSpanElement>document.querySelector("#totalSpan");
        let formData: FormData = new FormData(<HTMLFormElement>document.querySelector("#formInstructions"));

        // totalSpan.innerHTML = "";

        for (let entry of formData) {

            if (entry[0] == "Zutaten") {
                    let selector: string = "[value='" + entry[1] + "']";
                    let item: HTMLInputElement = <HTMLInputElement>document.querySelector(selector);
                    
                    let associatedAmount: string = entry[1] + "Menge";
                    let amount: number = Number(formData.get(associatedAmount));

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
        let formData: FormData = new FormData(<HTMLFormElement>document.querySelector("#formInstructions"));
                
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

    function displayTemperature(): void {
        
        let outputInstructions: HTMLDivElement = <HTMLDivElement>document.querySelector("div#outputInstructions");
        let temperature: boolean = false;
        let formData: FormData = new FormData(<HTMLFormElement>document.querySelector("#formInstructions"));
                
        for (let entry of formData) {

            switch (entry[0]) {               
                case "Temperatur":
                    if (entry[1] != "") {
                        outputInstructions.innerHTML += "Zaubertrank " + entry[1] + "." +  "<br>";
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
}

function convertCurrency(_total: number): string {
    let adjustedPrice: string = "";
    let knut: string;
    let sickel: string;
    let galleonen: string;

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