
let userName: string | null = prompt("Wie ist dein Name?", "");
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