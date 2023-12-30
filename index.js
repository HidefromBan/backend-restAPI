const routerApi = require('./routes')
const express = require('express')
const app = express();
const port = 3000;


app.use(express.json());


routerApi(app);
app.get('/', (req,res)=> {
  res.send('Hola mi server en express')
})
app.get('/nueva-ruta', (req,res)=> {
  res.send('Hola soy el nuevo endpoint')
})


app.listen(port,()=>{
  console.log('Estamos escuchando papu en el puerto ' + port);
})
