import React from 'react';

interface VideoPreviewProps {
  url: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ url }) => {
  const getEmbedUrl = (url: string) => {
    const videoId = new URL(url).searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <h2 className="text-2xl font-bold mb-4">Video Preview</h2>
      <div className="relative pt-[56.25%]">
        <iframe
          src={getEmbedUrl(url)}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPreview;