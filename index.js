const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000;
const router = express.Router()

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.URL)
    .then(()=>{ console.log("Database Connected.") })
    .catch((err)=>{ console.log(`Error Message: ${err}`)})

const List = require('./models/todo')

const todoRouter = require('./routers/todo')
app.use("/list", todoRouter)

app.get("/", async (req,res)=> {
    const lists = await List.find({}).sort({ _id: -1 })
    // console.log(lists)
    return res.render("index", {all_lists:lists, message:""})
})

// app.delete("/list/:id",async (req,res)=> {
//     const id = req.params.id;
//     await List.deleteOne({ _id: id});
//     const afterDelete = await List.find({}).sort({_id: -1});
//     return res.render("index", {all_lists: afterDelete, message:"ToDo Deleted Successfully"})
// })


app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
})