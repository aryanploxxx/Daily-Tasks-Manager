const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000;

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const List = require('./models/todo')

mongoose.connect(process.env.URL)
.then(()=>{ console.log("Database Connected.") })
.catch((err)=>{ console.log(`Error Message: ${err}`)})

app.get("/", async (req,res)=> {
    const lists = await List.find({})
    console.log(lists)
    return res.render("index", {all_lists:lists, message:""})
})

app.post("/list", async (req,res)=> {
    const title = req.body.todoTitle;
    const desc = req.body.todoDesc;
    const oldList = await List.find({});
    if(!title || !desc) {
        return res.render("index", {message:"Title or Description Cannot be empty!", all_lists:oldList})
    }
    console.log(title)
    console.log(desc)
    await List.create({ todoTitle: title, todoDesc: desc });
    const newList = await List.find({});
    console.log(newList)
    return res.render("index", {all_lists:newList, message:"ToDo Inserted Successfully"})
})

app.delete("/list/:id",async (req,res)=> {
    const id = req.params.id;
    await List.deleteOne({ _id: ObjectId(id)});
    const afterDelete = await List.find({});
    return res.render("index", {all_lists: afterDelete, message:"ToDo Deleted Successfully"})
})

app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
})