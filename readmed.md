# Task Manager API

A simple Task Manager REST API built using **Node.js** and **Express**.  
This project uses a JSON file as a data store and supports full CRUD operations on tasks.

---

## 🚀 Features

- Create a task
- Get all tasks
- Filter tasks by completion status
- Get task by ID
- Update a task
- Delete a task
- API versioning (`/api/v1`)
- JSON file persistence

---

## 🛠 Tech Stack

- Node.js (>= 18)
- Express.js
- File system (`fs`)
- Tap & Supertest (for testing)
- Nodemon (development)

---

## 📁 Project Structure

task-manager/
├── app.js
├── task.json
├── controllers/
│ └── task.controller.js
├── routes/
│ └── task.routes.js
├── test/
│ └── task.test.js
├── package.json
└── README.md


---

## ⚙️ Installation

```bash
npm install


npm start
