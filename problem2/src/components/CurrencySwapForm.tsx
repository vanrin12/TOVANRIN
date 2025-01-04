import React, { useState, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Token } from "../types";
import { useTokens } from "../hooks/useTokens";
import { TokenDropdown } from "./TokenDropdown";
import { LoadingSpinner } from "./LoadingSpinner";
import { ExchangeRateInfo } from "./ExchangeRateInfo";
import { SuccessNotification } from "./SuccessNotification";

const CurrencySwapForm = () => {
  const { tokens, isLoadingData, error: tokenError } = useTokens();
  const [amount, setAmount] = useState<string>("");
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (tokens.length >= 2) {
      setFromToken(tokens[0]);
      setToToken(tokens[1]);
    }
  }, [tokens]);

  const getExchangeRate = (from: Token, to: Token) => {
    if (!from.price || !to.price) return 0;
    return to.price / from.price;
  };

  const calculateReceiveAmount = () => {
    if (!fromToken || !toToken || !fromToken.price || !toToken.price)
      return "0";
    const rate = getExchangeRate(fromToken, toToken);
    const inputAmount = parseFloat(amount);
    if (isNaN(inputAmount)) return "0";
    return (inputAmount * rate).toFixed(8);
  };

  const handleSwap = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!fromToken || !toToken) {
      setError("Please select tokens");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowSuccess(true);
    } catch (err) {
      setError("Failed to complete the swap. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Swap Currencies
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (You Pay)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              step="any"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <TokenDropdown
                selectedToken={fromToken}
                onSelect={setFromToken}
                isOpen={isFromDropdownOpen}
                setIsOpen={setIsFromDropdownOpen}
                label="From"
                tokens={tokens}
              />
            </div>

            <button
              type="button"
              onClick={handleSwap}
              className="mt-6 p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>

            <div className="flex-1">
              <TokenDropdown
                selectedToken={toToken}
                onSelect={setToToken}
                isOpen={isToDropdownOpen}
                setIsOpen={setIsToDropdownOpen}
                label="To"
                tokens={tokens}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (You Receive)
            </label>
            <input
              type="text"
              value={calculateReceiveAmount()}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            />
          </div>

          {fromToken && toToken && (
            <ExchangeRateInfo
              fromToken={fromToken}
              toToken={toToken}
              getExchangeRate={getExchangeRate}
            />
          )}

          {(error || tokenError) && (
            <div className="text-red-500 text-sm">{error || tokenError}</div>
          )}

          <button
            type="submit"
            disabled={isLoading || !amount || parseFloat(amount) <= 0}
            className={`w-full py-2 px-4 rounded-md text-white font-medium 
              ${
                isLoading || !amount || parseFloat(amount) <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } 
              transition-colors`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Converting...
              </div>
            ) : (
              "Convert"
            )}
          </button>
        </form>
      </div>
      <SuccessNotification
        isVisible={showSuccess}
        message={
          fromToken && toToken
            ? `Successfully swapped ${amount} ${
                fromToken.symbol
              } to ${calculateReceiveAmount()} ${toToken.symbol}`
            : "Swap completed successfully!"
        }
        onClose={() => {
          setShowSuccess(false);
          setAmount("");
        }}
      />
    </div>
  );
};

export default CurrencySwapForm;
