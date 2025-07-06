import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Phone, User, ArrowLeft, MoreVertical, CheckCheck, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Chat, Message } from '../../types';

interface ChatWindowProps {
  chat?: Chat;
  recipientName?: string;
  onClose: () => void;
  onNewMessage?: (chatId: string, message: Message) => void;
  isFullPage?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ 
  chat, 
  recipientName,
  onClose,
  onNewMessage,
  isFullPage = false 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Use either chat data or fallback to recipientName
  const displayName = chat?.participantName || recipientName || 'Unknown';
  const productName = chat?.productName || 'Product Discussion';
  const isOnline = chat?.isOnline ?? true;
  const chatId = chat?.id || 'temp-chat';

  // Initialize messages from chat data
  useEffect(() => {
    if (chat?.messages) {
      setMessages(chat.messages);
    } else {
      setMessages([]);
    }
  }, [chat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user?.id || 'current-user',
      senderName: user?.name || 'You',
      content: newMessage.trim(),
      timestamp: new Date(),
      status: 'sent',
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    
    if (onNewMessage) {
      onNewMessage(chatId, message);
    }
    
    setNewMessage('');

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);

    // Simulate read receipt
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, status: 'read' } : msg
      ));
    }, 2000);

    // Simulate response based on user role
    const isSellerUser = user?.role === 'seller';
    
    setIsTyping(true);
    setTimeout(() => {
      let responses: string[];
      let senderName: string;
      let senderId: string;
      
      if (isSellerUser) {
        // Simulate buyer response for seller
        responses = [
          'Thank you for the quick response!',
          'That sounds perfect. When can I collect?',
          'Great! I\'ll take that quantity.',
          'Can you deliver to my location?',
          'What\'s your best price for bulk orders?',
          'Are these fresh from today\'s harvest?',
          'I need them by tomorrow morning.',
          'Perfect! I\'ll confirm the order.',
          'How do I make the payment?',
          'Can I get a sample first?',
        ];
        senderName = displayName;
        senderId = 'buyer-response';
      } else {
        // Simulate seller response for buyer
        responses = [
          'Thank you for your message! I\'ll check our current stock.',
          'Yes, we can arrange that quantity. Let me confirm the pricing.',
          'Our mussels are fresh and of premium quality.',
          'We can deliver to your location. What\'s your preferred time?',
          'The harvest is ready. When would you like to collect?',
          'For bulk orders, we offer special pricing.',
          'Our farm follows sustainable practices.',
          'The mussels are packed and ready for delivery.',
          'Payment can be made on delivery or advance.',
          'We guarantee freshness and quality.',
        ];
        senderName = displayName;
        senderId = 'seller-response';
      }
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: senderId,
        senderName: senderName,
        content: randomResponse,
        timestamp: new Date(),
        status: 'sent',
      };

      const newMessages = [...updatedMessages, responseMessage];
      setMessages(newMessages);
      
      if (onNewMessage) {
        onNewMessage(chatId, responseMessage);
      }
      
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Responsive container classes
  const containerClass = isFullPage 
    ? "min-h-screen bg-gray-50 flex flex-col" 
    : "fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4";

  const chatClass = isFullPage 
    ? "flex-1 flex flex-col bg-white" 
    : "w-full max-w-4xl h-[90vh] sm:h-[600px] flex flex-col bg-white rounded-2xl overflow-hidden shadow-premium";

  // Group messages by date
  const groupedMessages = messages.reduce((groups: { [key: string]: Message[] }, message) => {
    const date = formatDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className={containerClass}>
      <div className={chatClass}>
        {/* Header - Responsive */}
        <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-200 bg-gradient-to-r from-primary to-primary-dark text-white shadow-premium">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-1 min-w-0">
            {isFullPage && (
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
              >
                <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
              </button>
            )}
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-sm sm:text-base lg:text-lg shadow-medium">
                {displayName.charAt(0)}
              </div>
              {isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-success rounded-full border-1 sm:border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base lg:text-lg truncate">{displayName}</h3>
              <p className="text-xs sm:text-sm text-white/80 mb-0.5 sm:mb-1 truncate">
                📦 {productName}
              </p>
              <p className="text-xs text-white/70 flex items-center gap-1">
                {isOnline ? (
                  <>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-success rounded-full animate-pulse-gentle"></span>
                    <span className="hidden sm:inline">Online now</span>
                    <span className="sm:hidden">Online</span>
                  </>
                ) : (
                  <>
                    <Clock size={10} className="sm:w-3 sm:h-3" />
                    <span className="hidden sm:inline">Last seen recently</span>
                    <span className="sm:hidden">Recently</span>
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button className="p-1.5 sm:p-2 lg:p-3 hover:bg-white/10 rounded-full transition-colors">
              <Phone size={16} className="sm:w-5 sm:h-5" />
            </button>
            <button className="p-1.5 sm:p-2 lg:p-3 hover:bg-white/10 rounded-full transition-colors">
              <MoreVertical size={16} className="sm:w-5 sm:h-5" />
            </button>
            {!isFullPage && (
              <button 
                onClick={onClose}
                className="p-1.5 sm:p-2 lg:p-3 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={16} className="sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Messages - Responsive */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <User size={24} className="sm:w-8 sm:h-8 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Start a conversation</h3>
              <p className="text-sm sm:text-base text-gray-500 text-center">Send a message to {displayName} about {productName}</p>
            </div>
          ) : (
            Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date}>
                {/* Date Separator */}
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <div className="bg-gray-200 text-gray-600 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                    {date}
                  </div>
                </div>
                
                {/* Messages for this date */}
                <div className="space-y-3 sm:space-y-4">
                  {dateMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === user?.id || message.senderName === 'You' ? 'justify-end' : 'justify-start'} animate-slide-in-right`}
                    >
                      <div className="max-w-[85%] sm:max-w-[75%]">
                        <div
                          className={`p-3 sm:p-4 rounded-2xl shadow-soft ${
                            message.senderId === user?.id || message.senderName === 'You'
                              ? 'bg-gradient-to-r from-primary to-primary-dark text-white rounded-br-md'
                              : 'bg-white text-gray-900 rounded-bl-md border border-gray-100'
                          }`}
                        >
                          <p className="text-sm sm:text-base leading-relaxed break-words">{message.content}</p>
                        </div>
                        <div className={`flex items-center gap-1 sm:gap-2 mt-1 sm:mt-2 px-1 sm:px-2 ${
                          message.senderId === user?.id || message.senderName === 'You' ? 'justify-end' : 'justify-start'
                        }`}>
                          <p className="text-xs text-gray-500 font-medium">
                            {formatTime(message.timestamp)}
                          </p>
                          {(message.senderId === user?.id || message.senderName === 'You') && (
                            <div className="flex items-center gap-1">
                              <CheckCheck size={12} className={`sm:w-3.5 sm:h-3.5 ${
                                message.status === 'read' ? 'text-primary' : 
                                message.status === 'delivered' ? 'text-gray-500' : 'text-gray-400'
                              }`} />
                              <span className={`text-xs hidden sm:inline ${
                                message.status === 'read' ? 'text-primary' : 
                                message.status === 'delivered' ? 'text-gray-500' : 'text-gray-400'
                              }`}>
                                {message.status === 'read' ? 'Read' : 
                                 message.status === 'delivered' ? 'Delivered' : 'Sent'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white text-gray-900 p-3 sm:p-4 rounded-2xl rounded-bl-md shadow-soft border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-typing"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{displayName} is typing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input - Responsive */}
        <div className="p-3 sm:p-4 lg:p-6 border-t border-gray-200 bg-white">
          <div className="flex gap-2 sm:gap-3">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl resize-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 shadow-soft text-sm sm:text-base"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-center rounded-xl sm:rounded-2xl shadow-premium flex-shrink-0"
              size="sm"
            >
              <Send size={16} className="sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};