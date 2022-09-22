const obj = {
  email: "gabriel@gmail.com",
};

const formData = new FormData();
formData.append("email", "gabriel@gmail.com");
async function puxar() {
  const response = fetch("assets/php/teste.php", {
    method: "POST",
    body: JSON.stringify({ email: "gabriel@gmail.com" }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const responseJSON = await (await response).json();
  console.log(responseJSON);
}

puxar();
