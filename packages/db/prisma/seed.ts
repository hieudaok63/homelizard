import clerk from "@clerk/clerk-sdk-node";
import { PrismaClient } from "@prisma/client";
import promptSync from "prompt-sync";

import { realEstateObjectsData, searchProfilesData, userData } from "./data";

const prompt = promptSync();
const prisma = new PrismaClient();
async function main() {
  const clerkUser = await getClerkUser(process.env.DEVELOPER_EMAIL);

  console.log("Seeding users...");
  const user = await prisma.user.create({
    data: clerkUser,
  });

  console.log("Seeding customers...");
  const customer = await prisma.customer.create({
    data: {
      users: { connect: { id: user.id } },
    },
  });

  console.log("Seeding searchProfiles, results & favorites...");
  for (let i = 0; i < 3; i++) {
    const searchProfileCreate = searchProfilesData[i];
    const searchProfile = await prisma.searchProfile.create({
      data: {
        ...searchProfileCreate,
        customer: { connect: { id: customer.id } },
      },
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

async function getClerkUser(email: string | undefined) {
  if (!email) {
    console.log(
      "No developer email provided. Set the DEVELOPER_EMAIL variable in .env file",
    );
    return;
  }

  const clerkUsers = await clerk.users.getUserList({
    emailAddress: [email],
  });
  if (clerkUsers.length === 0) {
    console.log(
      `No user with the email ${email} found. Please create a user with this email first.`,
    );
    const password = prompt.hide("Enter password: ");
    if (!password) {
      throw new Error("No password provided.");
    }
    // register new clerkUser
    const newUser = await clerk.users.createUser({
      emailAddress: [email],
      password: password,
    });
    return {
      ...userData,
      externalId: newUser.id,
      email,
    };
  }
  return {
    ...userData,
    externalId: clerkUsers[0].id,
    email,
  };
}
