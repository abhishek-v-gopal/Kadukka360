import React, { useState } from 'react';
import { MessageSquare, Search, Clock, CheckCheck } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { ChatWindow } from './ChatWindow';
import { Chat, Message } from '../../types';

// Enhanced mock chat data with realistic conversation flow
const mockChats: Chat[] = [
	{
		id: '1',
		participantName: 'Ravi Kumar',
		participantRole: 'seller',
		lastMessage:
			'Yes, we have 50kg fresh mussels available. When do you need them?',
		timestamp: new Date(Date.now() - 7200000), // 2 hours ago
		unread: 2,
		avatar: 'RK',
		productName: 'Fresh Green Mussels',
		productId: '1',
		isOnline: true,
		messages: [
			{
				id: 'm1',
				senderId: 'buyer1',
				senderName: 'You',
				content:
					"Hi, I'm interested in your fresh green mussels. Are they still available?",
				timestamp: new Date(Date.now() - 10800000), // 3 hours ago
				status: 'read',
			},
			{
				id: 'm2',
				senderId: 'seller1',
				senderName: 'Ravi Kumar',
				content:
					'Hello! Yes, we have fresh mussels harvested this morning. How much quantity do you need?',
				timestamp: new Date(Date.now() - 9600000), // 2.5 hours ago
				status: 'read',
			},
			{
				id: 'm3',
				senderId: 'buyer1',
				senderName: 'You',
				content:
					"I need around 25-30kg for my restaurant. What's your price per kg?",
				timestamp: new Date(Date.now() - 8400000), // 2.3 hours ago
				status: 'read',
			},
			{
				id: 'm4',
				senderId: 'seller1',
				senderName: 'Ravi Kumar',
				content:
					'For 25-30kg, I can offer ₹115 per kg. These are premium quality mussels from clean waters.',
				timestamp: new Date(Date.now() - 7800000), // 2.1 hours ago
				status: 'read',
			},
			{
				id: 'm5',
				senderId: 'buyer1',
				senderName: 'You',
				content:
					'That sounds good. Can you deliver to Kozhikode by tomorrow morning?',
				timestamp: new Date(Date.now() - 7500000), // 2.05 hours ago
				status: 'read',
			},
			{
				id: 'm6',
				senderId: 'seller1',
				senderName: 'Ravi Kumar',
				content: 'Yes, we have 50kg fresh mussels available. When do you need them?',
				timestamp: new Date(Date.now() - 7200000), // 2 hours ago
				status: 'delivered',
			},
		],
	},
	{
		id: '2',
		participantName: 'Priya Menon',
		participantRole: 'seller',
		lastMessage:
			'Thank you for the order! The mussels are packed and ready for pickup.',
		timestamp: new Date(Date.now() - 86400000), // 1 day ago
		unread: 0,
		avatar: 'PM',
		productName: 'Organic Farm Mussels',
		productId: '3',
		isOnline: false,
		messages: [
			{
				id: 'm7',
				senderId: 'buyer1',
				senderName: 'You',
				content:
					'Hi Priya, I saw your organic mussels listing. Are they certified organic?',
				timestamp: new Date(Date.now() - 172800000), // 2 days ago
				status: 'read',
			},
			{
				id: 'm8',
				senderId: 'seller3',
				senderName: 'Priya Menon',
				content:
					'Yes, we have organic certification. Our farm follows sustainable practices.',
				timestamp: new Date(Date.now() - 169200000), // 1.9 days ago
				status: 'read',
			},
			{
				id: 'm9',
				senderId: 'seller3',
				senderName: 'Priya Menon',
				content:
					'Thank you for the order! The mussels are packed and ready for pickup.',
				timestamp: new Date(Date.now() - 86400000), // 1 day ago
				status: 'read',
			},
		],
	},
	{
		id: '3',
		participantName: 'Suresh Nair',
		participantRole: 'seller',
		lastMessage: 'For 100kg, I can give you a special price of ₹140 per kg.',
		timestamp: new Date(Date.now() - 172800000), // 2 days ago
		unread: 1,
		avatar: 'SN',
		productName: 'Premium Black Mussels',
		productId: '2',
		isOnline: true,
		messages: [
			{
				id: 'm10',
				senderId: 'buyer1',
				senderName: 'You',
				content:
					'Hello, I need bulk quantity of black mussels. Do you have 100kg available?',
				timestamp: new Date(Date.now() - 259200000), // 3 days ago
				status: 'read',
			},
			{
				id: 'm11',
				senderId: 'seller2',
				senderName: 'Suresh Nair',
				content:
					'Yes, we can arrange 100kg. Let me check our current stock and get back to you.',
				timestamp: new Date(Date.now() - 255600000), // 2.9 days ago
				status: 'read',
			},
			{
				id: 'm12',
				senderId: 'seller2',
				senderName: 'Suresh Nair',
				content: 'For 100kg, I can give you a special price of ₹140 per kg.',
				timestamp: new Date(Date.now() - 172800000), // 2 days ago
				status: 'delivered',
			},
		],
	},
];


