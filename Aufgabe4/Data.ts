namespace L04_Hexenkessel_DataStructure {

    export interface Item {
        name: string;
        price: number;
    }

    export interface Data {
        [category: string]: Item[];
    }

    export let data: Data = {
        // Wirkung: [
        //     { name: "Unbekannt", price: 0.00 },
        //     { name: "Heiltrank", price: 0.00 },
        //     { name: "Liebestrank", price: 0.00 },
        //     { name: "Stärkungstrank", price: 0.00 },
        //     { name: "Beruhigungstrank", price: 0.00 }
        // ],
        Zutaten: [
            { name: "Spinnenbeine", price: 50 },
            { name: "Krötenaugen", price: 40 },
            { name: "Glibberwürmer", price: 20 },
            { name: "Schlangenschuppen", price: 75 }
        ]
    };
}