const express = require('express')

const router = express.Router()

const items = []
var id = 1
// Create Read Update Delete
router.get('/items', (req,res,next) => {
  return res.render("index", {items})
})

router.get('/items/new', (req,res,next) => {
  return res.render("new")
})

router.get('/items/:id', (req,res,next) => {
  const item = items.find(val => val.id === Number(req.params.id))
  return res.render("show", {item})
})


router.get('/items/:id/edit', (req,res,next) => {
  const item = items.find(val => val.id === Number(req.params.id))
  return res.render("edit", {item})
})

//post
router.post('/items', (req,res,next) => {
  var item = {
    id: id,
    name: req.body.name,
    price: req.body.price
  }
  id++
  items.push(item)
  console.log('Added item to shopping list')
  return res.redirect('/items')
})

//update aka redirect
router.patch('/items/:id', (req,res,next) => {
  const item = items.find(val => val.id === Number(req.params.id))
  item.name = req.body.name
  item.price = req.body.price

  return res.redirect('/items')
})

//Delete
router.delete('/items/:id', (req, res, next) => {
  const itemIndex = items.findIndex(val => val.id === Number(req.params.id))
  items.splice(itemIndex, 1)
  return res.redirect('/items')
})

module.exports = router
