const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());


const db = require("./models");

//Routes
const ticketsRouter = require("./routes/TicketsRoute");
app.use("/tickets", ticketsRouter);

// app.listen(4000, ()=>{
//     console.log("Server running at port 4000")
//    });

db.sequelize.sync().then(()=>{
    app.listen(4000, ()=>{
        console.log("Server running at port 4000")
       });
});