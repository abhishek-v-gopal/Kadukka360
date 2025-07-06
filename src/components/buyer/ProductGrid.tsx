import React, { useState, useMemo } from 'react';
import { MessageSquare, Bookmark, MapPin, Phone, Package } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../hooks/useToast';
import { Product } from '../../types';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { ChatWindow } from '../chat/ChatWindow';

interface ProductGridProps {
  filters: {
    priceRange: number[];
    quantityRange: number[];
    location: string;
  };
}

// Mock data with mussel images only
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Green Mussels',
    image: '/assets/images/1 (1).jpg',
    location: 'Padanna, Kerala',
    quantity: 50,
    pricePerKg: 120,
    contactNumber: '+91 9876543210',
    sellerId: '1',
    sellerName: 'Ravi Kumar',
    status: 'available',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Premium Black Mussels',
    image: '/assets/images/1 (2).jpg',
    location: 'Kasaragod, Kerala',
    quantity: 30,
    pricePerKg: 150,
    contactNumber: '+91 9876543211',
    sellerId: '2',
    sellerName: 'Suresh Nair',
    status: 'available',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Organic Farm Mussels',
    image: '/assets/images/1 (3).jpg',
    location: 'Kannur, Kerala',
    quantity: 25,
    pricePerKg: 180,
    contactNumber: '+91 9876543212',
    sellerId: '3',
    sellerName: 'Priya Menon',
    status: 'available',
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Fresh Sea Mussels',
    image: '/assets/images/1 (4).jpg',
    location: 'Kozhikode, Kerala',
    quantity: 40,
    pricePerKg: 135,
    contactNumber: '+91 9876543213',
    sellerId: '4',
    sellerName: 'Anil Das',
    status: 'available',
    createdAt: new Date(),
  },
  {
    id: '5',
    name: 'Large Green Mussels',
    image: '/assets/images/1 (5).jpg',
    location: 'Malappuram, Kerala',
    quantity: 60,
    pricePerKg: 110,
    contactNumber: '+91 9876543214',
    sellerId: '5',
    sellerName: 'Lakshmi Nair',
    status: 'available',
    createdAt: new Date(),
  },
  {
    id: '6',
    name: 'Premium Quality Mussels',
    image: '/assets/images/1 (6).jpg',
    location: 'Thrissur, Kerala',
    quantity: 35,
    pricePerKg: 165,
    contactNumber: '+91 9876543215',
    sellerId: '6',
    sellerName: 'Rajesh Kumar',
    status: 'available',
    createdAt: new Date(),
  },
];

export const ProductGrid: React.FC<ProductGridProps> = ({ filters }) => {
  const [savedProducts, setSavedProducts] = useState<string[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const { t } = useLanguage();
  const { success } = useToast();

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesPrice = product.pricePerKg >= filters.priceRange[0] && product.pricePerKg <= filters.priceRange[1];
      const matchesQuantity = product.quantity >= filters.quantityRange[0] && product.quantity <= filters.quantityRange[1];
      const matchesLocation = !filters.location || product.location.toLowerCase().includes(filters.location.toLowerCase());
      
      return matchesPrice && matchesQuantity && matchesLocation;
    });
  }, [filters]);

  const toggleSaved = (productId: string) => {
    setSavedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    
    const isSaved = savedProducts.includes(productId);
    success(isSaved ? 'Product removed from saved' : 'Product saved successfully');
  };

  const handleChatClick = (product: Product) => {
    setSelectedChat(product.sellerName);
  };

  const handleNewMessage = (chatId: string, message: any) => {
    // Handle new message if needed
    console.log('New message:', message);
  };

  if (filteredProducts.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Package size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500 mb-6">Try adjusting your filters to see more results</p>
        <div className="text-sm text-gray-400">
          <p>Current filters:</p>
          <p>Price: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}</p>
          <p>Quantity: {filters.quantityRange[0]} - {filters.quantityRange[1]} KG</p>
          {filters.location && <p>Location: {filters.location}</p>}
        </div>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {t('dashboard.available_products')}
            </h2>
            <p className="text-gray-600 mt-1">{filteredProducts.length} products available</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group" hover>
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleSaved(product.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                    savedProducts.includes(product.id)
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white/90 text-gray-600 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <Bookmark size={18} fill={savedProducts.includes(product.id) ? 'currentColor' : 'none'} />
                </button>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-success text-white px-2 py-1 rounded-full text-xs font-medium">
                    {product.status === 'available' ? 'Available' : 'Sold Out'}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm">{product.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Phone size={16} className="text-primary" />
                  <span className="text-sm">{product.contactNumber}</span>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                    <span className="font-medium">{product.quantity} KG</span> available
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      ₹{product.pricePerKg}
                    </div>
                    <div className="text-xs text-gray-500">per kg</div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 mb-4 bg-gray-50 p-2 rounded-lg">
                  <span className="font-medium">Seller:</span> {product.sellerName}
                </div>
                
                <Button
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark"
                  onClick={() => handleChatClick(product)}
                >
                  <MessageSquare size={18} />
                  {t('product.chat_seller')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {selectedChat && (
        <ChatWindow
          recipientName={selectedChat}
          onClose={() => setSelectedChat(null)}
          onNewMessage={handleNewMessage}
        />
      )}
    </>
  );
};