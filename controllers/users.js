const express = require('express');
const router = express.Router();

const User = require('../models/user');

module.exports = router;

// GET
router.get('/', async (req, res) => {
  // res.send('Hello World!');

  try {
    const users = await User.find()
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// GET BY ID
router.get('/:id', getUser, (req, res) => {
  res.send(res.user);
});

// POST
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    createdAt: req.body.createdAt
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// PATCH
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.createdAt != null) {
    res.user.createdAt = req.body.createdAt;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});

// DELETE
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.status(200).json({
      message: "Success removing the user"
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


/////////// MIDDLEWARE FUNCTIONS //////////////

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({
        message: "Cannot find the user"
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }

  res.user = user;
  next();
}