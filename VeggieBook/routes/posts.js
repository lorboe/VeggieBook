"use strict";

const express = require('express');
const router  = express.Router();
const {ensureLoggedIn} = require('connect-ensure-login');
const Post = require('../models/Post')

/* Will include routes to posts and comments */

//POSTS CODE
//MAKING SURE THAT ONLY LOGGED IN USERS CAN ACCESS THE PAGE TO ADD POSTS
router.get('/add', ensureLoggedIn() , (req, res, next) => {
  res.render('posts/add-post');
});


//CODE TO CREATE THE POST BASED ON THE THE INFORMATION ADDED IN THE "ADD-POST.HBS FORM"
router.post('/add', ensureLoggedIn(), (req, res, next) => {
  Post.create({
    title:req.body.title,
    content: req.body.content,
    visibility:req.body.visibility,
    category: reqbody.category,
    _creator: req.user._id  //this ensures that the creator of the post is the user that is currently logged in
  })
  .then(user => {
    console.log(req.user._id)
    res.redirect('/posts')
  })
});

//CODE TO DISPLAY THE LIST OF POSTS, INCLUDING THE CREATOR
router.get('/', (req, res, next) => {
  Post.find()
  .populate("_creator")
  .then(posts =>{
    res.render('posts/private-homepage', {posts: posts})
    console.log('posts')
  })
})

//EDITING POSTSS
router.get("/posts/:id/edit", ensureLoggedIn(), (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    res.render("posts/edit-post", {post});
  });
});

router.post("/posts/:id/edit",  ensureLoggedIn(), (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    visibility:req.body.visibility,
    category: reqbody.category,
  }).then(post => {
    res.redirect("/posts" + post._id);
  });
});

//DELETING POSTS
router.get('/posts/:id/delete', ensureLoggedIn(),  (req, res, next) => {
  Post.findByIdAndRemove(req.params.id)
    .then(post => {
      res.redirect('/posts')
    })
})




module.exports = router;