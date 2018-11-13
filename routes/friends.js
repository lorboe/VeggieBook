"use strict";

const express = require('express');
const router  = express.Router();
const Post = require('../models/Post')
const User = require('../models/User')

/* Will include routes to posts and comments */

//POSTS CODE
//MAKING SURE THAT ONLY LOGGED IN USERS CAN ACCESS THE PAGE TO ADD POSTS

router.get('/', (req, res, next) => {
  const user = req.user._id

  User.find()
  .populate("_creator")
  .then(posts => {
    res.render('friends/my-friends', {posts: posts, user})
    // console.log('posts')
  })
})


router.get('/find', (req, res, next) => {
  const currentUser = req.user._id
  const user = req.user
  User.find()
  .then(users => {
    res.render('friends/find-friends', {users, currentUser, user})
  })
})


router.post('/invite/:id', (req, res, next) => {
  console.log(req.user._id)
  const inviterId = req.user._id
  const inviteeId = req.params.id
  User.findOneAndUpdate({_id: inviteeId}, { $push: { invitersId: inviterId }})
  .then(user => {
    console.log('cool')
  })
  User.findOneAndUpdate({_id: inviterId}, { $push: { inviteesId: inviteeId }})
  .then(user => {
    res.redirect('/friends/find')
  })
  // .catch(err => {
  //   console.log(err)
  // })
})



module.exports = router;