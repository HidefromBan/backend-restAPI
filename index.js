const express = require('express')
const app = express();
const port = 3000;
const {faker} = require('@faker-js/faker');


app.get('/', (req,res)=> {
    res.send('Hola mi server en express')
})
app.get('/nueva-ruta', (req,res)=> {
    res.send('Hola soy el nuevo endpoint')
})
app.get('/products', (req,res)=> {
    res.json([
      {name: "Product 1", price: 1000,},
      { name: "Product 2",price: 2000,},
    ])
})

app.get('/products/:id', (req,res)=>{
    const {id}= req.params
    res.json({
      id,
      name:"Product 2",
      price: 2000,
    })
})

app.get('/categories', (req, res) =>{
  res.json(
    [
      {
        name: 'categoria 1',
        product: {
          name: 'product 1',
          brand: 'marca 1'
        }
      },
      {
        name: 'categoria 2',
        product: {
          name: 'product 2',
          brand: 'marca 1'
        }
      },
      {
        name: 'categoria 3',
        product: {
          name: 'product 1',
          brand: 'marca 3'
        }
    }
  ]
)})

app.get('/categories/:categoryId', (req, res) => {
    const { categoryId } = req.params;
     res.json({
      categoryId,
      name: 'categoria 3',
      product: {
        name: 'product 1',
        brand: 'marca 3'
      }
     });
})

app.get('/categories/:categoryId/products/:productId', (req,res) => {
    const {categoryId, productId} = req.params;
    res.json({
      categoryId,
      productId,
    })
})

app.get('/users', (req,res)=>{
  const {limit, offset} = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    })
  }else{
    res.send('No hay parametros')
    }
})





app.listen(port,()=>{
  console.log('Estamos escuchando papu en el puerto ' + port);
})
