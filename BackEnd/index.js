const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 2000

app.use(express.json());//This will help us in executing the req.body("MiddleWare")

//Available Routes:
app.get('/', (req, res) =>{
  res.send('You are in Root page');
  
})

app.use("/api/user", require('./routes/auth') )
app.use("/api/notes", require('./routes/notes') )
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
