"use client";

import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);
  const router = useRouter();

  const { data: session, status } = useSession();
  const isAuthenticated = !!session?.user;

  const handleLogout = async () => {
    try {
      // Usa signOut directamente de NextAuth para mejor manejo del estado
      await signOut({
        redirect: false,
        callbackUrl: "/",
      });
      closeMenu();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error during logout:", error);
      // Fallback: usar tu action personalizada
      try {
        await logout();
        closeMenu();
        window.location.href = "/";
      } catch (fallbackError) {
        console.error("Fallback logout error:", fallbackError);
      }
    }
  };

  const handleLogin = () => {
    closeMenu();
    router.push("/auth/login");
  };

  // Mostrar loading state mientras se verifica la sesión
  if (status === "loading") {
    return (
      <div>
        {/* Black Background */}
        {isSideMenuOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
        )}

        {/* Blur */}
        {isSideMenuOpen && (
          <div
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-xs"
            onClick={closeMenu}
          />
        )}

        <nav
          className={clsx(
            "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !isSideMenuOpen,
            }
          )}
        >
          <IoCloseOutline
            size={30}
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => closeMenu()}
          />
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Loading...</div>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div>
      {/* Black Background */}
      {isSideMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-xs"
          onClick={closeMenu}
        />
      )}

      {/* Sidemenu */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
          }
        )}
        //TODO efecto de slide-in y slide-out
      >
        <IoCloseOutline
          size={30}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeMenu()}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline
            size={20}
            className="absolute top-2 left-2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}
        <Link
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          href="/profile"
          onClick={() => closeMenu()}
        >
          <IoPersonOutline size={20} />
          <span className="ml-3 text-lg">Perfil</span>
        </Link>

        <Link
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          href="/"
        >
          <IoTicketOutline size={20} />
          <span className="ml-3 text-lg">Orders</span>
        </Link>

        {/* Mostrar logout solo si está autenticado */}
        {isAuthenticated && (
          <button
            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={handleLogout}
          >
            <IoLogOutOutline size={20} />
            <span className="ml-3 text-lg">Log out</span>
          </button>
        )}

        {/* Mostrar login solo si NO está autenticado */}
        {!isAuthenticated && (
          <button
            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
            onClick={handleLogin}
          >
            <IoLogInOutline size={20} />
            <span className="ml-3 text-lg">Log in</span>
          </button>
        )}

        {/* Separator */}
        <div className="w-full h-px bg-gray-200 my-10" />

        <Link
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          href="/"
        >
          <IoShirtOutline size={20} />
          <span className="ml-3 text-lg">Products</span>
        </Link>

        <Link
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          href="/"
        >
          <IoTicketOutline size={20} />
          <span className="ml-3 text-lg">Orders</span>
        </Link>

        <Link
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          href="/"
        >
          <IoPeopleOutline size={20} />
          <span className="ml-3 text-lg">Users</span>
        </Link>
      </nav>
    </div>
  );
};
