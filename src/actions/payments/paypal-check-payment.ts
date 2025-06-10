"use server";

import {
  PayPalOrderStatusResponse,
  PayPalOrderstatusResponse,
} from "@/interfaces";

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

    // TODO: realizar la actualizacion en nuestra base de datos
  // const {  } = purchase_unit[0];
  console.log({ status, purchase_units });
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
    const result = await fetch(oauth2, requestOptions).then((r) => r.json());
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
    const result = await fetch(paypalOrderUrl, requestOptions).then((r) =>
      r.json()
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
