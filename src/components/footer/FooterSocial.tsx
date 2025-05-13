
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

interface FooterSocialProps {
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  facebookActive: boolean;
  instagramActive: boolean;
  twitterActive: boolean;
  linkedinActive: boolean;
}

const FooterSocial: React.FC<FooterSocialProps> = ({
  facebookUrl,
  instagramUrl,
  twitterUrl,
  linkedinUrl,
  facebookActive,
  instagramActive,
  twitterActive,
  linkedinActive
}) => {
  return (
    <div className="flex space-x-4 mt-4 md:mt-0">
      {facebookActive && (
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Facebook size={20} />
        </a>
      )}
      
      {instagramActive && (
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Instagram size={20} />
        </a>
      )}
      
      {twitterActive && (
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Twitter size={20} />
        </a>
      )}
      
      {linkedinActive && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Linkedin size={20} />
        </a>
      )}
    </div>
  );
};

export default FooterSocial;
