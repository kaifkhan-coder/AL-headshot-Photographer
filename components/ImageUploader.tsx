
import React, { useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  return (
    <div className="max-w-2xl mx-auto">
        <label
            htmlFor="file-upload"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative block w-full rounded-2xl border-2 border-dashed border-gray-600 p-12 text-center hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition-colors bg-gray-800/50"
        >
            <UploadIcon className="mx-auto h-12 w-12 text-gray-500" />
            <span className="mt-2 block text-sm font-medium text-gray-400">
                Upload your selfie
            </span>
            <p className="text-xs text-gray-500">Drag and drop, or click to browse</p>
            <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
            />
        </label>
    </div>
  );
};
