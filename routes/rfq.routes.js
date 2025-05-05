const express = require("express");
const {
  initiate,
  getinitiatedata,
  accpet,
  dealPropose,
  dealApprove,
} = require("../controllers/rfq.controller");
const router = express.Router();

//TODO:- RFQ Quotes Initiation Routes
router.post("/initiate", initiate);
router.get("/initiatedata", getinitiatedata);

//TODO:- RFQ Quotes Accept Routes
router.post("/accept", accpet);

//TODO:- RFQ Quotes Deal Purpose Routes
router.post("/deal-purpose", dealPropose);

//TODO:- RFQ Quotes Deal approve Routes
router.post("/deal-approve", dealApprove);

module.exports = router;
