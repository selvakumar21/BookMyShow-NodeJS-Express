const MovieModel = require("./Database/movies");
const UsersModel = require("./Database/users");
const express = require("express");
const app = express();
var cors = require('cors')
app.use(express.json()); //middleware 
app.use(cors());


var mongoose = require('mongoose');
// Set up default mongoose connection
var mongoDB = 'mongodb+srv://selva_21:greenwood@cluster0.mhtlm.mongodb.net/book-my-show?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("CONNECTION ESTABLISED"));




// http://localhost:5000/
app.get("/", (req, res) => {
    return res.json({"Welcome": `Book My Show Welcomes You`});
})

/* 
Route           /movies
Description     Get all movies
Access          PUBLIC
Parameter       NONE
Method          GET
*/
// http://localhost:5000/movies
app.get("/movies", async (req, res) => {
    const getAllmovies = await MovieModel.find();
    return res.json(getAllmovies);
})

/* 
Route           /movies/:id
Description     Get a single movie
Access          PUBLIC
Parameter       NONE
Method          GET
*/

// http://localhost:5000/movie/:id
app.get("/movie/:id", async (req, res) => {
    const {id} = req.params;
    const getMovie = await MovieModel.findOne({_id:id});
    return res.json(getMovie);
})

/* 
Route           /user-register
Description     Post a single user detail in users collection
Access          PUBLIC
Parameter       NONE
Method          POST
*/

// http://localhost:5000/user-register
app.post("/user-register", async (req, res) => {
    const addNewUser = await UsersModel.create(req.body);
    return res.json({userAdded: addNewUser, message: "New User was added!" });
  })



app.listen(5000, () =>{
    console.log("EXPRESS APP IS RUNNIN....");
})
