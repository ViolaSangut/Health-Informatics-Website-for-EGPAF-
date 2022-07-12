const { Tickets } = require("../models");
const mysql = require("mysql2");
const sequelize = require("sequelize");

//DB Configuration
const db = mysql.createConnection({
    user: "hbhis",
    host: "localhost",
    password: "hbhis",
    database: "hbhis",
    multipleStatements: true
});

//List
const getTickets = async (req, res)=>{

    const tickets = await Tickets.findAll({attributes: ["id", "title", "facility", "creatorsEmail", "creatorsFirstName", "creatorsLastName","ticket_status", "assignee", "priority", "due_date",[
        sequelize.fn
        (
          "DATE_FORMAT", 
          sequelize.col("createdAt"), 
          "%Y-%m-%d"
        ),
        "createdAt",
      ],], });
    res.json(tickets);

};

//Adding a Ticket
const addTicket = async (req, res)=>{
    const { title, facility, creatorsEmail, creatorsFirstName, creatorsLastName, ticket_status, assignee, priority, due_date} = req.body;


    if(!title || !facility || !creatorsEmail || !due_date ){
        res.status(400) //Bad req
        throw new error("Please add all mandatory fields!")
    }

    Tickets.create({
        title: title,
        facility: facility,
        creatorsEmail: creatorsEmail,
        creatorsFirstName: creatorsFirstName,
        creatorsLastName: creatorsLastName,
        ticket_status:ticket_status,
        assignee: assignee,
        priority: priority,
        due_date: due_date,
    })
    .then(()=>{
        res.json("Ticket added!")

    })
    .catch((error)=>{
        if(error){
            res.status(400).json({error:error});
        }
    });
}

//Delete
const deleteTicket = async(req, res) =>{
    const id = req.params.id;

   await Tickets.destroy({
        where: {
            id: id,
        },
    });
    return res.json('Ticket deleted');
};

//Find By Id
const findTicketById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findOneById = await Tickets.findByPk(id);
        if (!findOneById) {
            res.status(404).send({
                // status: 'error',
                message: `Ticket with id: ${id} not found`,
            });
        }
        res.status(200).send({
            // status: 'success',
            data: findOneById
        });

    } catch (error) {
        next(error);
    }
};

//update
const updateTicket = async (req, res, next)=>{
    try {
        const { id } = req.params;
        const { title, facility, ticket_status, assignee, priority, due_date} = req.body;
        const findOneTicketById = await Tickets.findOne({
            where:{
                id: id,
            }});
            if (!findOneTicketById) {
                res.status(404).send({
                    status: 'error',
                    message: `Ticket with id: ${id} not found`,
                });
            }
            if(title) findOneTicketById.title = title;
            if(facility) findOneTicketById.facility = facility;
            if(ticket_status) findOneTicketById.ticket_status = ticket_status;
            if(assignee) findOneTicketById.assignee = assignee;
            if(priority) findOneTicketById.priority = priority;
            if(due_date) findOneTicketById.due_date = due_date;
            
            const updatedTicket = await findOneTicketById.save();
            if (!updatedTicket) {
                res.status(404).send({
                    status: 'error',
                    message: `Ticket with id: ${id} not found`
                    ,
                });
            }
            res.status(200).send({
                status: 'success',
                data: updatedTicket
            });  
        } catch (error) {
            next(error);
        }

};


//Count of Tickets within a week
const getNoOfWeeklyTickets = async (req, res)=>{
    db.query(
        " select b.WeekDay, a.created_date, DAYOFWEEK(a.createdAt) as WeekDay2, IFNULL(count(a.createdAt), 0) as Tickets, CASE WHEN DAYOFWEEK(b.WeekDay) = 1 THEN 'Sun' WHEN DAYOFWEEK(b.WeekDay) = 2 THEN 'Mon' WHEN DAYOFWEEK(b.WeekDay) = 3 THEN 'Tue' WHEN DAYOFWEEK(b.WeekDay) = 4 THEN 'Wed' WHEN DAYOFWEEK(b.WeekDay) = 5 THEN 'Thur' WHEN DAYOFWEEK(b.WeekDay) = 6 THEN 'Fri' ELSE 'Sat' END AS Day from (SELECT DATE(NOW())-INTERVAL seq.seq DAY WeekDay FROM (SELECT 0 AS seq UNION ALL SELECT 1  UNION ALL SELECT 2 UNION ALL SELECT 3  UNION ALL SELECT 4 UNION ALL SELECT 5  UNION ALL SELECT 6 ) seq ) b left join tickets a on b.WeekDay = DATE(a.created_date) GROUP BY weekDay ORDER BY weekDay ASC ; ",
            (err, result)=>{
                if(err){
                    console.log(error)
                }
                else{
                    res.send(result);
                }
            }
    )

};

