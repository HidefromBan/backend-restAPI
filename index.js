const routerApi = require('./routes')
const express = require('express')
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req,res)=> {
  res.send('Hola mi server en express')
})
app.get('/nueva-ruta', (req,res)=> {
  res.send('Hola soy el nuevo endpoint')
})
routerApi(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(port,()=>{
  console.log('Estamos escuchando papu en el puerto ' + port);
})


