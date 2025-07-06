import React, { useState } from 'react';
import { Phone, Lock, User, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../hooks/useToast';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'buyer' as 'seller' | 'buyer',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const { t } = useLanguage();
  const { error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.password || !formData.location) {
      error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        phone: formData.phone,
        role: formData.role,
        location: formData.location,
      });
    } catch  {
      error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'buyer', label: t('auth.buyer') },
    { value: 'seller', label: t('auth.seller') },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {t('auth.create_new_account')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join the community
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label={t('auth.full_name')}
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              icon={<User size={20} />}
              required
            />
            
            <Input
              label={t('auth.phone_number')}
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              icon={<Phone size={20} />}
              placeholder="+91 9876543210"
              required
              maxLength={13} 
            />
            
            <Input
              label={t('auth.password')}
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              icon={<Lock size={20} />}
              required
            />
            
            <Input
              label={t('auth.confirm_password')}
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              icon={<Lock size={20} />}
              required
            />
            
            <Select
              label={t('auth.role')}
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'seller' | 'buyer' }))}
              options={roleOptions}
            />
            
            <Input
              label={t('auth.location')}
              type="text"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              icon={<MapPin size={20} />}
              placeholder="e.g., Padanna, Kerala"
              required
            />
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full"
            size="lg"
          >
            {t('auth.create_account')}
          </Button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary hover:text-primary-dark text-sm font-medium"
            >
              Already have an account? {t('common.login')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};