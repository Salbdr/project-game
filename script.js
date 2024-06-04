const q = document.getElementById('q');
const spans = q.querySelectorAll('.text span');
const options = document.querySelectorAll(".option");
const pointsTrue = document.getElementById('points-true');
const pointsFalse = document.getElementById('points-false');
let trueNum;

const getRandom = (max) => {
  return Math.floor((Math.random() * max) + 1);
}

const cOption = (number, returnIndex = false) => {
  let states = returnIndex ? -1 : false;

  options.forEach((option, i) => {
    if (option.innerHTML !== "-") {
      if (Number(option.innerHTML) === number) {
        states = returnIndex ? i : true;
      }
    }
  })

  return states;
}

const getOption = () => {
  const optionNum = getRandom(10);
  if (cOption(optionNum)) {
    return getOption();
  } else {
    return optionNum;
  }
}

const startGame = () => {
  const n = getRandom(5);
  spans[0].innerHTML = n;

  const n2 = getRandom(n);
  spans[2].innerHTML = n2;

  const n3 = getRandom(2);

  if (n3 === 1) {
    spans[1].innerHTML = "+";
  } else {
    spans[1].innerHTML = "-";
  }

  const trueIndex = getRandom(4) - 1;

  if (n3 === 1) {
    trueNum = n + n2;
  } else {
    trueNum = n - n2;
  }

  options.forEach((option, i) => {
    if (i === trueIndex) {
      const indexCOption = cOption(trueNum, true);
      option.innerHTML = trueNum;

      if (indexCOption >= 0) {
        options[indexCOption].innerHTML = getOption();
      }
    } else {
      option.innerHTML = getOption();
    }
  })
}

const restartGame = () => {
  trueNum = undefined;
  options.forEach((span => span.innerHTML = '-'));
  q.classList.remove("true");
  q.classList.remove("false");
  options.forEach((o) => {
    o.classList.remove("true");
    o.classList.remove("false");
  })
  startGame();
}

options.forEach((option) => {
  option.addEventListener("click", () => {
    if (Number(option.innerHTML) === trueNum) {
      q.classList.add("true")
      option.classList.add("true");
      const scoreTrue = Number(pointsTrue.innerHTML) + 1;
      pointsTrue.innerHTML = scoreTrue;
    } else {
      q.classList.add("false")
      option.classList.add("false");
      const scoreFalse = Number(pointsFalse.innerHTML) + 1;
      pointsFalse.innerHTML = scoreFalse;
    }
    setTimeout(restartGame, 500);
  })
});

startGame();