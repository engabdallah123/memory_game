// start game
let buttom = document.querySelector(".start-game button");
let counter;
let tries = 0;
document.querySelector(".tries span").innerHTML = tries;
buttom.onclick = function () {
  let yourName = prompt("What's Your Name?");
  if (yourName === null || yourName === "") {
    document.querySelector(".info .name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".info .name span").innerHTML = yourName;
  }

  document.querySelector(".start-game").remove();
  document.getElementById("start").play();

  // timer
  let countDownTime = 3 * 60 + 59; // by seconds
  counter = setInterval(() => {
    let minutes = Math.floor(countDownTime / 60);
    let seconds = countDownTime % 60;

    document.querySelector(".minutes").innerHTML = `0${minutes}`;
    document.querySelector(".seconds").innerHTML =
      seconds < 10 ? `0${seconds}` : seconds;

    countDownTime--;

    if (countDownTime < 0) {
      clearInterval(counter);
      document.querySelector(".minutes").innerHTML = "00";
      document.querySelector(".seconds").innerHTML = "00";

      document.getElementById("game-over").play();
      popFail();
    }
  }, 1000);
};
// setting the time of the game

let duration = 1000; // time of shuffle

// shuffle the cards by order
let allBlockes = document.querySelector(".game-continer");
let cardsDiv = document.querySelectorAll(".card");
let cards = Array.from(cardsDiv);
let orderRang = [...Array(cards.length).keys()]; // extarct length of array in a new array [0 -> 19 ]

shuffling(orderRang); // call a function

cards.forEach((card, index) => {
  card.style.order = orderRang[index]; // foreach element -> its order = number of random index
  card.addEventListener("click", function () {
    // flip the card
    flipping(card);
  });
});

// function of flipped
function flipping(selectedCard) {
  selectedCard.classList.add("flipped");

  let allFlipped = cards.filter((select) =>
    select.classList.contains("flipped")
  );
  //stop click if you select 2 card
  if (allFlipped.length === 2) {
    stopping();

    // if matching
    isMatching(allFlipped[0], allFlipped[1]);
  }
}
// function matching
function isMatching(firstCard, secondCard) {
  if (firstCard.dataset.animals === secondCard.dataset.animals) {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    firstCard.classList.add("match");
    secondCard.classList.add("match");
    document.getElementById("applay").play();
    // if all is matched
    youWin();
  } else {
    tries++;
    document.querySelector(".tries span").innerHTML = tries;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
    }, duration);
    document.getElementById("fail").play();
    
    // if you have limited tries
    if (tries === 15) {
      document.getElementById("game-over").play();
      let div = document.createElement("div");
      div.className = "pop-fail";
      let text = document.createTextNode(`...Opps Game Over! Limited Tries`);
      let span = document.createElement("span");
      span.appendChild(text);
      div.appendChild(span);
      let tryButton = document.createElement("button");
      tryButton.innerHTML = "Try Again";
      tryButton.addEventListener("click", () => {
        location.reload();
      });
      div.appendChild(tryButton);
      document.body.appendChild(div);
    }

    // check if the wining is ok too
    youWin();
  }
}

// function stopping
function stopping() {
  allBlockes.classList.add("stop-click");

  setTimeout(() => {
    allBlockes.classList.remove("stop-click");
  }, duration);
}
// function of shuffling
function shuffling(array) {
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);

    current--;

    // get current element in  temp
    temp = array[current];

    // current element = random element
    array[current] = array[random];

    // random = temp
    array[random] = temp;
  }
  return array;
}
// sucess function
function youWin() {
  let allMatching = cards.filter((card) => card.classList.contains("match"));
  if (allMatching.length === cards.length) {
    clearInterval(counter);
    document.getElementById("sucess").play();
    popSucc();
  }
}
// creat popup if fail
function popFail() {
  let div = document.createElement("div");
  div.className = "pop-fail";
  let text = document.createTextNode(`...Opps Game Over! Time Out `);
  let span = document.createElement("span");
  span.appendChild(text);
  div.appendChild(span);
  let tryButton = document.createElement("button");
  tryButton.innerHTML = "Try Again";
  tryButton.addEventListener("click", () => {
    location.reload();
  });
  div.appendChild(tryButton);
  document.body.appendChild(div);
}
function popSucc() {
  let div = document.createElement("div");
  div.className = "pop-sucss";
  let text = document.createTextNode(`Great Work! You Win The Game `);
  let span = document.createElement("span");
  span.appendChild(text);
  div.appendChild(span);
  let tryButton = document.createElement("button");
  tryButton.innerHTML = "Try Again";
  tryButton.addEventListener("click", () => {
    location.reload();
  });
  div.appendChild(tryButton);
  document.body.appendChild(div);
}
