import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-soft border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            {/* <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <img src="/assets/Group 1.svg" alt="" className='w-[30px]'/>
            </div> */}
            <h1 className="text-xl font-bold text-gray-900">
              {t('app.name')}
            </h1>
          </div>
          
          <div className="text-sm text-gray-600 hidden sm:block">
            From Seed to Sale - All in One Shell
          </div>
        </div>
      </div>
    </header>
  );
};