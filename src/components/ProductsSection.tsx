import { useState } from "react";
import digipatronImage from "@/assets/digipatron-confimex.png";
import digipatronVideo from "@/assets/digipatron-confimex.mp4";
import seprodImage from "@/assets/seprod-confimex.png";
import seprodVideo from "@/assets/seprod-confimex.mp4";

const products = [
  { name: "DigiPatrón CONFIMÉX", phrase: "De la fotografía al trazo.", image: digipatronImage, video: digipatronVideo },
  { name: "SEPROD CONFIMÉX", phrase: "Seguimiento puntual de tu producción en tu mano.", image: seprodImage, video: seprodVideo },
];

export default function ProductsSection() {
  const [active, setActive] = useState<(typeof products)[number] | null>(null);
  return <section id="productos" className="bg-background py-16">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mb-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">Tecnología CONFIMÉX</p>
        <h2 className="mt-2 text-3xl font-bold md:text-4xl">Productos CONFIMÉX</h2>
      </div>
      <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-2">
        {products.map((p) => <article key={p.name} className="mx-auto flex w-full max-w-[352px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-lg hover:border-brand/40 hover:-translate-y-1">
          <div className="h-44 overflow-hidden bg-muted"><img src={p.image} alt={p.name} className="h-full w-full object-cover object-top" /></div>
          <div className="flex flex-1 flex-col p-8 text-center"><h3 className="text-lg font-bold text-card-foreground">{p.name}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.phrase}</p>
            <button
              type="button"
              onClick={() => setActive(p)}
              className="mt-auto pt-4 self-start"
            >
              <span className="inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm transition hover:brightness-110">
                Ver video
              </span>
            </button>
          </div>
        </article>)}
      </div>
    </div>
    {active && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={() => setActive(null)}>
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <video key={active.video} autoPlay controls className="max-h-[82vh] w-full rounded-xl bg-black shadow-2xl"><source src={active.video} type="video/mp4" /></video>
        <button type="button" onClick={() => setActive(null)} className="mx-auto mt-3 inline-flex items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground shadow-sm transition hover:brightness-110">Cerrar y volver</button>
      </div>
    </div>}
  </section>;
}
