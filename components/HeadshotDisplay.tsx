
import React from 'react';

interface HeadshotDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  title: string;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500 mx-auto mb-4"></div>
      <p className="text-lg font-semibold text-gray-300">Generating your masterpiece...</p>
      <p className="text-sm text-gray-500 mt-2">The AI is working its magic. This might take a moment.</p>
    </div>
);

export const HeadshotDisplay: React.FC<HeadshotDisplayProps> = ({ imageUrl, isLoading, title }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex-grow w-full bg-gray-900/50 rounded-xl flex items-center justify-center aspect-square border border-gray-700">
        {isLoading ? (
          <LoadingSpinner />
        ) : imageUrl ? (
          <img src={imageUrl} alt="Generated headshot" className="rounded-xl object-contain h-full w-full" />
        ) : (
          <div className="text-center text-gray-500 p-4">
            <p>Your generated headshot will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};
