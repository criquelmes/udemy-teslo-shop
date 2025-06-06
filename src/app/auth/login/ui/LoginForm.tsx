"use client";

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const [state, dispatch] = useActionState(authenticate, undefined);
  const router = useRouter();
  const { update } = useSession();
  const hasRedirected = useRef(false); // Evita múltiples redirecciones

  useEffect(() => {
    if (state === "Login successful" && !hasRedirected.current) {
      hasRedirected.current = true;

      const handleLoginSuccess = async () => {
        try {
          // Fuerza actualización de la sesión
          await update();

          // Dispara evento para actualizar Sidebar
          window.dispatchEvent(new CustomEvent("auth-changed"));

          // Redirigir
          router.replace("/");
          router.refresh();
        } catch (error) {
          console.error("Error updating session:", error);
          // Fallback: recarga completa
          window.location.href = "/";
        }
      };

      handleLoginSuccess();
    }
  }, [state, router, update]);

  console.log({ state });

  return (
    <>
      <form action={dispatch} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          name="email"
          disabled={state === "Login successful"} // Deshabilita durante login exitoso
        />

        <label htmlFor="password">Password</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          name="password"
          disabled={state === "Login successful"} // Deshabilita durante login exitoso
        />

        <LoginButton loginState={state} />

        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {(state === "Invalid credentials" ||
            state === "CredentialsSignin") && (
            <div className="flex flex-row mt-2">
              <IoInformationOutline className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">
                {state === "CredentialsSignin"
                  ? "Invalid email or password"
                  : state}
              </p>
            </div>
          )}

          {state === "Login successful" && (
            <div className="flex flex-row mt-2">
              <p className="text-sm text-green-500">
                Login successful! Redirecting...
              </p>
            </div>
          )}
        </div>

        {/* divisor line */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-300"></div>
          <div className="px-2 text-gray-800">Or</div>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <Link href="/auth/new-account" className="btn-secondary text-center">
          Create new account
        </Link>
      </form>
    </>
  );
};

function LoginButton({ loginState }: { loginState: string | undefined }) {
  const { pending } = useFormStatus();
  const isLoginSuccessful = loginState === "Login successful";

  return (
    <button
      className={clsx({
        "btn-primary": !pending && !isLoginSuccessful,
        "btn-disabled": pending || isLoginSuccessful,
      })}
      type="submit"
      disabled={pending || isLoginSuccessful}
    >
      {isLoginSuccessful ? "Signing in..." : pending ? "Loading..." : "Next"}
    </button>
  );
}
