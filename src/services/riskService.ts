/**
 * Risk Evaluation Service
 * 
 * Risk analysis functionality is part of the Portfolio service
 */

import { API_ENDPOINTS } from '@/config/api';
import { apiGet, apiPost } from '@/lib/apiClient';

export interface RiskAnalysisRequest {
  portfolioId: string;
  timeframe: '1M' | '3M' | '6M' | '1Y';
}

export interface RiskAnalysisResponse {
  metrics: RiskMetrics;
}

export interface RiskMetrics {
  rpn: number;
  volatility: number;
  sharpeRatio: number;
  maxDrawdown: number;
  var95: number;
}

/**
 * Analyze portfolio risk
 */
export async function analyzePortfolioRisk(request: RiskAnalysisRequest): Promise<RiskAnalysisResponse> {
  return await apiPost<RiskAnalysisResponse>(`${API_ENDPOINTS.PORTFOLIO}/api/risk/analyze`, request);
}

/**
 * Get historical RPN data
 */
export async function getRPNHistory(timeframe: string): Promise<Array<{ date: string; rpn: number }>> {
  return await apiGet<Array<{ date: string; rpn: number }>>(
    `${API_ENDPOINTS.PORTFOLIO}/api/risk/rpn-history?timeframe=${timeframe}`
  );
}
