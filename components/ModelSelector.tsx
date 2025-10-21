import React from 'react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const models = ['gemini-2.5-flash', 'gemini-2.5-pro'];

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  return (
    <div className="relative">
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        className="appearance-none bg-slate-800/50 border border-green-900/50 rounded-md py-1.5 pl-3 pr-8 text-green-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer"
        aria-label="Select AI Model"
      >
        {models.map((model) => (
          <option key={model} value={model} className="bg-slate-900 text-green-300">
            {model}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};