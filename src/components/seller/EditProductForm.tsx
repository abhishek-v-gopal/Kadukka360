import React, { useState } from 'react';
import { Package, MapPin, Phone, Upload, Save, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../hooks/useToast';
import { Product } from '../../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';

interface EditProductFormProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

export const EditProductForm: React.FC<EditProductFormProps> = ({ 
  product, 
  onSave, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    name: product.name,
    location: product.location,
    quantity: product.quantity.toString(),
    pricePerKg: product.pricePerKg.toString(),
    contactNumber: product.contactNumber,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(product.image);
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

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedProduct: Product = {
        ...product,
        name: formData.name,
        location: formData.location,
        quantity: parseInt(formData.quantity),
        pricePerKg: parseInt(formData.pricePerKg),
        contactNumber: formData.contactNumber,
        image: imagePreview, // In real app, this would be the uploaded image URL
      };
      
      onSave(updatedProduct);
    } catch (err) {
      error('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Edit Product
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
          className="flex items-center gap-2"
        >
          <X size={16} />
          Cancel
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Product Image
          </label>
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Current product"
              className="w-32 h-32 object-cover rounded-lg border border-gray-200"
            />
          </div>
          
          {/* Image Upload */}
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Update Image (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors">
            <div className="space-y-2">
              <Upload size={24} className="mx-auto text-gray-400" />
              <div>
                <label className="cursor-pointer">
                  <span className="text-primary font-medium hover:underline">
                    Click to upload new image
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
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label={t('product.name')}
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            icon={<Package size={20} />}
            required
          />
          
          <Input
            label={t('auth.location')}
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            icon={<MapPin size={20} />}
            required
          />
          
          <Input
            label={t('product.quantity')}
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
            min="1"
            required
          />
          
          <Input
            label={t('product.price_per_kg')}
            type="number"
            value={formData.pricePerKg}
            onChange={(e) => setFormData(prev => ({ ...prev, pricePerKg: e.target.value }))}
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
          required
        />

        <div className="flex gap-4">
          <Button
            type="submit"
            loading={loading}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Update Product
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};