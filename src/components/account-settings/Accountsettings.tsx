import React, { useState } from 'react';
import AccountSettingsPage from './AccountProfile'
import AboutPage from './AboutUs';
import PrivacyPolicySettings from './PrivacyPolicy';
import TermsConditionsPage from './TermsandConditions';


const SettingsPage: React.FC = () => {
  const [tab, setTab] = useState<string>('Account Settings');

  const handleRenderComponent = (tabText: string) => {
    setTab(tabText);
  };

  const getButtonClassName = (tabName: string) => {
    const baseClasses = "font-semibold py-2 px-4 border rounded border-[#9b111e] transition-all duration-200";
    
    if (tab === tabName) {
      // Active state - keep hover colors
      return `${baseClasses} text-white bg-gradient-to-br from-[#700808] via-[#a61c1c] to-[#d23c3c]`;
    } else {
      // Inactive state - normal styling with hover
      return `${baseClasses} text-[#9b111e] bg-white hover:text-white hover:bg-gradient-to-br hover:from-[#700808] hover:via-[#a61c1c] hover:to-[#d23c3c]`;
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap align-center justify-center gap-4 mb-6">
        <button
          onClick={() => handleRenderComponent('About us')}
          className={getButtonClassName('About us')}
        >
          About us
        </button>

        <button
          onClick={() => handleRenderComponent('Privacy Policy')}
          className={getButtonClassName('Privacy Policy')}
        >
          Privacy Policy
        </button>

        <button
          onClick={() => handleRenderComponent('Terms & Conditions')}
          className={getButtonClassName('Terms & Conditions')}
        >
          Terms & Conditions
        </button>
      </div>

      <div>
        {tab === 'Account Settings' && <AccountSettingsPage />}
        {tab === 'Privacy Policy' && <PrivacyPolicySettings />}
        {tab === 'Terms & Conditions' && <TermsConditionsPage />}
        {tab === 'About us' && <AboutPage />}
      </div>
    </div>
  );
};

export default SettingsPage;