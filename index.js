const express = require("express");
const app = express();
const path = require("path");
const Todo = require("./models/todoSchema.js");
const methodOverride = require("method-override");

const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// index route
app.get("/todos", async (req, res) => {
  let todos = await Todo.find();
  res.render("./index.ejs", { todos });
});

// create new todo
app.post(
  "/todos",
  wrapAsync(async (req, res) => {
    let { todo } = req.body;
    let newTodo = new Todo({
      task: todo,
    });
    await newTodo.save();
    res.redirect("/todos");
  })
);

// render edit form
app.get(
  "/todos/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let todo = await Todo.findById(id);
    res.render("./edit.ejs", { todo });
  })
);

//update todo
app.patch(
  "/todos/:id",
  wrapAsync(async (req, res) => {
    let updatedTodo = req.body.todo;
    let { id } = req.params;
    await Todo.findByIdAndUpdate(id, { task: updatedTodo });
    res.redirect("/todos");
  })
);

// distroy route
app.delete("/todos/:id", async (req, res) => {
  let { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.redirect("/todos");
});

// -------------------HANDLING ERRORS------------

//FOR NOT EXISTING ROUTE
app.use("*", (req, res, next) => {
  throw new ExpressError(404, "---Page not found---");
  // res.send("something went worng");
});

// error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("./error.ejs", { err });
});

// Server starterd
app.listen("8080", () => {
  console.log("Server listen on port no: 8080");
});
