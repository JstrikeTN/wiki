const express = require('express');
const router = express.Router();
const Users = require('../repositories/usersRepository');

// GET all users
router.get('/users', async (req, res) => {
    try {
        const users = await Users.getAll();
        res.status(200).json({ success: true, data: users});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message});
    }
  
});

// GET a user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.getById(id);

        if (!user)
            return res.status(404).json({ success: false, error: 'User not found'});
        
        res.status(200).json ({ success: true, data: user});
    } catch (err) {
        res.status(500).json({ success: false, error: err.message});
    }
});

// CREATE a new user
router.post('/users', async (req, res) => {
    try {
        const { username, password } = req.body;
        const createdUser = await Users.create({ username, password, });
        res.status(200).json({ success: true, data: createdUser});
    } catch (err) {
        res.status(500).json({ success: false, date: err.message});
    }
});


// UPDATE an existing user by ID
router.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, } = req.body;
        const updatedUser = await Articles.updateById(id, { username, password, });
        
        if (!updatedUser)
            return res.status(404).json ({ success: false, error: 'User not found'});

        res.status(200).json({ success: true, data: updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message});
    }
});


//DELETE a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await Users.deleteById(id);

        if (!deletedUser)
            return res.status(404).json({ success: false, error: 'User not found'});

        res.status(200).json({ success: true, data: deletedUser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message});
    }
});

router.post('/login', async (req, res) => {
    try{
        const {username, password} = req.body;
        const logedUser = await Users.login({username, password});

        if (!logedUser)
            return res.status(404).json({ success: false, error: 'User not found'});
        res.status(200).json({ success: true, data: deletedUser });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message});
    }
});

module.exports = router;