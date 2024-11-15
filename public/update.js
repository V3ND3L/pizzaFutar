
const backendurl = "http://localhost:3000/futar";
document.addEventListener("DOMContentLoaded", function () {
    async function allFutar() {
        let response = await fetch(backendurl);
        if (response.ok) {
            let futarok = await response.json();
            console.log(futarok); listaFrissites(futarok);
        }
    };
    function listaFrissites(adatok) {
        let select = document.getElementById("fazon");
        let length = select.options.length;
        for (i = length - 1; i >= 0; i--) {
            select.options[i] = null;
        }
        select.options[0] = new Option("Válassz futárt!", -1);
        console.log(adatok);
        for (let index = 0; index < adatok.length; index++) {
            const element = adatok[index];
            console.log(element.fazon);
            select.options[index + 1] = new Option(element.fazon + " (" + element.fnev + ")", element.fazon);
        }
    }

    allFutar();
    document.getElementById("updateButton").addEventListener("click", function () {
        let modFutar = new FormData(document.getElementById("updateForm"));
        modFutar = Object.fromEntries(modFutar);
        fetch(backendurl + "/" + modFutar.fazon, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(modFutar)
        });
        allFutar();
    });
    /*document.getElementById("fazon").addEventListener("change", async function () {
        let fazon = this.value;
        const response = await fetch(backendurl + "/" + fazon);
        const data = await response.json();
        document.getElementById("fnev").value = data.fnev;
        document.getElementById("ftel").value = data.ftel;
    });*/
    document.getElementById("fazon").addEventListener("change", async function () {
        let fazon = this.value;
        console.log("Kiválasztott fazon:", fazon);
        if (fazon === "-1" || fazon === "") {
            console.error("Érvénytelen fazon érték.");
            return;
        }
        try {
            const response = await fetch(backendurl + "/" + fazon);
            if (!response.ok) {
                console.error("Hiba a backend hívás során:", response.status);
                return;
            }
            const data = await response.json();
            console.log("Kapott adatok a backendből:", data);
            document.getElementById("fnev").value = data[0].fnev || "";
            document.getElementById("ftel").value = data[0].ftel || "";
        } catch (error) {
            console.error("Hiba a fetch során:", error);
        }
    });
    
})
