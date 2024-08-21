const express = require('express')
const app = express();
const port  = 8080;
app.use("/"  , express.static('../client/public'))

app.listen(port , ()=>console.log(`listning at port ${port}`))
