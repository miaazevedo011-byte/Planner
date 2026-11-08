import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '20mb' }));

  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({ apiKey });

  // API Endpoint: Version Check
  app.get('/api/version', (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.json({
      version: '2.4.0',
      timestamp: Date.now(),
      title: 'Caderno de Receitas com IA & Estimativa de Custos 🍳',
    });
  });

  // API Endpoint: AI Reflection / Prompt
  app.post('/api/ai/reflection', async (req, res) => {
    try {
      const { promptType, userContext } = req.body;
      const systemPrompt = `Você é um assistente de papelaria artesanal e bullet journal acolhedor e poético. Você fala com sabedoria calma, atenção plena e apreciação pela papelaria artesanal e vida intencional.`;
      const fullPrompt = `${systemPrompt}\n\nTipo de Solicitação: ${promptType}\nNotas / Humor do Usuário: ${userContext}\n\nForneça uma resposta inspiradora, reconfortante e lindamente estruturada em formato markdown com delicados ícones botânicos.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: fullPrompt,
      });
      res.json({ text: response.text || "Que o seu dia seja repleto de momentos tranquilos e descobertas gentis." });
    } catch (error: any) {
      console.error("Server Reflection Error:", error);
      res.status(500).json({ error: error.message || 'Erro no servidor' });
    }
  });

  // API Endpoint: Transcribe Shopping List from Image (OCR)
  app.post('/api/ai/transcribe-shopping', async (req, res) => {
    try {
      const { base64Image, mimeType } = req.body;
      console.log('Received transcription request. MimeType:', mimeType, 'Base64 length:', base64Image?.length);

      if (!base64Image) {
        return res.status(400).json({ error: 'Nenhuma imagem fornecida.' });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: base64Image,
            },
          },
          `Analise esta imagem de uma lista de compras manuscrita em papel de caderno. Transcreva todos os produtos listados e categorize-os estritamente em uma destas quatro categorias exatas:
          1. "Alimentação"
          2. "Casa / Limpeza"
          3. "Higiene / Saúde"
          4. "Outros"

          Estime uma quantidade padrão (1) e preço unitário (0 se desconhecido).
          Retorne a resposta EXATAMENTE como um array JSON válido de objetos com as chaves: name (string), category (string), quantity (number), unitPrice (number), purchased (boolean: false). Exemplo:
          [{"name": "Arroz", "category": "Alimentação", "quantity": 1, "unitPrice": 0, "purchased": false}]`
        ],
      });

      const text = response.text || '[]';
      console.log('Gemini OCR raw response:', text);

      let items = [];
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          items = JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error('Failed to parse matched JSON:', e);
        }
      }

      if (!items || items.length === 0) {
        // Fallback: create an item from text if parsing failed
        items = [{
          name: text.trim().substring(0, 50) || 'Item transcrito da foto',
          category: 'Alimentação',
          quantity: 1,
          unitPrice: 0,
          purchased: false,
        }];
      }

      res.json({ items });
    } catch (error: any) {
      console.error("Server Transcription Error Detail:", error);
      res.status(500).json({ error: error.message || 'Erro ao transcrever imagem no servidor' });
    }
  });

  // Helper: Fast dynamic recipe generator with real Google search link when AI times out or is offline
  function generateFallbackRecipe(query: string) {
    const q = query.trim();
    const cleanTitle = q.charAt(0).toUpperCase() + q.slice(1);
    const lower = q.toLowerCase();
    const realSearchUrl = `https://www.google.com/search?q=receita+de+${encodeURIComponent(q)}+site:tudogostoso.com.br+OR+site:panelinha.com.br`;

    let category = 'Prato Principal Aconchegante';
    let time = '35 min';
    let yieldAmount = '4 a 6 porções';
    let cost = 'R$ 16,80';
    let tip = 'Aproveite temperos frescos e compre legumes da estação para garantir o melhor preço na feira.';
    let ingredients = [
      { name: `500g de ingredientes base para ${cleanTitle}`, cost: 'R$ 8,50' },
      { name: '1 cebola média e 3 dentes de alho picados', cost: 'R$ 1,80' },
      { name: '2 colheres (sopa) de azeite ou óleo vegetal', cost: 'R$ 1,00' },
      { name: '1 xícara de caldo ou molho caseiro', cost: 'R$ 2,50' },
      { name: 'Cheiro-verde fresco e ervas a gosto', cost: 'R$ 1,50' },
      { name: '1 pitada generosa de sal e pimenta-do-reino', cost: 'R$ 0,50' },
    ];
    let steps = [
      { title: 'Higienização e corte', desc: `Separe e pique todos os ingredientes de ${cleanTitle} em porções regulares para cozimento uniforme.` },
      { title: 'Refogado aromático', desc: 'Em fogo médio, doure o alho e a cebola no azeite até perfumar e adquirir tom dourado suave.' },
      { title: 'Cozimento dos ingredientes', desc: `Adicione a base de ${cleanTitle}, tempere com sal e pimenta, e deixe cozinhar lentamente com a tampa semi-aberta.` },
      { title: 'Finalização e toque de chef', desc: 'Ajuste o sal, finalize com ervas frescas e sirva quentinho com carinho.' },
    ];

    if (lower.includes('bolo') || lower.includes('torta doce') || lower.includes('pudim') || lower.includes('mousse') || lower.includes('doce') || lower.includes('sobremesa')) {
      category = 'Confeitaria Afetiva';
      time = '45 min';
      cost = 'R$ 14,50';
      tip = 'Peneire os ingredientes secos para deixar a massa incrivelmente fofa e aerada.';
      ingredients = [
        { name: '2 xícaras de farinha de trigo', cost: 'R$ 2,20' },
        { name: '1 e 1/2 xícara de açúcar', cost: 'R$ 1,80' },
        { name: '3 ovos médios', cost: 'R$ 3,10' },
        { name: '1/2 xícara de óleo vegetal ou manteiga', cost: 'R$ 2,00' },
        { name: '1 xícara de leite ou suco natural', cost: 'R$ 1,50' },
        { name: '1 colher (sopa) de fermento químico', cost: 'R$ 0,90' },
      ];
      steps = [
        { title: 'Preparo da base', desc: 'Bata os ovos com o açúcar e o óleo até formar um creme esbranquiçado e fofo.' },
        { title: 'Incorporar secos e líquidos', desc: 'Vá alternando o leite e a farinha peneirada, misturando suavemente com um fouet.' },
        { title: 'Fermento e forno', desc: 'Acrescente o fermento delicadamente. Despeje em forma untada e asse a 180°C por 35 a 40 minutos.' },
      ];
    } else if (lower.includes('sopa') || lower.includes('caldo')) {
      category = 'Sopas & Caldos Reconfortantes';
      time = '30 min';
      cost = 'R$ 12,00';
      tip = 'Congele as aparas de legumes na semana para ferver e ter um caldo caseiro saboroso a custo zero.';
    }

    return {
      id: 'rec_' + Date.now(),
      title: cleanTitle,
      category,
      time,
      yield: yieldAmount,
      cost,
      tip,
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
      isFavorite: false,
      notes: '',
      sourceUrl: realSearchUrl,
      sourceTitle: `Google Search Culinário (${cleanTitle})`,
      sourceDomain: 'google.com.br',
      ingredients,
      steps,
    };
  }

  // API Endpoint: Search Recipe with real Google Search Grounding & citation sources
  app.post('/api/ai/search-recipe', async (req, res) => {
    const { query } = req.body;
    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ error: 'Nome da receita é obrigatório.' });
    }

    const cleanQuery = query.trim();
    console.log('Searching recipe via Google Search grounding for:', cleanQuery);

    try {
      const prompt = `Você é um chef especialista em culinária prática, afetiva e econômica.
Pesquise no Google, livros digitais e sites reais de receita (ex: TudoGostoso, Panelinha, Receitas Nestlé, GNT) a receita real e autêntica de: "${cleanQuery}".

Requisitos obrigatórios:
1. Traga os ingredientes REAIS e o modo de preparo VERDADEIRO praticado no Brasil.
2. Ingredientes acessíveis com custos realistas estimados em R$.
3. Estime o valor aproximado de cada ingrediente (ex: "R$ 3,20", "R$ 1,50").
4. Estime o custo total aproximado somando os valores (ex: "R$ 18,50").
5. Tempo real estimado e rendimento em porções.
6. Uma "Dica da Cozinha & Economia" prática.

Retorne EXCLUSIVAMENTE um objeto JSON válido (sem textos em volta):
{
  "title": "Nome exato e convidativo da receita",
  "category": "Ex: Confeitaria Afetiva / Prato Principal / Lanche / Sopa / Café da Manhã",
  "time": "Ex: 40 min",
  "yield": "Ex: 6 porções",
  "cost": "Ex: R$ 18,50",
  "tip": "Dica prática de economia ou truque culinário do porquinho",
  "ingredients": [
    { "name": "Ingrediente com quantidade", "cost": "R$ 2,50" }
  ],
  "steps": [
    { "title": "Título do passo", "desc": "Descrição clara do passo." }
  ]
}`;

      // Enable Google Search Grounding so Gemini accesses real web indexed recipes
      const aiPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('AI_TIMEOUT')), 8500)
      );

      const response: any = await Promise.race([aiPromise, timeoutPromise]);
      const text = response?.text || '{}';

      // Extract real grounding chunks / web search URLs from Google Search Grounding
      const groundingChunks = response?.candidates?.[0]?.groundingMetadata?.groundingChunks;
      let sourceUrl = `https://www.google.com/search?q=receita+de+${encodeURIComponent(cleanQuery)}`;
      let sourceTitle = 'Pesquisa Real no Google & Livros de Receitas';
      let sourceDomain = 'google.com.br';

      if (Array.isArray(groundingChunks) && groundingChunks.length > 0) {
        const firstWeb = groundingChunks.find((c: any) => c.web?.uri);
        if (firstWeb && firstWeb.web) {
          sourceUrl = firstWeb.web.uri;
          sourceTitle = firstWeb.web.title || sourceTitle;
          try {
            const urlObj = new URL(sourceUrl);
            sourceDomain = urlObj.hostname.replace(/^www\./, '');
          } catch (e) {
            // ignore
          }
        }
      }

      let recipeData: any = null;
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          recipeData = JSON.parse(jsonMatch[0]);
        } catch (e) {
          console.error('Failed to parse recipe JSON match:', e);
        }
      }

      if (recipeData && recipeData.title && Array.isArray(recipeData.ingredients)) {
        recipeData.id = 'rec_' + Date.now();
        recipeData.isFavorite = false;
        recipeData.notes = '';
        recipeData.sourceUrl = sourceUrl;
        recipeData.sourceTitle = sourceTitle;
        recipeData.sourceDomain = sourceDomain;
        return res.json({ recipe: recipeData });
      }

      // If parsing didn't return valid recipe, use fallback with real search URL
      console.log('AI response unparseable, using fallback for:', cleanQuery);
      return res.json({ recipe: generateFallbackRecipe(cleanQuery) });
    } catch (error: any) {
      console.warn("Gemini Search timed out or failed; generating instant recipe with real Google Search link:", error?.message);
      return res.json({ recipe: generateFallbackRecipe(cleanQuery) });
    }
  });

  // Vite middleware for dev and SPA serving
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
