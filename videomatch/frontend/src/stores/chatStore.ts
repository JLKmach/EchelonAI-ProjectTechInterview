import { create } from 'zustand';
import { ChatMessage, Match } from '../types';

interface ChatState {
  messages: Record<string, ChatMessage[]>; // matchId -> messages
  unreadCounts: Record<string, number>; // matchId -> unread count
  activeChat: string | null; // current active matchId
  isLoading: boolean;
  setMessages: (matchId: string, messages: ChatMessage[]) => void;
  addMessage: (matchId: string, message: ChatMessage) => void;
  updateMessage: (matchId: string, messageId: string, updates: Partial<ChatMessage>) => void;
  setActiveChat: (matchId: string | null) => void;
  markAsRead: (matchId: string) => void;
  incrementUnreadCount: (matchId: string) => void;
  setLoading: (loading: boolean) => void;
  clearChat: (matchId: string) => void;
  clearAllChats: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: {},
  unreadCounts: {},
  activeChat: null,
  isLoading: false,
  
  setMessages: (matchId: string, messages: ChatMessage[]) => {
    const currentMessages = get().messages;
    set({
      messages: { ...currentMessages, [matchId]: messages },
    });
  },
  
  addMessage: (matchId: string, message: ChatMessage) => {
    const currentMessages = get().messages;
    const existingMessages = currentMessages[matchId] || [];
    const updatedMessages = [...existingMessages, message];
    
    set({
      messages: { ...currentMessages, [matchId]: updatedMessages },
    });
    
    // Increment unread count if not the active chat
    if (get().activeChat !== matchId) {
      get().incrementUnreadCount(matchId);
    }
  },
  
  updateMessage: (matchId: string, messageId: string, updates: Partial<ChatMessage>) => {
    const currentMessages = get().messages;
    const matchMessages = currentMessages[matchId] || [];
    const updatedMessages = matchMessages.map(message =>
      message.id === messageId ? { ...message, ...updates } : message
    );
    
    set({
      messages: { ...currentMessages, [matchId]: updatedMessages },
    });
  },
  
  setActiveChat: (matchId: string | null) => {
    set({ activeChat: matchId });
    // Mark messages as read when opening a chat
    if (matchId) {
      get().markAsRead(matchId);
    }
  },
  
  markAsRead: (matchId: string) => {
    const currentUnreadCounts = get().unreadCounts;
    set({
      unreadCounts: { ...currentUnreadCounts, [matchId]: 0 },
    });
  },
  
  incrementUnreadCount: (matchId: string) => {
    const currentUnreadCounts = get().unreadCounts;
    const currentCount = currentUnreadCounts[matchId] || 0;
    set({
      unreadCounts: { ...currentUnreadCounts, [matchId]: currentCount + 1 },
    });
  },
  
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
  
  clearChat: (matchId: string) => {
    const currentMessages = get().messages;
    const currentUnreadCounts = get().unreadCounts;
    const { [matchId]: removedMessages, ...remainingMessages } = currentMessages;
    const { [matchId]: removedCount, ...remainingCounts } = currentUnreadCounts;
    
    set({
      messages: remainingMessages,
      unreadCounts: remainingCounts,
    });
  },
  
  clearAllChats: () => {
    set({
      messages: {},
      unreadCounts: {},
      activeChat: null,
    });
  },
}));
