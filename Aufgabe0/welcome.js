"use strict";
let userName = prompt("Wie ist dein Name?", "");
if (userName != null) {
    document.querySelector("#text").innerHTML =
        "Hallo " + userName + "! Willkommen :)";
}
if (userName == "") {
    document.querySelector("#text").innerHTML =
        "Hallo Unbekannter! Willkommen :)";
}
//# sourceMappingURL=welcome.js.map