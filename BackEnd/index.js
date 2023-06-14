const connectToMongo = require('./db');
const express = require('express')
var cors = require("cors")

connectToMongo();

const app = express()
const port = 2000;

app.use(cors())

app.use(express.json());//This will help us in executing the req.body("MiddleWare")

//Available Routes:
app.get('/', (req, res) =>{
  res.send('You are in Root page');
  
})

app.use("/api/user", require('./routes/auth') )
app.use("/api/notes", require('./routes/notes') )
app.listen(port, () => {
  console.log(`Dnevnik backend listening on http://localhost:${port}`)
})
