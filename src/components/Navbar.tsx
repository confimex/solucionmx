import { useState } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo_confimex.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-40 w-full border-b border-navy-foreground/10 bg-navy/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/">
          <img src={logo} alt="CONFIMÉX" className="h-20 md:h-24" />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-5 lg:gap-7 md:flex">

          <Link
            to="/"
            className="text-sm font-medium text-navy-foreground/70 transition hover:text-brand"
            activeProps={{ className: "text-sm font-medium text-brand" }}
          >
            Inicio
          </Link>

          <Link
            to="/servicios"
            className="text-sm font-medium text-navy-foreground/70 transition hover:text-brand"
            activeProps={{ className: "text-sm font-medium text-brand" }}
          >
            Servicios
          </Link>

          <Link
            to="/digipatron"
            className="text-sm font-medium text-navy-foreground/70 transition hover:text-brand"
            activeProps={{ className: "text-sm font-medium text-brand" }}
          >
            DigiPatrón
          </Link>

          <Link
            to="/seprod"
            className="text-sm font-medium text-navy-foreground/70 transition hover:text-brand"
            activeProps={{ className: "text-sm font-medium text-brand" }}
          >
            SEPROD
          </Link>

          <Link
            to="/red_confimex"
            className="text-sm font-medium text-navy-foreground/70 transition hover:text-brand"
            activeProps={{ className: "text-sm font-medium text-brand" }}
          >
            Directorio
          </Link>

          <Link
            to="/quienes-somos"
            className="text-sm font-medium text-navy-foreground/70 transition hover:text-brand"
            activeProps={{ className: "text-sm font-medium text-brand" }}
          >
            Quiénes somos
          </Link>

          <Link
            to="/testimonios"
            className="text-sm font-medium text-navy-foreground/70 transition hover:text-brand"
            activeProps={{ className: "text-sm font-medium text-brand" }}
          >
            Testimonios
          </Link>

          </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-navy-foreground"
          aria-label="Menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-navy-foreground/10 bg-navy px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">

            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="text-navy-foreground/70 hover:text-brand"
            >
              Inicio
            </Link>

            <Link
              to="/servicios"
              onClick={() => setOpen(false)}
              className="text-navy-foreground/70 hover:text-brand"
            >
              Servicios
            </Link>

            <Link
              to="/digipatron"
              onClick={() => setOpen(false)}
              className="text-navy-foreground/70 hover:text-brand"
            >
              DigiPatrón
            </Link>

            <Link
              to="/seprod"
              onClick={() => setOpen(false)}
              className="text-navy-foreground/70 hover:text-brand"
            >
              SEPROD
            </Link>

            <Link
              to="/quienes-somos"
              onClick={() => setOpen(false)}
              className="text-navy-foreground/70 hover:text-brand"
            >
              Quiénes somos
            </Link>

            <Link
              to="/testimonios"
              onClick={() => setOpen(false)}
              className="text-navy-foreground/70 hover:text-brand"
            >
              Testimonios
            </Link>

            <Link
              to="/red_confimex"
              onClick={() => setOpen(false)}
              className="text-navy-foreground/70 hover:text-brand"
            >
              Directorio
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}