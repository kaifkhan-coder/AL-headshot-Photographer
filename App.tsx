import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { HeadshotDisplay } from './components/HeadshotDisplay';
import { ImageEditor } from './components/ImageEditor';
import { generateHeadshot, editImage } from './services/geminiService';
import { HEADSHOT_STYLES } from './constants';
import type { HeadshotStyle } from './types';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { DownloadIcon } from './components/icons/DownloadIcon';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle | null>(null);
  const [generatedHeadshot, setGeneratedHeadshot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    resetGeneration();
  };
  
  const resetGeneration = () => {
    setGeneratedHeadshot(null);
    setSelectedStyle(null);
    setError(null);
  };

  const handleStyleSelect = (style: HeadshotStyle) => {
    setSelectedStyle(style);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleGenerate = useCallback(async () => {
    if (!originalImage || !selectedStyle) {
      setError('Please upload an image and select a style.');
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const base64Image = await fileToBase64(originalImage);
      const generatedImage = await generateHeadshot(base64Image, originalImage.type, selectedStyle.prompt);
      setGeneratedHeadshot(`data:image/jpeg;base64,${generatedImage}`);
    } catch (err) {
      console.error(err);
      setError('Failed to generate headshot. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, selectedStyle]);

  const handleEdit = useCallback(async (prompt: string) => {
    if (!generatedHeadshot || !prompt) {
      setError('No generated image to edit or prompt is empty.');
      return;
    }
    
    setIsEditing(true);
    setError(null);

    try {
        const base64Image = generatedHeadshot.split(',')[1];
        const edited = await editImage(base64Image, 'image/jpeg', prompt);
        setGeneratedHeadshot(`data:image/jpeg;base64,${edited}`);
    } catch (err) {
      console.error(err);
      setError('Failed to edit image. Please try again.');
    } finally {
      setIsEditing(false);
    }
  }, [generatedHeadshot]);
  
  const handleStartOver = () => {
    setOriginalImage(null);
    setOriginalImageUrl(null);
    resetGeneration();
  };

  const handleDownload = () => {
    if (!generatedHeadshot) return;
    const link = document.createElement('a');
    link.href = generatedHeadshot;
    link.download = 'ai-headshot.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            AI Headshot Photographer
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Transform your selfie into a professional headshot in seconds.
          </p>
        </header>

        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg relative my-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <main>
          {!originalImageUrl ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Controls */}
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                  <h2 className="text-2xl font-bold mb-4">Your Selfie</h2>
                  <div className="mb-6">
                    <img src={originalImageUrl} alt="User selfie" className="rounded-xl object-cover w-full aspect-square max-w-sm mx-auto" />
                  </div>
                  
                   {!generatedHeadshot && !isLoading && (
                    <>
                      <StyleSelector styles={HEADSHOT_STYLES} selectedStyle={selectedStyle} onSelectStyle={handleStyleSelect} />
                      <button
                        onClick={handleGenerate}
                        disabled={!selectedStyle || isLoading}
                        className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center text-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <SparklesIcon className="w-6 h-6 mr-2" />
                        Generate Headshot
                      </button>
                    </>
                   )}
                </div>

                {/* Right Column: Results */}
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 flex flex-col">
                  <HeadshotDisplay 
                    imageUrl={generatedHeadshot} 
                    isLoading={isLoading || isEditing} 
                    title="Generated Headshot" 
                  />
                  {generatedHeadshot && !isLoading && (
                     <div className="mt-auto pt-6 space-y-4">
                       <button
                         onClick={handleDownload}
                         className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center text-lg transition-all duration-300 transform hover:scale-105"
                       >
                         <DownloadIcon className="w-6 h-6 mr-2" />
                         Download
                       </button>
                       <ImageEditor onEdit={handleEdit} isEditing={isEditing} />
                     </div>
                  )}
                </div>
              </div>
               <div className="text-center mt-8">
                 <button 
                  onClick={handleStartOver}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-2 px-6 rounded-lg transition-colors"
                  >
                   Start Over
                  </button>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;