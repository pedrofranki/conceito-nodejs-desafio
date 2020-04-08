const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  console.log(repositories);
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {name, url, techs} = request.body;
  repositories.push({id: uuid(), name, url, techs, likes: 0});
  return response.json({id: uuid(), name, url, techs, likes: 0});
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {name, techs, url} = request.body;

  const index = repositories.findIndex(item=>item.id == id)

  if(index === -1){
    return response.status(400).send({error: "id nao encontrado"})
  }

  repositories[index] = {
    id,name, techs, url
  }
  
  return response.json(repositories[index]);
  
});

app.delete("/repositories/:id", (req, res) => {
  const {id}=req.params;

  const index = repositories.findIndex(item=>item.id === id);

  if(index < 0){
    return res.status(400).send({error: "id invalido"})
  }
  
  repositories.splice(index, 1);

  return res.status(204).send()
  
});

app.post("/repositories/:id/like", (request, response) => {
  const {id}=request.params;

  const index = repositories.findIndex(item=>item.id === id);
  // console.log(index);

  if(index < 0){
    return response.status(400).send({error: "id invalido"})
  }

  repositories[index] = {...repositories[index],likes: repositories[index].likes + 1 }
  // console.log(repositories[index]);

  return response.json(repositories[index])
});

module.exports = app;
