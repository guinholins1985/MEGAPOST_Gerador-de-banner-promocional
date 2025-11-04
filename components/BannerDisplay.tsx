
import React from 'react';
import { Card, CardContent } from './ui/Card';
import { DownloadIcon } from './icons/DownloadIcon';
import { ImagePlaceholderIcon } from './icons/ImagePlaceholderIcon';

interface BannerDisplayProps {
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}

const BannerDisplay: React.FC<BannerDisplayProps> = ({ imageUrl, loading, error }) => {
  const Placeholder = () => (
    <div className="text-center text-gray-400 flex flex-col items-center justify-center h-full">
      <ImagePlaceholderIcon className="w-24 h-24 mb-4 text-gray-600" />
      <h3 className="text-xl font-semibold text-gray-300">Seu banner aparecerá aqui</h3>
      <p className="mt-1 text-sm">Preencha o formulário e clique em "Gerar Banner" para começar.</p>
    </div>
  );

  const Loader = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="mt-4 text-lg font-semibold text-gray-300">Gerando seu banner...</p>
      <p className="text-sm text-gray-400">A IA está trabalhando na sua criação. Isso pode levar um momento.</p>
    </div>
  );

  const ErrorDisplay = () => (
    <div className="text-center text-red-400 bg-red-900/20 border border-red-800 p-6 rounded-lg flex flex-col items-center justify-center h-full">
       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
       </svg>
      <h3 className="text-xl font-semibold">Ocorreu um Erro</h3>
      <p className="mt-1">{error}</p>
    </div>
  );

  return (
    <Card className="h-full">
      <CardContent className="p-6 h-[400px] lg:h-[600px] flex items-center justify-center">
        {loading && <Loader />}
        {!loading && error && <ErrorDisplay />}
        {!loading && !error && !imageUrl && <Placeholder />}
        {!loading && !error && imageUrl && (
          <div className="relative w-full h-full group">
            <img src={imageUrl} alt="Banner Promocional Gerado" className="object-contain w-full h-full rounded-md shadow-lg" />
            <a
              href={imageUrl}
              download="banner_promocional.png"
              className="absolute bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center gap-2"
            >
              <DownloadIcon className="w-5 h-5" />
              <span>Download</span>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BannerDisplay;
