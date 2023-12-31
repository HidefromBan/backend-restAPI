const routerApi = require('./routes');
const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')
const express = require('express');
const app = express();
const cors = require('cors')
const port = 3000;

app.use(express.json());

/* whitelist para peticiones a la api */
const whitelist = ['http://127.0.0.1:5500', 'http://127.0.0.1:5501'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null,true);
    }else{
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

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


