import { ShoppingItem } from '../types';

export async function generateAiReflection(promptType: string, userContext: string): Promise<string> {
  try {
    const res = await fetch('/api/ai/reflection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ promptType, userContext }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Servidor retornou resposta inválida (${res.status}): ${text.substring(0, 100)}`);
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Falha ao comunicar com o servidor de IA.');
    }

    return data.text || "Que o seu dia seja repleto de momentos tranquilos e descobertas gentis.";
  } catch (error: any) {
    console.error("Client Reflection Error:", error);
    return `[Nota: Não foi possível contatar o assistente IA no servidor. Erro: ${error.message || 'Erro desconhecido'}.]`;
  }
}

export async function transcribeShoppingListFromImage(base64Image: string, mimeType: string = 'image/jpeg'): Promise<Omit<ShoppingItem, 'id'>[]> {
  try {
    const res = await fetch('/api/ai/transcribe-shopping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ base64Image, mimeType }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await res.text();
      throw new Error(`Servidor retornou resposta inválida (${res.status}): ${text.substring(0, 100)}`);
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Falha ao transcrever imagem no servidor.');
    }

    return data.items || [];
  } catch (error: any) {
    console.error("Client Transcription Error:", error);
    throw new Error(error.message || 'Erro ao transcrever imagem.');
  }
}
