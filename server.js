// edited by roar
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/user', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Database'))
  .catch(error => console.error(error));


app.use(bodyParser.json());

const User = mongoose.model('User', {
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    city:{
        type: String,
        require: true
    }    
});

app.post('/', async (req, res) => {
  try {
    const { name, email, city } = req.body;
    const newUser = new User({ 
      name: String(name),
      email: String(email),
      city: String(city),
    });
    await newUser.save();
  } catch (error) {
    console.error(error);
        console.log(error);
  }
});

app.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
  } catch (error) {
    console.error(error);
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


app.put('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { name, city, email } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, { name, city, email }, { new: true });
    
  } catch (error) {
    console.error(error);
  }
});



app.listen(8080, ()=>{
    console.log("Server started at port")
})
