alasql(`CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome STRING,
  cpf STRING,
  dataNascimento STRING,
  telefone STRING,
  celular STRING
)`);

function inicializarClientes() {
  const clientesSalvos = localStorage.getItem('clientes');
  if (clientesSalvos) {
    try {
      const clientes = JSON.parse(clientesSalvos);
      if (Array.isArray(clientes)) {
        alasql("DELETE FROM clientes");
        clientes.forEach(cliente => {
          if (cliente && typeof cliente === 'object' && cliente !== null) {
            alasql("INSERT INTO clientes (id, nome, cpf, dataNascimento, telefone, celular) VALUES (?, ?, ?, ?, ?, ?)",
              [cliente.id, cliente.nome, cliente.cpf, cliente.dataNascimento, cliente.telefone, cliente.celular]);
          }
        });
      }
    } catch (error) {
      console.error("Error processing clientes from localStorage:", error);
    }
  }
}

inicializarClientes();
listarClientes();

function cadastrarCliente() {
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const dataNascimento = document.getElementById("dataNascimento").value;
  const telefone = document.getElementById("telefone").value.trim();
  const celular = document.getElementById("celular").value.trim();

  if (!nome || !cpf) {
    alert("Nome e CPF são obrigatórios.");
    return;
  }

  const existente = alasql("SELECT * FROM clientes WHERE cpf = ?", [cpf]);
  if (existente.length > 0) {
    alert("Já existe um cliente com esse CPF.");
    return;
  }

  alasql("INSERT INTO clientes (nome, cpf, dataNascimento, telefone, celular) VALUES (?, ?, ?, ?, ?)",
    [nome, cpf, dataNascimento, telefone, celular]);

  alert("Cliente cadastrado com sucesso!");
  limparFormulario();
  listarClientes();
  salvarClientes();
}

function listarClientes() {
  const clientes = alasql("SELECT * FROM clientes");
  const tbody = document.querySelector("#tabelaClientes tbody");
  tbody.innerHTML = "";

  clientes.forEach(cliente => {
    const tr = document.createElement("tr");
    // Debugging: Log the cliente object
    console.log("Cliente object:", cliente);

    // Debugging: Log individual properties (or defaults)
    const nome = cliente.nome ? cliente.nome : '';
    const cpf = cliente.cpf ? cliente.cpf : '';
    const dataNascimento = cliente.dataNascimento ? cliente.dataNascimento : '';
    const telefone = cliente.telefone ? cliente.telefone : '';
    const celular = cliente.celular ? cliente.celular : '';

    console.log("Nome:", nome);
    console.log("CPF:", cpf);
    console.log("Data de Nascimento:", dataNascimento);
    console.log("Telefone:", telefone);
    console.log("Celular:", celular);

    tr.innerHTML = `
      <td>${nome}</td> 
      <td>${cpf}</td>
      <td>${dataNascimento}</td> 
      <td>${telefone}</td>
      <td>${celular}</td>
    `;
    tbody.appendChild(tr);
  });
}

function limparFormulario() {
  document.getElementById("nome").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("dataNascimento").value = "";
  document.getElementById("telefone").value = "";
  document.getElementById("celular").value = "";
}

function salvarClientes() {
  localStorage.setItem('clientes', JSON.stringify(alasql("SELECT * FROM clientes")));
}