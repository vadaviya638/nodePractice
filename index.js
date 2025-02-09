
const { configDotenv } = require("dotenv");
const dbConnection = require("./connection");

const express = require("express");

configDotenv()
dbConnection()

const userRoutes = require("./router/userRouter")
const registerRoutes = require("./router/registerRouter")
const app = express()


// ✅ Add Middleware to Parse JSON
app.use(express.json()); 

// ✅ If you're using form data, also add this:
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/auth", registerRoutes);



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

