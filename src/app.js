const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const repo = {id: uuid(), title, url, techs, likes: 0};
  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, techs, url} = request.body;

  const index = repositories.findIndex(item=>item.id == id)

  if(index === -1){
    return response.status(400).send({error: "repo not found"})
  }

  repositories[index] = {
    id,title, techs, url, likes: repositories[index].likes
  }
  
  return response.json(repositories[index]);
  
});

app.delete("/repositories/:id", (req, res) => {
  const { id }=req.params;

  const index = repositories.findIndex(item=>item.id == id);

  if(index < 0){
    return res.status(400).send({error: "repo does not exist"})
  }
  
  repositories.splice(index, 1);

  return res.status(204).send()
  
});

app.post("/repositories/:id/like", (request, response) => {
  const {id}=request.params;

  const index = repositories.findIndex(item=>item.id == id);
  
  if(index < 0){
    return response.status(400).send({error: "repo does not exist"})
  }

  repositories[index] = {...repositories[index],likes: repositories[index].likes + 1 }


  return response.json(repositories[index])
});

module.exports = app;
