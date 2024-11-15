
const backendurl = "http://localhost:3000/futar";

document.addEventListener("DOMContentLoaded", function () {
  const createButton = document.getElementById("createButton");

  createButton.addEventListener("click", async function (event) {
    event.preventDefault();

    const fazon = 0;
    const fnev = document.getElementById("fnev").value;
    const ftel = document.getElementById("ftel").value;
    
    const jsontext = `{"fazon":"${fazon}",
            "fnev":"${fnev}",
            "ftel":"${ftel}"}`;
    const json = JSON.parse(jsontext);

    const response = await fetch(backendurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(json),
    });
    if (response.status === 201) {
      alert("Sikeres adatfelvitel!");;
      document.getElementById("fnev").value = "";
      document.getElementById("ftel").value = "";
    } else {
      alert("Sikertelen adatfelvitel!");
    }
  });
});
