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
