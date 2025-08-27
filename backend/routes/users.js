const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get friends of a user
router.get('/:userId/friends', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId }).populate('friends');
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    const friends = await User.find({ _id: { $in: user.friends } });

    res.status(200).send(friends);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.post('/:userId/friend-request', async (req, res) => {
  try {
    const { userId } = req.params;
    const { requesterId } = req.body;
    const user = await User.findOne({ userId });
    const requester = await User.findOne({ userId: requesterId });

    if (!user || !requester) {
      return res.status(404).send({ error: 'User not found' });
    }

    if (!user.friendRequests.includes(requester._id)) {
      user.friendRequests.push(requester._id);
      await user.save();
    }

    res.status(200).send({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Unfriend a user
router.post('/:userId/unfriend', async (req, res) => {
  try {
    const { userId } = req.params;
    const { friendId } = req.body;
    const user = await User.findOne({ userId });
    const friend = await User.findOne({ userId: friendId });

    if (!user || !friend) {
      return res.status(404).send({ error: 'User not found' });
    }

    user.friends.pull(friend._id);
    friend.friends.pull(user._id);
    await user.save();
    await friend.save();

    res.status(200).send({ message: 'Unfriended successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a user by userId
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user by userId
router.patch('/:userId', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ userId: req.params.userId }, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user by userId
router.delete('/:userId', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ userId: req.params.userId });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;