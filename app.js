// global varriables

let duckContainer = document.querySelector("section");
let resultButton = document.querySelector("section + div");
let image1 = document.querySelector("section img:first-child");
let image2 = document.querySelector("section img:nth-child(2)");
let image3 = document.querySelector("section img:nth-child(3)");

let clicks = 0;
let maxClicksAllowed = 25;

// functional logic

function Duck(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
  Duck.allDucksArray.push(this);
}

Duck.allDucksArray = [];

function getRandomNumber() {
  return Math.floor(Math.random() * Duck.allDucksArray.length);
}

function renderDucks() {
  // call the getRandomNumber
  let duck1 = getRandomNumber();
  let duck2 = getRandomNumber();
  let duck3 = getRandomNumber();

  while (duck1 === duck2) {
    duck2 = getRandomNumber();
  }
  image1.src = Duck.allDucksArray[duck1].src;
  image2.src = Duck.allDucksArray[duck2].src;
  image3.src = Duck.allDucksArray[duck3].src;
  image1.alt = Duck.allDucksArray[duck1].name;
  image2.alt = Duck.allDucksArray[duck2].name;
  image3.alt = Duck.allDucksArray[duck3].name;
  Duck.allDucksArray[duck1].views++;
  Duck.allDucksArray[duck2].views++;
  Duck.allDucksArray[duck3].views++;
}

function handleDuckClick(event) {
  if (event.target === duckContainer) {
    alert("Please click on an image");
  }
  clicks++;
  let clickDuck = event.target.alt;
  for (let i = 0; i < Duck.allDucksArray.length; i++) {
    if (clickDuck === Duck.allDucksArray[i].name) {
      Duck.allDucksArray[i].clicks++;
      break;
    }
  }
  if (clicks === maxClicksAllowed) {
    duckContainer.removeEventListener("click", handleDuckClick);
    // give the button an event lister and styles so the user
    // knows its an active button:
    resultButton.addEventListener("click", renderResults);
    resultButton.className = "clicks-allowed";
    duckContainer.className = "no-voting";
  } else {
    renderDucks();
  }
}

function renderResults() {
  let ul = document.querySelector("ul");
  for (let i = 0; i < Duck.allDucksArray.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${Duck.allDucksArray[i].name} had ${Duck.allDucksArray[i].views} view and was clicked ${Duck.allDucksArray[i].clicks} times.`;
    ul.appendChild(li);
  }
}

// executable code

new Duck("brownie duck", "./odd_ducks/brenda duck.jpg");
new Duck("brenda duck", "./odd_ducks/brenda duck.jpg");
new Duck("Jenny duck", "./odd_ducks/jenny duck.jpg");
new Duck("katie duck", "./odd_ducks/jenny duck.jpg");
new Duck("vera duck", "./odd_ducks/vera duck.jpg");
new Duck("lovely duck", "./odd_ducks/lovely duck.jpg");
new Duck("cutiest duck", "./odd_ducks/cutiest duck.jpg");
new Duck("whitish duck", "./odd_ducks/whitish duck.jpg");
new Duck("twinnie duck", "./odd_ducks/twinnie duck.jpg");

renderDucks();

duckContainer.addEventListener("click", handleDuckClick);
