"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const result = await signIn("credentials", {
      ...Object.fromEntries(formData.entries()),
      redirect: false,
    });

    console.log("SignIn result:", result); // Para debug

    // Verificar si el login fue exitoso
    if (result && !result.error) {
      return "Login successful";
    }

    // Si hay error en el resultado
    if (result?.error) {
      console.log("Login error:", result.error);
      return "CredentialsSignin";
    }
  } catch (error) {
    console.log("Caught error:", error);

    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return "CredentialsSignin";
    }
  }

  return "Invalid credentials";
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return "Login successful";
  } catch (error) {
    console.error("Login error:", error);
    return {
      ok: false,
      message: "Unable to log in",
    };
  }
};
