import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Inserindo o usuário CLIENT
  await prisma.user.upsert({
    where: { email: "eurekaEscritor@eureka.com" },
    update: {},
    create: {
      name: "eurekaEscritor",
      email: "eurekaEscritor@eureka.com",
      password: "$2a$10$URvWfpoDZB3t2DjH9Jh1VeGTT0MxLmU21FuCpoKPZcSfamst1InIy",
      role: "CLIENT",
    },
  });

  // Inserindo o usuário ANALYST
  await prisma.user.upsert({
    where: { email: "eurekaAnalista@eureka.com" },
    update: {},
    create: {
      name: "eurekaAnalista",
      email: "eurekaAnalista@eureka.com",
      password: "$2a$10$URvWfpoDZB3t2DjH9Jh1VeGTT0MxLmU21FuCpoKPZcSfamst1InIy",
      role: "ANALYST",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
