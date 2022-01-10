const faker = require('faker')
const boom = require('@hapi/boom')

class ProductsService {

  constructor () {
    this.products = []
    this.generate()
  }

  async generate () {
    for (var i = 0; i < 100; i++) {
    this.products.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
      isBlock: faker.datatype.boolean()
    })
  }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }

    this.products.push(newProduct)
    return newProduct
  }

  find() {
    return new Promise((res, rej) => {
      setTimeout(()=>{
        res(this.products)
      }, 5000)
    })
    //return this.products
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id)
    if (!product) {
      throw boom.notFound('Product did not found')
    }
    if (!product.isBlock) {
      throw boom.conflict('The product is block')
    }
    return product
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id == id)
    if (index === -1) {
      throw boom.notFound('Product did not found')
    }

    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]

  }

  async delete(id) {
    const index = this.products.findIndex(item => item.id == id)
    if (index === -1) {
      throw boom.notFound('Product did not found')
    }

    this.products.splice(index, 1)
    return { message: true, id }
  }

}

module.exports = ProductsService
