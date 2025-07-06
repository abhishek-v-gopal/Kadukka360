import React, { useState } from 'react';
import { Bookmark, MessageSquare, MapPin, Trash2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../hooks/useToast';
import { Product } from '../../types';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

// Mock saved products
const mockSavedProducts: Product[] = [
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
];

export const SavedProducts: React.FC = () => {
  const [savedProducts, setSavedProducts] = useState<Product[]>(mockSavedProducts);
  const { t } = useLanguage();
  const { success } = useToast();

  const removeSaved = (productId: string) => {
    setSavedProducts(prev => prev.filter(p => p.id !== productId));
    success('Product removed from saved');
  };

  if (savedProducts.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Bookmark size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No saved products</h3>
        <p className="text-gray-500">Products you save will appear here</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {t('dashboard.saved_products')} ({savedProducts.length})
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {savedProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden" hover>
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => removeSaved(product.id)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full text-error hover:bg-red-50 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.name}
              </h3>
              
              <div className="flex items-center gap-1 text-gray-600 mb-3">
                <MapPin size={16} />
                <span className="text-sm">{product.location}</span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-gray-600">
                  <span>{product.quantity} KG available</span>
                </div>
                <div className="text-xl font-bold text-primary">
                  ₹{product.pricePerKg}/kg
                </div>
              </div>
              
              <div className="text-sm text-gray-500 mb-4">
                Seller: {product.sellerName}
              </div>
              
              <Button
                className="w-full flex items-center justify-center gap-2"
                onClick={() => success('Chat feature coming soon!')}
              >
                <MessageSquare size={20} />
                {t('product.chat_seller')}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};