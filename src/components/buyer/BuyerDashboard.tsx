import React, { useState } from 'react';
import { Search, Bookmark, MessageSquare, User, Filter, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ProductGrid } from './ProductGrid';
import { ProductFilters } from './ProductFilters';
import { SavedProducts } from './SavedProducts';
import { BuyerProfile } from './BuyerProfile';
import { ChatList } from '../chat/ChatList';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

type ActiveTab = 'products' | 'saved' | 'profile' | 'chat';

export const BuyerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('products');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    quantityRange: [0, 100],
    location: '',
  });
  
  const { user } = useAuth();
  const { t } = useLanguage();

  const tabs = [
    { id: 'products', label: t('dashboard.available_products'), icon: Search },
    { id: 'saved', label: t('dashboard.saved_products'), icon: Bookmark },
    { id: 'chat', label: t('dashboard.chat'), icon: MessageSquare },
    { id: 'profile', label: t('dashboard.profile'), icon: User },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductGrid filters={filters} />;
      case 'saved':
        return <SavedProducts />;
      case 'profile':
        return <BuyerProfile />;
      case 'chat':
        return <ChatList />;
      default:
        return <ProductGrid filters={filters} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-soft border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('dashboard.buyer_dashboard')}
              </h1>
              <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
            </div>
            
            {/* Filter Button for Products Tab */}
            {activeTab === 'products' && (
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2"
                size="sm"
              >
                <Filter size={16} />
                Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Tab Navigation */}
        <div className="md:hidden mb-8">
          <Card className="p-3">
            <div className="grid grid-cols-4 gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as ActiveTab)}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary text-white shadow-medium transform scale-105'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                    }`}
                  >
                    <Icon size={22} />
                    <span className="text-xs mt-2 font-medium leading-tight text-center">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as ActiveTab)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                        activeTab === tab.id
                          ? 'bg-primary text-white shadow-medium'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                      }`}
                    >
                      <Icon size={20} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </Card>

            {/* Desktop Filters for Products Tab */}
            {activeTab === 'products' && (
              <ProductFilters
                filters={filters}
                onFiltersChange={setFilters}
              />
            )}
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Mobile Filters Modal */}
            {showFilters && activeTab === 'products' && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <ProductFilters
                    filters={filters}
                    onFiltersChange={setFilters}
                    onClose={() => setShowFilters(false)}
                  />
                </div>
              </div>
            )}
            
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};