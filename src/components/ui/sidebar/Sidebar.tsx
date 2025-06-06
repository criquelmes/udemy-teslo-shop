"use client";

import { useUIStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
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

        <Link
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          href="/"
        >
          <IoLogInOutline size={20} />
          <span className="ml-3 text-lg">Log in</span>
        </Link>

        <Link
          className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          href="/"
        >
          <IoLogOutOutline size={20} />
          <span className="ml-3 text-lg">Log out</span>
        </Link>

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
