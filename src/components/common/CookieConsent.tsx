import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Settings, Shield, ChevronDown, ChevronUp } from 'lucide-react';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay before showing for better UX
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const newSettings = { necessary: true, analytics: true, marketing: true };
    setSettings(newSettings);
    localStorage.setItem('cookie-consent', JSON.stringify(newSettings));
    setShow(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(settings));
    setShow(false);
  };

  const handleDecline = () => {
    const basicSettings = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem('cookie-consent', JSON.stringify(basicSettings));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50 max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-br from-tekhelet-base to-tekhelet-finn-3 rounded-xl shadow-2xl border border-white/10">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Cookie className="w-6 h-6 text-white/90" />
                  <h3 className="text-lg font-semibold text-white">Cookie Settings</h3>
                </div>
                <button
                  onClick={() => setShow(false)}
                  className="p-1 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>
              
              <p className="mt-4 text-white/80 leading-relaxed">
                We use cookies to enhance your browsing experience and provide personalized content.
                Your privacy matters to us.
              </p>

              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 space-y-4"
                >
                  <div className="space-y-3">
                    {[
                      {
                        id: 'necessary',
                        title: 'Essential Cookies',
                        description: 'Required for the website to function properly',
                        icon: <Shield className="w-5 h-5" />,
                        required: true
                      },
                      {
                        id: 'analytics',
                        title: 'Analytics Cookies',
                        description: 'Help us improve our website by collecting anonymous usage data',
                        icon: <Settings className="w-5 h-5" />
                      },
                      {
                        id: 'marketing',
                        title: 'Marketing Cookies',
                        description: 'Used to deliver more relevant advertisements',
                        icon: <Cookie className="w-5 h-5" />
                      }
                    ].map(({ id, title, description, icon, required }) => (
                      <div key={id} className="flex items-start gap-4 p-3 rounded-lg bg-black/20">
                        <div className="text-white/70">{icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-white">{title}</h4>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={settings[id as keyof CookieSettings]}
                                onChange={(e) => !required && setSettings(prev => ({
                                  ...prev,
                                  [id]: e.target.checked
                                }))}
                                disabled={required}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-black/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tekhelet-finn-3"></div>
                            </label>
                          </div>
                          <p className="mt-1 text-sm text-white/60">{description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              <div className="mt-6 flex items-center gap-4">
                <motion.button
                  onClick={handleAcceptAll}
                  className="flex-1 px-4 py-2 bg-white text-tekhelet-base rounded-lg font-medium hover:bg-white/90 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Accept All
                </motion.button>
                <motion.button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex-1 px-4 py-2 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showDetails ? (
                    <>Hide Details <ChevronUp size={16} /></>
                  ) : (
                    <>Cookie Settings <ChevronDown size={16} /></>
                  )}
                </motion.button>
                {showDetails && (
                  <motion.button
                    onClick={handleSaveSettings}
                    className="flex-1 px-4 py-2 bg-tekhelet-finn-3 text-white rounded-lg font-medium hover:bg-tekhelet-finn/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Save Settings
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;