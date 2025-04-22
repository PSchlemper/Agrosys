function exportarDB() {
  const exportado = {};

  for (const tabela in alasql.tables) {
    exportado[tabela] = alasql(`SELECT * FROM ${tabela}`);
  }

  const clientesSalvos = localStorage.getItem('clientes');
  if (clientesSalvos) {
    exportado['clientes'] = JSON.parse(clientesSalvos);
  }

  const enderecosSalvos = localStorage.getItem('enderecos');
  if (enderecosSalvos) {
    exportado['enderecos'] = JSON.parse(enderecosSalvos);
  }

  const blob = new Blob([JSON.stringify(exportado, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "banco_de_dados.json";
  a.click();

  URL.revokeObjectURL(url);
}