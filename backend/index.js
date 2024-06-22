const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test" , { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

app.post("/createUser", (req, res) => {
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});
app.put("/UpdateUser/:id", (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id} , {name: req.body.name , email:req.body.email , age:req.body.age})
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});
app.get("/" , (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
})
app.get("/getUser/:id" , (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
})

app.delete("/deleteUser/:id" , (req,res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id: id})
    .then(res => res.json(res))
    .catch(err => res.json(err));


})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
