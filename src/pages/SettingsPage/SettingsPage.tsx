import { useState } from "react";
import PrivacyPolicySettings from "../../components/account-settings/PrivacyPolicy";
import TermsConditionsPage from "../../components/account-settings/TermsandConditions";
import AboutPage from "../../components/account-settings/AboutUs";

const SettingsPage = () => {
	const [tab, setTab] = useState<string>('About us');
	
	  const handleRenderComponent = (tabText: string) => {
		setTab(tabText);
	  };
	
	  const getButtonClassName = (tabName: string) => {
		const baseClasses = "font-semibold py-2 px-4 border rounded border-[#0050A5] transition-all duration-200";
		
		if (tab === tabName) {
		  // Active state - keep hover colors
		  return `${baseClasses} text-white bg-[#0050A5]`;
		} else {
		  // Inactive state - normal styling with hover
		  return `${baseClasses} text-[#0050A5] bg-white hover:text-white hover:bg-[#0050A5] hover:from-[#700808] hover:via-[#a61c1c] hover:to-[#d23c3c]`;
		}
	  };
  return (
    <div className="p-6">
      <div className="flex flex-wrap align-center justify-center gap-4 mb-6" style={{fontFamily: 'Montserrat'}}>
        
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
        {tab === 'Privacy Policy' && <PrivacyPolicySettings />}
        {tab === 'Terms & Conditions' && <TermsConditionsPage />}
        {tab === 'About us' && <AboutPage />}
      </div>
    </div>
  );
};

export default SettingsPage;
