const express = require('express');

const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
const projects = [];
//console.log(app);
//app.get('/', (request, response) => {
//  response.send();
//});
/*
GET: Buscar informações do back-end
POST: Criar uma informação no back-end
PUT/PATH: Alterar uma informação no back-end 
DELETE: Deletar informações no back-end
*/

/*
Query Params: Vamos usar principalmente para filtros e paginação
Route Params: Identificar recursos na hora de atualizar ou deletar
Request Body:  Resto do conteudo na hora de criar ou editar um recurso

*/

app.get('/projects', (request, response) => {
  //const { title, owner } = request.query;

  return response.json(projects);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuidv4(), title, owner };
  //console.log(project.id); mostra o id para confirmar
  projects.push(project); // esse push vai jogar a criação do nosso projeto para o array
  return response.json(project); //sempre torna o projeto recem criado e nunca exibir a lista completa
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params; // aqui pegamos nosso ID
  const { title, owner } = request.body; // retornando uma nova informação
  // aqui usamos o findIndex pra percorrer todo o array atrás de si
  // findindex vai percorrer todos os projetos, e toda vez que ele pecorrer na variavel project
  // caso ela satisfaça e retorna true, ela vai me retornar o id que eu estou passando
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'PROJETO NÃO FOI ENCONTRADO' });
  }

  // Agora que tenho indice vou criar uma nova informação do projeto
  const project = { id, title, owner };

  projects[projectIndex] = project;

  return response.json(project);

  return response.json([
    'Projeto 50',
    'Projeto 2',
    'Projeto 3',
    'Projeto 4',
    'Projeto 5',
  ]);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'PROJETO NÃO FOI ENCONTRADO' });
  }
  projects.splice(projectIndex, 1);
  return response.status(204).send();
});

app.listen(3000, () => {
  console.log('servidor rodando');
});
