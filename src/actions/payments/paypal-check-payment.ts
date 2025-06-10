"use server";

import { PayPalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { ca } from "zod/v4/locales";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPaypalBearerToken();
  console.log("authToken", authToken);

  if (!authToken) {
    return {
      ok: false,
      message: "Failed to obtain PayPal authentication token",
    };
  }

  const response = await verifyPayPalPayment(paypalTransactionId, authToken);

  if (!response) {
    return {
      ok: false,
      message: "Failed to verify PayPal payment",
    };
  }

  const { status, purchase_units } = response;

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: `Payment not completed, current status: ${status}`,
    };
  }

  try {
    await prisma.order.update({
      where: { id: "837dd2d3-7eee-4b9f-a0f0-10c4d048299e" },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    // TODO: Revalidar path
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error updating payment status in database",
    };
  }
};
const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const oauth2 = process.env.PAYPAL_OAUTH_URL || "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());
    return result.access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const result = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
