# Student Management System

A simple and responsive **Student Management System** developed as a Web Development Minor Project.

This application implements CRUD operations using **HTML, CSS, JavaScript, and LocalStorage**.

---

## 📌 Project Overview

The Student Management System allows users to manage student records through a simple web interface.

Users can:

- Add new students
- View student records
- Edit existing student details
- Delete individual students
- Delete all students
- Search students
- Store data using LocalStorage
- Validate student input
- Switch between Light Mode and Dark Mode

---

## 🛠️ Technologies Used

- **HTML5** – Structure of the web application
- **CSS3** – Styling and responsive design
- **JavaScript** – Application logic and CRUD operations
- **LocalStorage** – Persistent storage of student records

---

## ✨ Features

### 1. Create Student

Users can add a new student by entering:

- Student Name
- Email
- Course
- Age

The student information is stored in LocalStorage.

### 2. Read Student Records

All saved student records are displayed in a table containing:

- ID
- Name
- Email
- Course
- Age
- Actions

### 3. Update Student

Users can edit an existing student record and update the stored information.

### 4. Delete Student

Users can delete an individual student record using the Delete button.

### 5. Clear All Students

The application provides an option to remove all student records at once.

### 6. Search Students

Students can be searched using:

- Name
- Email
- Course

### 7. Data Validation

The application validates user input before saving student records.

### 8. LocalStorage

Student records remain available after refreshing or reopening the browser because the data is stored using LocalStorage.

### 9. Dark Mode

Users can switch between Light Mode and Dark Mode.

The selected theme is also saved using LocalStorage.

---

## 📷 Screenshots

### Student Form

![Student Form](./Web_Development_CRUD/screenshots/student-form.png)

### Student Records

![Student Records](./Web_Development_CRUD/screenshots/student-records.png)

---

## 📂 Project Structure

```text
Web_Development_CRUD/
│
├── screenshots/
│   ├── student-form.png
│   └── student-records.png
│
├── index.html
├── style.css
├── script.js
└── README.md
