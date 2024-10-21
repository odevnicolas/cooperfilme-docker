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
      password: "c5ca737d594b381a4204a1df219433305a34b5761a5d7d7a0196be61d7b51384",
      salt: "cea7966df6fc298176a586dd586ce72d",
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
      password: "c5ca737d594b381a4204a1df219433305a34b5761a5d7d7a0196be61d7b51384",
      salt: "cea7966df6fc298176a586dd586ce72d",
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