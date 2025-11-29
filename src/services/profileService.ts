import { API_ENDPOINTS } from '@/config/api';
import { apiGet, apiPost, apiPut } from '@/lib/apiClient';

export interface UserProfile {
  user: {
    id: string;
    name: string;
    email: string;
    image_url: string;
  };
  user_profile: {
    profession: string;
    age?: string;
    gender?: string;
    designation?: string;
    job_level?: string;
    is_primary_earner: boolean;
  };
  user_financial_profile: {
    income_per_month: number;
    expenditure: number;
    additional_expenses: number;
    living_cost: number;
    invest_per_month: number;
    saving_per_month: number;
    saving_rate: number;
    risk_tolerance: string;
    invest_cycle_date: string;
  };
  portfolio_snapshot: {
    total_portfolio_value_inr: number;
    equity_value_inr: number;
    mf_value_inr: number;
    snapshot_date: string;
  };
  exchanges: string[];
}

export interface FinancialProfileUpdateData {
  income_per_month: number;
  expenditure: number;
  additional_expenses?: number;
  living_cost?: number;
  invest_per_month: number;
  saving_per_month: number;
  saving_rate: number;
  risk_tolerance: string;
  invest_cycle_date: string;
}

export interface CreateProfileData {
  user: {
    name: string;
    email: string;
    image_url: string;
  };
  user_profile: {
    age?: string;
    gender?: string;
    profession: string;
    designation?: string;
    job_level?: string;
    is_primary_earner: boolean;
  } | null;
  user_financial_profile: {
    income_per_month: number;
    expenditure: number;
    additional_expenses: number;
    living_cost: number;
    invest_per_month: number;
    saving_per_month: number;
    saving_rate: number;
    risk_tolerance: string;
    invest_cycle_date: string;
  };
  exchanges: string[];
}

/**
 * Fetch user profile data
 */
export async function getProfile(userId: string): Promise<UserProfile> {
  const url = `${API_ENDPOINTS.PORTFOLIO}/api/v1/profile/${userId}`;
  console.log('🌐 Calling API:', url);
  return await apiGet<UserProfile>(url);
}

/**
 * Create user profile (onboarding)
 */
export async function createProfile(data: CreateProfileData): Promise<void> {
  const url = `${API_ENDPOINTS.PORTFOLIO}/api/v1/profile`;
  console.log('🌐 Creating profile:', url);
  return await apiPost<void>(url, data);
}

/**
 * Update user financial profile
 */
export async function updateFinancialProfile(
  userId: string,
  data: FinancialProfileUpdateData
): Promise<void> {
  await apiPut<void>(`${API_ENDPOINTS.PORTFOLIO}/api/v1/profile/${userId}/financial`, data);
}
