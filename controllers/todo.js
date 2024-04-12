// Code is not using controllers as of now

const List = require('../models/todo')

function generatebackgroundColor() {
    const colors = ["slate","gray","zinc","neutral","stone","red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","purple","fuchsia","pink","rose"];
    const randomIndexColor = Math.floor(Math.random() * 22);
    const shades = [50,100,200];
    const randomIndexShade = Math.floor(Math.random() * 3);
    const bg = "bg-"+colors[randomIndexColor]+"-"+shades[randomIndexShade];
    return bg;
}

async function insertNewList(req, res) {
    const title = req.body.todoTitle;
    const desc = req.body.todoDesc;
    const oldList = await List.find({}).sort({ _id: -1 });
    if(!title || !desc) {
        return res.render("index", {message:"Title or Description Cannot be empty!", all_lists:oldList})
    }
    // console.log(title)
    // console.log(desc)
    const bgcolor = generatebackgroundColor()
    await List.create({ todoTitle: title, todoDesc: desc, backgroundColor: bgcolor});
    const newList = await List.find({}).sort({ _id: -1 });
    // console.log(newList)
    return res.render("index", {all_lists:newList, message:"ToDo Inserted Successfully"})
}

async function deleteUser(req, res) {
    const id = req.params.id;
    await List.deleteOne({ _id: id});
    const afterDelete = await List.find({});
    return res.render("index", {all_lists: afterDelete, message:"ToDo Deleted Successfully"})
    /*
        return res.redirect("/")
        -> use flash to pass variables
    */
}

module.export = {insertNewList, deleteUser};