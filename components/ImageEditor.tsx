
import React, { useState } from 'react';

interface ImageEditorProps {
    onEdit: (prompt: string) => void;
    isEditing: boolean;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ onEdit, isEditing }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(prompt.trim()) {
            onEdit(prompt);
        }
    }

    return (
        <div>
            <h3 className="text-xl font-bold mb-3">Refine with a Prompt</h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder='e.g., "Add a retro filter" or "Change background to blue"'
                    className="flex-grow bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                    disabled={isEditing}
                />
                <button
                    type="submit"
                    disabled={isEditing || !prompt.trim()}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    {isEditing ? 'Refining...' : 'Refine'}
                </button>
            </form>
        </div>
    );
};
