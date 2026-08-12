import logo from "@/assets/logo_confimex.png";

export default function FooterSection() {
  return (
    <footer className="border-t border-border bg-navy py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <img src={logo} alt="CONFIMÉX" className="h-32" />

            <p className="mt-1 text-sm text-navy-foreground/50">
              Consultoría y capacitación para la industria de la confección · México
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-navy-foreground/50">
            <a
              href="mailto:ventas@confimex.mx"
              className="transition hover:text-brand"
            >
              Correo
            </a>

            <a
              href="https://wa.me/525514193964"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-brand"
            >
              WhatsApp
            </a>

            <a
              href="https://www.facebook.com/confimex.mexico"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-brand"
            >
              Facebook
            </a>

            <a
              href="https://www.instagram.com/confimex.mexico/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-brand"
            >
              Instagram
            </a>

            <a
              href="https://x.com/Confimex"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-brand"
            >
              X
            </a>

            <a
              href="https://www.tiktok.com/@confimex"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-brand"
            >
              TikTok
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-navy-foreground/30">
          © {new Date().getFullYear()} CONFIMÉX. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}