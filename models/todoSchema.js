// creating schema of our TodoApp

const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(console.log("connection successfull with mongodb"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/todoApp");
}

const todoSchema = new Schema({
  task: {
    type: String,
    require: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
