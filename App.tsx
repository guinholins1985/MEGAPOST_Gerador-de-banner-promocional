
import React, { useState, useCallback } from 'react';
import type { BannerOptions } from './types';
import BannerForm from './components/BannerForm';
import BannerDisplay from './components/BannerDisplay';
import { generateBanner } from './services/geminiService';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const handleGenerateBanner = useCallback(async (options: BannerOptions) => {
    setLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const imageUrl = await generateBanner(options);
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido ao gerar o banner.');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 py-6 text-center shadow-lg">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Gerador de Banners Promocionais com IA
          </h1>
          <p className="mt-3 text-lg text-gray-400 max-w-3xl mx-auto">
            Crie banners profissionais para marketplaces em segundos. Basta preencher as informações da sua campanha.
          </p>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl p-4 lg:p-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <BannerForm onGenerate={handleGenerateBanner} loading={loading} />
          </div>
          <div className="lg:col-span-3">
            <BannerDisplay 
              imageUrl={generatedImageUrl}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </main>

       <footer className="text-center p-4 text-gray-500 text-sm mt-8">
            <p>Criado com React, Tailwind CSS e Gemini API.</p>
       </footer>
    </div>
  );
}

export default App;
