import React from 'react';
import Image from 'next/image';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  backgroundColor?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, backgroundColor }) => (
  <div className={`${backgroundColor} p-2 rounded-xl shadow-md flex flex-col items-left gap-1`}>
    <Image src={icon} alt={`${title} icon`} width={48} height={48} className="mb-1" />
    <h4 className="text-md font-bold">{title}</h4>
    <p className="text-sm font-extralight text-gray-600">{description}</p>
  </div>
);

export default FeatureCard;