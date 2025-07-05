import { streamText } from 'ai'
import { ollama } from 'ollama-ai-provider'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
      
    const result = streamText({
      model: ollama('llama3.1:latest'),
      messages: messages
    });
        
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error en el chat:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return new Response(
      JSON.stringify({ error: 'Error al procesar el mensaje: ' + errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
