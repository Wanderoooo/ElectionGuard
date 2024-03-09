const express = require("express");
const cohereRouter = require('./routes/cohereRoutes.js'); 
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})

app.use('/classify', cohereRouter); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

