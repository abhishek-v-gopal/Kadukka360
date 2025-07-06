import React, { useState } from 'react';
import { Phone, Lock,  } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../hooks/useToast';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    role: 'buyer' as 'seller' | 'buyer',
  });
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();
  const { error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone || !formData.password) {
      error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(formData.phone, formData.password, formData.role);
    } catch (err) {
      error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'buyer', label: t('auth.buyer') },
    { value: 'seller', label: t('auth.seller') },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {t('auth.welcome_back')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
            
            <Select
              label={t('auth.role')}
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'seller' | 'buyer' }))}
              options={roleOptions}
            />
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full"
            size="lg"
          >
            {t('common.login')}
          </Button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-primary hover:text-primary-dark text-sm font-medium"
            >
              {t('auth.create_account')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};