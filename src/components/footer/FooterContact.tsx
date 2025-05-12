
import React from 'react';

interface FooterContactProps {
  email: string;
  phone: string;
  location: string;
}

const FooterContact: React.FC<FooterContactProps> = ({ email, phone, location }) => {
  return (
    <div className="col-span-1">
      <h3 className="text-xl font-semibold mb-4">Contato</h3>
      <ul className="space-y-2">
        <li className="text-gray-400">{email}</li>
        <li className="text-gray-400">{phone}</li>
        <li className="text-gray-400">{location}</li>
      </ul>
    </div>
  );
};

export default FooterContact;
