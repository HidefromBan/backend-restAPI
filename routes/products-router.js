const express = require('express');
const ProductsService = require('./../services/product-service')


const router = express.Router();
const service = new ProductsService();
router.use(express.json())


/* recibir productos */
router.get('/', async (req,res)=> {
   try{
    const products = await service.find();
    res.status(200).json(products)
   }catch(error){
      res.status(404).json({
        "message" : "can't find products."
      })
   }
  }
)

/* recibir 1 producto por id */
router.get('/:id',  (req,res,next)=>{
  try {
   const {id} = req.params;
   const products =  servicee.findOne(id);
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }})
/* crear 1 producto */
router.post('/', async (req,res)=>{
  const body = req.body;
  const newProduct =  await service.create(body);
  res.status(201).json(newProduct)
})

/* modificar 1 producto */
router.patch('/:id', async (req,res)=>{
  try {
    const {id} = req.params;
    const body = req.body;
    const product = await service.update(id,body)
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
