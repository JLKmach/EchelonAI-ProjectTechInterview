// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  city: string;
  postalCode: string;
  bio?: string;
  profilePicture?: string;
  videoUrl?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  interests: string[];
  languages: string[];
  createdAt: string;
  updatedAt: string;
}

// Video related types
export interface Video {
  id: string;
  userId: string;
  url: string;
  duration: number;
  thumbnail?: string;
  status: 'processing' | 'ready' | 'error';
  createdAt: string;
}

// Match related types
export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  status: 'pending' | 'accepted' | 'rejected';
  compatibilityScore: number;
  createdAt: string;
  updatedAt: string;
}

// Chat related types
export interface ChatMessage {
  id: string;
  matchId: string;
  senderId: string;
  content: string;
  messageType: 'text' | 'image' | 'video';
  isRead: boolean;
  createdAt: string;
}

// QR Encounter types
export interface QREncounter {
  id: string;
  user1Id: string;
  user2Id: string;
  location: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'expired';
}

// Rating types
export interface Rating {
  id: string;
  fromUserId: string;
  toUserId: string;
  encounterId: string;
  score: number;
  comment?: string;
  isAnonymous: boolean;
  createdAt: string;
}

// Report types
export interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reason: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

// Verification types
export interface VerificationSelfie {
  id: string;
  userId: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  aiScore?: number;
  moderatorNotes?: string;
  createdAt: string;
}

// Auth response types
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  birthDate: string;
  city: string;
  postalCode: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter types
export interface UserFilters {
  ageRange?: [number, number];
  city?: string;
  interests?: string[];
  languages?: string[];
  verificationStatus?: 'verified' | 'all';
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'match' | 'message' | 'verification' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  data?: Record<string, unknown>;
  createdAt: string;
}
