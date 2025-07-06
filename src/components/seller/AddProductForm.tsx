import React, { useState } from 'react';
import { Package, MapPin, Phone, Upload } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../hooks/useToast';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';

interface AddProductFormProps {
  onSuccess: () => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    quantity: '',
    pricePerKg: '',
    contactNumber: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  const { t } = useLanguage();
  const { success, error } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        error('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.quantity || !formData.pricePerKg || !formData.contactNumber) {
      error('Please fill in all fields');
      return;
    }

    if (!imageFile) {
      error('Please upload a product image');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      success('Product added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        location: '',
        quantity: '',
        pricePerKg: '',
        contactNumber: '',
      });
      setImageFile(null);
      setImagePreview('');
      
      onSuccess();
    } catch  {
      error('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {t('dashboard.add_product')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('product.upload_image')} *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
            {imagePreview ? (
              <div className="space-y-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto h-32 w-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview('');
                  }}
                  className="text-sm text-error hover:underline"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload size={32} className="mx-auto text-gray-400" />
                <div>
                  <label className="cursor-pointer">
                    <span className="text-primary font-medium hover:underline">
                      Click to upload
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label={t('product.name')}
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            icon={<Package size={20} />}
            placeholder="e.g., Fresh Green Mussels"
            required
          />
          
          <Input
            label={t('auth.location')}
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            icon={<MapPin size={20} />}
            placeholder="e.g., Padanna, Kerala"
            required
          />
          
          <Input
            label={t('product.quantity')}
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
            placeholder="e.g., 50"
            min="1"
            required
          />
          
          <Input
            label={t('product.price_per_kg')}
            type="number"
            value={formData.pricePerKg}
            onChange={(e) => setFormData(prev => ({ ...prev, pricePerKg: e.target.value }))}
            placeholder="e.g., 120"
            min="1"
            required
          />
        </div>
        
        <Input
          label={t('product.contact_number')}
          type="tel"
          value={formData.contactNumber}
          onChange={(e) => setFormData(prev => ({ ...prev, contactNumber: e.target.value }))}
          icon={<Phone size={20} />}
          placeholder="+91 9876543210"
          required
        />

        <div className="flex gap-4">
          <Button
            type="submit"
            loading={loading}
            className="flex-1"
          >
            {t('common.submit')}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onSuccess}
            className="flex-1"
          >
            {t('common.cancel')}
          </Button>
        </div>
      </form>
    </Card>
  );
};