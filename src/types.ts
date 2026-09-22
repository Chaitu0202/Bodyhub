export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  mobile: string;
  username: string;
  role: UserRole;
  firstLogin: boolean;
  avatar?: string;
  email?: string;
  emergencyContact?: string;
  createdAt: string;
  updatedAt: string;
}

export type MembershipPlan = 'Monthly' | 'Quarterly' | 'Yearly';
export type MembershipStatus = 'Active' | 'Expiring' | 'Expired';

export interface Membership {
  id: string;
  memberId: string;
  plan: MembershipPlan;
  startDate: string;
  expiryDate: string;
  status: MembershipStatus;
  amount: number;
}

export type PaymentMethod = 'UPI' | 'Card' | 'Cash' | 'Net Banking';
export type PaymentStatus = 'Paid' | 'Pending' | 'Failed';

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  membershipId?: string;
  amount: number;
  date: string;
  method: PaymentMethod;
  status: PaymentStatus;
  receiptNumber: string;
  planName: string;
}

export type EventType = 'Fitness' | 'Community' | 'Workshops' | 'Challenges';
export type EventCategory = 'All' | EventType;
export type EventStatus = 'Published' | 'Draft';

export interface GymEvent {
  id: string;
  title: string;
  description: string;
  category: EventType;
  date: string;
  time: string;
  location: string;
  image: string;
  status: EventStatus;
  maxCapacity?: number;
  registeredMembers: string[]; // memberIds
  createdAt: string;
}

export type FeedbackCategory = 'Trainers' | 'Equipment' | 'Cleanliness' | 'Staff' | 'Overall';

export interface Feedback {
  id: string;
  memberId: string;
  memberName: string;
  rating: number;
  category: FeedbackCategory;
  comment: string;
  date: string;
  reviewed?: boolean;
}

export type NotificationType = 'expiry' | 'event' | 'payment' | 'announcement';

export interface AppNotification {
  id: string;
  memberId: string | 'all';
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

export interface GymSettings {
  name: string;
  phone: string;
  email: string;
  address: string;
  mapsUrl: string;
  openingHoursWeekdays: string;
  openingHoursWeekends: string;
  monthlyPlanPrice: string;
  quarterlyPlanPrice: string;
  yearlyPlanPrice: string;
  tagline: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  duration: string;
  intensity: 'Medium' | 'High' | 'Elite' | 'All Levels';
  suitableFor: string;
  benefits: string[];
  image: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  bio: string;
  certifications: string[];
  image: string;
}
