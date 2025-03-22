// Select all <li> elements
const listItems = document.querySelectorAll(".todoList li");
const inp = document.getElementById("input-box");

// Add click event listener to each <li>
listItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Toggle 'completed' class for line-through and tick mark
    item.classList.toggle("completed");
  });
});

function addTask() {
  if (inp.value === "") {
    return alert("you must write something!");
  }
}
