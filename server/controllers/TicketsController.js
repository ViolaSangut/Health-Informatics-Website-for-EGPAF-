const { Tickets } = require("../models");
const mysql = require("mysql2");

//DB Configuration
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "hbhis",
    multipleStatements: true
});

//List
const getTickets = async (req, res)=>{
    const tickets = await Tickets.findAll();
    res.json(tickets);

};

//Count of Tickets within a week
const getNoOfWeeklyTickets = async (req, res)=>{
    db.query(
        " select count(*) as noOfTickets, CASE WHEN DAYOFWEEK(createdAt) = 1 THEN 'Sun' WHEN DAYOFWEEK(createdAt) = 2 THEN 'Mon' WHEN DAYOFWEEK(createdAt) = 3 THEN 'Tue' WHEN DAYOFWEEK(createdAt) = 4 THEN 'Wed' WHEN DAYOFWEEK(createdAt) = 5 THEN 'Thur'  WHEN DAYOFWEEK(createdAt) = 6 THEN 'Fri' ELSE 'Sat' END AS Day from tickets WHERE date(createdAt)!=date(now())-7 GROUP BY Day ORDER BY COUNT(*) DESC ",
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

//Count pending
const countpendingTickets = async (req, res)=>{
    const pendingTickets = await Tickets.count({where:{
        ticket_status: "Pending"
    }});
    res.json(pendingTickets);
};

//Count Resolved
const countResolvedTickets = async (req, res)=>{
    const resolvedTickets = await Tickets.count({where:{
        ticket_status: "Resolved"
    }});
    res.json(resolvedTickets);

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

//Adding a Ticket
const addTicket = async (req, res)=>{
    const { title, facility, creator, ticket_status, assignee, priority, due_date} = req.body;
    Tickets.create({
        title: title,
        facility: facility,
        creator: creator,
        ticket_status:ticket_status,
        assignee: assignee,
        priority: priority,
        due_date: due_date
    })
    .then(()=>{
        res.json("User added!")

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
        const { title, facility, creator, ticket_status, assignee, priority, due_date} = req.body;
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
            if(creator) findOneTicketById.creator = creator;
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


module.exports = { getTickets, addTicket, deleteTicket, findTicketById, updateTicket, countAllTickets, countUnsignedTickets, countpendingTickets, countResolvedTickets, countTodaysResolvedTickets, countTodaysTickets, percentageCountTodaysResolvedTickets, getNoOfWeeklyTickets}