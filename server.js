// Import express and have an instance of it
const express = require("express");
const app = express();
const path = require("path");
// Global envirenement
require("dotenv").config();
// Import DATABASE CONNEXION
const connectDB = require("./Config/connectDB");
// DATABASE CONNEXION
connectDB();
// middleware global
app.use(express.json());
// Router
app.use("/api/client", require("./Router/client"));
app.use("/api/supplier", require("./Router/supplier"));
app.use("/api/products", require("./Router/products"));
app.use("/api/admin", require("./Router/admin"));
app.use("/api/uploadimg", require("./Router/upload"));
// Make upload folder Static
const _dirname = path.resolve();
app.use("client/public", express.static(path.join(_dirname)));
// Start server
// PORT
const PORT = process.env.PORT;

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server is Running on PORT ${PORT}`);
});
