alasql("CREATE TABLE IF NOT EXISTS usuarios (usuario STRING, senha STRING)");

function login() {
  const usuario = document.getElementById("username").value;
  const senha = document.getElementById("password").value;

  const result = alasql("SELECT * FROM usuarios WHERE usuario = ? AND senha = ?", [usuario, senha]);

  if (result.length > 0) {
    alert("Login realizado com sucesso!");
    window.location.href = "clientes.html";
  } else {
    alert("Usuário ou senha incorretos.");
  }
}

function mostrarCadastro() {
  document.getElementById("cadastro").style.display = "block";
}

// Cadastrar novo usuário
function cadastrarUsuario() {
  const newUser = document.getElementById("newUser").value;
  const newPass = document.getElementById("newPass").value;

  const existe = alasql("SELECT * FROM usuarios WHERE usuario = ?", [newUser]);

  if (existe.length > 0) {
    alert("Usuário já existe!");
    return;
  }

  alasql("INSERT INTO usuarios VALUES (?, ?)", [newUser, newPass]);
  alert("Usuário cadastrado com sucesso!");
  document.getElementById("cadastro").style.display = "none";
}

function importarDB(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const json = JSON.parse(e.target.result);

    for (const table in json) {
      alasql("DROP TABLE IF EXISTS " + table);
      alasql("CREATE TABLE " + table);
      alasql.tables[table].data = json[table];
    }

    alert("Banco de dados importado com sucesso!");
  };

  reader.readAsText(file);
}