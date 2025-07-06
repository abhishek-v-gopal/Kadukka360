import React, { useState } from 'react';
import { Edit, Trash2, MapPin, Package, Eye, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useToast } from '../../hooks/useToast';
import { Product } from '../../types';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { EditProductForm } from './EditProductForm';

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
    sellerName: 'Demo Seller',
    status: 'available',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Premium Black Mussels',
    image: '/assets/images/1 (3).jpg',
    location: 'Kasaragod, Kerala',
    quantity: 30,
    pricePerKg: 150,
    contactNumber: '+91 9876543210',
    sellerId: '1',
    sellerName: 'Demo Seller',
    status: 'sold-out',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Organic Farm Mussels',
    image: '/assets/images/1 (6).jpg',
    location: 'Kannur, Kerala',
    quantity: 25,
    pricePerKg: 180,
    contactNumber: '+91 9876543210',
    sellerId: '1',
    sellerName: 'Demo Seller',
    status: 'available',
    createdAt: new Date(),
  },
];

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { t } = useLanguage();
  const { success, error } = useToast();

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      success('Product deleted successfully');
    }
  };

  const toggleStatus = (productId: string) => {
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, status: p.status === 'available' ? 'sold-out' : 'available' }
        : p
    ));
    success('Product status updated');
  };

  const handleEditSave = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    setEditingProduct(null);
    success('Product updated successfully');
  };

  if (editingProduct) {
    return (
      <EditProductForm
        product={editingProduct}
        onSave={handleEditSave}
        onCancel={() => setEditingProduct(null)}
      />
    );
  }

  if (products.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Package size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">No products yet</h3>
        <p className="text-gray-500 mb-6">Start by adding your first product</p>
        <Button className="mx-auto">
          <Package size={20} />
          Add Your First Product
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {t('dashboard.my_products')}
          </h2>
          <p className="text-gray-600 mt-1">{products.length} products listed</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden group" hover>
            <div className="md:flex">
              <div className="md:w-48 h-48 md:h-40 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.status === 'available'
                      ? 'bg-success text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    {product.status === 'available' ? t('product.available') : t('product.sold_out')}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-xl font-bold text-primary">
                      ₹{product.pricePerKg}
                    </div>
                    <div className="text-xs text-gray-500">per kg</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm">{product.location}</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                    <span className="font-medium">{product.quantity} KG</span> available
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Eye size={14} />
                    <span className="text-xs">24 views</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MessageSquare size={14} />
                    <span className="text-xs">3 inquiries</span>
                  </div>
                </div>
                
                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant={product.status === 'available' ? 'outline' : 'primary'}
                    onClick={() => toggleStatus(product.id)}
                    className="flex-1 min-w-0"
                  >
                    {product.status === 'available' ? 'Mark Sold Out' : 'Mark Available'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingProduct(product)}
                    className="flex items-center gap-1"
                  >
                    <Edit size={14} />
                    {t('common.edit')}
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    {t('common.delete')}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};