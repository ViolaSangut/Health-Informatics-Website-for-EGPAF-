const { Simcards } = require("../models");

//List all cards
const getSimcard = async (req, res) => {
  const simcard = await Simcards.findAll();
  res.json(simcard);
};

//Count All cards in the inventory
const countAllCards = async (req, res) => {
  const cards = await Simcards.count();
  res.json(cards);
};

//Adding an card to the inventory
const addCard = async (req, res) => {
  const { PhoneNumber, IMEI, PUK, PIN, Facility } = req.body;
  Simcards.create({
    PhoneNumber: PhoneNumber,
    IMEI: IMEI,
    PUK: PUK,
    PIN: PIN,
    Facility: Facility,
  })
    .then(() => {
      res.json("Card added Succesfully!");
    })
    .catch((error) => {
      if (error) {
        res.status(400).json({ error: error });
      }
    });
};

//Updating card details on the Inventory
const updateCard = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { PhoneNumber, IMEI, PUK, PIN, Facility } = req.body;
    const findCardbyID = await Simcards.findOne({
      where: {
        id: id,
      },
    });
    if (!findCardbyID) {
      res.status(404).send({
        status: "error",
        message: `Card with id: ${id} not found`,
      });
    }
    if (id) findCardbyID.id = id;
    if (PhoneNumber) findCardbyID.PhoneNumber = PhoneNumber;
    if (IMEI) findCardbyID.IMEI = IMEI;
    if (PUK) findCardbyID.PUK = PUK;
    if (PIN) findCardbyID.PIN = PIN;
    if (Facility) findCardbyID.Facility = Facility;

    const updatedCard = await findCardbyID.save();
    if (!updatedCard) {
      res.status(404).send({
        status: "error",
        message: `Card with id: ${id} not found`,
      });
    }
    res.status(200).send({
      status: "success",
      data: updateCard,
    });
  } catch (error) {
    next(error);
  }
};

//finding a card by id
const findCardbyID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findOneById = await Simcards.findByPk(id);
    if (!findOneById) {
      res.status(404).send({
        // status: 'error',
        message: `Card with id: ${id} not found`,
      });
    }
    res.status(200).send({
      // status: 'success',
      data: findCardbyID,
    });
  } catch (error) {
    next(error);
  }
};

//delete card from the inventory
const deleteCard = async (req, res) => {
  const id = req.params.id;

  await Simcards.destroy({
    where: {
      id: id,
    },
  });
  return res.json("Card deleted");
};

module.exports = {
  getSimcard,
  countAllCards,
  addCard,
  findCardbyID,
  updateCard,
  deleteCard,
};
