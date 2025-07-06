import React, { useEffect } from 'react';
// import { useLanguage } from '../../contexts/LanguageContext';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  // const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-primary-800 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        {/* <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center animate-pulse-gentle shadow-premium">
            </div>
            <div className="absolute inset-0 bg-white opacity-10 rounded-full blur-xl animate-bounce-gentle"></div>
          </div>
        </div> */}
        <div className="mb-8 flex item-center justify-center">
              <img src="/assets/Group 1.svg" alt="" className='' />
        </div>
        <p className="text-xl text-green-100 mb-8 font-medium">
          From Seed to Sale - All in One Shell
        </p>
        <div className="flex justify-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};