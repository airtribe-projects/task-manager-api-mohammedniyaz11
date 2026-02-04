// routes/task.routes.js
const express = require("express");
const {getTasks,createTask,getTaskById,updateTask,deleteTask}=require("../controller/task.controller")
const router = express.Router();

router.get("/", getTasks);
router.post("/",createTask);
router.get("/:id", getTaskById);
router.patch("/:id", updateTask);
router.delete("/:id",deleteTask)

module.exports = router;