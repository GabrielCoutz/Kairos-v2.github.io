const obj = {
  email: "gabriel@gmail.com",
  senha: "abc123",
};

async function puxar() {
  const response = fetch("assets/php/teste.php", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const responseJSON = await (await response).json();
  console.log(responseJSON);
}

puxar();
