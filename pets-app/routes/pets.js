const express = require('express')
const { Pet , Owner } = require('../models')
const router = express.Router({mergeParams: true})

//All pets at /pets

router
  .route('/')
  .get((req, res, next) => {
    Owner.findById(req.params.ownerId)
      .populate("pets")
      .exec()
      .then(owner => {
        return res.render("pets/index", { owner });
      })
      .catch(err => next(err)) // pass along DB errors to handler
  })
  .post((req,res,next) => {
    //create new pet based on body of request
    const newPet = new Pet(req.body)
    const { ownerId } = req.params
    newPet.owner = ownerId
    return newPet
      .save()
      .then(pet => {
        return Owner.findByIdAndUpdate(
          ownerId,
          {$addToSet: {pets: pet._id}}
        )
      })
      .then(() => {
        return res.redirect(`/owners/${ownerId}/pets`)
      })
      .catch(err => next(err))

  })
  /**
  .post((req,res,next) => {
    let newPet = new Pet(req.body)
    newPet.owner = req.params.ownerId
    Owner.findById(req.params.ownerId)
      .then(owner => {
        newPet
          .save()
          .then(createdTodo => {
            owner.pets.push(createdTodo._id)
            return instructor
              .save()
              .then(() => return res.redirect(`/owners/${req.params.ownerId}/pets`))
              .catch(err => next(err))
          })
      })
  }) **/

router.route("/new").get((req,res,next) => {
  Owner.findById(req.params.ownerId)
    .then(owner => res.render("pets/new", {owner}))
    .catch(err => next(err))
})

router
  .route("/:id")
  .get((req,res,next) => {
    Pet.findById(req.params.id)
      .populate('owner')
      .then(pet => {return res.render("/pets/show", { pet })})
      .catch(err => next(err))
  })
  .patch((req,res,next) => {
    Pet.findByIdAndUpdate((req.params.id), req.body)
      .then(() => res.redirect(`/owners/${req.params.ownerId}/pets`))
      .catch(err => next(err))
  })
  .delete((req,res,next) => {
    Pet.findByIdAndRemove(req.params.id)
      .then(() => res.redirect(`/owners/${req.params.ownerId}/pets`))
      .catch(err => next(err))
  })
//edit
router
  .route("/:id/edit")
  .get((req,res,next) => {
    return Pet.findById(req.params.id)
      .populate('owner')
      .then(pet => {
        return res.render("pets/edit", { pet })
      })
      .catch(err => next(err))
  })


module.exports = router
