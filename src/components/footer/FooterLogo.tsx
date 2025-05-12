
import React from 'react';

interface FooterLogoProps {
  logoUrl: string;
  companyName: string;
  about: string;
}

const FooterLogo: React.FC<FooterLogoProps> = ({ logoUrl, companyName, about }) => {
  return (
    <div className="col-span-1 lg:col-span-1">
      <div className="mb-4 flex justify-start">
        <img 
          src={logoUrl} 
          alt={`Logo ${companyName}`} 
          className="h-auto w-auto object-contain" 
          style={{ maxHeight: '80px', minHeight: '48px' }}
        />
      </div>
      <p className="text-gray-400 mb-4">
        {about}
      </p>
    </div>
  );
};

export default FooterLogo;
