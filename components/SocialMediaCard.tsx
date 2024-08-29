import React from 'react';

interface SocialMediaContent {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

interface SocialMediaCardProps {
  content: SocialMediaContent;
}

const SocialMediaCard: React.FC<SocialMediaCardProps> = ({ content }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Social Media Content</h2>
      {Object.entries(content).map(([platform, post]) => (
        <div key={platform} className="mb-4">
          <h3 className="text-lg font-semibold mb-2 capitalize">{platform}</h3>
          <p className="text-gray-700">{post}</p>
        </div>
      ))}
    </div>
  );
};

export default SocialMediaCard;