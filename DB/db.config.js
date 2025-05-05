const { PrismaClient } = require('@prisma/client');  // Destructure to get PrismaClient

const prisma = new PrismaClient({
  // log: ['query'],  // Logs queries
});

module.exports = prisma;
