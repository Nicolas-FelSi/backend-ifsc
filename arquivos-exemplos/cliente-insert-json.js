const form = document.querySelector("form");
document.getElementById("resp").classList.remove("alert")
document.getElementById("resp").classList.remove("alert-success")

form.addEventListener("submit", (e) => {
   e.preventDefault()

   let cliente = {
      codigo: form.inCodigo.value,
      nome: form.inNome.value,
      email: form.inEmail.value
   }

   const req = new XMLHttpRequest();
   req.onload = function () {
      if (req.status == 200) {
         // const resp = JSON.parse(this.responseText);
         const resp = this.responseText;
         document.getElementById("resp").innerText = resp;
         document.getElementById("resp").classList.add("alert")
         document.getElementById("resp").classList.add("alert-success")
         document.getElementById("resp").classList.add("m-2")
      }
      else {
         alert(`Erro: ${req.status} ${req.statusText}`);
      }
   }
   req.open("POST", "cliente-insert-json.js");
   req.setRequestHeader("Content-type", "application/json; charset=UTF-8");
   req.send(JSON.stringify(cliente));
})
