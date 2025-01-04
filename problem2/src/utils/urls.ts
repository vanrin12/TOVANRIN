import { TOKEN_ICONS_BASE_URL, API_BASE_URL, DEFAULT_TOKEN_ICON } from '../config/constants';

export const getTokenIconUrl = (symbol: string) =>
  `${TOKEN_ICONS_BASE_URL}/Switcheo/token-icons/main/tokens/${symbol}.svg`;

export const getDefaultTokenIconUrl = () =>
  `${TOKEN_ICONS_BASE_URL}/Switcheo/token-icons/main/tokens/${DEFAULT_TOKEN_ICON}.svg`;

export const getPricesUrl = () =>
  `${API_BASE_URL}/prices.json`;