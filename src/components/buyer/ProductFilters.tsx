import React from 'react';
import { MapPin, Package } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';

interface ProductFiltersProps {
  filters: {
    priceRange: number[];
    quantityRange: number[];
    location: string;
  };
  onFiltersChange: (filters: any) => void;
  onClose?: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  onClose,
}) => {
  const { t } = useLanguage();

  const handleClearFilters = () => {
    onFiltersChange({
      priceRange: [0, 500],
      quantityRange: [0, 100],
      location: '',
    });
  };

  const handleApplyFilters = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Package size={20} />
        {t('dashboard.filters')}
      </h3>
      
      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            {t('filter.price_range')} (₹)
          </label>
          <div className="space-y-3">
            <div className="flex gap-3 items-center">
              <div className="flex-1">
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]]
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Min"
                  min="0"
                />
              </div>
              <span className="text-gray-500 font-medium">to</span>
              <div className="flex-1">
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    priceRange: [filters.priceRange[0], parseInt(e.target.value) || 500]
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Max"
                  min="0"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Current range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
            </div>
          </div>
        </div>

        {/* Quantity Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Package size={16} />
            {t('filter.quantity_range')} (KG)
          </label>
          <div className="space-y-3">
            <div className="flex gap-3 items-center">
              <div className="flex-1">
                <input
                  type="number"
                  value={filters.quantityRange[0]}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    quantityRange: [parseInt(e.target.value) || 0, filters.quantityRange[1]]
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Min"
                  min="0"
                />
              </div>
              <span className="text-gray-500 font-medium">to</span>
              <div className="flex-1">
                <input
                  type="number"
                  value={filters.quantityRange[1]}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    quantityRange: [filters.quantityRange[0], parseInt(e.target.value) || 100]
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Max"
                  min="0"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Current range: {filters.quantityRange[0]} - {filters.quantityRange[1]} KG
            </div>
          </div>
        </div>

        {/* Location */}
        <Input
          label={t('filter.location')}
          value={filters.location}
          onChange={(e) => onFiltersChange({
            ...filters,
            location: e.target.value
          })}
          icon={<MapPin size={16} />}
          placeholder="Enter location (e.g., Padanna, Kerala)"
        />

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleClearFilters}
            className="flex-1"
          >
            {t('filter.clear')}
          </Button>
          {onClose && (
            <Button
              onClick={handleApplyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};