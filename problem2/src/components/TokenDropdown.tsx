import { Token } from "../types";

interface TokenDropdownProps {
  selectedToken: Token | null;
  onSelect: (token: Token) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  label: string;
  tokens: Token[];
}

export const TokenDropdown = ({
  selectedToken,
  onSelect,
  isOpen,
  setIsOpen,
  label,
  tokens,
}: TokenDropdownProps) => (
  <div className="relative">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white flex items-center justify-between"
    >
      {selectedToken && (
        <div className="flex items-center">
          <img
            src={selectedToken.logoUrl}
            alt={selectedToken.symbol}
            className="w-6 h-6 mr-2"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg";
            }}
          />
          <span>{selectedToken.symbol}</span>
        </div>
      )}
      <svg
        className={`ml-2 h-5 w-5 text-gray-400 transform transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>

    {isOpen && (
      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
        {tokens.map((token) => (
          <button
            key={token.symbol}
            type="button"
            onClick={() => {
              onSelect(token);
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center"
          >
            <img
              src={token.logoUrl}
              alt={token.symbol}
              className="w-6 h-6 mr-2"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg";
              }}
            />
            <div>
              <div className="font-medium">{token.symbol}</div>
              <div className="text-sm text-gray-500">
                ${token.price?.toFixed(4)}
              </div>
            </div>
          </button>
        ))}
      </div>
    )}
  </div>
);