export const ChatList: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedChat, setSelectedChat] = useState<string | null>(null);
	const [chats, setChats] = useState(mockChats);
	const { t } = useLanguage();
	const { user } = useAuth();

	const filteredChats = chats.filter(
		(chat) =>
			chat.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			chat.productName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const selectedChatData = chats.find((chat) => chat.id === selectedChat);
	const totalUnread = chats.reduce((sum, chat) => sum + chat.unread, 0);

	const formatTime = (date: Date) => {
		const now = new Date();
		const diffInHours = Math.floor(
			(now.getTime() - date.getTime()) / (1000 * 60 * 60)
		);

		if (diffInHours < 1) {
			const diffInMinutes = Math.floor(
				(now.getTime() - date.getTime()) / (1000 * 60)
			);
			return `${diffInMinutes}m ago`;
		} else if (diffInHours < 24) {
			return `${diffInHours}h ago`;
		} else {
			const diffInDays = Math.floor(diffInHours / 24);
			return `${diffInDays}d ago`;
		}
	};

	const handleChatSelect = (chatId: string) => {
		setSelectedChat(chatId);
		// Mark chat as read
		setChats((prev) =>
			prev.map((chat) =>
				chat.id === chatId ? { ...chat, unread: 0 } : chat
			)
		);
	};

	const handleNewMessage = (chatId: string, message: Message) => {
		setChats((prev) =>
			prev.map((chat) => {
				if (chat.id === chatId) {
					return {
						...chat,
						messages: [...chat.messages, message],
						lastMessage: message.content,
						timestamp: message.timestamp,
					};
				}
				return chat;
			})
		);
	};

	if (selectedChat && selectedChatData) {
		return (
			<ChatWindow
				chat={selectedChatData}
				onClose={() => setSelectedChat(null)}
				onNewMessage={handleNewMessage}
				isFullPage={true}
			/>
		);
	}

	return (
		<div className="w-full max-w-full">
			{/* Header - Fully Responsive */}
			<div className="mb-4 sm:mb-6">
				<div className="flex flex-col space-y-2 sm:space-y-3">
					<div>
						<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
							{t('dashboard.chat')}
						</h2>
						<div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mt-1">
							<p className="text-sm sm:text-base text-gray-600">
								{chats.length} conversations
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
						placeholder="Search conversations or products..."
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
					<MessageSquare
						size={48}
						className="sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4"
					/>
					<h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
						{t('chat.no_chats')}
					</h3>
					<p className="text-sm sm:text-base text-gray-500">
						{t('chat.start_conversation')}
					</p>
				</Card>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
					{filteredChats.map((chat) => (
						<div
							key={chat.id}
							className="cursor-pointer"
							onClick={() => handleChatSelect(chat.id)}
						>
							<Card className="p-4 sm:p-5 lg:p-6 cursor-pointer transition-all duration-300 hover:shadow-premium hover:scale-[1.02] border-l-4 border-l-transparent hover:border-l-primary active:scale-[0.98] w-full">
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
											</div>
										</div>

										{/* Time */}
										<div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 flex-shrink-0">
											<Clock size={12} className="sm:w-3 sm:h-3" />
											<span className="font-medium">
												{formatTime(chat.timestamp)}
											</span>
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
										<p
											className={`text-sm sm:text-base line-clamp-2 ${
												chat.unread > 0
													? 'text-gray-900 font-semibold'
													: 'text-gray-600'
											}`}
										>
											{chat.lastMessage}
										</p>
									</div>

									{/* Footer - Message Status and Icon */}
									<div className="flex items-center justify-between pt-2 border-t border-gray-100">
										<div className="flex items-center gap-2">
											{chat.messages.length > 0 &&
												chat.messages[chat.messages.length - 1].senderId ===
													user?.id && (
													<div className="flex items-center gap-1">
														<CheckCheck
															size={14}
															className={`${
																chat.messages[
																	chat.messages.length - 1
																].status === 'read'
																	? 'text-primary'
																	: chat.messages[
																			chat.messages.length - 1
																	  ].status === 'delivered'
																	? 'text-gray-500'
																	: 'text-gray-400'
															}`}
														/>
														<span
															className={`text-xs ${
																chat.messages[
																	chat.messages.length - 1
																].status === 'read'
																	? 'text-primary'
																	: chat.messages[
																			chat.messages.length - 1
																	  ].status === 'delivered'
																	? 'text-gray-500'
																	: 'text-gray-400'
															}`}
														>
															{chat.messages[
																chat.messages.length - 1
															].status === 'read'
																? 'Read'
																: chat.messages[
																		chat.messages.length - 1
																  ].status === 'delivered'
																? 'Delivered'
																: 'Sent'}
														</span>
													</div>
												)}
										</div>

										<MessageSquare
											size={18}
											className={`${
												chat.unread > 0
													? 'text-primary'
													: 'text-gray-400'
											}`}
										/>
									</div>
								</div>
							</Card>
						</div>
					))}
				</div>
			)}

			{/* No Search Results */}
			{filteredChats.length === 0 && searchTerm && (
				<Card className="p-6 sm:p-8 text-center">
					<h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
						No chats found
					</h3>
					<p className="text-sm sm:text-base text-gray-500">
						Try searching with a different name or product
					</p>
				</Card>
			)}
		</div>
	);
};