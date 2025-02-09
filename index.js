
const { configDotenv } = require("dotenv");
const dbConnection = require("./connection");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

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

const swaggerDocument = YAML.load('./swagger.yaml');
// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

