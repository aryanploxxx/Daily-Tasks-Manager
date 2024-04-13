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
    return res.render("index", {all_lists:lists, message:"", todo:""})
})

app.put("/update/:id",async (req,res)=> {
    const id = req.params.id;
    const todo = await List.findOne({ _id: id});
    return res.render("update",{todo: todo,message:""})
})

app.put("/insertUpdated/:id", async (req,res)=> {
    const id = req.params.id;
    const title = req.body.todoTitle;
    const desc = req.body.todoDesc;
    await List.findOneAndUpdate({ _id: id}, {todoTitle: title, todoDesc: desc});
    const lists = await List.find({}).sort({ _id: -1 })
    return res.render("index",{all_lists: lists, message:"ToDo Updated Successfully"})
})

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
})