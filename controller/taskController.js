const tasks=require("../task.json");
const path=require("path")
const fs=require("fs")

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

const createTask = (req, res) => {
  try {
    const filePath = path.join(__dirname, "../task.json");
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




module.exports={getTasks,createTask}