const express = require("express");
const router = express.Router();

// TODO:- Require routes

//? RFQ Quotes
const rfqQuotesRoutes = require("./rfq.routes");
router.use("/api/rfq-qutotes", rfqQuotesRoutes);

module.exports = router;
