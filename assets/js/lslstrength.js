let bar = document.querySelector(".progress-bar > div");
let currentPercent = document.querySelector(".percentage > .forca-senha");
let inputPasswordField = window.location.href.includes("cadastro_usuario")
  ? document.querySelector("#senha")
  : document.querySelector("#senha_nova");

inputPasswordField.addEventListener("keyup", (e) => {
  detPasswordStrength(inputPasswordField.value);
});

function detPasswordStrength(password) {
  let pwdPercent = getStrengthPercent(password);

  pwdPercent === 0 || inputPasswordField.value === ""
    ? bar.classList.add("none")
    : bar.classList.remove("none");
  bar.style.background = "transparent";
  bar.style.border = "none";

  bar.classList.forEach((classe) => {
    bar.classList.remove(classe);
  });

  if (pwdPercent == 100) {
    bar.style.background = "#2EDF36";
    bar.style.border = "#2EDF36";

    bar.classList.add("senha-forte");
  } else if (pwdPercent >= 75) {
    bar.style.background = "#DEBB00";
    bar.style.border = "#DEBB00";
    bar.classList.add("senha-mediana");
  } else if (pwdPercent >= 50) {
    bar.style.background, (bar.style.border = "#DEBB00");
    bar.classList.add("senha-mediana");
  } else {
    bar.style.background = "#A32323";
    bar.style.border = "#A32323";
    bar.classList.add("senha-fraca");
  }
  const before = document.querySelector('div[class^="senha-"]');
  if (before) {
    before.classList[0] === "senha-fraca"
      ? (before.style.color = "white")
      : (before.style.color = "#121212");
  }
}

function getStrengthPercent(inputPassword) {
  let percent = 0;
  percent = percent + percentByLength(inputPassword);
  percent = percent + percentByUppercase(inputPassword);
  percent = percent + percentByChar(inputPassword);
  percent = percent + percentByNum(inputPassword);
  percent = charRepitition(percent, inputPassword);

  return percent;
}

function percentByLength(inputPassword) {
  if (inputPassword.length >= 16) return 25;
  else if (inputPassword.length >= 8) return 15;
  else if (inputPassword.length > 0) return 5;
  else return 0;
}

function percentByUppercase(inputPassword) {
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let noOfUpperCase = [];

  inputPassword.split("").forEach((char) => {
    if (letters.includes(char)) noOfUpperCase.push(char);
  });

  if (inputPassword.length - noOfUpperCase.length >= inputPassword.length)
    return 0;
  else if (inputPassword.length - noOfUpperCase.length >= 16) return 25;
  else if (inputPassword.length - noOfUpperCase.length >= 8) return 15;
  else if (inputPassword.length - noOfUpperCase.length > 0) return 5;
  else return 0;
}

function percentByChar(inputPassword) {
  let allChar = "`,.~{}()[]/+_=-!@#$%^&*|\\'\":?";
  let noOfChar = [];

  inputPassword.split("").forEach((char) => {
    if (allChar.includes(char)) noOfChar.push(char);
  });

  if (inputPassword.length - noOfChar.length >= inputPassword.length) return 0;
  else if (inputPassword.length - noOfChar.length >= 16) return 25;
  else if (inputPassword.length - noOfChar.length >= 8) return 15;
  else if (inputPassword.length - noOfChar.length > 0) return 5;
  else return 0;
}

function percentByNum(inputPassword) {
  let allChar = "1234567890";
  let noOfChar = [];

  inputPassword.split("").forEach((char) => {
    if (allChar.includes(char)) noOfChar.push(char);
  });

  if (inputPassword.length - noOfChar.length >= inputPassword.length) return 0;
  else if (inputPassword.length - noOfChar.length >= 16) return 25;
  else if (inputPassword.length - noOfChar.length >= 8) return 15;
  else if (inputPassword.length - noOfChar.length > 0) return 5;
  else return 0;
}

const generatePasswordBtn = document.querySelector("#gerar-senha");
generatePasswordBtn.addEventListener("click", (event) => {
  let upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lowerCaseLetters = upperCaseLetters.toLowerCase();
  let numbers = "1234567890";
  let chars = "`,.~{}()[]/+_=-!@#$%^&*|\\'\":?";
  let passwordLength = 16;

  let newPassword = [];

  for (let i = 0; i < 3; i++) {
    let letterPosition = Math.floor(Math.random() * upperCaseLetters.length);

    if (
      newPassword[newPassword.length - 1] != upperCaseLetters[letterPosition] &&
      newPassword[newPassword.length - 2] != upperCaseLetters[letterPosition]
    ) {
      newPassword.push(upperCaseLetters[letterPosition]);
    } else --i;
  }

  for (let i = 0; i < 13; i++) {
    let letterPosition = Math.floor(Math.random() * lowerCaseLetters.length);

    if (
      newPassword[newPassword.length - 1].toLowerCase() !=
        lowerCaseLetters[letterPosition] &&
      newPassword[newPassword.length - 2].toLowerCase() !=
        lowerCaseLetters[letterPosition]
    ) {
      newPassword.push(lowerCaseLetters[letterPosition]);
    } else --i;
  }

  for (let i = 0; i < 2; i++) {
    let letterPosition = Math.floor(Math.random() * numbers.length);

    if (
      newPassword[newPassword.length - 1] != numbers[letterPosition] &&
      parseInt(newPassword[newPassword.length - 1]) + 1 !=
        numbers[letterPosition] &&
      parseInt(newPassword[newPassword.length - 1]) - 1 !=
        numbers[letterPosition] &&
      parseInt(newPassword[newPassword.length - 1]) + 2 !=
        numbers[letterPosition] &&
      parseInt(newPassword[newPassword.length - 1]) - 2 !=
        numbers[letterPosition]
    ) {
      newPassword.push(numbers[letterPosition]);
    } else --i;
  }

  let letterPosition = Math.floor(Math.random() * chars.length);
  newPassword.push(chars[letterPosition]);

  inputPasswordField.value = newPassword.join("");
  detPasswordStrength(newPassword.join(""));
});

function charRepitition(percent, inputPassword) {
  let allChar = inputPassword.split("");
  let reps = [];

  for (
    let currentPosition = 0;
    currentPosition < allChar.length;
    currentPosition++
  ) {
    for (let inc = 1; inc <= 2; inc++) {
      let nextPosition = currentPosition + inc;
      if (
        allChar[currentPosition] == allChar[nextPosition] ||
        allChar[nextPosition] == parseInt(allChar[currentPosition]) + 1
      ) {
        if (!reps.includes(allChar[currentPosition]))
          reps.push(allChar[currentPosition]);
        else break;
      }
    }
  }
  if (reps.length >= 3) return percent - 25;
  if (reps.length == 2) return percent - 15;
  if (reps.length == 1) return percent - 5;
  return percent;
}