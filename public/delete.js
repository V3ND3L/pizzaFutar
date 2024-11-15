
const backendurl = "http://localhost:3000/futar";
document.addEventListener("DOMContentLoaded", function () {
    async function listaFrissites() {
        let select = document.getElementById("fazon");
        let length = select.options.length;
        for (i = length - 1; i >= 0; i--) {
            select.options[i] = null;
        }
        select.options[0] = new Option("Válassz futárt!", -1);
        let response = await fetch(backendurl);
        let futarok = await response.json();
        for (let index = 0; index < futarok.length; index++) {
            const element = futarok[index];
            select.options[index + 1] = new Option(element.fazon + " (" + element.fnev + ")");
        }
    }
    listaFrissites();
    document.getElementById("deleteButton").addEventListener("click", function () {
        let modFutar = new FormData(document.getElementById("deleteForm"));
        modFutar = Object.fromEntries(modFutar);
        console.log(modFutar);
        fetch(backendurl + "/" + modFutar.fazon, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modFutar)
        });
        listaFrissites();
    });
    document.getElementById("fazon").addEventListener("change", async function () {
        let fazon = this.value;
        const response = await fetch(backendurl + "/" + fazon);
        const data = await response.json();
        document.getElementById("fnev").value = data[0].fnev;
        document.getElementById("ftel").value = data[0].ftel;
    });
})
