const obj = {
  email: "gabriel@gmail.com",
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
  const responseCheck = await (await response).json();

  const responseJSON = responseCheck.length
    ? responseCheck
    : Error("Consulta não efetuada");
  console.log(responseJSON);
}

puxar();
