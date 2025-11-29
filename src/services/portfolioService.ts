/**
 * Portfolio Service
 * 
 * All portfolio-related APIs using centralized configuration
 * Base URL: Configured in src/config/api.ts (Portfolio service)
 * 
 * Available Endpoints:
 * - GET  /api/v1/kite?redirect_url=...     - Zerodha Login
 * - GET  /api/v1/profile/{user_id}         - Get Profile
 * - POST /api/v1/profile                   - Create Profile
 * - PUT  /api/v1/profile/{user_id}         - Update Demographics
 * - PUT  /api/v1/profile/{user_id}/financial - Update Financial
 * - GET  /api/v1/kite/profile              - Zerodha Profile
 * - GET  /api/v1/kite/holdings             - Equity Holdings
 * - GET  /api/v1/kite/mf_holdings          - MF Holdings
 * - GET  /api/v1/kite/all                  - All Data
 */

import { API_ENDPOINTS } from '@/config/api';
import { apiGet } from '@/lib/apiClient';

export interface PortfolioHolding {
  id: string;
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  value: number;
}

export interface PortfolioSummary {
  totalValue: number;
  dayChange: number;
  dayChangePercent: number;
  holdings: PortfolioHolding[];
}

export interface ZerodhaProfile {
  user_id: string;
  user_name: string;
  email: string;
  broker: string;
}

export interface EquityHolding {
  tradingsymbol: string;
  exchange: string;
  quantity: number;
  average_price: number;
  last_price: number;
  pnl: number;
}

export interface MFHolding {
  folio: string;
  fund: string;
  quantity: number;
  average_price: number;
  last_price: number;
  pnl: number;
}

// =============================================================================
// Zerodha Integration APIs
// =============================================================================

/**
 * Get Zerodha login URL
 */
export function getZerodhaLoginUrl(redirectUrl: string): string {
  return `${API_ENDPOINTS.PORTFOLIO}/api/v1/kite?redirect_url=${encodeURIComponent(redirectUrl)}`;
}

/**
 * Get Zerodha profile
 */
export async function getZerodhaProfile(): Promise<ZerodhaProfile> {
  return await apiGet<ZerodhaProfile>(`${API_ENDPOINTS.PORTFOLIO}/api/v1/kite/profile`);
}

/**
 * Get equity holdings from Zerodha
 */
export async function getEquityHoldings(): Promise<EquityHolding[]> {
  return await apiGet<EquityHolding[]>(`${API_ENDPOINTS.PORTFOLIO}/api/v1/kite/holdings`);
}

/**
 * Get mutual fund holdings from Zerodha
 */
export async function getMFHoldings(): Promise<MFHolding[]> {
  return await apiGet<MFHolding[]>(`${API_ENDPOINTS.PORTFOLIO}/api/v1/kite/mf_holdings`);
}

/**
 * Get all data from Zerodha (profile + holdings)
 */
export async function getAllData(): Promise<any> {
  return await apiGet<any>(`${API_ENDPOINTS.PORTFOLIO}/api/v1/kite/all`);
}
