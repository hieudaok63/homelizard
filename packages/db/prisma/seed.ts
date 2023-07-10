import { PrismaClient } from "@prisma/client";

import { objectStyles } from "./data";

const prisma = new PrismaClient();
async function main() {
  await Promise.all(
    objectStyles.map(async (objectStyle) => {
      return await prisma.objectStyle.create({ data: objectStyle });
    }),
  );
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
