const express = require('express');
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const taskRoutes = require("./routes/task.route")

app.use("/api/v1/tasks", taskRoutes);


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;