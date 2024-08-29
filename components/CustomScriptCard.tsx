import React from 'react';

interface CustomScriptCardProps {
  script: string;
}

const CustomScriptCard: React.FC<CustomScriptCardProps> = ({ script }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Custom Script for YouTube Short</h2>
      <pre className="whitespace-pre-wrap text-gray-700">{script}</pre>
    </div>
  );
};

export default CustomScriptCard;