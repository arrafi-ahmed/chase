require("./utils/config");
const express = require("express");
const logger = require("morgan");
const userRouter = require("./routes/userRouter");
const projectRouter = require("./routes/projectRouter");
const employeeRouter = require("./routes/employeeRouter");
const taskRouter = require("./routes/taskRouter");
const contactRouter = require("./routes/contactRouter");
const orderRouter = require("./routes/orderRouter");
const hoursRouter = require("./routes/hoursRouter");
const pendingRouter = require("./routes/pendingRouter");
const cors = require("cors");
const authenticateToken = require("./middleWares/authenticateToken");
const customCors = require("./middleWares/customCors");

const app = express();
const port = process.env.PORT || 3001;

// const corsOptions = {
//   origin: ["https://sincro.pro"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };

// Middlewares de express
app.use(customCors);
app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Aplicar el middleware de autenticación a las rutas que requieran autenticación
app.use("/api/users", userRouter);
app.use("/api/projects", authenticateToken, projectRouter);
app.use("/api/employees", authenticateToken, employeeRouter);
app.use("/api/tasks", authenticateToken, taskRouter);
app.use("/api/contacts", authenticateToken, contactRouter);
app.use("/api/orders", authenticateToken, orderRouter);
app.use("/api/hours", authenticateToken, hoursRouter);
app.use("/api/pendings", authenticateToken, pendingRouter);

app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.redirect("/users/login");
});

// Servidor
app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting server on port ${port}:`, err);
    process.exit(1);
  }
  console.log(`Example app listening on port ${port}`);
});
