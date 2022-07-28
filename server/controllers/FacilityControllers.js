const { Facilities } = require("../models");
const mysql = require("mysql2");
const sequelize = require("sequelize");
const express = require("express");
const router = express.Router();
//DB Configuration

const db = mysql.createConnection({
  user: "hbhis",
  host: "localhost",
  password: "hbhis",
  database: "hbhis",
  multipleStatements: true,
});



//update a facility
const updateFacility = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      facilityname,
      mflcode,
      subcounty,
      status,
      ipaddress,
      county,
      ushauri,
      WebADT,
      elasticipaddress,
    } = req.body;
    const findOneFacilityById = await Facilities.findOne({
      where: {
        id: id,
      },
    });
    if (!findOneFacilityById) {
      res.status(404).send({
        status: "error",
        message: `Facility with id: ${id} not found`,
      });
    }
    if (facilityname) findOneFacilityById.facilityname = facilityname;
    if (mflcode) findOneFacilityById.mflcode = mflcode;
    if (subcounty) findOneFacilityById.subcounty = subcounty;
    if (status) findOneFacilityById.status = status;
    if (ipaddress) findOneFacilityById.ipaddress = ipaddress;
    if (county) findOneFacilityById.county = county;
    if (ushauri) findOneFacilityById.ushauri = ushauri;
    if (WebADT) findOneFacilityById.WebADT = WebADT;
    if (elasticipaddress)
      findOneFacilityById.elasticipaddress = elasticipaddress;

    const updatedFacility = await findOneFacilityById.save();
    if (!updatedFacility) {
      res.status(404).send({
        status: "error",
        message: `Facility with id: ${id} not found`,
      });
    }
    res.status(200).send({
      status: "success",
      data: updatedFacility,
    });
  } catch (error) {
    next(error);
  }
};
//List
const getFacilities = async (req, res) => {
  const facilities = await Facilities.findAll({
    attributes: [
      "id",
      "facilityname",
      "mflcode",
      "subcounty",
      "county",
      "status",
      "ipaddress",
      "ushauri",
      "WebADT",
      "elasticipaddress",
    ],
  });
  res.json(facilities);
};
//Adding a facility
const addFacilities = async (req, res)=>{
    const { facilityname, mflcode, subcounty, status, ipaddress, ushauri, WebADT, county, elasticipaddress} = req.body;
    Facilities.create({
        facilityname:facilityname,
        mflcode:mflcode,
        subcounty:subcounty,
        status:status,
        ipaddress:ipaddress,
        county:county,
        ushauri:ushauri,
        WebADT:WebADT,
        elasticipaddress:elasticipaddress, 
        
    })
    .catch((error) => {
      if (error) {
        res.status(400).json({ error: error });
      }
    });
};
//Find By Id
const findFacilityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findOneById = await Facilities.findByPk(id);
    if (!findOneById) {
      res.status(404).send({
        // status: 'error',
        message: `Facility with id: ${id} not found`,
      });
    }
    res.status(200).send({
      // status: 'success',
      data: findOneById,
    });
  } catch (error) {
    next(error);
  }
};

//Delete
const deleteFacility = async (req, res) => {
  const id = req.params.id;

  await Facilities.destroy({
    where: {
      id: id,
    },
  });
  return res.json("Facility deleted");
};

//Count HomaBay Facilities
const countHomaBayFacilities = async (req, res) => {
  const homaBayFacilitiesCount = await Facilities.count({where: {county: 'Homa Bay'}});
  res.json(homaBayFacilitiesCount);
};

//Count All HomaBay Facilities
const countKiambuFacilities = async (req, res) => {
  const KiambuFacilitiesCount = await Facilities.count({where: {county: 'Kiambu'}});
  res.json(KiambuFacilitiesCount);
};

//Count All HomaBay Facilities
const countKisiiFacilities = async (req, res) => {
  const KisiiFacilitiesCount = await Facilities.count({where: {county: 'Kisii'}});
  res.json(KisiiFacilitiesCount);
};

//EMRImplementation Status
const EMRImplementation = async (req, res) => {
  db.query(
    " select round ((select count (*) from facilities where status='running') / (select count (*) from facilities) * 100,0) as EMRImplementationPercentage",
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
};
//ADTImplementation Status
const ADTImplementation = async (req, res) => {
  db.query(
    " select round ((select count (*) from facilities where WebAdt='version 4.0.1' or  WebAdt='version 4.0.0' or  WebAdt='version 3.4.2') / (select count (*) from facilities) * 100,0) as ADTImplementationPercentage",
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
};

//Implementation Summary
const SummaryImplementation = async (req, res) => {
  db.query(
    " SELECT round ((SELECT (SELECT SUM(Implementation) Implementation FROM (select (select count(*) from facilities where status='running') / (select count(*) from facilities) as Implementation UNION ALL select (select count(*) from facilities where WebAdt='version 4.0.1' or  WebAdt='version 4.0.0' or  WebAdt='version 3.4.2') / (select count(*) from facilities) as Implementation UNION ALL select (select count(*) from facilities where ushauri='version 4.0.1' or  ushauri='version 4.0.0' or  ushauri='version 3.4.2') / (select count(*) from facilities) as Implementation) as ImplementationSummary) / 3 )* 100,0) as ImplementationSummary",
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
};

//List HomaBay Facilities
const getHomaBayFacilities = async (req, res) => {
  const facilities = await Facilities.findAll({
    attributes: [
      "id",
      "facilityname",
      "mflcode",
      "subcounty",
      "county",
      "status",
      "ipaddress",
      "ushauri",
      "WebADT",
      "elasticipaddress",
    ], where: {
      county:"Homa Bay"
    },
  });
  res.json(facilities);
};
//List Kiambu Facilities
const getKiambuFacilities = async (req, res) => {
  const facilities = await Facilities.findAll({
    attributes: [
      "id",
      "facilityname",
      "mflcode",
      "subcounty",
      "county",
      "status",
      "ipaddress",
      "ushauri",
      "WebADT",
      "elasticipaddress",
    ], where: {
      county:"Kiambu"
    },
  });
  res.json(facilities);
};
//List Kisii Facilities
const getKisiiFacilities = async (req, res) => {
  const facilities = await Facilities.findAll({
    attributes: [
      "id",
      "facilityname",
      "mflcode",
      "subcounty",
      "county",
      "status",
      "ipaddress",
      "ushauri",
      "WebADT",
      "elasticipaddress",
    ], where: {
      county:"Kisii"
    },
  });
  res.json(facilities);
};

module.exports = {
  addFacilities,
  getFacilities,
  updateFacility,
  findFacilityById,
  deleteFacility,
  countHomaBayFacilities,
  EMRImplementation,
  ADTImplementation,
  getHomaBayFacilities,
  getKiambuFacilities,
  getKisiiFacilities,
  countKiambuFacilities,
  countKisiiFacilities,
  SummaryImplementation,
};
