const tasks = require("../task.json");
const path = require("path")
const fs = require("fs")

const filePath = path.join(__dirname, "../task.json");

const getTasks = (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while getting tasks"
        });
    }
}

const getTaskById = (req, res) => {
    try {
        const { id } = req.params;

        // Read file and parse JSON
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const tasks = data.tasks || [];
        const task = tasks.find((ele) => ele.id == id);
        return res.status(200).json({
            success: true,
            count: 1,
            data: task
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while getting tasks"
        });


    }

}

const createTask = (req, res) => {
    try {

        const { title, description, completed = false } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "title and description are required"
            });
        }

        // Read file and parse JSON
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const tasks = data.tasks || [];
        // Generate new ID
        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            title,
            description,
            completed
        };

        // Push and save
        tasks.push(newTask);
        data.tasks = tasks;

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return res.status(201).json({
            success: true,
            data: newTask
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while creating task"
        });
    }
};

const updateTask = (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        // Read file
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const tasks = data.tasks || [];


        const taskIndex = tasks.findIndex(task => task.id == id);

        if (taskIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        if (title !== undefined) tasks[taskIndex].title = title;
        if (description !== undefined) tasks[taskIndex].description = description;
        if (completed !== undefined) tasks[taskIndex].completed = completed;

        // Save back to file
        data.tasks = tasks;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return res.status(200).json({
            success: true,
            data: tasks[taskIndex]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while updating task"
        });
    }
};

const deleteTask = (req, res) => {
    try {
        const { id } = req.params;

        // Read file
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const tasks = data.tasks || [];

        // Find task index
        const taskIndex = tasks.findIndex(task => task.id == id);

        if (taskIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Remove task
        const deletedTask = tasks.splice(taskIndex, 1)[0];

        // Save back
        data.tasks = tasks;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return res.status(200).json({
            success: true,
            data: deletedTask
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting task"
        });
    }
};

module.exports = { getTasks, createTask, getTaskById, updateTask, deleteTask }