/**
 * Chat Service
 * 
 * Example service for AI chat functionality using centralized API config
 */

import { API_ENDPOINTS } from '@/config/api';
import { apiGet, apiPost } from '@/lib/apiClient';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatResponse {
  message: ChatMessage;
  suggestions?: string[];
}

/**
 * Send a message to the AI chat service
 */
export async function sendChatMessage(message: string): Promise<ChatResponse> {
  return await apiPost<ChatResponse>(`${API_ENDPOINTS.CHAT}/api/messages`, { message });
}

/**
 * Get chat history
 */
export async function getChatHistory(): Promise<ChatMessage[]> {
  return await apiGet<ChatMessage[]>(`${API_ENDPOINTS.CHAT}/api/history`);
}
