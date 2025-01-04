import { Token } from '../types';

interface ExchangeRateInfoProps {
  fromToken: Token;
  toToken: Token;
  getExchangeRate: (from: Token, to: Token) => number;
}

export const ExchangeRateInfo = ({ fromToken, toToken, getExchangeRate }: ExchangeRateInfoProps) => (
  <div className="space-y-2 text-sm text-gray-600">
    <div>Current Rates:</div>
    <div>1 {fromToken.symbol} = ${fromToken.price?.toFixed(8)}</div>
    <div>1 {toToken.symbol} = ${toToken.price?.toFixed(8)}</div>
    <div>Reference Price:</div>
    <div>1 {fromToken.symbol} = {getExchangeRate(fromToken, toToken).toFixed(8)} {toToken.symbol}</div>
  </div>
);