//Count All
const countAllTickets = async (req, res)=>{
    const tickets = await Tickets.count();
    res.json(tickets);
};

//Count unasigned
const countUnsignedTickets = async (req, res)=>{
    const unassignedTickets = await Tickets.count({where:{
        ticket_status: "Unassigned"
    }});
    res.json(unassignedTickets);
};

//List unasigned
const getUnsignedTickets = async (req, res)=>{

    const tickets = await Tickets.findAll({where:{
        ticket_status: "Unassigned"
    }}, {attributes: ["id", "title", "facility", "creatorsEmail", "creatorsFirstName", "creatorsLastName","ticket_status", "assignee", "priority", "due_date",[
        sequelize.fn
        (
          "DATE_FORMAT", 
          sequelize.col("createdAt"), 
          "%Y-%m-%d"
        ),
        "createdAt",
      ],], });
    res.json(tickets);

};

//Count pending
const countpendingTickets = async (req, res)=>{
    const pendingTickets = await Tickets.count({where:{
        ticket_status: "Pending"
    }});
    res.json(pendingTickets);
};

//List pending
const getPendingTickets = async (req, res)=>{

    const tickets = await Tickets.findAll({where:{
        ticket_status: "Pending"
    }}, {attributes: ["id", "title", "facility", "creatorsEmail", "creatorsFirstName", "creatorsLastName","ticket_status", "assignee", "priority", "due_date",[
        sequelize.fn
        (
          "DATE_FORMAT", 
          sequelize.col("createdAt"), 
          "%Y-%m-%d"
        ),
        "createdAt",
      ],], });
    res.json(tickets);

};


//Count Resolved
const countResolvedTickets = async (req, res)=>{
    const resolvedTickets = await Tickets.count({where:{
        ticket_status: "Resolved"
    }});
    res.json(resolvedTickets);

};

//List Resolved
const getResolvedTickets = async (req, res)=>{

    const tickets = await Tickets.findAll({where:{
        ticket_status: "Resolved"
    }}, {attributes: ["id", "title", "facility", "creatorsEmail", "creatorsFirstName", "creatorsLastName","ticket_status", "assignee", "priority", "due_date",[
        sequelize.fn
        (
          "DATE_FORMAT", 
          sequelize.col("createdAt"), 
          "%Y-%m-%d"
        ),
        "createdAt",
      ],], });
    res.json(tickets);

};

//Percentage count of Todays resolved Tickets
const percentageCountTodaysResolvedTickets = async (req, res)=>{
    db.query(
        " select round ((select count (*) from tickets where date(createdAt)=date(now()) and ticket_status='Resolved') / (select count (*) from tickets where date(createdAt)=date(now())) * 100,0) as percentageCountOfTodaysResolvedTickets",
            (err, result)=>{
                if(err){
                    console.log(error)
                }
                else{
                    res.send(result);
                }
            }
    )
};

//Count Todays Tickets
const countTodaysTickets = async (req, res)=>{
    db.query(
        "select count(*) as todays_tickets from tickets where date(createdAt)=date(now())" , 
        (err, result)=>{
            if(err){
                console.log(error)
            }
            else{             
                res.json(result);                           
            }
        }
    )
};

//Count Todays Resolved Tickets
const countTodaysResolvedTickets = async (req, res)=>{
    db.query(
        "select count(*) as todays_resolved_tickets from tickets where date(createdAt)=date(now()) and ticket_status='Resolved'", 
        (err, result)=>{
            if(err){
                console.log(error)
            }
            else{
                // res.send(result);
                res.json(result);
            }
        }
    )
};


module.exports = { getTickets, addTicket, deleteTicket, findTicketById, updateTicket, countAllTickets, countUnsignedTickets, countpendingTickets, countResolvedTickets, countTodaysResolvedTickets, countTodaysTickets, percentageCountTodaysResolvedTickets, getNoOfWeeklyTickets, getUnsignedTickets, getPendingTickets, getResolvedTickets,db}