import { API_ENDPOINTS } from '@/config/api';
import { apiGet } from '@/lib/apiClient';

export interface FundamentalData {
  symbol: string;
  [key: string]: any;
}

export interface TechnicalData {
  symbol: string;
  [key: string]: any;
}

export interface CombinedData {
  symbol: string;
  fundamental: FundamentalData;
  technical: TechnicalData;
}

export interface HistoryData {
  symbol: string;
  interval: string;
  range: string;
  data: any[];
}

export interface WeaknessAnalysis {
  userId: string;
  weakestStocks: any[];
}

/**
 * Get fundamental data for a symbol
 */
export async function getFundamental(symbol: string): Promise<FundamentalData> {
  const url = `${API_ENDPOINTS.PORTFOLIO}/api/v1/fundamental/${symbol}`;
  console.log('🌐 Calling API:', url);
  return await apiGet<FundamentalData>(url);
}

/**
 * Get technical data for a symbol
 */
export async function getTechnical(symbol: string): Promise<TechnicalData> {
  const url = `${API_ENDPOINTS.PORTFOLIO}/api/v1/technical/${symbol}`;
  console.log('🌐 Calling API:', url);
  return await apiGet<TechnicalData>(url);
}

/**
 * Get combined technical and fundamental data for a symbol
 */
export async function getCombined(symbol: string): Promise<CombinedData> {
  const url = `${API_ENDPOINTS.PORTFOLIO}/api/v1/combined/${symbol}`;
  console.log('🌐 Calling API:', url);
  return await apiGet<CombinedData>(url);
}

/**
 * Get historical data for a symbol with interval and range
 * @param symbol - Stock symbol
 * @param interval - Time interval (e.g., '1d', '1h')
 * @param range - Time range (e.g., '1mo', '3mo', '1y')
 */
export async function getHistory(
  symbol: string,
  interval: string = '1d',
  range: string = '1mo'
): Promise<HistoryData> {
  const url = `${API_ENDPOINTS.PORTFOLIO}/api/v1/history/${symbol}?interval=${interval}&range=${range}`;
  console.log('🌐 Calling API:', url);
  return await apiGet<HistoryData>(url);
}

/**
 * Get weakness analysis for a user
 */
export async function getWeaknessAnalysis(userId: string): Promise<WeaknessAnalysis> {
  const url = `${API_ENDPOINTS.PORTFOLIO}/api/v1/analysis/weakest/${userId}`;
  console.log('🌐 Calling API:', url);
  return await apiGet<WeaknessAnalysis>(url);
}

/**
 * Trigger market data refresh (cron endpoint)
 */
export async function refreshMarketData(): Promise<void> {
  const url = `${API_ENDPOINTS.PORTFOLIO}/api/v1/refresh`;
  console.log('🌐 Calling API:', url);
  return await apiGet<void>(url);
}
