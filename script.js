const sectionStartEl = document.querySelector(".sectionStart");
const startButtonEl = document.querySelector(".startButton");
const section1El = document.querySelector(".section1");
const section2El = document.querySelector(".section2");
const namesFrameEl = document.querySelector(".namesFrame");
const sectionResultEl = document.querySelector(".sectionResult");
const guessesEl = document.querySelector("#guesses");

let newArray;
let match;
let unmatch;
let total;

// Fisher-Yates algorithm for array shuffling
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
// Slumpa array students (Fisher Yates shuffle)
const shuffledStudents = [...students]; // clone `students` array
shuffleArray(shuffledStudents); // shuffle the `shuffledStudents` array

// eventlistener för klick på startsida
startButtonEl.addEventListener("click", (e) => {
  sectionStartEl.classList.add("hide");
  setTimeout(() => {
    section1El.classList.remove("hide");
    section2El.classList.remove("hide");
  }, 1000);
  if (e.target.tagName === "BUTTON") {
    if (e.target.id === "startButton1") {
      console.log("Du klickade på knapp 1: ", e);
      newArray = shuffledStudents.slice(0, 10);
      total = 10;
      console.log("Det är här newArray: ", newArray);
      // match = newArray10.pop();
      // console.log("Det är här match från klickevent: ", match);
      // unmatch = newArray10.slice(0, 3);
      // console.log("Det är här unmatch: ", unmatch);
      renderGameSetup();
    } else if (e.target.id === "startButton2") {
      console.log("Du klickade på knapp 2: ", e);
      newArray = shuffledStudents.slice(0, 20);
      total = 20;
      console.log("Det är här newArray: ", newArray);
      // match = newArray20.pop();
      // console.log("Det är här match: ", match);
      // unmatch = newArray20.slice(0, 3);
      // console.log("Det är här unmatch: ", unmatch);
      renderGameSetup();
    } else {
      console.log("Du klickade på knapp 3: ", e);
      // console.log("Det här är alla students shufflade: ", shuffledStudents);
      newArray = shuffledStudents;
      total = students.length;
      console.log("Det är här newArray: ", newArray);
      // console.log("Det är här match: ", match);
      // unmatch = shuffledStudents.slice(0, 3);
      // console.log("Det är här unmatch: ", unmatch);
      renderGameSetup();
    }
  } else {
    //ska lösa någon snygg escape/return här
  }
});

let correctGuesses = 0;
//Clickevent för knappar med namn
namesFrameEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    if (e.target.innerText === match.name) {
      console.log("Du klickade på rätt namn; ", e);
      //Kolla om det är match
      namesFrameEl.classList.add("greenFrame");
      correctGuesses++;
    } else {
      //det blev fel, lägg på röd ram
      namesFrameEl.classList.add("redFrame");
    }
  }
  //ta bort match från array
  newArray = newArray.filter(function (item) {
    return item !== match;
  });
  console.log("Detta är newArray efter match blivit borttaget; ", newArray);
  //shuffla listan igen innan render
  shuffleArray(newArray);
  renderGameSetup();
});

// RENDERA ut game setup
const nameEl = document.getElementsByClassName("namesBox");
const imageEl = document.getElementById("imagesFigure");

const renderGameSetup = () => {
  console.log("Det är här newArray från render: ", newArray);
  match = newArray.pop();
  console.log("Det är här match från render: ", match);
  unmatch = newArray.slice(0, 3);
  console.log("Det är här unmatch från render: ", unmatch);

  // Rendera ut match.image på bild div
  imageEl.innerHTML = "";
  const imgElement = document.createElement("img");
  imgElement.src = match.image;
  imageEl.appendChild(imgElement);

  // Rendera ut unmatch.name
  for (let i = 0; i < nameEl.length && i < unmatch.length; i++) {
    let unmatchPerson = unmatch[i];
    let boxForName = nameEl[i];
    let nameText = document.createElement("p");
    nameText.innerText = `${unmatchPerson.name}`;
    boxForName.appendChild(nameText);
  }
  // Rendera ut match.name
  for (let i = 0; i < nameEl.length; i++) {
    let currentBox = nameEl[i];
    if (currentBox.textContent === "") {
      let boxForName = nameEl[i];
      let nameText = document.createElement("p");
      nameText.innerText = `${match.name}`;
      boxForName.appendChild(nameText);
    }
  }

  //slumpa alla boxar på dess id

  //spelet slut - visa resultat sida med score
  if (newArray.length === 0) {
    section1El.classList.add("hide");
    section2El.classList.add("hide");
    sectionResultEl.classList.remove("hide");
    guessesEl.innerText = `${correctGuesses}/ ${total}`;
  }
};

// renderGameSetup();
