import { useEffect, useMemo, useState } from "react";
import confimexLogo from "@/assets/confimex-logo-contacto.png";

const WA_NUMBER = "525514193964";

type Vista = "inicio" | "ahora" | "despues";

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [vista, setVista] = useState<Vista>("inicio");
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cerrar = () => {
    setOpen(false);
    setVista("inicio");
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") cerrar();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const waAsesor = useMemo(() => {
    const texto = encodeURIComponent(
      "Hola, quiero hablar con un asesor de CONFIMÉX."
    );
    return `https://wa.me/${WA_NUMBER}?text=${texto}`;
  }, []);

  const waDatos = useMemo(() => {
    const lineas = [
      "Hola, quiero que un asesor de CONFIMÉX me contacte.",
      nombre ? `Nombre: ${nombre}` : "",
      empresa ? `Empresa: ${empresa}` : "",
      telefono ? `Teléfono / WhatsApp: ${telefono}` : "",
      mensaje ? `¿En qué pueden ayudarme?: ${mensaje}` : "",
    ].filter(Boolean);

    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lineas.join("\n"))}`;
  }, [nombre, empresa, telefono, mensaje]);

  const abrir = () => {
    setVista("inicio");
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={abrir}
        aria-label="Opciones de contacto por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition hover:scale-110 wa-pulse"
        style={{ backgroundColor: "#25D366" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confimex-contact-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) cerrar();
          }}
        >
          <div className="relative max-h-[92vh] w-full max-w-[590px] overflow-y-auto rounded-2xl bg-background p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={cerrar}
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border text-2xl leading-none text-foreground transition hover:bg-muted"
            >
              ×
            </button>

            {vista === "inicio" && (
              <>
                <div className="mb-4 flex items-center gap-3 pr-12">
                  <img src={confimexLogo} alt="CONFIMÉX" className="h-16 w-16 rounded-full object-cover shadow-sm sm:h-20 sm:w-20" />
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">Contacto CONFIMÉX</p>
                    <p className="mt-1 text-sm font-semibold text-muted-foreground">Asesoría y capacitación para la confección</p>
                  </div>
                </div>

                <h2 id="confimex-contact-title" className="text-3xl font-black leading-tight text-foreground sm:text-4xl">¿Cómo prefieres que te atendamos?</h2>
                <p className="mt-3 text-base leading-6 text-muted-foreground">Elige atención inmediata por WhatsApp o deja tus datos para que un asesor te contacte.</p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <button type="button" onClick={() => setVista("ahora")} className="rounded-xl bg-[#25D366] p-5 text-left text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <span className="text-xs font-extrabold uppercase tracking-wide text-white/90">Ahora</span>
                    <strong className="mt-2 block text-xl font-black">Hablar con un asesor</strong>
                    <span className="mt-2 block text-sm font-medium text-white/90">Iniciar conversación por WhatsApp.</span>
                  </button>

                  <button type="button" onClick={() => setVista("despues")} className="rounded-xl border-2 border-border bg-card p-5 text-left text-card-foreground transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md">
                    <span className="text-xs font-extrabold uppercase tracking-wide text-brand">Después</span>
                    <strong className="mt-2 block text-xl font-black">Quiero que me contacten</strong>
                    <span className="mt-2 block text-sm font-medium text-muted-foreground">Deja tus datos y te contactamos.</span>
                  </button>
                </div>
              </>
            )}

            {vista === "ahora" && (
              <>
                <button type="button" onClick={() => setVista("inicio")} className="mb-5 text-sm font-bold text-brand hover:underline">← Volver</button>
                <h2 id="confimex-contact-title" className="pr-12 text-3xl font-black leading-tight text-foreground">Hablar con un asesor</h2>
                <button
                  type="button"
                  onClick={() => {
                    window.open(waAsesor, "_blank", "noopener,noreferrer");
                    cerrar();
                  }}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[#25D366] px-5 py-4 text-center text-sm font-extrabold text-white shadow-sm transition hover:brightness-95"
                >
                  CONECTAR CON WHATSAPP
                </button>
              </>
            )}

            {vista === "despues" && (
              <>
                <button type="button" onClick={() => setVista("inicio")} className="mb-5 text-sm font-bold text-brand hover:underline">← Volver</button>
                <h2 id="confimex-contact-title" className="pr-12 text-3xl font-black leading-tight text-foreground">Déjanos tus datos</h2>
                <p className="mt-2 text-base text-muted-foreground">Un asesor de CONFIMÉX podrá darte seguimiento.</p>

                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre completo *" className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand" />
                  <input value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Empresa" className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand" />
                  <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono / WhatsApp *" className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand sm:col-span-2" />
                  <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="¿En qué podemos ayudarte?" rows={4} className="resize-y rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand sm:col-span-2" />
                </div>

                <a
                  href={nombre.trim() && telefono.trim() ? waDatos : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!nombre.trim() || !telefono.trim()) {
                      e.preventDefault();
                      return;
                    }
                    cerrar();
                  }}
                  aria-disabled={!nombre.trim() || !telefono.trim()}
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-lg px-5 py-4 text-center text-sm font-extrabold shadow-sm transition ${nombre.trim() && telefono.trim() ? "bg-navy text-navy-foreground hover:brightness-110" : "cursor-not-allowed bg-muted text-muted-foreground"}`}
                >
                  ENVIAR MIS DATOS POR WHATSAPP
                </a>
                {(!nombre.trim() || !telefono.trim()) && <p className="mt-2 text-center text-xs text-muted-foreground">Completa nombre y WhatsApp para continuar.</p>}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
