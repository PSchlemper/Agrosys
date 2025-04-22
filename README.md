DESENVOLVIDO POR: Pedro Augusto Schlemper


ESTRUTURA DO PROJETO
-----------------------
.
├── index.html              → Tela de login e cadastro de usuário
├── clientes.html           → Tela de cadastro e listagem de clientes
├── enderecos.html          → Tela de cadastro e listagem de endereços
├── js/
│   ├── alasql.min.js       → Plugin SQL em JavaScript (obrigatório)
│   ├── login.js            → Lógica da tela de login
│   ├── clientes.js         → Lógica da tela de clientes
│   ├── enderecos.js        → Lógica da tela de endereços
│   └── utils.js            → Exportar banco de dados (JSON)
├── css/
│   └── styles.css          → Estilos básicos da aplicação
└── banco_de_dados.json     → (Opcional) Arquivo JSON de exemplo para importação


COMO RODAR O PROJETO
-----------------------
1. NÃO é necessário nenhum servidor ou instalação.
2. Basta abrir o arquivo `index.html` diretamente no navegador.
3. Toda a aplicação roda localmente via JavaScript puro e o plugin AlaSQL.


LOGIN E USUÁRIOS
-------------------
- A primeira tela é de login.
- Você pode:
  a) Criar um novo usuário preenchendo os campos e clicando em "Cadastrar".
  b) Fazer login com um usuário já cadastrado.
- O sistema impede o cadastro de usuários duplicados.


IMPORTAÇÃO DE BANCO
-----------------------
- Na tela de login, clique em "Configurações".
- Selecione um arquivo `.json` exportado anteriormente.
- Os dados serão carregados no banco local (AlaSQL).


FUNCIONALIDADES - CLIENTES
------------------------------
- Cadastro de cliente com:
  ➤ Nome completo
  ➤ CPF (único)
  ➤ Data de nascimento
  ➤ Telefone e Celular
- Tabela com todos os clientes cadastrados.
- Botão para ir para a tela de Endereços.
- Exportação de banco para `.json`.


FUNCIONALIDADES - ENDEREÇOS
-------------------------------
- Selecionar cliente para associar o endereço.
- Campos obrigatórios: CEP, Rua.
- Marcar um dos endereços como "principal".
- O sistema garante que só um endereço por cliente seja principal.
- Listagem de todos os endereços daquele cliente.
- Exportação de banco para `.json`.


EXPORTAÇÃO DE DADOS
-----------------------
- Em qualquer tela, clique no botão "Exportar Banco de Dados".
- Um arquivo `.json` será gerado com todos os dados do banco atual.


OBSERVAÇÕES
----------------
- A aplicação é Mobile Friendly e responsiva.
- Utiliza apenas tecnologias que rodam no navegador.
- Todos os dados são salvos em memória (não persistem após recarregar a página).
- Para testar com banco já preenchido, clique em "Configurações" na tela de login e importe o arquivo `banco_de_dados.json` (caso exista).


DÚVIDAS OU PROBLEMAS?
----------------------
Caso algo não funcione, verificar se o navegador está bloqueando scripts locais. Recomenda-se usar o navegador Google Chrome.
