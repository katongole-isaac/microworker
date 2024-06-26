const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();
const dataStore = [];

process.on('uncaughtException', e => console.error('[UNCAUGHTEXCEPTION]: ',e));
process.on("unhandledRejection", (e) => console.error("[UNHANDLEREJECTION]: ", e));

app.use(cors({ methods: ["POST"], origin: "*" }));
app.use(express.json());

app.post("/create-user", (req, res) => {
    
  const {username, email } = req.body;

  // you can apply more validation to the DTO
  if(!username && !email)  return res.status(400).send({message: 'provide proper credentials'});

  const _index = dataStore.findIndex(el => el.email === email);

  if(_index !== -1)  dataStore[_index].username = username;

  else dataStore.push({username, email});

  console.log(dataStore);

  return res.send({message: "user saved"});

});

app.listen(PORT, () => console.log(`Running on port ${PORT} ...`));
