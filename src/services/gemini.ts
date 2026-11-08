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

export async function searchRecipeOnline(query: string): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6500);

  try {
    const res = await fetch('/api/ai/search-recipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('Formato inválido retornado pelo servidor');
    }

    const data = await res.json();
    if (data.recipe && data.recipe.title) {
      return data.recipe;
    }
    throw new Error('Receita incompleta');
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.warn("Client fallback for recipe query:", query, error?.message);

    // Guaranteed instant client-side culinary generation
    const clean = query.trim() || 'Prato Caseiro Especial';
    const cleanTitle = clean.charAt(0).toUpperCase() + clean.slice(1);
    return {
      id: 'rec_' + Date.now(),
      title: cleanTitle,
      category: 'Culinária Prática & Afetiva',
      time: '35 min',
      yield: '4 porções',
      cost: 'R$ 15,50',
      tip: 'Aproveite sobras e temperos da estação para deixar esta receita ainda mais saborosa e econômica.',
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
      isFavorite: false,
      notes: '',
      ingredients: [
        { name: `500g de base para ${cleanTitle}`, cost: 'R$ 7,50' },
        { name: '1 cebola e 2 dentes de alho picados', cost: 'R$ 1,80' },
        { name: '2 colheres (sopa) de azeite', cost: 'R$ 1,20' },
        { name: 'Temperos verdes frescos (salsinha/cebolinha)', cost: 'R$ 1,50' },
        { name: 'Sal e especiarias a gosto', cost: 'R$ 0,50' },
        { name: 'Acompanhamento (arroz ou legumes cozidos)', cost: 'R$ 3,00' },
      ],
      steps: [
        { title: 'Higienização e preparo', desc: `Higienize bem e corte os ingredientes de ${cleanTitle} em pedaços uniformes.` },
        { title: 'Refogar a base', desc: 'Em fogo médio, doure o alho e a cebola no azeite até soltar aroma perfumado.' },
        { title: 'Cozimento lento', desc: `Incorpore os ingredientes principais de ${cleanTitle}, tempere a gosto e cozinhe com calma.` },
        { title: 'Toque final', desc: 'Finalize com ervas frescas picadas e sirva bem quentinho com muito amor.' },
      ]
    };
  }
}

