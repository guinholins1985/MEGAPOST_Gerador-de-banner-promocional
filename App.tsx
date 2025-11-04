
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
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 shadow-lg">
        <div className="container mx-auto max-w-7xl flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5 4a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H5zm10 1H5a1 1 0 00-1 1v6a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-1-1z" />
            <path d="M6 8a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7A.5.5 0 016 8zm0 2a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4A.5.5 0 016 10z" />
          </svg>
          <h1 className="text-2xl font-bold tracking-tight text-white">Gerador de Banners com IA</h1>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl p-4 lg:p-6">
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
