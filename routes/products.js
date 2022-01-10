const express = require('express')

const ProductsService = require('../services/products')
const validatorHandler = require('../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/products')

const router = express.Router()
const service = new ProductsService()

router.get('/', async (req, res, next) => {
  try{
    const products = await service.find()
    res.status(200).json(products)
  } catch(error) {
    next(error)
  }
})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
  try{
    const body = req.body
    const newProduct = await service.create(body)
    res.status(201).json(newProduct)
  } catch(error) {
    next(error)
  }
})

router.get('/filter', async (req, res) => {
  res.send('Yo soy un filter')
})

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try{
    const { id } = req.params
    const body = req.body
    const updateProduct = await service.update(id, body)
    res.status(201).json(updateProduct)
  } catch(error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try{
    const { id } = req.params
    const product = await service.findOne(id)
    res.status(200).json(product)
  } catch(error) {
    next(error)
  }
})

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await service.delete(id)
    res.status(201).json(response)
  } catch(error) {
    next(error)
  }
})

module.exports = router
