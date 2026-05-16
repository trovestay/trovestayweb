'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '../i18n/translations';

export type Currency = 'IDR' | 'USD' | 'EUR' | 'GBP';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatPrice: (priceInIDR: number) => string;
  formatLargePrice: (priceInIDR: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Fallback rates if API fails
const FALLBACK_RATES: Record<Currency, number> = {
  IDR: 1,
  USD: 1 / 15500, // roughly 15,500 IDR to USD
  EUR: 1 / 16800,
  GBP: 1 / 19500
};

const SYMBOLS: Record<Currency, string> = {
  IDR: 'Rp',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // As requested: always set IDR first when user opens website
  const [currency, setCurrency] = useState<Currency>('IDR');
  const [language, setLanguage] = useState<Language>('en');
  const [rates, setRates] = useState<Record<Currency, number>>(FALLBACK_RATES);

  useEffect(() => {
    // Fetch live rates
    const fetchRates = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/IDR');
        if (res.ok) {
          const data = await res.json();
          if (data.rates) {
            setRates({
              IDR: 1,
              USD: data.rates.USD || FALLBACK_RATES.USD,
              EUR: data.rates.EUR || FALLBACK_RATES.EUR,
              GBP: data.rates.GBP || FALLBACK_RATES.GBP
            });
          }
        }
      } catch (err) {
        console.error('Failed to fetch exchange rates, using fallback.', err);
      }
    };
    fetchRates();
  }, []);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const formatPrice = (priceInIDR: number) => {
    if (priceInIDR === 0) return '0';
    const rate = rates[currency];
    const converted = priceInIDR * rate;
    const symbol = SYMBOLS[currency];
    
    let displayNum = converted.toLocaleString(language === 'id' ? 'id-ID' : 'en-US', { maximumFractionDigits: 0 });
    
    return `${symbol} ${displayNum}`;
  };

  const formatLargePrice = (priceInIDR: number) => {
    if (priceInIDR === 0) return '0';
    const rate = rates[currency];
    const converted = priceInIDR * rate;
    const symbol = SYMBOLS[currency];

    let displayPrice = '';
    // Scale logic based on currency size roughly
    const isIDR = currency === 'IDR';
    const millionThreshold = isIDR ? 1000000 : 1000000;
    const billionThreshold = isIDR ? 1000000000 : 1000000000;

    if (converted >= billionThreshold) {
      displayPrice = (converted / billionThreshold).toFixed(1) + 'B';
    } else if (converted >= millionThreshold) {
      displayPrice = (converted / millionThreshold).toFixed(1) + 'M';
    } else if (converted >= 1000) {
      displayPrice = (converted / 1000).toFixed(1) + 'K';
    } else {
      displayPrice = converted.toFixed(0);
    }
    
    return `${symbol} ${displayPrice}`;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, currency, setCurrency, t, formatPrice, formatLargePrice }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
