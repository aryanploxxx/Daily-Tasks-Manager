const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000;
const router = express.Router()

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const List = require('./models/todo')

const todoRouter = require('./routers/todo')
app.use("/list", todoRouter)

app.get("/", async (req,res)=> {
    const lists = await List.find({}).sort({ _id: -1 })
    console.log(lists)
    
    return res.render("index", {all_lists:lists, message:""})
})

mongoose.connect(process.env.URL)
    .then(()=>{ console.log("Database Connected.") })
    .catch((err)=>{ console.log(`Error Message: ${err}`)})


app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
})