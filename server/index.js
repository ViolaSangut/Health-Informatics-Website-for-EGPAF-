const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./middleware/VerifyToken");

const corsOptions = {
  origin: "http://localhost:4000",
  origin: "http://localhost:4001",
  // origin: "http://localhost:1001",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

const db = require("./models");

//Routes
const usersRouter = require("./routes/UsersRoute");
app.use("/users", usersRouter);

const refreshTokenRouter = require("./routes/RefreshTokenRoute");
app.use("/refresh", refreshTokenRouter);

// app.use(verifyToken)
const ticketsRouter = require("./routes/TicketsRoute");
app.use("/tickets", ticketsRouter);

const inventoryRouter = require("./routes/InventoryRoute");
app.use("/inventory", inventoryRouter);

db.sequelize.sync().then(() => {
  app.listen(4000, () => {
    console.log("Server running at port 4000");
  });
});
