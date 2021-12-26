const express = require('express')
const faker = require('faker')

const router = express.Router()

// http://localhost:3000/users?limit=10&offset=200
router.get('/', (req, res) => {

  const { limit, offset } = req.query

  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  } else {
    res.send('There is not params')
  }
})

module.exports = router
