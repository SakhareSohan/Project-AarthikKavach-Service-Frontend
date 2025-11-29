import { API_ENDPOINTS } from '@/config/api';
import { apiPost } from '@/lib/apiClient';

export interface NewsFetchRequest {
  title: string;
  limit: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  description?: string;
  url?: string;
  publishedAt?: string;
  source?: string;
  [key: string]: any;
}

export interface NewsFetchResponse {
  articles: NewsArticle[];
  total: number;
}

export interface UserNewsFetchRequest {
  userId: string;
}

export interface UserNewsWithSentiment {
  articles: NewsArticle[];
  sentiment: {
    overall: string;
    positive: number;
    neutral: number;
    negative: number;
  };
  total: number;
}

/**
 * Fetch news articles by topic/title with limit
 */
export async function fetchNewsByTopic(
  title: string,
  limit: number = 10
): Promise<NewsFetchResponse> {
  const url = `${API_ENDPOINTS.NEWS}/api/v1/news/fetch`;
  console.log('🌐 Calling API:', url, { title, limit });
  return await apiPost<NewsFetchResponse>(url, { title, limit });
}

/**
 * Fetch user-specific news with sentiment analysis
 */
export async function fetchUserNews(userId: string): Promise<UserNewsWithSentiment> {
  const url = `${API_ENDPOINTS.NEWS}/api/v1/user/fetch`;
  console.log('🌐 Calling API:', url, { userId });
  return await apiPost<UserNewsWithSentiment>(url, { userId });
}
