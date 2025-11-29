/**
 * Centralized API Configuration
 * 
 * This file contains all backend base URLs used across the application.
 * 
 * ## Development vs Production
 * 
 * ### Option 1: Environment Variables (Recommended)
 * Create a `.env` file in your project root:
 * ```
 * VITE_PORTFOLIO_API=http://localhost:3001
 * VITE_NEWS_API=http://localhost:3002
 * VITE_RESEARCH_API=http://localhost:3003
 * ```
 * 
 * For production, set these in your hosting platform (Vercel, Netlify, etc.)
 * 
 * ### Option 2: Manual Swap
 * Comment/uncomment the appropriate BASE_URL sections below
 * 
 * ## Usage Example
 * ```typescript
 * import { API_ENDPOINTS } from '@/config/api';
 * 
 * // Fetch portfolio data
 * const response = await fetch(`${API_ENDPOINTS.PORTFOLIO}/holdings`);
 * 
 * // Post risk analysis
 * const result = await fetch(`${API_ENDPOINTS.RISK_EVAL}/analyze`, {
 *   method: 'POST',
 *   body: JSON.stringify(data)
 * });
 * ```
 */

// =============================================================================
// DEVELOPMENT URLs (Local Backend)
// =============================================================================
const DEV_URLS = {
  PORTFOLIO: 'http://172.30.233.71:5000',
  MARKET: 'http://localhost:3001',
  NEWS: 'http://localhost:3002',
  CHAT: 'http://localhost:3003',
};

// =============================================================================
// PRODUCTION URLs (Replace with your actual backend URLs)
// =============================================================================
const PROD_URLS = {
  PORTFOLIO: 'https://0e3081bbc6c9.ngrok-free.app',
  MARKET: 'https://0e3081bbc6c9.ngrok-free.app',
  NEWS: 'https://0e3081bbc6c9.ngrok-free.app',
  CHAT: 'https://0e3081bbc6c9.ngrok-free.app',
};

// =============================================================================
// Environment-based Configuration
// =============================================================================
const isDevelopment = import.meta.env.DEV;

/**
 * Main API Endpoints (Service-based Architecture)
 * 
 * Services:
 * - PORTFOLIO: User profile, holdings, portfolio data
 * - MARKET: Market data, stock prices, indices
 * - NEWS: Market news and updates
 * - CHAT: AI chat functionality
 * 
 * Automatically uses DEV_URLS in development and PROD_URLS in production.
 * Override with environment variables (VITE_*) for custom configurations.
 */
export const API_ENDPOINTS = {
  PORTFOLIO: import.meta.env.VITE_PORTFOLIO_API || (isDevelopment ? DEV_URLS.PORTFOLIO : PROD_URLS.PORTFOLIO),
  MARKET: import.meta.env.VITE_MARKET_API || (isDevelopment ? DEV_URLS.MARKET : PROD_URLS.MARKET),
  NEWS: import.meta.env.VITE_NEWS_API || (isDevelopment ? DEV_URLS.NEWS : PROD_URLS.NEWS),
  CHAT: import.meta.env.VITE_CHAT_API || (isDevelopment ? DEV_URLS.CHAT : PROD_URLS.CHAT),
} as const;

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Build full API URL with path
 * @param service - Service name from API_ENDPOINTS
 * @param path - API path (e.g., '/holdings', '/analyze')
 * @returns Full URL
 */
export function buildApiUrl(service: keyof typeof API_ENDPOINTS, path: string): string {
  const baseUrl = API_ENDPOINTS[service];
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Check if running in development mode
 */
export const isDevMode = isDevelopment;

/**
 * Get all configured endpoints (useful for debugging)
 */
export function getEndpointsDebug() {
  return {
    mode: isDevelopment ? 'development' : 'production',
    endpoints: API_ENDPOINTS,
  };
}
