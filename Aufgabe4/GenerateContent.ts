namespace L04_Hexenkessel {

    export function generateContent(_data: Data): void {

        for (let category in _data) {
            // console.log(category);
            let items: Item[] = _data[category];

            let group: HTMLElement | null = null;
            switch (category) {

                // case "Wirkung":
                //     group = createSelect(items, category);
                //     break;
                
                case "Zutaten":
                    group = createMultiple(items, category);
                    break;

                default:
                    break;
            }

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);
        }
    }

    // function createSelect(_items: Item[], _category: string): HTMLElement | null {
    //     let group: HTMLSpanElement = document.createElement("span");
    //     group.id = "groupStyle";

    //     let select: HTMLSelectElement = document.createElement("select");
    //     select.name = _category;

    //     for (let item of _items) {
    //         let option: HTMLOptionElement = document.createElement("option");
    //         option.value = item.name;
    //         option.id = item.name;
    //         let choice: Text = document.createTextNode(item.name);
    //         option.appendChild(choice);
    //         select.appendChild(option);
    //     }

    //     group.appendChild(select);
    //     return group;
    // }

    function createMultiple(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        group.id = "groupStyle";
        
        for (let item of _items) {
            let checkbox: HTMLInputElement = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(checkbox);
            group.appendChild(label);

            //Nach jeder Zutat einen Input type number für die Mengenangabe
            let numberAmount: HTMLInputElement = document.createElement("input");
            numberAmount.type = "number";
            numberAmount.value = "1";
            numberAmount.name = item.name + "Menge";
            numberAmount.id = item.name + "Menge";
            numberAmount.min = "1";
            group.appendChild(numberAmount);

            let breakIt: HTMLElement = document.createElement("br");
            group.appendChild(breakIt);
        }
        return group;
    }
}