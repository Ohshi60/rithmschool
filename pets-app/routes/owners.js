const express = require('express')
const { Owner } = require('../models')
const router = express.Router()

//CRUD for owners
//Read
router
  .route('/')
  .get((req,res,next) => {
    Owner.find()
      .then( owners => res.render("owners/index", {owners}))
      .catch(err => next(err))
  })
  .post((req,res,next) => {
    Owner.create(req.body)
      .then(() => res.redirect('/'))
      .catch(err => next(err))
  })
//Create
router.route("/new").get((req,res,next) => {
  res.render('owners/new')
})

router
  .route("/:ownerId")
  .get((req,res,next) => {
    Owner.findById(req.params.ownerId)
      .then(owner => res.render("owners/show", {owner}))
      .catch(err => next(err))
  })
  .patch((req,res,next) => {
    Owner.findByIdAndUpdate(req.params.ownerId, req.body)
      .then(() => res.redirect('/'))
      .catch(err => next(err))
  })
  .delete((req,res,next) => {
    Owner.findByIdAndRemove(req.params.ownerId)
      .then(() => res.redirect('/'))
      .catch(err => next(err))
  })

router.route('/:ownerId/edit').get((req,res) => {
  Owner.findById(req.params.ownerId)
    .then(owner => res.render("owners/edit", {owner} ))
    .catch(err => next(err))
})

module.exports = router
