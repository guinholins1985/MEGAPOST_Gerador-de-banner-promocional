export interface BannerOptions {
  promotionType: string;
  category: string;
  productName: string;
  originalPrice: string;
  promotionalPrice: string;
  productImage?: string; // Base64 encoded image
  cta: string;
  primaryColor: string;
  secondaryColor: string;
  additionalElements: string[];
  countdown: string;
  bannerSize: string;
  style: string;
}
