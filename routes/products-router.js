const express = require('express');
const ProductsService = require('./../services/product-service')
const validatorHandler = require('./../middlewares/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema} = require('../schemas/product.schema')

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
router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req,res,next)=>{
    try {
    const {id} = req.params;
    const product =  await service.findOne(id);
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }
);
/* crear 1 producto */
router.post('/',
  validatorHandler(createProductSchema,'body'),
  async (req,res)=>{
    try {
      const body = req.body;
      const newProduct =  await service.create(body);
      res.status(201).json(newProduct)
    } catch (error) {
      next(error)
    }
})

/* modificar 1 producto */
router.patch('/:id',
validatorHandler(getProductSchema,'params'),
validatorHandler(updateProductSchema,'body'),
  async (req,res)=>{
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
router.delete('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req,res,next) => {
    try {
      const {id} = req.params;
      const rta = await service.delete(id);
      res.json(rta);
    } catch (error) {
      next(error)
    }
  }
);

module.exports = router ;
