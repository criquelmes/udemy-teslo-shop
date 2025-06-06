"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    await signIn("credentials", {
      ...Object.fromEntries(formData.entries()),
      redirect: false,
    });
    return "Login successful";
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return "CredentialsSignin";
    }
  }
  return "Invalid credentials";
}
