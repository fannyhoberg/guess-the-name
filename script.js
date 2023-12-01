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
  }, 2000);
});

//rendera ut game initial setup
const nameEl = document.querySelector("p");
const imageEl = document.getElementById("imagesFigure");

const renderGameSetup = () => {
  // Slumpa array students (Fisher Yates shuffle)

  // Välj ut x antal från students array - lägg i variabel total
  const newArray10 = students.slice(0, 10);
  console.log("Det är här newArray10: ", newArray10);

  // Från total ska 1 object tas ut som rätt svar (id === name === image) och lägg i variabel match
  const match = newArray10.pop();
  console.log("Det är här match: ", match);

  // Från total ska 3 name tas ut och lägg i variabel unmatch
  console.log("Det är här newArray10 efter match tagits bort: ", newArray10);
  const unmatch = newArray10.slice(0, 3);
  console.log("Det är här unmatch: ", unmatch);

  // Rendera ut match.image på bild div

  imageEl.innerHTML = "";

  const imgElement = document.createElement("img");

  imgElement.src = match.image;

  imageEl.appendChild(imgElement);

  // Rendera ut match.name och unmatch.name på alla namn div

  // nameEl.innerText = "";
  // const nameElement = document.createElement("p");
  // nameElement.innerText = match.name;
  // nameEl.appendChild(nameElement);

  nameEl.innerText = unmatch.map((student) => {
    return student.name;
  });
};
renderGameSetup();
