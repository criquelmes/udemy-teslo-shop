"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.error("Error setting user address:", error);
    return {
      ok: false,
      message: "Failed to set user address",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      userId,
      address: address.address,
      address2: address.address2,
      city: address.city,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }

    const addressUpdated = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    });

    return addressUpdated;
  } catch (error) {
    console.error("Error creating or replacing address:", error);
    throw new Error("Failed to create or replace address");
  }
};
