alasql(`CREATE TABLE IF NOT EXISTS enderecos (
  id INT AUTOINCREMENT,
  clienteId INT,
  cep STRING,
  rua STRING,
  bairro STRING,
  cidade STRING,
  estado STRING,
  pais STRING,
  principal BOOLEAN
)`);

carregarDadosDoLocalStorage(); // Função unificada
carregarClientes();
document.getElementById("clienteSelect").addEventListener("change", listarEnderecos);

function carregarDadosDoLocalStorage() {
  console.log("Iniciando carregarDadosDoLocalStorage()");

  // Carregar Clientes
  const clientesSalvos = localStorage.getItem('clientes');
  if (clientesSalvos) {
    try {
      const clientes = JSON.parse(clientesSalvos);
      if (Array.isArray(clientes)) {
        alasql("DELETE FROM clientes");
        clientes.forEach(cliente => {
          if (cliente && typeof cliente === 'object' && cliente !== null) {
            alasql("INSERT INTO clientes (id, nome, cpf, dataNascimento, telefone, celular) VALUES (?, ?, ?, ?, ?, ?)",
              [
                parseInt(cliente.id),
                cliente.nome,
                cliente.cpf,
                cliente.dataNascimento,
                cliente.telefone,
                cliente.celular
              ]);
          }
        });
        console.log("Clientes carregados do localStorage.");
      }
    } catch (error) {
      console.error("Erro ao processar clientes do localStorage:", error);
    }
  } else {
    console.log("Nenhum cliente encontrado no localStorage.");
  }

  // Carregar Endereços
  const enderecosSalvos = localStorage.getItem('enderecos');
  if (enderecosSalvos) {
    try {
      const enderecos = JSON.parse(enderecosSalvos);
      if (Array.isArray(enderecos)) {
        alasql("DELETE FROM enderecos");
        enderecos.forEach(endereco => {
          if (endereco && typeof endereco === 'object' && endereco !== null) {
            alasql("INSERT INTO enderecos (id, clienteId, cep, rua, bairro, cidade, estado, pais, principal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
              [
                parseInt(endereco.id),
                parseInt(endereco.clienteId),
                endereco.cep,
                endereco.rua,
                endereco.bairro,
                endereco.cidade,
                endereco.estado,
                endereco.pais,
                Boolean(endereco.principal)
              ]);
          }
        });
        console.log("Endereços carregados do localStorage.");
      }
    } catch (error) {
      console.error("Erro ao processar enderecos do localStorage:", error);
    }
  } else {
    console.log("Nenhum endereço encontrado no localStorage.");
  }

  console.log("carregarDadosDoLocalStorage() concluído.");
}


function carregarClientes() {
  const clientesSalvos = localStorage.getItem('clientes');
  let clientes = [];
  if (clientesSalvos) {
    try {
      clientes = JSON.parse(clientesSalvos);
    } catch (erro) {
      console.error("Erro ao analisar clientes do localStorage:", erro);
    }
  } else {
    clientes = alasql("SELECT * FROM clientes");
  }

  const select = document.getElementById("clienteSelect");
  select.innerHTML = '<option value="">Selecione um cliente</option>';

  clientes.forEach(c => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = `${c.nome} - ${c.cpf}`;
    select.appendChild(option);
  });

  if (clientes.length > 0) {
    listarEnderecos();
  }
}

function cadastrarEndereco() {
  const clienteId = parseInt(document.getElementById("clienteSelect").value);
  const cep = document.getElementById("cep").value;
  const rua = document.getElementById("rua").value;
  const bairro = document.getElementById("bairro").value;
  const cidade = document.getElementById("cidade").value;
  const estado = document.getElementById("estado").value;
  const pais = document.getElementById("pais").value;
  const principal = document.getElementById("principal").checked ? true : false;

  if (!clienteId || isNaN(clienteId) || !cep || !rua) {
    alert("Cliente, CEP e Rua são obrigatórios.");
    return;
  }

  if (principal) {
    alasql("UPDATE enderecos SET principal = FALSE WHERE clienteId = ?", [clienteId]);
  }

  alasql("INSERT INTO enderecos (clienteId, cep, rua, bairro, cidade, estado, pais, principal) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [clienteId, cep, rua, bairro, cidade, estado, pais, principal]);

  alert("Endereço cadastrado com sucesso!");
  limparFormulario();
  listarEnderecos();
  salvarEnderecos();
}


function listarEnderecos() {
  const clienteId = parseInt(document.getElementById("clienteSelect").value);
  const enderecos = alasql("SELECT * FROM enderecos WHERE clienteId = ?", [clienteId]);

  const container = document.getElementById("enderecosCliente");
  container.innerHTML = "";

  if (isNaN(clienteId)) {
    container.innerHTML = "<p>Selecione um cliente para ver os endereços.</p>";
    return;
  }

  if (enderecos.length === 0) {
    container.innerHTML = "<p>Nenhum endereço cadastrado para esse cliente.</p>";
    return;
  }

  enderecos.forEach(end => {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.margin = "10px 0";
    div.style.padding = "10px";
    div.innerHTML = `
      <strong>${end.principal ? "🏠 Principal" : "Endereço"}</strong><br>
      ${end.rua}, ${end.bairro}, ${end.cidade} - ${end.estado}<br>
      CEP: ${end.cep} | ${end.pais}
    `;
    container.appendChild(div);
  });
}

function limparFormulario() {
  document.getElementById("cep").value = "";
  document.getElementById("rua").value = "";
  document.getElementById("bairro").value = "";
  document.getElementById("cidade").value = "";
  document.getElementById("estado").value = "";
  document.getElementById("pais").value = "";
  document.getElementById("principal").checked = false;
}

function salvarEnderecos() {
  localStorage.setItem('enderecos', JSON.stringify(alasql("SELECT * FROM enderecos")));
}