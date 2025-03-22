// Sample data for Practice only

const Todo = require("./models/todoSchema");

let allTodo = [
  { task: "learning JavaScript" },
  { task: "Revise software engineering concepts for upcoming assignment." },
  {
    task: "learning JavaScriptPlan Instagram content ideas for @AICreativeHub",
  },
  { task: "Practice Node.js session handling for project improvement." },
];

Todo.insertMany(allTodo);
