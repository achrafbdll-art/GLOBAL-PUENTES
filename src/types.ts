export type Route =
  | 'home'
  | 'about'
  | 'services'
  | 'pricing'
  | 'payment'
  | 'member'
  | 'login'
  | 'register'
  | 'admin';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'user' | 'admin';
  membershipStatus: 'free' | 'pending_payment' | 'active';
  paidAmount?: number;
  paymentDate?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  content: string;
  rating: number;
  avatarUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface ConsultationRequest {
  id: string;
  userId: string;
  email: string;
  fullName: string;
  topic: string;
  description: string;
  preferredDate: string;
  status: 'pending' | 'scheduled' | 'completed';
  createdAt: string;
}

export interface FeasibilityResult {
  score: number;
  status: 'excellent' | 'viable' | 'challenging' | 'high_risk';
  breakdown: {
    marketDemand: number;
    financialFeasibility: number;
    operationalCapacity: number;
    regulatoryClarity: number;
  };
  recommendations: string[];
}
