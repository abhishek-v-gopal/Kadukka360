import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    'app.name': 'Kadukka360',
    'common.loading': 'Loading...',
    'common.login': 'Login',
    'common.register': 'Register',
    'common.logout': 'Logout',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.submit': 'Submit',
    'common.update': 'Update',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.close': 'Close',
    
    // Auth
    'auth.phone_number': 'Phone Number',
    'auth.password': 'Password',
    'auth.confirm_password': 'Confirm Password',
    'auth.role': 'Role',
    'auth.seller': 'Seller',
    'auth.buyer': 'Buyer',
    'auth.full_name': 'Full Name',
    'auth.location': 'Location',
    'auth.create_account': 'Create Account',
    'auth.welcome_back': 'Welcome Back',
    'auth.create_new_account': 'Create New Account',
    
    // Dashboard
    'dashboard.seller_dashboard': 'Seller Dashboard',
    'dashboard.buyer_dashboard': 'Buyer Dashboard',
    'dashboard.add_product': 'Add Product',
    'dashboard.my_products': 'My Products',
    'dashboard.available_products': 'Available Products',
    'dashboard.saved_products': 'Saved Products',
    'dashboard.profile': 'Profile',
    'dashboard.chat': 'Chat',
    'dashboard.filters': 'Filters',
    
    // Products
    'product.name': 'Product Name',
    'product.quantity': 'Quantity (KG)',
    'product.price_per_kg': 'Price per KG (₹)',
    'product.contact_number': 'Contact Number',
    'product.upload_image': 'Upload Image',
    'product.available': 'Available',
    'product.sold_out': 'Sold Out',
    'product.chat_seller': 'Chat with Seller',
    'product.save_product': 'Save Product',
    
    // Filters
    'filter.price_range': 'Price Range',
    'filter.quantity_range': 'Quantity Range',
    'filter.location': 'Location',
    'filter.apply': 'Apply Filters',
    'filter.clear': 'Clear Filters',
    
    // Profile
    'profile.update_profile': 'Update Profile',
    'profile.phone_number': 'Phone Number',
    'profile.address': 'Address',
    'profile.upload_photo': 'Upload Photo',
    
    // Chat
    'chat.type_message': 'Type your message...',
    'chat.send': 'Send',
    'chat.no_chats': 'No chats yet',
    'chat.start_conversation': 'Start a conversation',
  },
  ml: {
    // Common
    'app.name': 'കടുക്ക360',
    'common.loading': 'ലോഡിംഗ്...',
    'common.login': 'ലോഗിൻ',
    'common.register': 'രജിസ്റ്റർ',
    'common.logout': 'ലോഗൗട്ട്',
    'common.save': 'സേവ്',
    'common.cancel': 'റദ്ദാക്കുക',
    'common.delete': 'ഇല്ലാതാക്കുക',
    'common.edit': 'എഡിറ്റ്',
    'common.submit': 'സമർപ്പിക്കുക',
    'common.update': 'അപ്ഡേറ്റ്',
    'common.back': 'തിരികെ',
    'common.next': 'അടുത്തത്',
    'common.close': 'അടയ്ക്കുക',
    
    // Auth
    'auth.phone_number': 'ഫോൺ നമ്പർ',
    'auth.password': 'പാസ്‌വേഡ്',
    'auth.confirm_password': 'പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക',
    'auth.role': 'വേഷം',
    'auth.seller': 'വിൽപ്പനക്കാരൻ',
    'auth.buyer': 'വാങ്ങുന്നവൻ',
    'auth.full_name': 'പൂർണ്ണ നാമം',
    'auth.location': 'സ്ഥലം',
    'auth.create_account': 'അക്കൗണ്ട് സൃഷ്ടിക്കുക',
    'auth.welcome_back': 'തിരികെ സ്വാഗതം',
    'auth.create_new_account': 'പുതിയ അക്കൗണ്ട് സൃഷ്ടിക്കുക',
    
    // Dashboard
    'dashboard.seller_dashboard': 'വിൽപ്പനക്കാരന്റെ ഡാഷ്‌ബോർഡ്',
    'dashboard.buyer_dashboard': 'വാങ്ങുന്നവന്റെ ഡാഷ്‌ബോർഡ്',
    'dashboard.add_product': 'ഉൽപ്പാദനം ചേർക്കുക',
    'dashboard.my_products': 'എന്റെ ഉൽപ്പാദനങ്ങൾ',
    'dashboard.available_products': 'ലഭ്യമായ ഉൽപ്പാദനങ്ങൾ',
    'dashboard.saved_products': 'സേവ് ചെയ്ത ഉൽപ്പാദനങ്ങൾ',
    'dashboard.profile': 'പ്രൊഫൈൽ',
    'dashboard.chat': 'ചാറ്റ്',
    'dashboard.filters': 'ഫിൽട്ടറുകൾ',
    
    // Products
    'product.name': 'ഉൽപ്പാദന നാമം',
    'product.quantity': 'അളവ് (കിലോ)',
    'product.price_per_kg': 'കിലോയ്ക്കുള്ള വില (₹)',
    'product.contact_number': 'ബന്ധപ്പെടാനുള്ള നമ്പർ',
    'product.upload_image': 'ചിത്രം അപ്‌ലോഡ് ചെയ്യുക',
    'product.available': 'ലഭ്യമാണ്',
    'product.sold_out': 'വിറ്റുതീർന്നു',
    'product.chat_seller': 'വിൽപ്പനക്കാരനുമായി ചാറ്റ്',
    'product.save_product': 'ഉൽപ്പാദനം സേവ് ചെയ്യുക',
    
    // Filters
    'filter.price_range': 'വിലയുടെ പരിധി',
    'filter.quantity_range': 'അളവിന്റെ പരിധി',
    'filter.location': 'സ്ഥലം',
    'filter.apply': 'ഫിൽട്ടറുകൾ പ്രയോഗിക്കുക',
    'filter.clear': 'ഫിൽട്ടറുകൾ മായ്ക്കുക',
    
    // Profile
    'profile.update_profile': 'പ്രൊഫൈൽ അപ്ഡേറ്റ് ചെയ്യുക',
    'profile.phone_number': 'ഫോൺ നമ്പർ',
    'profile.address': 'വിലാസം',
    'profile.upload_photo': 'ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക',
    
    // Chat
    'chat.type_message': 'നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക...',
    'chat.send': 'അയയ്ക്കുക',
    'chat.no_chats': 'ഇതുവരെ ചാറ്റുകളൊന്നുമില്ല',
    'chat.start_conversation': 'ഒരു സംഭാഷണം ആരംഭിക്കുക',
  },
};

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'ml', name: 'മലയാളം' },
];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('kadukka360_language', language.code);
  };

  const t = (key: string): string => {
    return translations[currentLanguage.code][key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      t,
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { languages };