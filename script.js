// script.js
const projetos = [
    {
      titulo: "Projeto 1",
      descricao: "Descrição do projeto 1",
      link: "https://github.com/seuusuario/projeto1"
    },
    {
      titulo: "Projeto 2",
      descricao: "Descrição do projeto 2",
      link: "https://github.com/seuusuario/projeto2"
    }
  ];
  
  const container = document.getElementById("projetos-container");
  
  projetos.forEach(proj => {
    const div = document.createElement("div");
    div.className = "projeto";
    div.innerHTML = `
      <h3>${proj.titulo}</h3>
      <p>${proj.descricao}</p>
      <a href="${proj.link}" target="_blank">Ver no GitHub</a>
    `;
    container.appendChild(div);
  });
  