"use strict";
let userName = prompt("Wie ist dein Name?", "");
if (userName != null) {
    //@ts-ignore
    document.querySelector("#text").innerHTML =
        "Hallo " + userName + "! Willkommen :)";
}
if (userName == "") {
    //@ts-ignore
    document.querySelector("#text").innerHTML =
        "Hallo Unbekannter! Willkommen :)";
}
//# sourceMappingURL=welcome.js.map