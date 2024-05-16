const resp = document.getElementById("resp");
const form = document.querySelector("form");

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    let cliente = new FormData();
    cliente.append("codigo", form.inCodigo.value);
    cliente.append("nome", form.inNome.value);
    cliente.append("email", form.inEmail.value);

    console.log(cliente);

    let xhr =  new XMLHttpRequest();
    xhr.open("POST", "cliente-insert-formdata.php");
    xhr.onload = () => {
        if (xhr.status == 200) {
            document.getElementById("resp").innerText = xhr.responseText;
            document.getElementById("resp").classList.add("alert")
            document.getElementById("resp").classList.add("alert-success")
            document.getElementById("resp").classList.add("m-2")
            form.reset();
        } else {
            resp.innerText = `Erro: ${xhr.status} ${xhr.statusText}`;
        }
    }

    xhr.send(cliente);
})