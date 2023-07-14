// Require necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const date=require(__dirname+"/date.js")
// Create Express app
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
let toDoTexts=["5-times Pray","Eat Fruits","code"];
let workItems=[];
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  let currentDay=date.getDate();
    res.render('list', {listTitle:currentDay, newListItems:toDoTexts });

});
app.post("/",function (req, res) {
console.log(req.body.list);
  let  item=req.body.todoitem;
   if(req.body.list=="Work"){
    workItems.push(item);
    res.redirect("/work");
   }else{
    toDoTexts.push(item);
    res.redirect("/");
   }

});

app.get("/work",(req,res)=>{
res.render("list",{listTitle:"Work List", newListItems:workItems })
});

app.get("/about",(req,res)=>{
res.render("about");

});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
