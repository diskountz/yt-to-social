import React from 'react';

interface BlogOutlineCardProps {
  outline: string;
}

const BlogOutlineCard: React.FC<BlogOutlineCardProps> = ({ outline }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Blog Outline</h2>
      <div className="max-h-60 overflow-y-auto">
        <pre className="text-gray-700 whitespace-pre-wrap">{outline}</pre>
      </div>
    </div>
  );
};

export default BlogOutlineCard;