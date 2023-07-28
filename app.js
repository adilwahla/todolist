// Require necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
// Create Express app
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://adil:Test123@cluster0.xtynrsw.mongodb.net/todolistDB");

const itemsSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

const defaultItems = [
  { name: "Welcome to your todolist!" },
  { name: "Hit the + button to add a new item" },
  { name: "<-- check the box to delete the item" },
];
//Item.insertMany(defaultItems);
const listSchema = {
  name: String,
  items: [itemsSchema],
};
const List = mongoose.model("List", listSchema);
// Define routes
app.get("/", async (req, res) => {
  try {
    const todos = await Item.find();
    res.render("list", { listTitle: "Today", newListItems: todos });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching todo items", error: error.message });
  }
});

app.get("/:catagory", async (req, res) => {
  const customListName = _.toLower(req.params.catagory);

  try {
    const foundList = await List.findOne({ name: customListName });
    if (!foundList) {
      console.log("List with customListName does not exist.");
      //make new List in mongoose db
      const list = new List({
        name: customListName,
        items: defaultItems,
      });
      await list.save();
      res.render("list", {
        listTitle: _.capitalize(customListName), // change to upper case
        newListItems: defaultItems,
      });
    } else {
      console.log("List with customListName already exists:", foundList);
      // show an existing list
      res.render("list", {
        listTitle: _.capitalize(foundList.name), // changed to capitalized
        newListItems: foundList.items,
      });
    }
  } catch (err) {
    console.error("Error finding the list:", err);
  }
});
app.post("/", async (req, res) => {
  let itemName = req.body.todoitem;
  const listName = _.toLower(req.body.list); // to lower case
  const item = new Item({
    name: itemName,
  });
  if (listName === "today") {
    item.save();
    res.redirect("/");
  } else {
    try {
      const foundList = await List.findOne({ name: listName });
      foundList.items.push(item);
      await foundList.save();
      res.redirect("/" + listName);
    } catch (err) {
      console.error("Error finding the list:", err);
    }
  }
});
app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkBox;
  const listTitle = _.toLower(req.body.listName); // change case
  //todo: remove from database whose checkbox is ticked
  console.log(listTitle + "is name of list &  id=" + checkedItemId);

  if (listTitle === "today" && checkedItemId != null) {
    deleteItem();
    res.redirect("/");
  } else {
    deleteItemFromList();
    res.redirect("/" + listTitle); // TODO:redirect to where it came
  }

  async function deleteItem() {
    try {
      const result = await Item.findByIdAndRemove(checkedItemId);

      console.log("deleted successfully :" + result);
    } catch (error) {
      console.log(`Error: ` + error);
    }
  }

  async function deleteItemFromList() {
    // checkedItemId  listTitle
    const condition = { name: listTitle };
    const update = { $pull: { items: { _id: checkedItemId } } };
    const options = { new: true }; // Set the 'new' option to true to return the updated list after the update
    const updatedList = await List.findOneAndUpdate(condition, update, options);
    console.log("updated list" + updatedList);
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});

// Start the server

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);

app.listen(port, () => {
  console.log("Server is running on port 3000");
});
