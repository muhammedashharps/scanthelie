export interface Ingredient {
  name: string;
  amount?: string;
  purpose?: string;
  origin?: string;
  controversy?: string;
  legalStatus?: {
    bannedCountries: string[];
  };
  safeLimit?: string;
  riskLevel?: 'Low' | 'Moderate' | 'High';
}

export interface NutritionFacts {
  calories?: string;
  protein?: string;
  fat?: string;
  sugar?: string;
  [key: string]: string | undefined;
}

export interface ClaimVerdict {
  claim: string;
  verdict: 'True' | 'False' | 'Misleading' | 'Unclear';
  reason: string;
}

export interface PersonalizedAnalysis {
  concerns: { issue: string; explanation: string }[];
  recommendations: string[];
  compatibility: 'High' | 'Moderate' | 'Low';
}

export interface ScanResult {
  productName: string;
  brand: string;
  claims: string[];
  ingredients: Ingredient[];
  nutritionFacts: NutritionFacts;
  claimVerdicts: ClaimVerdict[];
  healthScore?: number;
  personalizedAnalysis?: Record<string, PersonalizedAnalysis>; // Key is userId or preference hash
}

export interface ProductScan {
  id: string;
  userId?: string;
  frontImage: string; // Base64 string or URL
  backImage: string; // Base64 string or URL
  timestamp: number; // Unix timestamp
  result: ScanResult | null;
  status: 'pending' | 'completed' | 'failed';
  error?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GeminiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface ImageUploadResult {
  file: File;
  preview: string;
}