const sectionStartEl = document.querySelector(".sectionStart");
const startButtonsEl = document.querySelectorAll(".startButtons");
const section1El = document.querySelector(".section1");
const section2El = document.querySelector(".section2");
const guessButtons = document.querySelectorAll(".namesBox");
const sectionResultEl = document.querySelector(".sectionResult");
const guessesEl = document.querySelector("#guesses");
const feedbackEl = document.querySelector("#feedback");
const nameEl = document.getElementsByClassName("namesBox");
const imageEl = document.getElementById("imagesFigure");

let newArray;
let match;
let unmatch;
let total;
let imagesArray;
let namesArray;

let removedStudents = [];

// Fisher-Yates algorithm for array shuffling
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// Skapa en kopia av students och shuffla
const shuffledStudents = [...students];
shuffleArray(shuffledStudents);

// Eventlistener för klick på startsida
startButtonsEl.forEach((button) => {
  button.addEventListener("click", (e) => {
    sectionStartEl.classList.add("hide");

    setTimeout(() => {
      section1El.classList.remove("hide");
      section2El.classList.remove("hide");
    }, 1000);

    if (e.target.tagName === "BUTTON") {
      if (e.target.id === "startButton1") {
        newArray = shuffledStudents.slice(0, 10);
        shuffleArray(newArray);
        total = 10;

        imagesArray = newArray.filter((object, index) => index < total);
        shuffleArray(imagesArray);

        namesArray = newArray
          .filter((object, index) => index < total)
          .map((object) => ({ id: object.id, name: object.name }));
        shuffleArray(namesArray);

        renderGameSetup();
      } else if (e.target.id === "startButton2") {
        newArray = shuffledStudents.slice(0, 20);
        shuffleArray(newArray);
        total = 20;

        imagesArray = newArray.filter((object, index) => index < total);
        shuffleArray(imagesArray);

        namesArray = newArray
          .filter((object, index) => index < total)
          .map((object) => ({ id: object.id, name: object.name }));
        shuffleArray(namesArray);

        renderGameSetup();
      } else {
        newArray = shuffledStudents;
        shuffleArray(newArray);
        total = shuffledStudents.length;

        imagesArray = newArray.filter((object, index) => index < total);
        shuffleArray(imagesArray);

        namesArray = newArray
          .filter((object, index) => index < total)
          .map((object) => ({ id: object.id, name: object.name }));
        shuffleArray(namesArray);

        renderGameSetup();
      }
    }
  });
});

// Feedback
const correctGuess = () => {
  feedbackEl.className = "correctGuess";
  feedbackEl.innerHTML = `<p><strong>Du gissade rätt!</strong></p>`;
};

const incorrectGuess = () => {
  feedbackEl.className = "wrongGuess";
  feedbackEl.innerHTML = `<p><strong>Du gissade fel!</strong></p>`;
};

const removeFeedback = () => {
  feedbackEl.className = "";
  feedbackEl.innerHTML = `<p></p>`;
};

// rendera ut game
const renderGameSetup = () => {
  removeFeedback();

  // Ta ut 1 match (rätt svar) och 3 unmatch (fel svar)
  matchArray = imagesArray.slice(0, 1);
  match = matchArray[0];
  unmatch = namesArray.slice(1, 4);

  // rendera ut image
  imageEl.innerHTML = "";
  const imageBox = document.createElement("img");
  imageBox.setAttribute("src", match.image);
  imageEl.append(imageBox);

  // rendera ut namn på knappar
  const renderNameToButton = () => {
    const max = 4;
    let buttonNames = unmatch.map((person) => {
      if (person.name !== match.name) {
        return person.name;
      } else {
        const alternativeNames = namesArray
          .filter((p) => p.name !== match.name)
          .map((p) => p.name);
        return alternativeNames.length > 0 ? alternativeNames[0] : p.name;
      }
    });
    buttonNames = buttonNames.flat();
    buttonNames.push(match.name);
    buttonNames = buttonNames.slice(0, max);
    shuffleArray(buttonNames);

    for (let i = 0; i < buttonNames.length; i++) {
      let buttonBoxId = i + 1;
      let button = document.getElementById(buttonBoxId);
      button.innerHTML = `<p>${buttonNames[i]}</p>`;
    }
  };
  renderNameToButton();
};

let correctGuesses = 0;
let clickCount = 0;

//Eventlistener för knappar med namn
guessButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "P") {
      if (e.target.innerText === match.name) {
        correctGuess();
        correctGuesses++;
      } else {
        incorrectGuess();
      }
    }

    // Ta bort match från imagesArray inför nästa game
    imagesArray = imagesArray.filter((item) => {
      return item !== match;
    });

    // Flytta match till removedStudents array
    removedStudents.push(match);

    clickCount++;

    if (clickCount === total) {
      setTimeout(() => {
        section1El.classList.add("hide");
        section2El.classList.add("hide");
        sectionResultEl.classList.remove("hide");
        guessesEl.innerText = `${correctGuesses} / ${total}`;
      }, 1000);
    } else {
      setTimeout(() => {
        renderGameSetup();
      }, 1000);
    }
  });
});
