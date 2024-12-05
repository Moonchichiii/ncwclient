import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Github, Linkedin } from 'lucide-react';
import PolicyModal from '../../common/PolicyModal';

interface NavigationItem {
  path: string;
  label: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: typeof Github | typeof Linkedin;
}

interface PolicyContent {
  title: string;
  content: string;
}

const SocialLinks: React.FC<{ links: SocialLink[] }> = ({ links }) => {
  const socialLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const links = socialLinksRef.current?.querySelectorAll('.social-link');
    if (!links) return;

    // Create reusable animations for each link
    const animations = Array.from(links).map(link => {
      const el = link as HTMLElement;
      return {
        enter: gsap.to(el, {
          scale: 1.1,
          duration: 0.2,
          paused: true,
          ease: 'power2.out'
        }),
        icon: el.querySelector('.social-icon'),
      };
    });

    // Add event listeners
    links.forEach((link, index) => {
      const animation = animations[index];
      link.addEventListener('mouseenter', () => animation.enter.play());
      link.addEventListener('mouseleave', () => animation.enter.reverse());
    });

    // Cleanup
    return () => {
      animations.forEach(animation => animation.enter.kill());
    };
  }, []);

  return (
    <div ref={socialLinksRef} className="flex items-center gap-4 mt-4">
      {links.map((social) => (
        <a
          key={social.platform}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link text-gray-300 hover:text-[#CBB26A] transition-colors duration-200"
          aria-label={`Visit our ${social.platform}`}
        >
          <social.icon className="social-icon" size={20} />
        </a>
      ))}
    </div>
  );
};

