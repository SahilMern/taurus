-- CreateTable
CREATE TABLE "RfqQuotesInitiate" (
    "id" SERIAL NOT NULL,
    "investorId" INTEGER NOT NULL,
    "errorcode" INTEGER NOT NULL,
    "message" TEXT,
    "quotetype" VARCHAR(100) NOT NULL,
    "bidrfqordernumber" TEXT NOT NULL,
    "offerrfqordernumber" TEXT NOT NULL,
    "otmoto" TEXT NOT NULL,
    "otoparticipant" TEXT NOT NULL,
    "isinnumber" TEXT NOT NULL,
    "bidvalue" DECIMAL(65,30) NOT NULL,
    "offervalue" DECIMAL(65,30) NOT NULL,
    "bidminvalue" DECIMAL(65,30) NOT NULL,
    "offerminvalue" DECIMAL(65,30) NOT NULL,
    "bidyield" DECIMAL(65,30) NOT NULL,
    "offeryield" DECIMAL(65,30) NOT NULL,
    "bidprice" DECIMAL(65,30) NOT NULL,
    "offerprice" DECIMAL(65,30) NOT NULL,
    "bidquantity" INTEGER NOT NULL,
    "offerquantity" INTEGER NOT NULL,
    "directbrokered" TEXT NOT NULL,
    "initiatorbrokercode" TEXT NOT NULL,
    "proclient" TEXT NOT NULL,
    "settlementdate" DATE NOT NULL,
    "orderstatus" TEXT NOT NULL,
    "dealtime" TIMESTAMP(3) NOT NULL,
    "initiatorreferencenumber" TEXT NOT NULL,
    "rfqdealid" TEXT NOT NULL,
    "initiatorcomment" TEXT NOT NULL,
    "obpplatform" TEXT NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RfqQuotesInitiate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RfqQuotesAccept" (
    "id" SERIAL NOT NULL,
    "investorId" TEXT NOT NULL,
    "errorcode" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "quotetype" TEXT NOT NULL,
    "otmoto" TEXT NOT NULL,
    "rfqordernumber" TEXT NOT NULL,
    "isinnumber" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "yield" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "accruedinterest" DECIMAL(65,30) NOT NULL,
    "consideration" DECIMAL(65,30) NOT NULL,
    "orderstatus" TEXT NOT NULL,
    "dealtime" TIMESTAMP(3) NOT NULL,
    "responderreferencenumber" TEXT NOT NULL,
    "buyerclientcode" TEXT NOT NULL,
    "sellerclientcode" TEXT NOT NULL,
    "directbrokered" TEXT NOT NULL,
    "responderbrokercode" TEXT NOT NULL,
    "rfqdealid" TEXT NOT NULL,
    "obpplatform" TEXT NOT NULL,

    CONSTRAINT "RfqQuotesAccept_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RfqQuoteDealPropose" (
    "id" SERIAL NOT NULL,
    "investorId" TEXT NOT NULL,
    "errorcode" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "rfqordernumber" TEXT NOT NULL,
    "icdmordernumber" TEXT NOT NULL,
    "isinnumber" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "yield" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "modifiedaccruedinterest" DECIMAL(65,30) NOT NULL,
    "consideration" DECIMAL(65,30) NOT NULL,
    "orderstatus" TEXT NOT NULL,
    "dealtime" TIMESTAMP(3) NOT NULL,
    "rfqdealid" TEXT NOT NULL,
    "freeze" TEXT NOT NULL,
    "settlementdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sellerclientcode" TEXT NOT NULL,
    "buyerclientcode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "directbrokered" TEXT NOT NULL,
    "brokercode" TEXT NOT NULL,

    CONSTRAINT "RfqQuoteDealPropose_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RfqQuoteDealApprove" (
    "id" SERIAL NOT NULL,
    "investorId" TEXT NOT NULL,
    "errorcode" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "icdmordernumber" TEXT NOT NULL,
    "rfqdealid" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "isinnumber" TEXT NOT NULL,
    "coupon" DECIMAL(65,30) NOT NULL,
    "maturity_call_putdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "yieldtype" TEXT NOT NULL,
    "yield" DECIMAL(65,30) NOT NULL,
    "modaccruedint" DECIMAL(65,30) NOT NULL,
    "consideration" DECIMAL(65,30) NOT NULL,
    "buyerclientcode" TEXT NOT NULL,
    "sellerclientcode" TEXT NOT NULL,
    "directbrokered" TEXT NOT NULL,
    "brokercode" TEXT NOT NULL,
    "freeze" TEXT NOT NULL,
    "dealtime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RfqQuoteDealApprove_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RfqQuotesInitiate_investorId_key" ON "RfqQuotesInitiate"("investorId");

-- CreateIndex
CREATE UNIQUE INDEX "RfqQuotesAccept_investorId_key" ON "RfqQuotesAccept"("investorId");

-- CreateIndex
CREATE UNIQUE INDEX "RfqQuoteDealPropose_investorId_key" ON "RfqQuoteDealPropose"("investorId");

-- CreateIndex
CREATE UNIQUE INDEX "RfqQuoteDealApprove_investorId_key" ON "RfqQuoteDealApprove"("investorId");
