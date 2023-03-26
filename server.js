const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const bodyParser = require("body-parser");
const connectDB = require("./config/dbConnection");
const env = require("dotenv").config();

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => console.log("Server running on", port));
