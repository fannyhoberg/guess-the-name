const sectionStartEl = document.querySelector(".sectionStart");
const startButtonEl = document.querySelector(".startButton");
const section1El = document.querySelector(".imagesFrame");
const section2El = document.querySelector(".section2");

// eventlistener för klick på startsida
startButtonEl.addEventListener("click", () => {
  //hide button
  sectionStartEl.classList.add("hide");
  //sätt en timer med en händelse inuti
  setTimeout(() => {
    // visa spöket
    // sectionTestEl.classList.remove("hide");

    section1El.classList.remove("hide");
    // section2El.classList.remove("hide");
  }, 1000);
});

//SHUFFLING

// Fisher-Yates algorithm for array shuffling
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

const shuffledStudents = [...students]; // clone `students` array
shuffleArray(shuffledStudents); // shuffle the `shuffledStudents` array

console.log(students);
console.log(shuffledStudents);

// RENDERA ut game initial setup

const nameEl = document.getElementsByClassName("namesFigure");
// const box1 = document.getElementById("box-1");
const imageEl = document.getElementById("imagesFigure");

const renderGameSetup = () => {
  // Slumpa array students (Fisher Yates shuffle)

  // Välj ut x antal från students array - lägg i variabel total
  const newArray10 = shuffledStudents.slice(0, 10);
  // console.log("Det är här newArray10: ", newArray10);

  // Från total ska 1 object tas ut som rätt svar (id === name === image) och lägg i variabel match
  const match = newArray10.pop();
  console.log("Det är här match: ", match);

  // Från total ska 3 name tas ut och lägg i variabel unmatch
  const unmatch = newArray10.slice(0, 3);
  console.log("Det är här unmatch: ", unmatch);

  // Rendera ut match.image på bild div
  imageEl.innerHTML = "";
  const imgElement = document.createElement("img");
  imgElement.src = match.image;
  imageEl.appendChild(imgElement);

  // Rendera ut unmatch.name
  for (let i = 0; i < nameEl.length && i < unmatch.length; i++) {
    let unmatchPerson = unmatch[i];
    let boxForName = nameEl[i];
    let nameText = document.createElement("div");
    nameText.innerHTML = `<p>${unmatchPerson.name}</p>`;
    boxForName.appendChild(nameText);
  }

  // Rendera ut match.name
  for (let i = 0; i < nameEl.length; i++) {
    let currentBox = nameEl[i];
    if (currentBox.textContent === "") {
      let boxForName = nameEl[i];
      let nameText = document.createElement("div");
      nameText.innerHTML = `<p>${match.name}</p>`;
      boxForName.appendChild(nameText);
    }
  }

  //slumpa alla boxar på dess id
};

renderGameSetup();
