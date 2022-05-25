const { Tickets } = require("../models");

//List
const getTickets = async (req, res)=>{
    const tickets = await Tickets.findAll();
    res.json(tickets);
};

//Add
const addTicket = async (req, res)=>{
    const { title, facility, creator} = req.body;
    Tickets.create({
        title: title,
        facility: facility,
        creator: creator,
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
        const {title, facility, creator} = req.body;
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
            
            const updatedTicket = await findOneTicketById.save();
            if (!updatedTicket) {
                res.status(404).send({
                    status: 'error',
                    message: `Ticket with id: ${id} not found`,
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



module.exports = { getTickets, addTicket, deleteTicket, findTicketById, updateTicket }