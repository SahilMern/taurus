const e = require("express");
const prisma = require("../DB/db.config");
const { validateFields, sendErrorResponse } = require("../utils/errorHandler");

//? RFQ Quotes Initiation
const initiate = async (req, res) => {
  const {
    investorId,
    errorcode,
    quotetype,
    bidrfqordernumber,
    offerrfqordernumber,
    otmoto,
    otoparticipant,
    isinnumber,
    bidvalue,
    offervalue,
    bidminvalue,
    offerminvalue,
    bidyield,
    offeryield,
    bidprice,
    offerprice,
    bidquantity,
    offerquantity,
    directbrokered,
    initiatorbrokercode,
    proclient,
    settlementdate,
    orderstatus,
    dealtime,
    initiatorreferencenumber,
    rfqdealid,
    initiatorcomment,
    obpplatform,
    message,
  } = req.body;

  console.log(req.body.investorId, typeof req.body.investorId);
  
  const fieldErrors = validateFields(req.body, [
    "investorId",
    "errorcode",
    "quotetype",
    "bidrfqordernumber",
    "offerrfqordernumber",
    "otmoto",
    "otoparticipant",
    "isinnumber",
    "bidvalue",
    "offervalue",
    "bidminvalue",
    "offerminvalue",
    "bidyield",
    "offeryield",
    "bidprice",
    "offerprice",
    "bidquantity",
    "offerquantity",
    "directbrokered",
    "initiatorbrokercode",
    "proclient",
    "settlementdate",
    "orderstatus",
    "dealtime",
    "initiatorreferencenumber",
    "rfqdealid",
    "initiatorcomment",
    "obpplatform",
    "message",
  ]);

  if (fieldErrors.length > 0) {
    return sendErrorResponse(res, 400, "Validation failed", fieldErrors);
  }

  //Get the user by email
  const user = await prisma.rfqQuotesInitiate.findUnique({
    where: { investorId },
  });
  console.log(user, "user");

  if (user) {
    return res.status(404).json({ error: "User Alredy Exists" });
  }

  try {
    const newUser = await prisma.rfqQuotesInitiate.create({
      data: {
        investorId,
        errorcode,
        quotetype,
        bidrfqordernumber,
        offerrfqordernumber,
        otmoto,
        otoparticipant,
        isinnumber,
        bidvalue,
        offervalue,
        bidminvalue,
        offerminvalue,
        bidyield,
        offeryield,
        bidprice,
        offerprice,
        bidquantity,
        offerquantity,
        directbrokered,
        initiatorbrokercode,
        proclient,
        settlementdate: new Date(settlementdate),
        orderstatus,
        dealtime: new Date(dealtime),
        initiatorreferencenumber,
        rfqdealid,
        initiatorcomment,
        obpplatform,
        message,
      },
    });

    return res.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    // console.error("Prisma Error:", error);
    return res.status(500).json({ errors: "Something went wrong", error });
  }
};

//? Get All  Initiated RFQ Quotes
const getinitiatedata = async (req, res) => {
  try {
    const getAllrfqquotes = await prisma.rfqQuotesInitiate.findMany();
    return res
      .status(200)
      .json({ message: "All rfqquotes data", getAllrfqquotes });
  } catch (error) {
    console.log(error);
  }
};

