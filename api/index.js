const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/Register', (req, res)=>{
    const {username, password} = req.body;

    res.json({reqdata:{username, password}});
})

app.listen(4000);