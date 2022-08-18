var bar = document.querySelector(".progress-bar > div");
var currentPercent = document.querySelector(".percentage > .forca-senha");

var inputPasswordField = document.querySelector("#senha");
inputPasswordField.addEventListener("keyup", (e) => {
  detPasswordStrength(inputPasswordField.value);
});

function detPasswordStrength(password) {
  var pwdPercent = getStrengthPercent(password);

  pwdPercent === 0 ? bar.classList.add("none") : bar.classList.remove("none");
  bar.style.background = "transparent";
  bar.style.border = "none";

  bar.classList.forEach((classe) => {
    bar.classList.remove(classe);
  });

  if (pwdPercent == 100) {
    bar.style.background = "green";
    bar.style.border = "green";
    bar.classList.add("senha-forte");
  } else if (pwdPercent >= 75) {
    bar.style.background = "gold";
    bar.style.border = "gold";
    bar.classList.add("senha-mediana");
  } else if (pwdPercent >= 50) {
    bar.style.background = "gold";
    bar.style.border = "gold";
    bar.classList.add("senha-mediana");
  } else {
    bar.style.background = "red";
    bar.style.border = "red";
    bar.classList.add("senha-fraca");
  }
}

function getStrengthPercent(inputPassword) {
  var percent = 0;
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
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var noOfUpperCase = [];

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
  var allChar = "`,.~{}()[]/+_=-!@#$%^&*|\\'\":?";
  var noOfChar = [];

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
  var allChar = "1234567890";
  var noOfChar = [];

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
  var upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerCaseLetters = upperCaseLetters.toLowerCase();
  var numbers = "1234567890";
  var chars = "`,.~{}()[]/+_=-!@#$%^&*|\\'\":?";
  var passwordLength = 16;

  var newPassword = [];

  for (var i = 0; i < 3; i++) {
    var letterPosition = Math.floor(Math.random() * upperCaseLetters.length);

    if (
      newPassword[newPassword.length - 1] != upperCaseLetters[letterPosition] &&
      newPassword[newPassword.length - 2] != upperCaseLetters[letterPosition]
    ) {
      newPassword.push(upperCaseLetters[letterPosition]);
    } else --i;
  }

  for (var i = 0; i < 13; i++) {
    var letterPosition = Math.floor(Math.random() * lowerCaseLetters.length);

    if (
      newPassword[newPassword.length - 1].toLowerCase() !=
        lowerCaseLetters[letterPosition] &&
      newPassword[newPassword.length - 2].toLowerCase() !=
        lowerCaseLetters[letterPosition]
    ) {
      newPassword.push(lowerCaseLetters[letterPosition]);
    } else --i;
  }

  for (var i = 0; i < 2; i++) {
    var letterPosition = Math.floor(Math.random() * numbers.length);

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

  var letterPosition = Math.floor(Math.random() * chars.length);
  newPassword.push(chars[letterPosition]);

  inputPasswordField.value = newPassword.join("");
  detPasswordStrength(newPassword.join(""));
});

function charRepitition(percent, inputPassword) {
  var allChar = inputPassword.split("");
  var reps = [];

  for (
    var currentPosition = 0;
    currentPosition < allChar.length;
    currentPosition++
  ) {
    for (var inc = 1; inc <= 2; inc++) {
      var nextPosition = currentPosition + inc;
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
