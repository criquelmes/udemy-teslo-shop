"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId },
    });

    if (!address) {
      console.warn(`No address found for user with ID: ${userId}`);
      return null;
    }
    const { countryId, address2, ...rest } = address;
    return {
      ...rest,
      address2: address2 || "",
      country: countryId,
    };
  } catch (error) {
    console.error("Error fetching user address:", error);
    return null;
  }
};
