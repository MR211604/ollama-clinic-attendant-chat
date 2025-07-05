"use client";

import AI_Prompt from "@/components/ai-input";
import DynamicText from "@/components/kokonutui/dynamic-text";
import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';
import Image from "next/image";


export default function Home() {

  const { messages, handleSubmit, input, setInput, handleInputChange } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Error en useChat:', error);
    },
    onResponse: (message) => {
      console.log('Mensaje recibido:', message);
    }
  })
  const [hasStartedChat, setHasStartedChat] = useState(false)


  // Actualizar hasStartedChat cuando hay mensajes
  useEffect(() => {
    if (messages.length > 0 && !hasStartedChat) {
      setHasStartedChat(true)
    }
  }, [messages, hasStartedChat])

  return (
    //TODO: Agregar flex-col a este classname para que el input quede al final
    <div className={`bg-linear-to-b from-slate-300/75 to-slate-100 flex items-center min-h-screen w-full px-4 font-[family-name:var(--font-geist-sans)] ${hasStartedChat ? "flex-col" : ""}`}>

      {/* Agregar justify-between y flex-grow cuando un usuario mande un mensaje */}
      <main className={`flex flex-col gap-[32px] items-center w-full transition-all duration-700 ease-out ${hasStartedChat ? "justify-between flex-grow" : ""}`}>

        {/* Parte del chat */}
        {hasStartedChat ? (
          <section className="flex flex-col items-center py-20 w-full">
            {/* Aquí se mostrarían los mensajes del chat */}
            <div className="grid gap-[16px] w-3/4">
              {
                messages.map(({ role, content, id }) => {
                  if (role === "assistant") {
                    return (
                      <div
                        key={role + id}
                        className="col-start-1 col-end-12 p-3 rounded-lg"
                      >
                        <div className="flex items-center">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-black/65 flex-shrink-0 text-sm">
                            <Image src="/images/icon-dark.png" width={32} height={32} alt="icono equisde" />
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
                        key={role + id}
                        className="col-start-5 col-end-12 p-3 rounded-lg"
                      >
                        <div className="flex justify-start flex-row-reverse">
                          {/* <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-400 text-white flex-shrink-0 text-sm">
                            Yo
                          </div> */}
                          <div className="relative  text-sm bg-white py-2 px-4 shadow rounded-xl">
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
        <section className="flex flex-col items-center gap-[16px] w-full mt-auto transition-all duration-700 ease-out">
          <AI_Prompt handleSubmit={handleSubmit} input={input} setInput={setInput} handleInputChange={handleInputChange} />
        </section>
      </main>
    </div >
  );
}
