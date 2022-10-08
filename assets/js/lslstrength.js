const bar = document.querySelector(".progress-bar > div");
const inputPasswordField = window.location.href.includes("cadastro_usuario")
  ? document.querySelector("#senha")
  : document.querySelector("#senha_nova");

function percentByLength(inputPassword) {
  if (inputPassword.length >= 16) return 25;
  if (inputPassword.length >= 8) return 15;
  if (inputPassword.length > 0) return 5;
  return 0;
}

function percentByUppercase(inputPassword) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const noOfUpperCase = [];

  inputPassword.split("").forEach((char) => {
    if (letters.includes(char)) noOfUpperCase.push(char);
  });

  if (inputPassword.length - noOfUpperCase.length >= inputPassword.length)
    return 0;
  if (inputPassword.length - noOfUpperCase.length >= 16) return 25;
  if (inputPassword.length - noOfUpperCase.length >= 8) return 15;
  if (inputPassword.length - noOfUpperCase.length > 0) return 5;
  return 0;
}

function percentByChar(inputPassword) {
  const allChar = "`,.~{}()[]/+_=-!@#$%^&*|\\'\":?";
  const noOfChar = [];

  inputPassword.split("").forEach((char) => {
    if (allChar.includes(char)) noOfChar.push(char);
  });

  if (inputPassword.length - noOfChar.length >= inputPassword.length) return 0;
  if (inputPassword.length - noOfChar.length >= 16) return 25;
  if (inputPassword.length - noOfChar.length >= 8) return 15;
  if (inputPassword.length - noOfChar.length > 0) return 5;
  return 0;
}

function percentByNum(inputPassword) {
  const allChar = "1234567890";
  const noOfChar = [];

  inputPassword.split("").forEach((char) => {
    if (allChar.includes(char)) noOfChar.push(char);
  });

  if (inputPassword.length - noOfChar.length >= inputPassword.length) return 0;
  if (inputPassword.length - noOfChar.length >= 16) return 25;
  if (inputPassword.length - noOfChar.length >= 8) return 15;
  if (inputPassword.length - noOfChar.length > 0) return 5;
  return 0;
}

function charRepitition(percent, inputPassword) {
  const allChar = inputPassword.split("");
  const reps = [];

  for (
    let currentPosition = 0;
    currentPosition < allChar.length;
    currentPosition++
  ) {
    for (let inc = 1; inc <= 2; inc++) {
      const nextPosition = currentPosition + inc;
      if (
        allChar[currentPosition] === allChar[nextPosition] ||
        allChar[nextPosition] === parseInt(allChar[currentPosition], 10) + 1
      ) {
        if (!reps.includes(allChar[currentPosition]))
          reps.push(allChar[currentPosition]);
        else break;
      }
    }
  }
  if (reps.length >= 3) return percent - 25;
  if (reps.length === 2) return percent - 15;
  if (reps.length === 1) return percent - 5;
  return percent;
}

function getStrengthPercent(inputPassword) {
  let percent = 0;
  percent += percentByLength(inputPassword);
  percent += percentByUppercase(inputPassword);
  percent += percentByChar(inputPassword);
  percent += percentByNum(inputPassword);
  percent = charRepitition(percent, inputPassword);

  return percent;
}

function detPasswordStrength(password) {
  const pwdPercent = getStrengthPercent(password);

  pwdPercent === 0 || inputPasswordField.value === ""
    ? bar.classList.add("none")
    : bar.classList.remove("none");
  bar.style.background = "transparent";
  bar.style.border = "none";

  bar.classList.forEach((classe) => {
    bar.classList.remove(classe);
  });

  if (pwdPercent === 100) {
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

const generatePasswordBtn = document.querySelector("#gerar-senha");
generatePasswordBtn.addEventListener("click", () => {
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseLetters = upperCaseLetters.toLowerCase();
  const numbers = "1234567890";
  const chars = "`,.~{}()[]/+_=-!@#$%^&*|\\'\":?";

  const newPassword = [];

  for (let i = 0; i < 3; i++) {
    const letterPosition = Math.floor(Math.random() * upperCaseLetters.length);

    if (
      newPassword[newPassword.length - 1] !==
        upperCaseLetters[letterPosition] &&
      newPassword[newPassword.length - 2] !== upperCaseLetters[letterPosition]
    ) {
      newPassword.push(upperCaseLetters[letterPosition]);
    } else --i;
  }

  for (let i = 0; i < 13; i++) {
    const letterPosition = Math.floor(Math.random() * lowerCaseLetters.length);

    if (
      newPassword[newPassword.length - 1].toLowerCase() !==
        lowerCaseLetters[letterPosition] &&
      newPassword[newPassword.length - 2].toLowerCase() !==
        lowerCaseLetters[letterPosition]
    ) {
      newPassword.push(lowerCaseLetters[letterPosition]);
    } else --i;
  }

  for (let i = 0; i < 2; i++) {
    const letterPosition = Math.floor(Math.random() * numbers.length);

    if (
      newPassword[newPassword.length - 1] !== numbers[letterPosition] &&
      parseInt(newPassword[newPassword.length - 1], 10) + 1 !==
        numbers[letterPosition] &&
      parseInt(newPassword[newPassword.length - 1], 10) - 1 !==
        numbers[letterPosition] &&
      parseInt(newPassword[newPassword.length - 1], 10) + 2 !==
        numbers[letterPosition] &&
      parseInt(newPassword[newPassword.length - 1], 10) - 2 !==
        numbers[letterPosition]
    ) {
      newPassword.push(numbers[letterPosition]);
    } else --i;
  }

  const letterPosition = Math.floor(Math.random() * chars.length);
  newPassword.push(chars[letterPosition]);

  inputPasswordField.value = newPassword.join("");
  detPasswordStrength(newPassword.join(""));
});

inputPasswordField.addEventListener("keyup", () => {
  detPasswordStrength(inputPasswordField.value);
});
