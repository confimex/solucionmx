import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

/* ---------------- TYPES ---------------- */
type Option = { label: string; level: 1 | 2 | 3 };
type Question = { q: string; options: Option[] };

/* ---------------- QUESTIONS ---------------- */
const questions: Question[] = [
  {
    q: "1. En tu proceso de corte… ¿Cómo decides la distribución de los patrones?",
    options: [
      { label: "Acomodamos manualmente sobre la tela", level: 1 },
      { label: "Ya tenemos experiencia, pero no usamos sistema", level: 2 },
      { label: "Usamos software de trazo automático", level: 3 },
    ],
  },
  {
    q: "2. ¿Sabes exactamente cuánto desperdicio de tela tienes por corte?",
    options: [
      { label: "No lo medimos", level: 1 },
      { label: "Lo estimamos", level: 2 },
      { label: "Sí lo tenemos controlado", level: 3 },
    ],
  },
  {
    q: "3. Cuando necesitas responder a un pedido urgente…",
    options: [
      { label: "Nos tardamos en organizar producción", level: 1 },
      { label: "Dependemos del personal", level: 2 },
      { label: "Respondemos rápido sin problema", level: 3 },
    ],
  },
  {
    q: "4. ¿Qué tan seguido repites errores en producción?",
    options: [
      { label: "Frecuentemente", level: 1 },
      { label: "A veces", level: 2 },
      { label: "Casi nunca", level: 3 },
    ],
  },
  {
    q: "5. ¿Tus patrones están digitalizados?",
    options: [
      { label: "No, todo es en cartón", level: 1 },
      { label: "Algunos", level: 2 },
      { label: "Sí, completamente", level: 3 },
    ],
  },
  {
    q: "6. ¿Tienes control real del consumo de tela por modelo?",
    options: [
      { label: "No", level: 1 },
      { label: "Parcial", level: 2 },
      { label: "Sí", level: 3 },
    ],
  },
  {
    q: "7. Si hoy tu producción aumentara 30%…",
    options: [
      { label: "No podríamos manejarlo", level: 1 },
      { label: "Nos costaría trabajo", level: 2 },
      { label: "Estamos listos", level: 3 },
    ],
  },
  {
    q: "8. ¿Te gustaría saber exactamente cuánto dinero estás perdiendo hoy en tu proceso?",
    options: [
      { label: "Sí, me interesa", level: 1 },
      { label: "Tal vez", level: 2 },
      { label: "No", level: 3 },
    ],
  },
];

/* ---------------- RESULT ---------------- */
function getResult(answers: (1 | 2 | 3)[]) {
  const counts = { 1: 0, 2: 0, 3: 0 } as Record<1 | 2 | 3, number>;

  answers.forEach((a) => counts[a]++);

  const max = Math.max(counts[1], counts[2], counts[3]);

  if (counts[1] === max) {
    return {
      title: "Resultado",
      message: "Tu planta está perdiendo dinero todos los días sin que lo estés viendo.",
      tone: "alto",
    };
  }

  if (counts[2] === max) {
    return {
      title: "Resultado",
      message: "Tienes áreas importantes de mejora que están limitando tu crecimiento.",
      tone: "medio",
    };
  }

  return {
    title: "Resultado",
    message: "Tu operación está bien estructurada, pero aún puedes optimizar costos y productividad.",
    tone: "bajo",
  };
}

/* ---------------- HELPERS ---------------- */
function sumarUnaHora(hora: string) {
  const [h, m] = hora.split(":").map(Number);

  const d = new Date();

  d.setHours(h);
  d.setMinutes(m);
  d.setHours(d.getHours() + 1);

  return d.toTimeString().slice(0, 5);
}

