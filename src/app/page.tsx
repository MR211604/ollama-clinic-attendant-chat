"use client";

import AI_Prompt from "@/components/ai-input";
import DynamicText from "@/components/kokonutui/dynamic-text";
import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
}

const messageHistoryMockup: Message[] = [
  {
    role: "user",
    content: "Hola, ¿cómo estás?",
  },
  {
    role: "assistant",
    content: "¡Hola! Estoy aquí para ayudarte. ¿En qué puedo asistirte hoy?",
  }
]

export default function Home() {

  const [userSentMessage, setUserSentMessage] = useState(false);

  const handleUserSentMessage = (text: string) => {
    console.log("User sent message:", text);
    setUserSentMessage(true);
  };

  return (
    //TODO: Agregar flex-col a este classname para que el input quede al final
    <div className={`bg-linear-to-b from-slate-300/75 to-slate-100 flex items-center min-h-screen w-full px-4 font-[family-name:var(--font-geist-sans)] ${userSentMessage ? "flex-col" : ""}`}>

      {/* Agregar justify-between y flex-grow cuando un usuario mande un mensaje */}
      <main className={`flex flex-col gap-[32px] items-center w-full ${userSentMessage ? "justify-between flex-grow" : ""}`}>

        {/* Parte del chat */}

        {userSentMessage ? (
          <section className="flex flex-col items-center py-20 w-full">
            {/* Aquí se mostrarían los mensajes del chat */}
            <div className="flex flex-col gap-[16px] w-3/4">
              {
                messageHistoryMockup.map(({ role, content }, index) => {

                  if (role === "assistant") {
                    return (
                      <div
                        key={role + index}
                        className="col-start-6 col-end-13 p-3 rounded-lg"
                      >
                        <div className="flex items-center">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black/65 flex-shrink-0 text-sm">
                            <img src="/images/icon-dark.png" alt="" />
                          </div>
                          <div className="relative text-white ml-3 text-sm bg-black/65 py-2 px-4 shadow rounded-xl">
                            <div>{content}</div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (role === "user") {
                    return (
                      <div
                        key={role + index}
                        className="col-start-1 col-end-8 p-3 rounded-lg"
                      >
                        <div className="flex justify-start flex-row-reverse">
                          {/* <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-400 text-white flex-shrink-0 text-sm">
                            Yo
                          </div> */}
                          <div className="relative mr-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>{content}</div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                })
              }
            </div>
          </section>
        ) : (
          <section className="flex flex-col gap-[16px] items-center w-full py-20 max-w-[600px]">
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
        )
        }
        {/* Input */}
        {/* TODO: agregar mt-auto para que el chat quede hasta abajo */}
        <section className="flex flex-col items-center gap-[16px] w-full mt-auto">
          <AI_Prompt onSubmit={handleUserSentMessage} />
        </section>
      </main>
    </div >
  );
}
