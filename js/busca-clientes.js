const btnBusca = document.getElementById("btnBusca");
const btnIncluirCliente = document.getElementById("btnIncluirCliente");
const btnIncluir = document.getElementById("btnIncluir");
const btnAtualizar = document.getElementById("btnAtualizar");
const content = document.getElementById("content");
const frmIncluirCliente = document.getElementById("frmIncluirCliente");

btnIncluirCliente.addEventListener("click", (e) => {
   frmIncluirCliente.style.display = "block";
})

btnIncluir.addEventListener("click", (e) => {
   e.preventDefault();
   const xhr = new XMLHttpRequest();
   const frmIncluirCliente = document.getElementById("frmIncluirCliente");
   let cliente = new FormData(frmIncluirCliente);
   xhr.onload = () => {
      if (xhr.status == 200) {
         alert(xhr.responseText);
         alert("Inclusão OK");
         frmIncluirCliente.inNome.value = "";
         frmIncluirCliente.inEmail.value = "";
         frmIncluirCliente.style.display = "none";
         buscaClientes();
      } else {
         alert("Erro inclusão");
      }
   }
   xhr.open("POST", "insert-cliente.php");
   xhr.send(cliente);
})

btnBusca.addEventListener("click", buscaClientes);
document.addEventListener("DOMContentLoaded", buscaClientes());

function buscaClientes() {
   const req = new XMLHttpRequest();
   req.onload = function () {
      if (req.status == 200) {
         let html = "<table class='table table-bordered table-hover table-sm'>";
         html += "<tr><th>Cod</th><th>Nome</th><th>Email</th><th>Alterações</th></tr>";
         const vetorClientes = JSON.parse(this.responseText);
         // buscar registros de clientes
         for (let cliente of vetorClientes) {
            html += "<tr>";
            html += `<td>${cliente.codigo}</td>`;
            html += `<td>${cliente.nome}</td>`;
            html += `<td>${cliente.email}</td>`;
            html += `<td class="d-flex justify-content-center gap-4">`;
            html += `<button class='btn btn-warning' data-bs-toggle="modal" data-bs-target="#modalEditar" onClick="showClientUpForm(${cliente.codigo})"> <i class='fa-solid fa-pencil'></i> Editar</button>`;
            html += `<button class='btn btn-danger' ms-3 onClick="delCliente(${cliente.codigo})"> <i class='fa-solid fa-trash-can'></i> Deletar</button>`;
            html += `</td>`;
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

function showClientUpForm(codigo) {
   let xhr = new XMLHttpRequest();
   xhr.onload = function () {
      if (xhr.status === 200) {
         // console.log(xhr.responseText);
         cliente = JSON.parse(xhr.responseText)[0];
         console.log(cliente);
         const frm = document.getElementById("frmAlterarCliente");
         frm.codigo.value = cliente.codigo;
         frm.nome.value = cliente.nome;
         frm.email.value = cliente.email;
      }
   }

   xhr.open("GET", `cliente-get.php?codigo=${codigo}`);
   xhr.send();
}

btnAtualizar.addEventListener("click", () => {
   const frm = document.getElementById("frmAlterarCliente");
   let cliente = new FormData(frm);

   let xhr = new XMLHttpRequest();
   xhr.onload = function() {
      if (xhr.status === 200) {
         buscaClientes();
      }
   }

   xhr.open("POST", "cliente-update.php");
   xhr.send();
})

function delCliente(id) {
   const ret = confirm("Confirma a exclusão do registro?");
   
   if (ret == true) {
      const data = new FormData();
      data.append("id", id);

      console.log(data);
   
      const req = new XMLHttpRequest();
      req.onload = function () {
         if (req.status == 200) {
            alert("Exclusão OK");
            buscaClientes();
         }
         else {
            alert(`Erro: ${req.status} ${req.statusText}`);
         }
      }
      req.open("POST", "delete-cliente.php");
      req.send(data);
   }
}


