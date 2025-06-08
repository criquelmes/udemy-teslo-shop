"use server";

import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const registerUser = async (
  name: string,
  lastName: string,
  email: string,
  password: string
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        lastName: lastName,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
      },
    });

    return {
      ok: true,
      message: "User registered successfully.",
      user: user,
    };
  } catch (error) {
    console.error("Error during registration:", error);
    return {
      ok: false,
      message: "An error occurred while registering the user.",
    };
  }
};
