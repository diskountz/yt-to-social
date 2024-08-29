import React from 'react';

interface TranscriptionCardProps {
  transcription: string;
}

const TranscriptionCard: React.FC<TranscriptionCardProps> = ({ transcription }) => {
  const formatTranscription = (text: string) => {
    return text.split('. ').map((sentence, index) => (
      <p key={index} className="mb-2">
        {sentence.trim() + (index < text.split('. ').length - 1 ? '.' : '')}
      </p>
    ));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Transcription</h2>
      <div className="max-h-96 overflow-y-auto text-gray-700">
        {formatTranscription(transcription)}
      </div>
    </div>
  );
};

export default TranscriptionCard;