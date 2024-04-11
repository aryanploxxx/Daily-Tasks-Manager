const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000;

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.static(path.join(__dirname, 'public')));


const List = require('./models/todo')

mongoose.connect(process.env.URL)
.then(()=>{ console.log("Database Connected.") })
.catch((err)=>{ console.log(`Error Message: ${err}`)})

app.get("/", async (req,res)=> {
    const lists = await List.find({})
    console.log(lists)
    return res.render("index")
})



app.listen(port, ()=> {
    console.log(`Server is running on port: ${port}`);
})