/* ---------------- COMPONENT ---------------- */
export default function CtaSection() {

  const [open, setOpen] = useState(false);

  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState<
    ((1 | 2 | 3) | null)[]
  >(Array(questions.length).fill(null));

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [citaActiva, setCitaActiva] = useState(false);

  const [toast, setToast] = useState<string | null>(null);

  const [ocupadas, setOcupadas] = useState<string[]>([]);

  const horariosBase = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const normalizarHora = (hora: string) => {

    const h = Number(hora.split(":")[0]);

    return `${String(h).padStart(2, "0")}:00`;

  };

  const reset = () => {

    setStep(0);

    setAnswers(Array(questions.length).fill(null));

    setNombre("");
    setTelefono("");
    setEmpresa("");

    setFecha("");
    setHora("");

    setSuccess(false);

  };

  const close = () => {

    setOpen(false);

    setTimeout(reset, 200);

  };

  /* ---------------- OPEN FROM URL ---------------- */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("diagnostico") === "1") {
      reset();
      setOpen(true);
    }
  }, []);

  /* ---------------- CHECK CITA ---------------- */
  useEffect(() => {

    const check = async () => {

      if (!telefono) return;

      const { data, error } = await supabase
        .from("prospectos")
        .select("id")
        .eq("telefono", telefono)
        .eq("cita_agendada", true);

      if (error) {

        console.log(error);

        return;

      }

      setCitaActiva(!!data?.length);

    };

    check();

  }, [telefono]);

  /* ---------------- OPEN ---------------- */
  useEffect(() => {

    const abrirDesdeAfuera = () => {

      if (citaActiva) {

        setToast("Ya tienes una cita agendada");

        return;

      }

      reset();

      setOpen(true);

    };

    window.addEventListener(
      "open-diagnostic",
      abrirDesdeAfuera
    );

    return () =>
      window.removeEventListener(
        "open-diagnostic",
        abrirDesdeAfuera
      );

  }, [citaActiva]);

  /* ---------------- OCUPADAS ---------------- */
  useEffect(() => {

    const cargarOcupadas = async () => {

      if (!fecha) return;

      const { data } = await supabase
        .from("citas")
        .select("hora_inicio")
        .eq("fecha", fecha);

      const horas: string[] = [];

      (data || []).forEach((d: any) => {

        const ocupada =
          d.hora_inicio.slice(0, 5);

        horas.push(ocupada);

        // 🔥 BLOQUEAR UNA HORA ANTES
        const h = Number(
          ocupada.split(":")[0]
        );

        if (h > 8) {

          const anterior =
            `${String(h - 1).padStart(2, "0")}:00`;

          horas.push(anterior);

        }

      });

      setOcupadas([...new Set(horas)]);

    };

    cargarOcupadas();

  }, [fecha]);

  /* ---------------- ANSWERS ---------------- */
  const handleAnswer = (
    level: 1 | 2 | 3
  ) => {

    const next = [...answers];

    next[step] = level;

    setAnswers(next);

    if (step < questions.length - 1) {

      setStep(step + 1);

    } else {

      setStep(questions.length);

    }

  };

  /* ---------------- GUARDAR ---------------- */
  const guardarProspecto = async () => {

    if (citaActiva) {

      setToast(
        "Ya tienes una cita agendada"
      );

      return;

    }

    if (
      !nombre ||
      !telefono ||
      !fecha ||
      !hora
    ) {

      setToast(
        "Completa todos los campos para agendar tu cita"
      );

      return;

    }

    const horaNormalizada =
      normalizarHora(hora);

    // 🔥 VALIDAR LOCAL
    if (
      ocupadas.includes(
        horaNormalizada
      )
    ) {

      setToast(
        "Este horario ya está ocupado"
      );

      return;

    }

    setLoading(true);

    try {

      // 🔥 VALIDAR EN BASE
      const {
        data: existentes,
        error: errorExistentes,
      } = await supabase
        .from("citas")
        .select("id")
        .eq("fecha", fecha)
        .eq(
          "hora_inicio",
          horaNormalizada
        );

      if (errorExistentes) {

        console.log(errorExistentes);

        throw errorExistentes;

      }

      if (
        existentes &&
        existentes.length > 0
      ) {

        setToast(
          "Ese horario acaba de ocuparse"
        );

        setLoading(false);

        return;

      }

      // 🔥 RESULTADO
      const diagnosticoObj =
        getResult(
          answers as (1 | 2 | 3)[]
        );

      // 🔥 GUARDAR PROSPECTO
      const {
        data: prospec,
        error: errorProspecto,
      } = await supabase
        .from("prospectos")
        .insert([
          {
            nombre,
            telefono,
            empresa,
            diagnostico:
              diagnosticoObj.message,
            respuestas:
              JSON.stringify(
                answers
              ),
            origen: "Web",
            cita_agendada: true,
          },
        ])
        .select()
        .single();

      if (errorProspecto) {

        console.log(
          errorProspecto
        );

        throw errorProspecto;

      }

      // 🔥 HORAS
      const inicio =
        horaNormalizada;

      const fin =
        sumarUnaHora(
          horaNormalizada
        );

      // 🔥 GUARDAR CITA
      const {
        error: citaError,
      } = await supabase
        .from("citas")
        .insert([
          {
            prospecto_id:
              String(
                prospec.id
              ),
            fecha: fecha,
            hora_inicio:
              inicio,
            hora_final: fin,
            estado_cita:
              "Agendada",
          },
        ]);

      if (citaError) {

        console.log(citaError);

        throw citaError;

      }

      // 🔥 RECARGAR OCUPADAS
      const {
        data: nuevasOcupadas,
      } = await supabase
        .from("citas")
        .select("hora_inicio")
        .eq("fecha", fecha);

      const horas: string[] = [];

      (nuevasOcupadas || []).forEach(
        (d: any) => {

          const ocupada =
            d.hora_inicio.slice(
              0,
              5
            );

          horas.push(ocupada);

          const h = Number(
            ocupada.split(":")[0]
          );

          if (h > 8) {

            const anterior =
              `${String(h - 1).padStart(2, "0")}:00`;

            horas.push(anterior);

          }

        }
      );

      setOcupadas([
        ...new Set(horas),
      ]);

      setSuccess(true);

      setCitaActiva(true);

      setToast(
        "Cita guardada correctamente"
      );

    } catch (err: any) {

      console.log(err);

      setToast(
        err.message ||
          "Error al guardar"
      );

    } finally {

      setLoading(false);

    }

  };

  const isResults =
    step === questions.length &&
    answers.every(
      (a) => a !== null
    );

  const result = isResults
    ? getResult(
        answers as (1 | 2 | 3)[]
      )
    : null;

  const current =
    step < questions.length
      ? questions[step]
      : null;

  const progress = Math.round(
    (
      answers.filter(
        (a) => a !== null
      ).length /
      questions.length
    ) * 100
  );

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-navy py-24"
    >
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-brand/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">

        <h2 className="text-3xl font-extrabold text-navy-foreground sm:text-4xl lg:text-5xl">
          ¿Quieres saber{" "}
          <span className="text-brand">
            cuánto estás perdiendo hoy?
          </span>
        </h2>

        <p className="mt-6 text-lg text-navy-foreground/70">
          Un especialista de CONFIMÉX visitará tu taller en CDMX,
          analizará tu proceso actual y te mostrará cuánto puedes
          ahorrar con patronaje digital.
        </p>

        <div className="mt-8 flex flex-col items-center gap-5">

          <button
            type="button"
            onClick={() => {

              if (citaActiva) {

                setToast(
                  "Ya tienes una cita agendada"
                );

              } else {

                reset();

                setOpen(true);

              }

            }}
            className="inline-flex items-center gap-3 rounded-xl bg-brand px-10 py-5 text-xl font-bold text-brand-foreground shadow-xl transition hover:brightness-110 hover:scale-105"
          >
            Conoce en este momento tu situación
          </button>

        </div>

      </div>

      <Dialog
        open={open}
        onOpenChange={(o) =>
          o
            ? setOpen(true)
            : close()
        }
      >
        <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-auto bg-background p-6">

          <DialogTitle className="text-xl font-bold text-foreground">

            {isResults
              ? "Tu diagnóstico"
              : "Diagnóstico rápido de tu taller"}

          </DialogTitle>

          <DialogDescription>

            {isResults
              ? "Esto es lo que indican tus respuestas."
              : "Responde 8 preguntas cortas."}

          </DialogDescription>

          {!isResults &&
            current && (
              <div className="mt-2">

                <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-muted">

                  <div
                    className="h-full bg-brand transition-all"
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

                <h3 className="mb-5 text-lg font-semibold text-foreground">

                  {current.q}

                </h3>

                <div className="flex flex-col gap-3">

                  {current.options.map(
                    (opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() =>
                          handleAnswer(
                            opt.level
                          )
                        }
                        className="rounded-lg border border-border bg-card px-4 py-3 text-left text-sm text-card-foreground transition hover:border-brand hover:bg-brand/5"
                      >
                        {opt.label}
                      </button>
                    )
                  )}

                </div>

              </div>
            )}

          {isResults &&
            result && (
              <div className="mt-2 space-y-6">

                <div className="rounded-xl border border-brand/30 bg-brand/5 p-6">

                  <p className="text-base font-medium text-foreground">

                    {result.message}

                  </p>

                </div>

                {!success ? (
                  <div className="space-y-4">

                    <h4 className="text-sm font-bold text-foreground uppercase tracking-wide text-brand">

                      Agenda tu visita:

                    </h4>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                      <input
                        value={nombre}
                        onChange={(e) =>
                          setNombre(
                            e.target.value
                          )
                        }
                        placeholder="Nombre Completo"
                        className="rounded-lg border border-border bg-card px-4 py-3 text-sm"
                      />

                      <input
                        value={telefono}
                        onChange={(e) =>
                          setTelefono(
                            e.target.value
                          )
                        }
                        placeholder="WhatsApp"
                        className="rounded-lg border border-border bg-card px-4 py-3 text-sm"
                      />

                      <input
                        value={empresa}
                        onChange={(e) =>
                          setEmpresa(
                            e.target.value
                          )
                        }
                        placeholder="Empresa"
                        className="rounded-lg border border-border bg-card px-4 py-3 text-sm sm:col-span-2"
                      />

                      <input
                        type="date"
                        value={fecha}
                        onChange={(e) =>
                          setFecha(
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-border bg-card px-4 py-3 text-sm"
                      />

                      <select
                        value={hora}
                        onChange={(e) =>
                          setHora(
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-border bg-card px-4 py-3 text-sm"
                      >
                        <option value="">
                          Selecciona la Hora
                        </option>

                        {horariosBase.map(
                          (h) => (
                            <option
                              key={h}
                              value={h}
                              disabled={ocupadas.includes(
                                h
                              )}
                            >
                              {h}

                              {ocupadas.includes(
                                h
                              )
                                ? " 🚫 (Ocupado)"
                                : ""}
                            </option>
                          )
                        )}

                      </select>

                    </div>

                    <button
                      type="button"
                      onClick={
                        guardarProspecto
                      }
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center rounded-lg bg-brand px-4 py-3 text-sm font-bold text-brand-foreground shadow-sm transition hover:brightness-110 disabled:opacity-50"
                    >
                      {loading
                        ? "Registrando..."
                        : "Confirmar y Agendar"}
                    </button>

                  </div>
                ) : (
                  <div className="text-center p-6 bg-emerald-500/5 border border-emerald-500/30 rounded-xl">

                    <p className="text-lg font-bold text-emerald-400">

                      ¡Tu cita ha sido confirmada!

                    </p>

                  </div>
                )}

              </div>
            )}

</DialogContent>
      </Dialog>

{toast && (
  <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/70 pointer-events-auto">
    <div className="pointer-events-auto rounded-2xl border border-emerald-500/20 bg-zinc-950 p-6 text-center shadow-2xl">

      <p className="mb-3 text-lg font-bold text-emerald-400">
        Aviso
      </p>

      <p className="text-white">
        {toast}
      </p>

      <button
        type="button"
        onClick={() => setToast(null)}
        className="mt-5 rounded-xl bg-emerald-500 px-6 py-2 font-bold text-black transition hover:brightness-110"
      >
        OK
      </button>

    </div>
  </div>
)}

{/* 🔥 RED CONFIMEX FIJO */}
<div className="mt-16 flex justify-center">
  <div className="w-full max-w-xl rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 shadow-xl backdrop-blur">

    {/* 🔴 BOTÓN SALIR ARRIBA */}
    <div className="flex justify-end">
      <button
        type="button"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition"
      >
        ← Salir y regresar al inicio
      </button>
    </div>

    <h3 className="text-2xl font-extrabold text-emerald-400 mt-2">
      RED CONFIMEX
    </h3>

    <p className="mt-3 text-sm text-navy-foreground/70">
      Conecta con talleres, maquileros, proveedores y empresas del sector textil.
    </p>

    <div className="mt-6 flex flex-col gap-3">

      <button
        type="button"
        onClick={() => {
          window.location.href = "/red_confimex";
        }}
        className="rounded-xl bg-emerald-500 px-6 py-3 font-bold text-black transition hover:brightness-110"
      >
        Entrar a la Red
      </button>

    </div>

  </div>
</div>
</section>
  );
}
