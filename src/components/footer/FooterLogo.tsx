
import React from 'react';

interface FooterLogoProps {
  logoUrl: string;
  companyName: string;
  about: string;
}

const FooterLogo: React.FC<FooterLogoProps> = ({ logoUrl, companyName, about }) => {
  return (
    <div className="col-span-1 lg:col-span-1">
      <div className="mb-4">
        <img 
          src={logoUrl} 
          alt={`Logo ${companyName}`} 
          className="h-auto max-h-16 w-auto object-contain" 
          style={{ minHeight: '48px' }}
        />
      </div>
      <p className="text-gray-400 mb-4">
        {about}
      </p>
    </div>
  );
};

export default FooterLogo;
