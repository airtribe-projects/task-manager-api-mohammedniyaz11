// routes/task.routes.js
const express = require("express");
const {getTasks,createTask}=require("../controller/taskController")
const router = express.Router();

router.get("/", getTasks);
router.post("/",createTask)

module.exports = router;