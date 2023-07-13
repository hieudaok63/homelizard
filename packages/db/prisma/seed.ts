import { PrismaClient, SearchProfile, User } from "@prisma/client";

import {
  objectStyles,
  realEstateObjectsData,
  searchProfilesData,
  usersData,
} from "./data";

const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.create({
    data: usersData[0] as User,
  });
  const customer = await prisma.customer.create({
    data: {
      users: { connect: { id: user.id } },
    },
  });
  for (let i = 0; i < 3; i++) {
    const searchProfileCreate = searchProfilesData[i] as SearchProfile;
    const searchProfile = await prisma.searchProfile.create({
      data: {
        ...searchProfileCreate,
        customer: { connect: { id: customer.id } },
        objectStyles: {
          create: objectStyles.slice(i, i + 2).map((objectStyle) => ({
            title: objectStyle.title,
          })),
        },
      } as SearchProfile,
    });
    const searchResult = await prisma.searchResult.create({
      data: {
        searchProfile: { connect: { id: searchProfile.id } },
        realEstate: { create: realEstateObjectsData[i] },
      },
    });

    await prisma.favorite.create({
      data: {
        searchResult: { connect: { id: searchResult.id } },
        user: { connect: { id: user.id } },
      },
    });
  }
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
