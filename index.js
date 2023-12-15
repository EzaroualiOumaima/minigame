let playerScore = document.getElementById("myscore");
let computerScore = document.getElementById("scorecomputer");
let playerBtn = [...document.getElementsByClassName("btn-player")];
let opierreBtn = document.getElementById("opierre");
let ofeuilleBtn = document.getElementById("ofeuille");
let ociseauxBtn = document.getElementById("ociseaux");
let message = document.getElementById("message");
let nextBtn = document.getElementById("nextround");
let resetBtn = document.getElementById("reset");

const play = (e,options) => {
  let choice = e.target.closest(".btn-player");
  playerBtn.forEach((btn) => {
    btn.classList.add("desactivated");
    btn.removeEventListener("click", play);
  });

  choice.classList.remove("desactivated");
  choice.classList.add("active");

  let playerChoice = choice.id;
  let computerChoice = doComputerChoice();

  winnerVerified(playerChoice, computerChoice);
  nextBtn.style.visibility = "visible";
};

const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";

const doComputerChoice = () => {
  let randomNum = Math.floor(Math.random() * 3);

  switch (randomNum) {
    case 0:
      opierreBtn.classList.add("active");
      return PIERRE;
    case 1:
      ofeuilleBtn.classList.add("active");
      return FEUILLE;
    default:
      ociseauxBtn.classList.add("active");
      return CISEAUX;
  }
};

const winnerVerified = (playerChoice, computerChoice) => {
  if (playerChoice == computerChoice) {
    message.textContent = "Equality !";
    message.style.color ='#b57c01'
    return;
  }  
  
  const playerWins = 
  (playerChoice === "pierre" && computerChoice === "ciseaux") ||
  (playerChoice === "feuille" && computerChoice === "pierre") ||
  (playerChoice === "ciseaux" && computerChoice === "feuille");

if (playerWins) {
  playervictory();
} else {
  computervictory();
}
};

const computervictory = () => {
  message.textContent = "Computer wins !...";
   message.style.color = 'red'
  computerScore.textContent++;
};

const playervictory = () => {
  message.textContent = " You win ! :)";
  message.style.color = 'lime';
  playerScore.textContent++;
};


const prepareNewManche = () => {
  playerBtn.forEach((btn) => {
    btn.classList.remove("desactivated");
    btn.classList.remove("active");

    btn.addEventListener("click", play);
  });

  nextBtn.style.visibility = "hidden";

  opierreBtn.classList.remove("active");
  ofeuilleBtn.classList.remove("active");
  ociseauxBtn.classList.remove("active");

  message.textContent = "It's your turn !";
  message.style.color = 'black'

};
nextBtn.addEventListener("click", prepareNewManche);
playerBtn.forEach((btn) => btn.addEventListener("click", play));

resetBtn.addEventListener("click", () => {
  playerScore.textContent = 0;
  computerScore.textContent = 0;

  prepareNewManche();
});

document.getElementById("startGame").onclick =function() {
  document.getElementById("container").style.display="flex";
  document.getElementById("welcome").style.display="none";
}