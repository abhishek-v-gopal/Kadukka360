import React, { useState } from 'react';
import { Plus, Package, MessageSquare, User, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ProductList } from './ProductList';
import { AddProductForm } from './AddProductForm';
import { SellerProfile } from './SellerProfile';
import { SellerChatList } from './SellerChatList';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

type ActiveTab = 'products' | 'add-product' | 'profile' | 'chat';

export const SellerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('products');
  const { user } = useAuth();
  const { t } = useLanguage();

  const tabs = [
    { id: 'products', label: t('dashboard.my_products'), icon: Package },
    { id: 'add-product', label: t('dashboard.add_product'), icon: Plus },
    { id: 'chat', label: t('dashboard.chat'), icon: MessageSquare },
    { id: 'profile', label: t('dashboard.profile'), icon: User },
  ];

  const renderContent = () => {
    console.log('Current active tab:', activeTab); // Debug log
    
    switch (activeTab) {
      case 'products':
        return <ProductList />;
      case 'add-product':
        return <AddProductForm onSuccess={() => setActiveTab('products')} />;
      case 'profile':
        return <SellerProfile />;
      case 'chat':
        console.log('Rendering SellerChatList'); // Debug log
        return <SellerChatList />;
      default:
        return <ProductList />;
    }
  };

  const handleTabClick = (tabId: string) => {
    console.log('Tab clicked:', tabId); // Debug log
    setActiveTab(tabId as ActiveTab);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-soft border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('dashboard.seller_dashboard')}
              </h1>
              <p className="text-gray-600 mt-1">Welcome back, {user?.name}!</p>
            </div>
            
            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-xs text-gray-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">12</div>
                <div className="text-xs text-gray-500">Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">3</div>
                <div className="text-xs text-gray-500">Messages</div>
              </div>
            </div>
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
                    onClick={() => handleTabClick(tab.id)}
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
                      onClick={() => handleTabClick(tab.id)}
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

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setActiveTab('add-product')}
                >
                  <Plus size={16} />
                  Add New Product
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setActiveTab('chat')}
                >
                  <MessageSquare size={16} />
                  View Messages
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};