const Footer: React.FC = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyContent | null>(null);
  const footerRef = useRef<HTMLElement>(null);

  const navigationItems: NavigationItem[] = [
    { path: '/home', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const policies = {
    terms: {
      title: 'Terms of Service',
      content: `Last Updated: December 3, 2024


## 1. Introduction


Welcome to Nordic Code Works ("we," "our," or "us"). By accessing or using our website at nordiccodeworks.com, you agree to be bound by these Terms of Service ("Terms"). Please read them carefully.


## 2. Use of Services


### 2.1 Eligibility
You must be at least 18 years old to use our services. By using our services, you represent and warrant that you meet this requirement.


### 2.2 Account Registration
Some features of our services may require you to register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.


### 2.3 Prohibited Activities
You agree not to:
- Use our services for any illegal purpose
- Violate any applicable laws or regulations
- Interfere with or disrupt our services
- Attempt to gain unauthorized access to our systems
- Transmit any viruses, malware, or other malicious code


## 3. Intellectual Property


### 3.1 Our Content
All content, features, and functionality on our website, including but not limited to text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, are owned by Nordic Code Works or its licensors and protected by international copyright laws.


### 3.2 Your Content
You retain ownership of any content you submit to our website. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute it.


## 4. Limitation of Liability


To the fullest extent permitted by law, Nordic Code Works shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.


## 5. Changes to Terms


We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date.


## 6. Termination


We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.


## 7. Governing Law


These Terms shall be governed by and construed in accordance with the laws of Sweden, without regard to its conflict of law provisions.


## 8. Contact Information


For any questions about these Terms, please contact us at:
- Email: contact@nordiccodeworks.com

## 9. Severability


If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck and the remaining provisions shall be enforced.


By using our services, you acknowledge that you have read and understood these Terms and agree to be bound by them.
` 
    },
    privacy: {
      title: 'Privacy Policy',
      content: `Last Updated: December 3, 2024


## 1. Introduction


Nordic Code Works ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website.


## 2. Information We Collect


### 2.1 Personal Data
We may collect:
- Name and contact information (email address, phone number)
- Technical data (IP address, browser type, device information)
- Usage data (how you interact with our website)
- Communication preferences
- Any other information you choose to provide


### 2.2 Collection Methods
We collect information:
- Directly from you when you provide it
- Automatically through cookies and similar technologies
- From third-party service providers


## 3. How We Use Your Information


We use your information to:
- Provide and maintain our services
- Respond to your inquiries and fulfill your requests
- Send you technical notices and updates
- Improve our website and services
- Comply with legal obligations
- Detect and prevent fraud


## 4. Information Sharing and Disclosure


We may share your information with:
- Service providers who assist in our operations
- Professional advisers (lawyers, bankers, auditors)
- Government bodies when required by law
- Business partners with your consent


We do not sell your personal information to third parties.


## 5. Data Security


We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.


## 6. Your Rights


Under applicable data protection laws, you have the right to:
- Access your personal data
- Correct inaccurate data
- Request deletion of your data
- Object to processing of your data
- Request restriction of processing
- Request data portability
- Withdraw consent


## 7. International Data Transfers


We may transfer your data to countries outside your residence jurisdiction. When we do, we ensure appropriate safeguards are in place.


## 8. Children's Privacy


Our services are not intended for children under 16. We do not knowingly collect personal information from children under 16.


## 9. Changes to This Privacy Policy


We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.


## 10. Cookie Policy


Please refer to our separate Cookie Policy for information about how we use cookies and similar tracking technologies.


## 11. Contact Us


If you have questions about this Privacy Policy, please contact us at:
- Email: contact@nordiccodeworks.com
- Address: [Your Business Address]


## 12. Data Protection Officer


Our Data Protection Officer can be contacted at:
[DPO Contact Information]


## 13. Supervisory Authority


You have the right to lodge a complaint with your local data protection authority.
`
    },
    cookies: {
      title: 'Cookie Policy',
      content: `Last Updated: December 3, 2024


## 1. Introduction


This Cookie Policy explains how Nordic Code Works ("we," "our," or "us") uses cookies and similar technologies on our website. This policy should be read alongside our Privacy Policy and Terms of Service.


## 2. What Are Cookies?


Cookies are small text files that are placed on your device when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.


## 3. Types of Cookies We Use


### 3.1 Essential Cookies
- Required for the website to function properly
- Cannot be disabled
- Examples: Session cookies, security cookies
- Duration: Usually expire when you close your browser


### 3.2 Analytics Cookies
- Help us understand how visitors interact with our website
- Used to improve our services
- Examples: Google Analytics cookies
- Duration: Up to 2 years
- Can be disabled through cookie settings


### 3.3 Marketing Cookies
- Used to deliver personalized advertisements
- Track your browsing habits across websites
- Examples: Social media cookies, advertising cookies
- Duration: Varies by provider
- Can be disabled through cookie settings


## 4. How We Use Cookies


We use cookies to:
- Ensure our website functions properly
- Remember your preferences
- Analyze website traffic and user behavior
- Improve our services
- Provide personalized content and advertising
- Protect against fraud and abuse


## 5. Third-Party Cookies


Some cookies are placed by third-party services that appear on our pages. We do not control these third parties' cookies. You can learn more about these cookies through their respective privacy policies.


## 6. Cookie Management


### 6.1 Cookie Consent
When you first visit our website, you will be prompted to accept or decline non-essential cookies. You can change your preferences at any time through our cookie settings panel.


### 6.2 Browser Settings
You can also control cookies through your browser settings. Be aware that disabling certain cookies may affect the functionality of our website.


### 6.3 How to Delete Cookies
Instructions for common browsers:
- Chrome: Settings > Privacy and Security > Clear browsing data
- Firefox: Options > Privacy & Security > Clear Data
- Safari: Preferences > Privacy > Manage Website Data
- Edge: Settings > Privacy & Security > Clear browsing data


## 7. Specific Cookie Information


### Essential Cookies
- session_id: Manages user session
- csrf_token: Prevents cross-site request forgery
- auth_token: Maintains authentication state


### Analytics Cookies
- _ga: Google Analytics identifier
- _gid: Distinguishes users
- _gat: Throttles request rate


### Marketing Cookies
- _fbp: Facebook tracking
- ads_id: Advertising identifier
- marketing_session: Campaign tracking


## 8. Updates to This Policy


We may update this Cookie Policy from time to time. The latest version will always be available on our website.


## 9. Contact Us


If you have questions about our use of cookies, please contact us at:
- Email: contact@nordiccodeworks.com
` 
    }
  };

  const legalLinks = [
    { path: 'terms', label: 'Terms of Service', key: 'terms' },
    { path: 'privacy', label: 'Privacy Policy', key: 'privacy' },
    { path: 'cookie-policy', label: 'Cookie Policy', key: 'cookies' },
  ];

  const socialLinks: SocialLink[] = [
    {
      platform: 'GitHub',
      url: 'https://github.com/nordiccodeworks',
      icon: Github,
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/company/nordiccodeworks',
      icon: Linkedin,
    },
  ];

  // Footer entrance animation
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const links = footer.querySelectorAll('.animate-link');
    const sections = footer.querySelectorAll('.footer-section');

    gsap.from(sections, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });

    gsap.from(links, {
      opacity: 0,
      y: 10,
      duration: 0.4,
      stagger: 0.05,
      delay: 0.3,
      ease: 'power2.out'
    });
  }, []);

  const handlePolicyClick = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    setSelectedPolicy(policies[key as keyof typeof policies]);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer ref={footerRef} className="bg-[#6a6969] py-8 sm:py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            {/* Company Description */}
            <div className="footer-section flex flex-col items-center sm:items-start">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
                Nordic Code Works
              </h3>
              <p className="text-gray-300 text-sm sm:text-base max-w-xs">
                Crafting elegant digital solutions with Scandinavian simplicity.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="footer-section flex flex-col items-center sm:items-start">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
                Quick Links
              </h3>
              <nav className="flex flex-col items-center sm:items-start space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="animate-link text-gray-300 hover:text-[#CBB26A] transition-colors duration-200 text-sm sm:text-base"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal Links */}
            <div className="footer-section flex flex-col items-center sm:items-start">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
                Legal
              </h3>
              <nav className="flex flex-col items-center sm:items-start space-y-2">
                {legalLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={(e) => handlePolicyClick(e, link.key)}
                    className="animate-link text-gray-300 hover:text-[#CBB26A] transition-colors duration-200 text-sm sm:text-base cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact and Social Links */}
            <div className="footer-section flex flex-col items-center sm:items-start">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">
                Connect
              </h3>
              <div className="flex flex-col items-center sm:items-start space-y-2">
                <a
                  href="mailto:contact@nordiccodeworks.com"
                  className="animate-link text-gray-300 hover:text-[#CBB26A] transition-colors duration-200 text-sm sm:text-base break-all sm:break-normal"
                >
                  contact@nordiccodeworks.com
                </a>
                <SocialLinks links={socialLinks} />
              </div>
            </div>
          </div>

          {/* Copyright and Legal Disclaimer */}
          <div className="footer-section border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-sm sm:text-base">
            <p className="text-gray-400">
              © {currentYear} Nordic Code Works. All rights reserved.
            </p>
            <p className="text-gray-400 mt-2">
              By using this site, you agree to our{' '}
              <button
                onClick={(e) => handlePolicyClick(e, 'terms')}
                className="text-gray-400 hover:text-[#CBB26A] cursor-pointer"
              >
                Terms of Service
              </button>{' '}
              and{' '}
              <button
                onClick={(e) => handlePolicyClick(e, 'privacy')}
                className="text-gray-400 hover:text-[#CBB26A] cursor-pointer"
              >
                Privacy Policy
              </button>
              .
            </p>
          </div>
        </div>
      </footer>

      <PolicyModal
        isOpen={!!selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
        title={selectedPolicy?.title || ''}
        content={selectedPolicy?.content || ''}
      />
    </>
  );
};

export default Footer;