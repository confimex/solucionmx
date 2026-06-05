import heroImg from "@/assets/hero-confimex.jpg";

type HeroProps = {
  onOpenDiagnostico?: () => void;
};

export default function HeroSection({ onOpenDiagnostico }: HeroProps) {
  
  const handleButtonClick = () => {
    if (typeof onOpenDiagnostico === "function") {
      onOpenDiagnostico();
    }
    // Lanza la orden global para abrir el modal del CTA
    window.dispatchEvent(new CustomEvent("open-diagnostic"));
  };

  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Máquina de corte digital para confección"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-brand/20 px-4 py-1.5 text-sm font-semibold text-brand">
          </span>

          <h1 className="mt-6 text-4xl font-extrabold text-navy-foreground sm:text-5xl lg:text-6xl">
            Mejora tu planta de confección
          </h1>

          <p className="mt-6 text-lg text-brand sm:text-xl">
            Te mostramos exactamente dónde tu planta está perdiendo tiempo, material y dinero…
          </p>

          <div className="mt-10">
            <div className="flex flex-col gap-4 sm:flex-row">

              <button
                type="button"
                onClick={handleButtonClick}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-8 py-4 text-lg font-bold text-brand-foreground shadow-lg transition hover:brightness-110 hover:scale-105"
              >
                Iniciar diagnóstico GRATIS
              </button>

              <a
                href="#beneficios"
                className="inline-flex items-center justify-center rounded-xl border-2 border-navy-foreground/30 px-8 py-4 text-lg font-semibold text-navy-foreground"
              >
                Conocer más ↓
              </a>

            </div>

            <p className="mt-4 text-sm text-navy-foreground/70">
              Sin compromiso, te comprobamos 3 acciones donde tienes fuga de dinero.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

