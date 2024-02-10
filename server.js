const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb+srv://dharmiksarvaiya07:Dharmik%402426@userdata.cr5gck8.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Database'))
  .catch(error => console.error(error));

app.use(bodyParser.json());

const User = mongoose.model('User', {
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    }    
});

app.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const { name, email, city } = req.body;
    const newUser = new User({ 
      name,
      email,
      city,
    });
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    console.error(error);
  }
});

app.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.json('User deleted successfully');
  } catch (error) {
    console.error(error);
  }
});

app.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});

app.put('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { name, city, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { name, city, email }, { new: true });
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});

app.listen(8080, () => {
    console.log("Server started at port 8080");
});
