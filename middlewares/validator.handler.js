/* esquema dinamico.
  necesito el esquema, y la propiedad a validad
  de cada request saco la info y aplico el schema
*/
function validatorHandler(schema,property){
  return (req,res,next)=>{
    const data = req[property]
    const {error} = schema.validate(data, {abortEarly : false});
    if(error){
      next(
        res.status(400).json({
          message: error.message
        })
      )
    }
    next()
  }
}

module.exports = validatorHandler;
