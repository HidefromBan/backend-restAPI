const express = require('express');
const ProductsService = require('./../services/product-service')


const router = express.Router();
const service = new ProductsService();
router.use(express.json())


/* recibir productos */
router.get('/', (req,res)=> {
  try {
    const products = service.find();
    res.status(200).json(products)
  } catch (error) {
    res.status(404).json({
      message: "error"
    })
  }
})

/* recibir 1 producto por id */
router.get('/:id',(req,res)=>{
  try {
   const {id} = req.params;
   const products = service.findOne(id);
    res.status(200).json(products)
  } catch (error) {
    res.status(404).json({
      message: "no se ha encontrado"
    })
 }
})
/* crear 1 producto */
router.post('/',(req,res)=>{
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct)
})

/* modificar 1 producto */
router.patch('/:id',(req,res)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const product = service.update(id,body)
    res.json(product)
  } catch (error) {
    res.status(404).json({
      message : 'No se puede actualizar producto'
    })
  }
});
/* eliminar 1 producto. */
router.delete('/:id',(req,res)=>{
  const {id} = req.params;
 const rta = service.delete(id);
 res.json(rta);

});

module.exports = router ;
