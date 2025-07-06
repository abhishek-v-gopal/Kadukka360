export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'seller' | 'buyer';
  location: string;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  location: string;
  quantity: number;
  pricePerKg: number;
  contactNumber: string;
  sellerId: string;
  sellerName: string;
  status: 'available' | 'sold-out';
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  participantName: string;
  participantRole: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  avatar: string;
  productName: string;
  productId: string;
  isOnline: boolean;
  messages: Message[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface Language {
  code: 'en' | 'ml';
  name: string;
}