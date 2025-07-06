import React, { useState } from 'react';
import { MessageSquare, Search, Clock, CheckCheck, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { ChatWindow } from '../chat/ChatWindow';
import { Chat, Message } from '../../types';

// Enhanced mock chat data for sellers - buyers inquiring about products
const mockSellerChats: Chat[] = [
  {
    id: '1',
    participantName: 'Arjun Nair',
    participantRole: 'buyer',
    lastMessage: 'Can you deliver 30kg to Kochi by tomorrow? I need them for my restaurant.',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    unread: 1,
    avatar: 'AN',
    productName: 'Fresh Green Mussels',
    productId: '1',
    isOnline: true,
    messages: [
      {
        id: 'm1',
        senderId: 'buyer1',
        senderName: 'Arjun Nair',
        content: 'Hi, I\'m interested in your fresh green mussels. Are they still available?',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        status: 'read',
      },
      {
        id: 'm2',
        senderId: 'seller1',
        senderName: 'You',
        content: 'Hello! Yes, we have fresh mussels harvested this morning. How much quantity do you need?',
        timestamp: new Date(Date.now() - 6600000), // 1.8 hours ago
        status: 'read',
      },
      {
        id: 'm3',
        senderId: 'buyer1',
        senderName: 'Arjun Nair',
        content: 'I need around 30kg for my restaurant. What\'s your price per kg?',
        timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
        status: 'read',
      },
      {
        id: 'm4',
        senderId: 'seller1',
        senderName: 'You',
        content: 'For 30kg, I can offer ₹115 per kg. These are premium quality mussels from clean waters.',
        timestamp: new Date(Date.now() - 4800000), // 1.3 hours ago
        status: 'read',
      },
      {
        id: 'm5',
        senderId: 'buyer1',
        senderName: 'Arjun Nair',
        content: 'Can you deliver 30kg to Kochi by tomorrow? I need them for my restaurant.',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        status: 'delivered',
      },
    ],
  },
  {
    id: '2',
    participantName: 'Meera Krishnan',
    participantRole: 'buyer',
    lastMessage: 'Perfect! I\'ll take 20kg. When can I pick them up?',
    timestamp: new Date(Date.now() - 14400000), // 4 hours ago
    unread: 0,
    avatar: 'MK',
    productName: 'Premium Black Mussels',
    productId: '2',
    isOnline: false,
    messages: [
      {
        id: 'm6',
        senderId: 'buyer2',
        senderName: 'Meera Krishnan',
        content: 'Hello, I saw your premium black mussels. Are they organically farmed?',
        timestamp: new Date(Date.now() - 21600000), // 6 hours ago
        status: 'read',
      },
      {
        id: 'm7',
        senderId: 'seller1',
        senderName: 'You',
        content: 'Yes, our black mussels are organically farmed using sustainable methods. They\'re premium quality.',
        timestamp: new Date(Date.now() - 18000000), // 5 hours ago
        status: 'read',
      },
      {
        id: 'm8',
        senderId: 'buyer2',
        senderName: 'Meera Krishnan',
        content: 'Perfect! I\'ll take 20kg. When can I pick them up?',
        timestamp: new Date(Date.now() - 14400000), // 4 hours ago
        status: 'read',
      },
    ],
  },
  {
    id: '3',
    participantName: 'Rajesh Kumar',
    participantRole: 'buyer',
    lastMessage: 'Do you have bulk pricing for 100kg orders?',
    timestamp: new Date(Date.now() - 86400000), // 1 day ago
    unread: 2,
    avatar: 'RK',
    productName: 'Organic Farm Mussels',
    productId: '3',
    isOnline: true,
    messages: [
      {
        id: 'm9',
        senderId: 'buyer3',
        senderName: 'Rajesh Kumar',
        content: 'Hi, I need mussels for my seafood processing unit. Do you have bulk quantities?',
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
        status: 'read',
      },
      {
        id: 'm10',
        senderId: 'seller1',
        senderName: 'You',
        content: 'Yes, we can supply bulk quantities. What quantity are you looking for?',
        timestamp: new Date(Date.now() - 169200000), // 1.9 days ago
        status: 'read',
      },
      {
        id: 'm11',
        senderId: 'buyer3',
        senderName: 'Rajesh Kumar',
        content: 'Do you have bulk pricing for 100kg orders?',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        status: 'delivered',
      },
    ],
  },
];

export const SellerChatList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chats, setChats] = useState(mockSellerChats);
  const { t } = useLanguage();
  const { user } = useAuth();

  console.log('SellerChatList rendered, chats:', chats.length); // Debug log

  const filteredChats = chats.filter(chat =>
    chat.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedChatData = chats.find(chat => chat.id === selectedChat);
  const totalUnread = chats.reduce((sum, chat) => sum + chat.unread, 0);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleChatSelect = (chatId: string) => {
    console.log('Chat selected:', chatId); // Debug log
    setSelectedChat(chatId);
    // Mark chat as read
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, unread: 0 } : chat
    ));
  };

  const handleNewMessage = (chatId: string, message: Message) => {
    console.log('New message:', message); // Debug log
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, message],
          lastMessage: message.content,
          timestamp: message.timestamp,
        };
      }
      return chat;
    }));
  };

  const handleBackToList = () => {
    console.log('Back to list clicked'); // Debug log
    setSelectedChat(null);
  };

  if (selectedChat && selectedChatData) {
    console.log('Rendering ChatWindow for:', selectedChatData.participantName); // Debug log
    return (
      <div className="w-full">
        {/* Mobile Back Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Chats</span>
          </button>
        </div>
        
        <ChatWindow
          chat={selectedChatData}
          onClose={handleBackToList}
          onNewMessage={handleNewMessage}
          isFullPage={true}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-full">
      {/* Header - Fully Responsive */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col space-y-2 sm:space-y-3">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Customer Inquiries
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mt-1">
              <p className="text-sm sm:text-base text-gray-600">
                {chats.length} customer conversations
              </p>
              {totalUnread > 0 && (
                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white shadow-premium mt-1 sm:mt-0 self-start">
                  {totalUnread} unread
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Search - Responsive */}
      <div className="mb-4 sm:mb-6">
        <Card className="p-3 sm:p-4">
          <Input
            placeholder="Search customer conversations or products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} className="sm:w-5 sm:h-5" />}
            className="text-sm sm:text-base"
          />
        </Card>
      </div>

      {/* Chat List - Fully Responsive Grid */}
      {chats.length === 0 ? (
        <Card className="p-8 sm:p-12 text-center">
          <MessageSquare size={48} className="sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
            No customer inquiries yet
          </h3>
          <p className="text-sm sm:text-base text-gray-500">
            Customer messages about your products will appear here
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {filteredChats.map((chat) => (
            <Card 
              key={chat.id} 
              className="p-4 sm:p-5 lg:p-6 cursor-pointer transition-all duration-300 hover:shadow-premium hover:scale-[1.02] border-l-4 border-l-transparent hover:border-l-primary active:scale-[0.98] w-full" 
              hover
              onClick={() => {
                console.log('Card clicked for chat:', chat.id, chat.participantName); // Debug log
                handleChatSelect(chat.id);
              }}
            >
              <div className="flex flex-col space-y-3 sm:space-y-4">
                {/* Header Row - Avatar, Name, Time */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Avatar with Status */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary-dark text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg shadow-premium">
                        {chat.avatar}
                      </div>
                      {chat.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-success rounded-full border-2 border-white"></div>
                      )}
                      {chat.unread > 0 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-error text-white rounded-full text-xs font-bold flex items-center justify-center border-2 border-white">
                          {chat.unread}
                        </div>
                      )}
                    </div>
                    
                    {/* Name and Online Status */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900 text-base sm:text-lg lg:text-xl truncate">
                          {chat.participantName}
                        </h3>
                        {chat.isOnline && (
                          <span className="w-2 h-2 bg-success rounded-full animate-pulse-gentle flex-shrink-0"></span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">
                        Customer Inquiry
                      </p>
                    </div>
                  </div>
                  
                  {/* Time */}
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 flex-shrink-0">
                    <Clock size={12} className="sm:w-3 sm:h-3" />
                    <span className="font-medium">{formatTime(chat.timestamp)}</span>
                  </div>
                </div>
                
                {/* Product Name */}
                <div className="px-3 py-2 bg-primary-50 rounded-lg">
                  <p className="text-sm sm:text-base text-primary font-medium truncate">
                    📦 {chat.productName}
                  </p>
                </div>
                
                {/* Last Message */}
                <div className="flex-1">
                  <p className={`text-sm sm:text-base line-clamp-2 ${
                    chat.unread > 0 ? 'text-gray-900 font-semibold' : 'text-gray-600'
                  }`}>
                    {chat.lastMessage}
                  </p>
                </div>
                
                {/* Footer - Message Status and Icon */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    {chat.messages.length > 0 && (chat.messages[chat.messages.length - 1].senderName === 'You' || chat.messages[chat.messages.length - 1].senderId === user?.id) && (
                      <div className="flex items-center gap-1">
                        <CheckCheck size={14} className={`${
                          chat.messages[chat.messages.length - 1].status === 'read' ? 'text-primary' : 
                          chat.messages[chat.messages.length - 1].status === 'delivered' ? 'text-gray-500' : 'text-gray-400'
                        }`} />
                        <span className={`text-xs ${
                          chat.messages[chat.messages.length - 1].status === 'read' ? 'text-primary' : 
                          chat.messages[chat.messages.length - 1].status === 'delivered' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {chat.messages[chat.messages.length - 1].status === 'read' ? 'Read' : 
                           chat.messages[chat.messages.length - 1].status === 'delivered' ? 'Delivered' : 'Sent'}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <MessageSquare size={18} className={`${chat.unread > 0 ? 'text-primary' : 'text-gray-400'}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* No Search Results */}
      {filteredChats.length === 0 && searchTerm && (
        <Card className="p-6 sm:p-8 text-center">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
          <p className="text-sm sm:text-base text-gray-500">Try searching with a different customer name or product</p>
        </Card>
      )}
    </div>
  );
};