import AI_Prompt from "@/components/ai-input";
import DynamicText from "@/components/kokonutui/dynamic-text";

export default function Home() {
  return (
    <div className="bg-linear-to-b from-slate-300/75 to-slate-100 flex items-center min-h-screen w-full px-4 font-[family-name:var(--font-geist-sans)] ">
      <main className="flex flex-col gap-[32px] items-center w-full">
        {/* Parte del chat */}
        <section className="flex flex-col gap-[16px] items-center w-full max-w-[600px]">
          <div className="flex flex-col gap-[16px] items-center w-full">
            <h1 className="text-4xl font-bold text-center">
              ¡Hola, soy tu asistente IA de clínica!
            </h1>
            <p className="text-lg text-pretty">
              Estoy aquí para ayudarte con cualquier pregunta o inquietud que tengas.
            </p>
            <DynamicText />
          </div>
        </section>

        {/* Input */}
        <section className="flex flex-col items-center gap-[16px] w-full">
          <AI_Prompt />
        </section>
      </main>
    </div >
  );
}
