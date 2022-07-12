const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./middleware/VerifyToken");
const mysql = require("mysql2");
const hbFacilities = require("./models/homaBayFacilities.json");


//DB Configuration
const db1 = mysql.createConnection({
  user: "hbhis",
  host: "localhost",
  password: "hbhis",
  database: "hbhis",
  multipleStatements: true,
});
<<<<<<< HEAD
//Whitelisting
=======
//Allowed paths 
>>>>>>> a09fc191f88afe34397526a7bd3da40395e829de
const corsOptions = {
  origin: "http://localhost:4000",
  origin: "http://localhost:4001",
  credentials: true,
  optionSuccessStatus: 200,
};

require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));

const db = require("./models");

//* Routes *//
//Users
const usersRouter = require("./routes/UsersRoute");
app.use("/users", usersRouter);

//RefreshToken
const refreshTokenRouter = require("./routes/RefreshTokenRoute");
app.use("/refresh", refreshTokenRouter);

// app.use(verifyToken)
//Tickets
const ticketsRouter = require("./routes/TicketsRoute");
app.use("/tickets", ticketsRouter);

//Inventory
const inventoryRouter = require("./routes/InventoryRoute");
app.use("/inventory", inventoryRouter);

const facilityRouter = require("./routes/FacilityRoute");
app.use("/facilities", facilityRouter);

//Sim Cards
const simcardsRouter = require("./routes/SimcardRoute");
app.use("/simcards", simcardsRouter);

//Roles
app.use("/roles", require("./routes/rolesRoute"));

//Inserting roles to db if they don't exists
var insertingRoles =
  "INSERT IGNORE INTO roles (id, role, createdAt, updatedAt ) VALUES ?";
const todaysDate = new Date();
var values = [
  [1, "User", todaysDate, todaysDate],
  [2, "Manager", todaysDate, todaysDate],
  [3, "Admin", todaysDate, todaysDate],
  [4, "Super_User", todaysDate, todaysDate],
];

//Creating roles when server runs
const creatingRoles = async (req, res) => {
  db1.query(insertingRoles, [values], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
};

//Facilities
//Inserting Facilities to db if they don't exists
let insertingFacilities = "INSERT IGNORE INTO facilities (facilityname, mflcode, county, subcounty, ushauri, WebADT, status, ipaddress, elasticipaddress) VALUES ?";

let hbFacilitiesList = hbFacilities;
let hbFacilitiesValues = [];

for (let i = 0; i < hbFacilitiesList.length; i++) {
  hbFacilitiesValues.push([hbFacilitiesList[i].facilityname, hbFacilitiesList[i].mflcode, hbFacilitiesList[i].county, hbFacilitiesList[i].subcounty, hbFacilitiesList[i].ushauri, hbFacilitiesList[i].WebADT, hbFacilitiesList[i].status, hbFacilitiesList[i].ipaddress, hbFacilitiesList[i].elasticipaddress])
}

//Creating facilities when server runs
const creatingFacilities = async (req, res)=>{
  db1.query(insertingFacilities, [hbFacilitiesValues],
          (err, result)=>{
              if(err){
                  console.log(err)
              }
          }
  )

};



//Running server
db.sequelize.sync().then(() => {
<<<<<<< HEAD
  creatingRoles(),
    app.listen(4000, () => {
      console.log("Server running at port 4000");
    });
=======
  creatingRoles(), creatingFacilities(),
  app.listen(4000, () => {
    console.log("Server running at port 4000");
  });
>>>>>>> a09fc191f88afe34397526a7bd3da40395e829de
});
