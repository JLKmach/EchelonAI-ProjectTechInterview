// User related types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: Gender;
  city: string;
  postalCode: string;
  country: string;
  bio?: string;
  isVerified: boolean;
  isEmailVerified: boolean;
  isSelfieVerified: boolean;
  verificationScore: number;
  createdAt: Date;
  updatedAt: Date;
  lastActive: Date;
  isActive: boolean;
}

export interface UserCreate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: Gender;
  city: string;
  postalCode: string;
  country: string;
  bio?: string;
}

export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  bio?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  country: string;
  bio?: string;
  interests: UserInterest[];
  languages: UserLanguage[];
  video?: Video;
  verificationScore: number;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NON_BINARY = 'non_binary',
  OTHER = 'other'
}

// Interest and Language types
export interface UserInterest {
  id: string;
  userId: string;
  interestCategory: InterestCategory;
  interestValue: string;
  createdAt: Date;
}

export interface UserLanguage {
  id: string;
  userId: string;
  languageCode: string;
  proficiencyLevel: ProficiencyLevel;
  createdAt: Date;
}

export enum InterestCategory {
  SPORTS = 'sports',
  CULTURE = 'culture',
  MUSIC = 'music',
  DANCE = 'dance',
  COLLECTIONS = 'collections',
  TRAVEL = 'travel',
  EDUCATION = 'education',
  COOKING = 'cooking',
  GAMING = 'gaming',
  NATURE = 'nature'
}

export enum ProficiencyLevel {
  NATIVE = 'native',
  FLUENT = 'fluent',
  BASIC = 'basic'
}

// Video types
export interface Video {
  id: string;
  userId: string;
  videoUrl: string;
  thumbnailUrl?: string;
  durationSeconds: number;
  fileSize: number;
  format: string;
  isApproved: boolean;
  moderationStatus: ModerationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export enum ModerationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  FLAGGED = 'flagged'
}

// Match types
export interface Match {
  id: string;
  user1Id: string;
  user2Id: string;
  compatibilityScore: number;
  matchDate: Date;
  isActive: boolean;
  user1Liked: boolean;
  user2Liked: boolean;
  mutualLike: boolean;
  createdAt: Date;
}

export interface MatchCreate {
  user1Id: string;
  user2Id: string;
  compatibilityScore: number;
}

export interface MatchUpdate {
  user1Liked?: boolean;
  user2Liked?: boolean;
  mutualLike?: boolean;
  isActive?: boolean;
}

// QR Encounter types
export interface QREncounter {
  id: string;
  matchId: string;
  qrCode: string;
  generatedBy: string;
  scannedBy?: string;
  encounterDate: Date;
  encounterLocation?: string;
  isConfirmed: boolean;
  createdAt: Date;
}

export interface QREncounterCreate {
  matchId: string;
  generatedBy: string;
  encounterDate: Date;
  encounterLocation?: string;
}

// Rating types
export interface Rating {
  id: string;
  encounterId: string;
  raterId: string;
  ratedUserId: string;
  respectfulScore: number;
  punctualScore: number;
  personalityScore: number;
  communicationScore: number;
  overallRating: number;
  comments?: string;
  isAnonymous: boolean;
  createdAt: Date;
}

export interface RatingCreate {
  encounterId: string;
  ratedUserId: string;
  respectfulScore: number;
  punctualScore: number;
  personalityScore: number;
  communicationScore: number;
  overallRating: number;
  comments?: string;
}

export interface RatingResponse {
  rating: Rating;
  raterScore: number; // Score of the person who gave the rating
}

// Report types
export interface Report {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reportType: ReportType;
  description: string;
  evidenceUrls?: string[];
  severityLevel: SeverityLevel;
  status: ReportStatus;
  moderatorNotes?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

export enum ReportType {
  INAPPROPRIATE = 'inappropriate',
  HARASSMENT = 'harassment',
  FAKE_PROFILE = 'fake_profile',
  OTHER = 'other'
}

export enum SeverityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ReportStatus {
  PENDING = 'pending',
  INVESTIGATING = 'investigating',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed'
}

// Chat types
export interface ChatMessage {
  id: string;
  matchId: string;
  senderId: string;
  messageText: string;
  messageType: MessageType;
  mediaUrl?: string;
  isRead: boolean;
  createdAt: Date;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video'
}

// Verification types
export interface VerificationSelfie {
  id: string;
  userId: string;
  selfieUrl: string;
  verificationStatus: VerificationStatus;
  aiDetectionScore?: number;
  humanVerifierId?: string;
  verificationNotes?: string;
  createdAt: Date;
  verifiedAt?: Date;
}

export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

// User Preferences types
export interface UserPreferences {
  id: string;
  userId: string;
  minAge: number;
  maxAge: number;
  maxDistanceKm: number;
  preferredGenders: Gender[];
  preferredLanguages?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends UserCreate {}

export interface AuthResponse {
  user: UserProfile;
  token: string;
  refreshToken: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Socket.io types
export interface SocketMessage {
  senderId: string;
  recipientId: string;
  message: string;
  timestamp: Date;
}

export interface TypingIndicator {
  userId: string;
  isTyping: boolean;
}

// File upload types
export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

// Compatibility calculation types
export interface CompatibilityFactors {
  interests: number;
  languages: number;
  location: number;
  total: number;
}

// Search and filter types
export interface UserSearchFilters {
  ageRange?: [number, number];
  gender?: Gender[];
  location?: {
    city?: string;
    postalCode?: string;
    maxDistanceKm?: number;
  };
  interests?: string[];
  languages?: string[];
  hasVideo?: boolean;
  isVerified?: boolean;
}

// Error types
export interface AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: string;
}

// Database types
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?: boolean;
}

export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  database: number;
  url?: string;
}
