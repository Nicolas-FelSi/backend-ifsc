const btnBusca = document.getElementById("btnBusca");
const btnIncluirCliente = document.getElementById("btnIncluirCliente");
const btnIncluir = document.getElementById("btnIncluir");
const content = document.getElementById("content");

btnIncluirCliente.addEventListener("click", (e) => {
   const frmIncluirCliente = document.getElementById("frmIncluirCliente");
   frmIncluirCliente.style.display = "block";
})

btnIncluir.addEventListener("click", (e) => {
   e.preventDefault();
   const xhr = new XMLHttpRequest();
   let cliente = new FormData(document.getElementById("frmIncluirCliente"));
   xhr.onload = () => {
      if (xhr.status == 200) {
         alert(xhr.responseText);
         alert("Inclusão OK");
      } else {
         alert("Erro inclusão");
      }
   }
   xhr.open("POST", "insert-cliente.php");
   xhr.send(cliente);
})

btn.addEventListener("click", buscaClientes());
document.addEventListener("DOMContentLoaded", buscaClientes());

function buscaClientes() {
   const req = new XMLHttpRequest();
   req.onload = function () {
      if (req.status == 200) {
         let html = "<table class='table table-bordered table-hover table-sm'>";
         html += "<tr><th>Cod</th><th>Nome</th><th>Email</th></tr>";
         const vetorClientes = JSON.parse(this.responseText);
         // buscar registros de clientes
         for (let cliente of vetorClientes) {
            html += "<tr>";
            html += `<td>${cliente.cod}</td>`;
            html += `<td>${cliente.nome}</td>`;
            html += `<td>${cliente.email}</td>`;
            html += "</tr>";
         }
         html += "</table>";
         content.innerHTML = html;
      }
      else {
         alert(`Erro: ${req.status} ${req.statusText}`);
      }
   }
   req.open("GET", "busca-clientes.php");
   req.send();
}