//? Accept RFQ Quotes
const accpet = async (req, res) => {
  try {
    const fieldErrors = validateFields(req.body, [
      "investorId",
      "errorcode",
      "message",
      "quotetype",
      "otmoto",
      "rfqordernumber",
      "isinnumber",
      "value",
      "yield",
      "price",
      "accruedinterest",
      "consideration",
      "orderstatus",
      "dealtime",
      "responderreferencenumber",
      "buyerclientcode",
      "sellerclientcode",
      "directbrokered",
      "responderbrokercode",
      "rfqdealid",
      "obpplatform",
    ]);
    if (fieldErrors.length > 0) {
      return sendErrorResponse(res, 400, "Validation failed", fieldErrors);
    }

    const {
      investorId,
      errorcode,
      message,
      quotetype,
      otmoto,
      rfqordernumber,
      isinnumber,
      value,
      yield: yieldValue,
      price,
      accruedinterest,
      consideration,
      orderstatus,
      dealtime,
      responderreferencenumber,
      buyerclientcode,
      sellerclientcode,
      directbrokered,
      responderbrokercode,
      rfqdealid,
      obpplatform,
    } = req.body;

    // Check if rfqdealid already exists
    const existing = await prisma.rfqQuotesAccept.findUnique({
      where: { investorId },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "investor ID already exists",
      });
    }

    const newQuote = await prisma.rfqQuotesAccept.create({
      data: {
        investorId,
        errorcode: Number(errorcode),
        message,
        quotetype,
        otmoto,
        rfqordernumber,
        isinnumber,
        value,
        yield: yieldValue,
        price,
        accruedinterest,
        consideration,
        orderstatus,
        dealtime: new Date(dealtime),
        responderreferencenumber,
        buyerclientcode,
        sellerclientcode,
        directbrokered,
        responderbrokercode,
        rfqdealid,
        obpplatform,
      },
    });

    return res.status(201).json({
      success: true,
      message: "RFQ Quote Accepted Successfully",
      data: newQuote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//? RFQ Quotes DEAL PURPOSE
const dealPropose = async (req, res) => {
  try {
    const fieldErrors = validateFields(req.body, [
      "investorId",
      "errorcode",
      "message",
      "rfqordernumber",
      "icdmordernumber",
      "isinnumber",
      "value",
      "yield",
      "price",
      "modifiedaccruedinterest",
      "consideration",
      "orderstatus",
      "dealtime",
      "rfqdealid",
      "freeze",
      "settlementdate",
      "sellerclientcode",
      "buyerclientcode",
      "quantity",
      "directbrokered",
      "brokercode",
    ]);
    if (fieldErrors.length > 0) {
      return sendErrorResponse(res, 400, "Validation failed", fieldErrors);
    }

    const {
      investorId,
      errorcode,
      message,
      rfqordernumber,
      icdmordernumber,
      isinnumber,
      value,
      yield: yieldValue,
      price,
      modifiedaccruedinterest,
      consideration,
      orderstatus,
      dealtime,
      rfqdealid,
      freeze,
      settlementdate,
      sellerclientcode,
      buyerclientcode,
      quantity,
      directbrokered,
      brokercode,
    } = req.body;

    const existing = await prisma.rfqQuoteDealPropose.findUnique({
      where: { investorId },
    });

    // console.log(existing, "existing", rfqdealid);
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "RFQ Deal ID already exists",
      });
    }

    const quote = await prisma.rfqQuoteDealPropose.create({
      data: {
        investorId,
        errorcode,
        message,
        rfqordernumber,
        icdmordernumber,
        isinnumber,
        value,
        yield: yieldValue,
        price,
        modifiedaccruedinterest,
        consideration,
        orderstatus,
        dealtime: new Date(dealtime),
        rfqdealid,
        freeze,
        settlementdate: new Date(settlementdate),
        sellerclientcode,
        buyerclientcode,
        quantity,
        directbrokered,
        brokercode,
      },
    });

    return res.status(201).json({
      success: true,
      message: "RFQ Quote Updated Successfully",
      data: quote,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//? RFQ Quotes DEAL Approve
const dealApprove = async (req, res) => {
  const fieldErrors = validateFields(req.body, [
    "investorId",
    "errorcode",
    "message",
    "icdmordernumber",
    "rfqdealid",
    "product",
    "isinnumber",
    "coupon",
    "maturity_call_putdate",
    "value",
    "price",
    "quantity",
    "yieldtype",
    "yield",
    "modaccruedint",
    "consideration",
    "buyerclientcode",
    "sellerclientcode",
    "directbrokered",
    "brokercode",
    "freeze",
    "dealtime",
  ]);
  if (fieldErrors.length > 0) {
    return sendErrorResponse(res, 400, "Validation failed", fieldErrors);
  }

  try {
    const {
      investorId,
      errorcode,
      message,
      icdmordernumber,
      rfqdealid,
      product,
      isinnumber,
      coupon,
      maturity_call_putdate,
      value,
      price,
      quantity,
      yieldtype,
      yield: yieldValue,
      modaccruedint,
      consideration,
      buyerclientcode,
      sellerclientcode,
      directbrokered,
      brokercode,
      freeze,
      dealtime,
    } = req.body;

    const existing = await prisma.rfqQuoteDealApprove.findUnique({
      where: { investorId },
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "RFQ Deal ID already approved",
      });
    }

    const created = await prisma.rfqQuoteDealApprove.create({
      data: {
        investorId,
        errorcode,
        message,
        icdmordernumber,
        rfqdealid,
        product,
        isinnumber,
        coupon,
        maturity_call_putdate: new Date(maturity_call_putdate),
        value,
        price,
        quantity,
        yieldtype,
        yield: yieldValue,
        modaccruedint,
        consideration,
        buyerclientcode,
        sellerclientcode,
        directbrokered,
        brokercode,
        freeze,
        dealtime: new Date(dealtime),
      },
    });

    res.status(201).json({
      success: true,
      message: "Deal Approved Successfully",
      data: created,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  initiate,
  getinitiatedata,
  accpet,
  dealPropose,
  dealApprove,
};
