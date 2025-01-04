import { useState, useEffect } from 'react';
import { Token, TokenPrice } from '../types';
import { getTokenIconUrl, getPricesUrl } from '../utils/urls';

export const useTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(getPricesUrl());
        const data: TokenPrice[] = await response.json();
        
        const uniqueTokens = Array.from(new Set(data.map(p => p.currency)))
          .map(symbol => ({
            symbol,
            name: symbol,
            price: data.find(p => p.currency === symbol)?.price,
            logoUrl: getTokenIconUrl(symbol)
          }))
          .filter(token => token.price !== undefined);
        
        setTokens(uniqueTokens);
        setIsLoadingData(false);
      } catch (err) {
        setError('Failed to load token data');
        setIsLoadingData(false);
      }
    };

    fetchPrices();
  }, []);

  return { tokens, isLoadingData, error };
};