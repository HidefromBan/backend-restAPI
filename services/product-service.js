const {faker} = require('@faker-js/faker');

class ProductsService{

  constructor(){
    this.products = [];
    this.generate();
  }

  /* metodos del servicio */
  generate(){
    const limit = 100;

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid().toString(6),
        name:faker.commerce.productName(),
        price: parseInt(faker.commerce.price() , 10),
        image: faker.image.url(),
      });
    }
  }
  async create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct
  }
  find(){
    return new Promise((resolve,reject)=> {
      setTimeout(() => {
        resolve(this.products)
      }, 1000);
    })
  }
  async findOne(id){
   const product = this.products.find(item => item.id === id);
   if(!product){
    throw new Error('product not found')
   }else {

     return product
   }
  }
  async update(id,changes){
    const index = this.products.findIndex( item => item.id === id);
    if (index === -1 ){
      throw new Error('product not found ')
    }else{
      const product = this.products[index];
      this.products[index]= {
          ...product,
          ...changes
      }
      return this.products[index];
  }
}
  async delete(id){
    const index = this.products.findIndex( item => item.id === id);
    if (index === -1 ){
      throw new Error('product not found ')
    }
    this.products.splice(index,1);
    return {
          id,
          message: 'This product has been deleted.'
        };
  }
}


module.exports = ProductsService

