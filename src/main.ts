import "./style.css";

const words = [
  "Abendbrot",
  "Brueckentag",
  "Erklaerungsnot",
  "Fingerspitzengefuehl",
  "Fremdschaemen",
  "Geborgenheit",
  "Geschmacksverirrung",
  "Schweinehund",
  "Kopfkino",
  "Kummerspeck",
  "Schnapsidee",
  "Torschlusspanik",
  "verabredet",
  "verschlimmbessern",
  "Vorfreude",
  "Weltschmerz",
  "Zeitgeist",
  "Zugzwang",
];

const letters: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const tippfeld = document.getElementById("tippfeld") as HTMLDivElement;
const spielstand = document.getElementById("spielstand") as HTMLDivElement;
const spielfeld = document.getElementById("spielfeld") as HTMLDivElement;

let randomWord: string = words[Math.floor(Math.random() * words.length)];
let wordArray: string[] = randomWord.split("");

let rundenzahl: number = 12;
let runde: number = 0;

spielstand.innerHTML = "<p>" + runde.toString() + " : " + rundenzahl.toString();
const pTagArray: HTMLParagraphElement[] = [];
for (let i = 0; i < randomWord.length; i++) {
  const pTag = document.createElement("p") as HTMLParagraphElement;
  pTag.textContent = "_";
  spielfeld.appendChild(pTag);
  pTagArray.push(pTag);
}

letters.forEach((letter: string) => {
  const button = document.createElement("button") as HTMLButtonElement;
  button.textContent = letter;
  button.id = letter;
  button.addEventListener("click", (event: Event) => {
    const btnClicked = event.target as HTMLButtonElement;
    for (let index: number = 0; index < wordArray.length; index++) {
      let letter = wordArray[index];
      if (letter.toLocaleUpperCase() === btnClicked.id) {
        pTagArray[index].textContent = btnClicked.id;
      }
    }
    if (randomWord.toUpperCase().includes(btnClicked.id)) {
      // do nothing
    } else {
      button.disabled = true;
      runde++;
      spielstand.innerHTML =
        "<p>" + runde.toString() + " : " + rundenzahl.toString() + "</p>";
    }
    if (runde === rundenzahl) {
      spielstand.innerHTML = "GAME OVER";
    } else {
      let erraten: boolean = true;
      for (let index: number = 0; index < wordArray.length; index++) {
        if (wordArray[index].toUpperCase() !== pTagArray[index].textContent) {
          erraten = false;
          break;
        }
      }
      if (erraten) {
        spielstand.innerHTML = "GEWONNEN";
      }
    }
  });
  tippfeld.appendChild(button);
});
