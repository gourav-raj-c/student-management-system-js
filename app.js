const form = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const branchInput = document.getElementById("branch");
const marksInput = document.getElementById("marks");
const tableBody = document.getElementById("tableBody");
const submitBtn = document.getElementById("submitBtn");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null; // tracks which student is being edited

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!nameInput.value || !rollInput.value || !branchInput.value || !marksInput.value) {
    alert("Please fill all fields");
    return;
  }

  const student = {
    name: nameInput.value,
    roll: rollInput.value,
    branch: branchInput.value,
    marks: marksInput.value
  };

  if (editIndex === null) {
    // CREATE
    students.push(student);
  } else {
    // UPDATE
    students[editIndex] = student;
    editIndex = null;
    submitBtn.textContent = "Add Student";
  }

  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
  form.reset();
});

function renderTable() {
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.roll}</td>
        <td>${student.branch}</td>
        <td>${student.marks}</td>
        <td>
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function editStudent(index) {
  const student = students[index];

  nameInput.value = student.name;
  rollInput.value = student.roll;
  branchInput.value = student.branch;
  marksInput.value = student.marks;

  editIndex = index;
  submitBtn.textContent = "Update Student";
}

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
}

renderTable();
