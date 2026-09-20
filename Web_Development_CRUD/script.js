// Get the student form
const studentForm = document.getElementById("studentForm");

// Get the table body
const studentTableBody = document.getElementById("studentTableBody");

// Get the submit button
const submitButton = document.getElementById("submitButton");

// Get search input
const searchInput = document.getElementById("searchInput");

// Get course filter
const courseFilter = document.getElementById("courseFilter");

// Get student count element
const studentCount = document.getElementById("studentCount");

// Get clear all button
const clearAllButton = document.getElementById("clearAllButton");

// Get theme button
const themeButton = document.getElementById("themeButton");

// Get students from LocalStorage
let students = JSON.parse(localStorage.getItem("students")) || [];


// Variable to store the student being edited
let editStudentId = null;


// Display students when page loads
displayStudents();


// Add or Update student
studentForm.addEventListener("submit", function (event) {

    event.preventDefault();

    // Get form values
    const name = document.getElementById("studentName").value;
    const email = document.getElementById("studentEmail").value;
    const course = document.getElementById("studentCourse").value;
    const age = document.getElementById("studentAge").value;

    // Validate student name
    if (name.length < 3) {
        alert("Student name must contain at least 3 characters.");
        return;
    }


    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }


    // Validate age
    if (age < 10 || age > 100) {
        alert("Age must be between 10 and 100.");
        return;
    }

    // Check whether we are editing
    if (editStudentId !== null) {

        // Find student
        const student = students.find(function (student) {
            return student.id === editStudentId;
        });

        // Update student
        student.name = name;
        student.email = email;
        student.course = course;
        student.age = age;

        // Exit edit mode
        editStudentId = null;

        // Change button text
        submitButton.textContent = "Add Student";

    } else {

        // Create new student
        const student = {
            id: Date.now(),
            name: name,
            email: email,
            course: course,
            age: age
        };

        // Add student
        students.push(student);
    }


    // Save data
    localStorage.setItem("students", JSON.stringify(students));

    // Display students
    displayStudents();

    // Clear form
    studentForm.reset();
});

function displayStudents() {

    // Update student count
    studentCount.textContent = students.length;

    // Clear table
    studentTableBody.innerHTML = "";


    // Check if there are no students
    if (students.length === 0) {

        studentTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="no-data">
                    No students found.
                </td>
            </tr>
        `;

        return;
    }


    // Display students
    students.forEach(function (student) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.age}</td>

            <td>
                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}


// Edit student
function editStudent(id) {

    const student = students.find(function (student) {
        return student.id === id;
    });


    // Put data into form
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentEmail").value = student.email;
    document.getElementById("studentCourse").value = student.course;
    document.getElementById("studentAge").value = student.age;


    // Store ID
    editStudentId = id;


    // Change button text
    submitButton.textContent = "Update Student";
}


// Delete student
function deleteStudent(id) {

    // Ask for confirmation
    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );


    // Stop if user cancels
    if (!confirmDelete) {
        return;
    }


    // Remove student from array
    students = students.filter(function (student) {
        return student.id !== id;
    });


    // Save updated array
    localStorage.setItem("students", JSON.stringify(students));


    // Display updated students
    displayStudents();
}
// Search and filter students
function searchAndFilterStudents() {

    const searchText = searchInput.value.toLowerCase();

    const selectedCourse = courseFilter.value;


    const filteredStudents = students.filter(function (student) {

        const matchesSearch =
            student.name.toLowerCase().includes(searchText) ||
            student.email.toLowerCase().includes(searchText) ||
            student.course.toLowerCase().includes(searchText);


        const matchesCourse =
            selectedCourse === "all" ||
            student.course === selectedCourse;


        return matchesSearch && matchesCourse;
    });


    displayFilteredStudents(filteredStudents);
}


// Search event
searchInput.addEventListener("input", function () {

    searchAndFilterStudents();

});


// Course filter event
courseFilter.addEventListener("change", function () {

    searchAndFilterStudents();

});
// Display filtered students
function displayFilteredStudents(filteredStudents) {

    studentTableBody.innerHTML = "";


    // Check if no students match the search
    if (filteredStudents.length === 0) {

        studentTableBody.innerHTML = `
            <tr>
                <td colspan="6" class="no-data">
                    No students found.
                </td>
            </tr>
        `;

        return;
    }


    // Display filtered students
    filteredStudents.forEach(function (student) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>${student.age}</td>

            <td>
                <button
                    class="edit-btn"
                    onclick="editStudent(${student.id})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}
// Clear all students
clearAllButton.addEventListener("click", function () {

    // Ask for confirmation
    const confirmClear = confirm(
        "Are you sure you want to delete all students?"
    );

    // Stop if user cancels
    if (!confirmClear) {
        return;
    }

    // Remove all students
    students = [];

    // Remove students from LocalStorage
    localStorage.removeItem("students");

    // Display empty table
    displayStudents();
});
// Toggle dark mode
themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");


    // Change button text
    if (document.body.classList.contains("dark-mode")) {

        themeButton.textContent = "☀️ Light Mode";

    } else {

        themeButton.textContent = "🌙 Dark Mode";
    }
});