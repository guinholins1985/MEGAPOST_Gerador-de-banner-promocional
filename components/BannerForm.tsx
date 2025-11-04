import React, { useState, useRef } from 'react';
import type { BannerOptions } from '../types';
import { PROMOTION_TYPES, CATEGORIES, BANNER_SIZES, STYLES, ADDITIONAL_ELEMENTS } from '../constants';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from './ui/Card';
import { Label } from './ui/Label';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import { SparklesIcon } from './icons/SparklesIcon';
import { UploadIcon } from './icons/UploadIcon';
import { TrashIcon } from './icons/TrashIcon';

interface BannerFormProps {
  onGenerate: (options: BannerOptions) => void;
  loading: boolean;
}

const BannerForm: React.FC<BannerFormProps> = ({ onGenerate, loading }) => {
  const [formData, setFormData] = useState<BannerOptions>({
    promotionType: 'Black Friday',
    category: 'Eletrônicos',
    productName: 'Fone de Ouvido Bluetooth Pro',
    originalPrice: 'R$ 299,90',
    promotionalPrice: 'R$ 149,90',
    cta: '50% OFF! Compre Agora!',
    primaryColor: '#8b5cf6',
    secondaryColor: '#ffffff',
    additionalElements: ['Frete Grátis'],
    countdown: '24 horas',
    bannerSize: '16:9',
    style: 'Futurista',
    productImage: undefined,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentElements = prev.additionalElements;
      if (checked) {
        return { ...prev, additionalElements: [...currentElements, value] };
      } else {
        return { ...prev, additionalElements: currentElements.filter(el => el !== value) };
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({ ...prev, productImage: base64String }));
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, productImage: undefined }));
    setImagePreview(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalize seu Banner</CardTitle>
        <CardDescription>Preencha os detalhes abaixo para criar um banner único para sua campanha.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="promotionType">Tipo de Promoção</Label>
              <Select id="promotionType" name="promotionType" value={formData.promotionType} onChange={handleChange}>
                {PROMOTION_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </Select>
            </div>
            <div>
              <Label htmlFor="category">Categoria do Produto</Label>
              <Select id="category" name="category" value={formData.category} onChange={handleChange}>
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="productName">Nome do Produto</Label>
            <Input id="productName" name="productName" value={formData.productName} onChange={handleChange} placeholder="Ex: Fone Bluetooth X100" />
          </div>

           <div>
            <Label htmlFor="productImage">Imagem do Produto (Opcional)</Label>
            <input
                type="file"
                id="productImage"
                name="productImage"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
            />
            {imagePreview ? (
                <div className="mt-2 relative">
                    <img src={imagePreview} alt="Pré-visualização do produto" className="w-full h-auto max-h-48 object-contain rounded-md border border-gray-600 bg-gray-900/50 p-1" />
                    <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-600/80 text-white p-1.5 rounded-full hover:bg-red-500 transition-colors"
                        aria-label="Remover Imagem"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 w-full flex flex-col items-center justify-center px-6 py-8 border-2 border-gray-600 border-dashed rounded-md text-center hover:border-indigo-500 transition-colors cursor-pointer"
                >
                    <UploadIcon className="w-8 h-8 text-gray-500 mb-2" />
                    <span className="text-sm font-medium text-gray-300">Clique para enviar uma imagem</span>
                    <span className="text-xs text-gray-500">PNG, JPG, WEBP</span>
                </button>
            )}
        </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="originalPrice">Preço Original (De:)</Label>
              <Input id="originalPrice" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="R$ 399,00" />
            </div>
            <div>
              <Label htmlFor="promotionalPrice">Preço Promocional (Por:)</Label>
              <Input id="promotionalPrice" name="promotionalPrice" value={formData.promotionalPrice} onChange={handleChange} placeholder="R$ 199,00" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="cta">Texto Promocional (CTA)</Label>
            <Input id="cta" name="cta" value={formData.cta} onChange={handleChange} placeholder="Aproveite! Só hoje com 50% OFF!" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="primaryColor">Cor Principal</Label>
                <div className="relative">
                    <Input type="color" id="primaryColor" name="primaryColor" value={formData.primaryColor} onChange={handleChange} className="p-1 h-10 w-full" />
                </div>
            </div>
            <div>
                <Label htmlFor="secondaryColor">Cor Secundária</Label>
                <div className="relative">
                    <Input type="color" id="secondaryColor" name="secondaryColor" value={formData.secondaryColor} onChange={handleChange} className="p-1 h-10 w-full"/>
                </div>
            </div>
          </div>

          <div>
            <Label>Elementos Adicionais</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {ADDITIONAL_ELEMENTS.map(el => (
                <label key={el} className="flex items-center space-x-2 bg-gray-700/50 p-2 rounded-md cursor-pointer hover:bg-gray-700">
                  <input type="checkbox" value={el} checked={formData.additionalElements.includes(el)} onChange={handleCheckboxChange} className="form-checkbox h-4 w-4 text-indigo-500 bg-gray-800 border-gray-600 rounded focus:ring-indigo-500" />
                  <span>{el}</span>
                </label>
              ))}
            </div>
            <div className="mt-4">
               <Label htmlFor="countdown">Texto de Contagem Regressiva (Opcional)</Label>
               <Input id="countdown" name="countdown" value={formData.countdown} onChange={handleChange} placeholder="Ex: Oferta termina em 24h" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <Label htmlFor="bannerSize">Tamanho do Banner</Label>
                <Select id="bannerSize" name="bannerSize" value={formData.bannerSize} onChange={handleChange}>
                    {BANNER_SIZES.map(size => <option key={size.value} value={size.value}>{size.label}</option>)}
                </Select>
            </div>
            <div>
                <Label htmlFor="style">Estilo do Banner</Label>
                <Select id="style" name="style" value={formData.style} onChange={handleChange}>
                    {STYLES.map(style => <option key={style} value={style}>{style}</option>)}
                </Select>
            </div>
          </div>
          
        </CardContent>
        <CardFooter>
            <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Gerando...' : 'Gerar Banner'}
                {!loading && <SparklesIcon className="ml-2 h-5 w-5" />}
            </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BannerForm;
