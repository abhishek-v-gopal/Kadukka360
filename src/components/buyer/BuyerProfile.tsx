import React, { useState } from 'react';
import { User, MapPin, Save, Upload, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage, languages } from '../../contexts/LanguageContext';
import { useToast } from '../../hooks/useToast';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';

export const BuyerProfile: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { success } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateProfile(formData);
      success('Profile updated successfully!');
    } catch  {
      // Error handled by toast
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Information */}
      <Card className="p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-medium">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user?.name}
            </h2>
            <p className="text-gray-600 capitalize">{user?.role}</p>
            <p className="text-sm text-gray-500 mt-1">{user?.location}</p>
          </div>
        </div>

        {/* Profile Photo Upload */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('profile.upload_photo')}
          </label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-gray-200">
              <User size={40} className="text-gray-400" />
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Upload size={16} />
              Upload Photo
            </Button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label={t('auth.full_name')}
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              icon={<User size={20} />}
              required
            />
            
            <Input
              label={t('auth.location')}
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              icon={<MapPin size={20} />}
              required
            />
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {t('common.save')}
          </Button>
        </form>
      </Card>

      {/* Language Settings */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <Globe size={24} />
          Language Settings
        </h3>
        
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Language
          </label>
          <div className="grid grid-cols-2 gap-4">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  currentLanguage.code === lang.code
                    ? 'border-primary bg-primary-50 text-primary font-semibold'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Account Actions */}
      <Card className="p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Account Actions
        </h3>
        
        <div className="space-y-4">
          <Button
            variant="danger"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut size={20} />
            {t('common.logout')}
          </Button>
        </div>
      </Card>
    </div>
  );
};