const sectionStartEl = document.querySelector(".sectionStart");
const startButtonEl = document.querySelector(".startButton");
const section1El = document.querySelector(".section1");
const section2El = document.querySelector(".section2");
const namesFrameEl = document.querySelector(".namesFrame");
const sectionResultEl = document.querySelector(".sectionResult");
const guessesEl = document.querySelector("#guesses");
const feedbackEl = document.querySelector("#feedback");

let newArray;
let match;
let unmatch;
let total;
let restArray;

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
      newArray = shuffledStudents.slice(0, 10);
      restArray = shuffledStudents.slice(11, 17);
      shuffleArray(newArray);
      total = 10;
      console.log("Det är här newArray: ", newArray);
      renderGameSetup();
    } else if (e.target.id === "startButton2") {
      newArray = shuffledStudents.slice(0, 20);
      restArray = shuffledStudents.slice(21, 27);
      shuffleArray(newArray);
      total = 20;
      console.log("Det är här newArray: ", newArray);
      renderGameSetup();
    } else {
      newArray = shuffledStudents;
      restArray = shuffledStudents.slice(0, 20);
      shuffleArray(newArray);
      total = shuffledStudents.length;
      console.log("Det är här newArray: ", newArray);
      renderGameSetup();
    }
  } else {
    //vad händer när man klickar utanför?
  }
});

const correctGuessColor = () => {
  feedbackEl.className = "greenFrame";
  feedbackEl.innerHTML = `<p>Du gissade rätt!</p>`;
};

const incorrectGuessColor = () => {
  feedbackEl.className = "redFrame";
  feedbackEl.innerHTML = `<p>Du gissade fel!</p>`;
};

const removeFeedback = () => {
  feedbackEl.className = "";
  feedbackEl.innerHTML = `<p></p>`;
};

let correctGuesses = 0;
let clickCount = 0;

//Clickevent för knappar med namn
namesFrameEl.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    if (e.target.innerText === match.name || e.target.tagName === "P") {
      console.log("Du klickade på RÄTT namn; ", e);
      correctGuessColor();
      // namesFrameEl.classList.add("greenFrame");
      correctGuesses++;
    } else {
      console.log("Du klickade på FEL namn; ", e);
      incorrectGuessColor();
    }
  }

  newArray = newArray.filter((item) => {
    return item !== match;
  });

  clickCount++;

  if (clickCount === total) {
    section1El.classList.add("hide");
    section2El.classList.add("hide");
    sectionResultEl.classList.remove("hide");
    guessesEl.innerText = `${correctGuesses}/ ${total}`;
  }

  shuffleArray(newArray);

  setTimeout(() => {
    renderGameSetup();
  }, 1000);
});

// RENDERA ut game setup
const nameEl = document.getElementsByClassName("namesBox");
const imageEl = document.getElementById("imagesFigure");

const renderGameSetup = () => {
  matchArray = newArray.slice(0, 1);
  match = matchArray[0];
  unmatch = newArray.slice(1, 4);
  console.log("Det är här match från render: ", match);
  console.log("Det är här unmatch från render: ", unmatch);
  console.log("Det är här newArray från render: ", newArray);
  console.log("Det är här restArray från render: ", restArray);

  //ta bort grön/röd färg innan nästa omgång
  removeFeedback();

  // Rendera ut match.image på bild div
  imageEl.innerHTML = "";
  const imageBox = document.createElement("img");
  imageBox.setAttribute("src", match.image);
  imageEl.append(imageBox);

  // Rendera ut namen på random knappar
  const randomLocation = (max = 4) => {
    return Math.ceil(Math.random() * max);
  };

  function renderNameToButton() {
    for (let i = 1; i <= 4; i++) {
      let buttonBoxId = "box-" + i;
      let button = document.getElementById(buttonBoxId);
      button.innerHTML = "";
    }

    let buttonNames = unmatch.map((person) => person.name);
    buttonNames.push(match.name);
    shuffleArray(buttonNames);

    for (let i = 0; i < buttonNames.length; i++) {
      let buttonBoxId = "box-" + (i + 1);
      let button = document.getElementById(buttonBoxId);
      button.innerHTML = `<p>${buttonNames[i]}</p>`;
    }

    for (let i = 1; i <= 4; i++) {
      let buttonBoxId = "box-" + i;
      let button = document.getElementById(buttonBoxId);

      if (button.innerHTML === "") {
        if (restArray.length > 0) {
          let restObject = restArray.shift();
          button.innerHTML = `<p>${restObject.name}</p>`;
        }
      }
    }
  }
  renderNameToButton();
};
