"use client";

import { Menu } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";

export const Header = () => {
  const [isSidemenuOpen, setSidemenuOpen] = useState(false);

  return (
    <header className="h-[80px] bg-blue-900 text-white px-4 text-center flex justify-between items-center">
      <Sidemenu
        isOpen={isSidemenuOpen}
        closeMenu={() => setSidemenuOpen(false)}
      />

      <Menu
        className="hover:bg-blue-900 rounded-lg transition-all cursor-pointer p-1"
        size={60}
        onClick={() => setSidemenuOpen(!isSidemenuOpen)}
      />
      <h1 className="text-header-title">Arena Control</h1>
    </header>
  );
};

interface SidemenuProps {
  isOpen: boolean;
  closeMenu?: () => void;
}

const Sidemenu = ({ isOpen, closeMenu }: SidemenuProps) => {
  return (

    <section
      className={`transition-all absolute w-full z-10 h-screen top-0 ${
        isOpen ? "left-0" : "left-[-100%]"
      }`}
      onClick={() => closeMenu && closeMenu()}
    >

      <div className="z-50 w-3/4 bg-zinc-950 h-screen p-4"
            onClick={(ev) => ev.stopPropagation()}
      >
        <ul>
          <li className="text-sidemenu-item h-[80px] items-center text-center flex justify-center font-bold">
            Menú
          </li>

          <li className="text-sidemenu-item h-[80px] items-center text-center flex justify-center bg-zinc-900 rounded-md mb-4"
          onClick={() => closeMenu && closeMenu()}
          >
            <Link href="/attendances/register">Registrar asistencias</Link>
          </li>

          <li className="text-sidemenu-item h-[80px] items-center text-center flex justify-center bg-zinc-900 rounded-md"
          onClick={() => closeMenu && closeMenu()}
          >
            <Link href="/tickets/register">Registrar venta de entradas</Link>
          </li>
        </ul>
      </div>

    </section>
  );
};
