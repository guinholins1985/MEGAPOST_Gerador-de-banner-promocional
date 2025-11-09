import { GoogleGenAI, Modality } from "@google/genai";
import type { BannerOptions } from '../types';
import { BANNER_SIZES } from '../constants';

const buildPrompt = (options: BannerOptions): string => {
  const sizeLabel = BANNER_SIZES.find(s => s.value === options.bannerSize)?.label || options.bannerSize;

  let prompt = `Crie um banner promocional profissional e visualmente atraente para um marketplace de e-commerce, em português do Brasil.

**Instrução Principal:**
${options.productImage 
  ? `**Use a imagem fornecida como o produto principal.** Integre-a perfeitamente ao design do banner, garantindo que ela seja o ponto focal. Ajuste a iluminação, sombras e reflexos da imagem do produto para que correspondam de forma realista ao ambiente do banner.` 
  : `**Gere uma imagem fotorrealista e de alta qualidade de um(a) "${options.productName}"** como o produto principal. Este produto pertence à categoria "${options.category}". O produto deve ser o foco central e parecer atraente.`
}

**Elementos Chave do Design:**
- **Estilo de Design:** ${options.style}. O clima geral deve ser limpo, moderno e profissional.
- **Tipo de Promoção:** A campanha é de "${options.promotionType}". O design deve refletir este tema (ex: para "Black Friday", use um tema escuro e de alto contraste; para "Lançamento", algo vibrante e novo).
- **Preços:** Exiba claramente os preços. O original é "${options.originalPrice}" e o promocional é "${options.promotionalPrice}". Dê maior destaque ao preço promocional. O preço original deve ser menor, talvez com um efeito de riscado (strikethrough).
- **Chamada para Ação (CTA):** Destaque o texto: "${options.cta}". Deve estar em uma área de alta visibilidade.
- **Paleta de Cores:** Cor primária da marca: ${options.primaryColor}. Cor secundária: ${options.secondaryColor}. Use estas cores de forma harmoniosa no banner para textos, fundos e elementos gráficos.
- **Dimensões:** O banner deve ser otimizado para a proporção de ${sizeLabel}.
`;

  if (options.additionalElements.length > 0 || options.countdown) {
    prompt += `\n**Gráficos Adicionais:**\n`;
    if (options.additionalElements.includes("Frete Grátis")) {
      prompt += `- Inclua um selo ou ícone de "Frete Grátis".\n`;
    }
    if (options.additionalElements.includes("Garantia Estendida")) {
      prompt += `- Inclua um selo ou ícone de "Garantia Estendida".\n`;
    }
    if (options.additionalElements.includes("Últimas Unidades")) {
      prompt += `- Crie um senso de urgência com um texto como "Últimas Unidades" ou "Poucas Unidades".\n`;
    }
    if (options.countdown) {
      prompt += `- Inclua uma representação visual de um cronômetro de contagem regressiva ou um texto que diga "Oferta válida por ${options.countdown}".\n`;
    }
  }

  prompt += `
**Composição e Qualidade Final:**
- Garanta que todo o texto seja legível, bem espaçado e com bom contraste.
- O layout deve ser equilibrado, guiando o olhar do espectador para o produto e a CTA.
- Não inclua textos de placeholder como "lorem ipsum".
- O resultado deve ser um banner finalizado e polido, pronto para publicação.
- Não inclua logos ou marcas d'água de IA.
  `;
  return prompt;
};


export const generateBanner = async (options: BannerOptions): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("A chave da API do Gemini não foi configurada.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = buildPrompt(options);

  try {
    const parts: any[] = [];
    
    if (options.productImage) {
      const imageMatch = options.productImage.match(/^data:(image\/\w+);base64,(.*)$/s);
      if (!imageMatch) {
        throw new Error("A imagem do produto fornecida não é um formato de dados URI válido.");
      }
      const mimeType = imageMatch[1];
      const data = imageMatch[2];

      parts.push({
        inlineData: {
          mimeType,
          data,
        },
      });
    }

    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: parts },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find(part => part.inlineData);

    if (imagePart?.inlineData) {
      const base64ImageBytes: string = imagePart.inlineData.data;
      return `data:${imagePart.inlineData.mimeType};base64,${base64ImageBytes}`;
    }
    
    const responseText = response.text?.trim();
    if (responseText) {
      throw new Error(`A IA retornou uma mensagem em vez de uma imagem: "${responseText}"`);
    }

    throw new Error("A IA não retornou uma imagem válida. A resposta pode ter sido bloqueada. Tente ajustar suas opções.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes('SAFETY') || error.message.includes('400')) {
            throw new Error("Sua solicitação foi bloqueada por políticas de segurança ou por uma entrada inválida. Tente um prompt ou imagem diferente.");
        }
        throw error; // Re-throw other known errors
    }
    throw new Error("Falha ao se comunicar com a API de geração de imagem.");
  }
};