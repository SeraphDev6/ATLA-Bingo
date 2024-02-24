let prompts = [
  "Aang airbends",
  "Sokka plans",
  "Katara water bends",
  "Zuko searches for the Avatar",
  "Aang enters Avatar State",
  "Momo steals food",
  '"My Cabbages"',
  "Sokka invents something",
  "Zuko's scar",
  "Katara mentions mother",
  "Aang visits Spirit World",
  "Appa rescues the gaang",
  "Katara & Sokka bicker",
  "Fire Nation ship appears",
  "Aang learns water bending",
  "Sokka makes joke",
  "Aang flies on his glider",
  "Iroh offers advice",
  // "Fire Nation soldier shows compassion",
  "Katara stands up to someone",
  "Aang showcases his agility",
  "Zuko recalls his past",
  "Sokka's jokes fail",
  "Gaang meets a spirit",
  "Aang's past is revealed",
  "Sokka's plans fail",
  "Katara mothers the group",
  "Zuko struggles",
  "Aang shares wisdom",
  "Momo mimics",
  '"Boomer-aang"',
  "Sokka expresses skepticism",
  "Aang embraces destiny",
  "Katara offers empathy",
  "Appa comforts Aang",
  "Iroh relaxes",
  "Fire Nation plot foiled",
  '"HONOR"',
  "Aang cares about animals",
  "Group bonds",
];
const elements = ["water", "earth", "fire", "air"];
const winConditions = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];
let squares = [];
for (let i = 0; i < 24; i++) {
  position = Math.floor(Math.random() * prompts.length);
  squares.push(...prompts.splice(position, 1));
}
squares.splice(12, 0, "FREE SPACE");
const board = document.getElementById("bingo-board");
const elementDiv = document.getElementById("element-select");
squares.map((e, i) => {
  board.innerHTML += `<div class="bingo-square water" onclick="markBoard(${i})">${e}</div>`;
});
elements.map((e) => {
  elementDiv.innerHTML += `<div class="selectable select-${e} ${
    e == "water" ? "selected" : ""
  }" onclick="selectElement('${e}')"></div>`;
});
squares = document.querySelectorAll(".bingo-square");
// console.log(squares);
const markBoard = (i) => {
  squares[i].classList.toggle("checked");
  if (squares[i].classList.contains("checked")) {
    checkWin(i);
  }
};
const selectElement = (ele) => {
  squares.forEach((sq) => {
    elements.map((el) => {
      sq.classList.remove(el);
    });
    sq.classList.add(ele);
  });
  document.querySelectorAll(".selectable").forEach((e) => {
    e.classList.remove("selected");
  });
  document.querySelector(`.select-${ele}`).classList.add("selected");
};
const checkWin = (i) => {
  const possibleWins = winConditions.filter((e) => e.includes(i));
  for (let idx = 0; idx < possibleWins.length; idx++) {
    if (
      possibleWins[idx].every((x) => squares[x].classList.contains("checked"))
    ) {
      possibleWins[idx].forEach((j) => {
        squares[j].classList.remove("checked");
        squares[j].classList.add("selected");
      });
      elementDiv.innerHTML = "<h2>BINGO!! You have regained your HONOR!!!</h2>";
      break;
    }
  }
};
