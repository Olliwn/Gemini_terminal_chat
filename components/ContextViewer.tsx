// components/ContextViewer.tsx
import React from 'react';
import { Message } from '../types';
import { PanelRightCloseIcon } from './icons';

interface ContextViewerProps {
  messages: Message[];
  model: string;
  onCollapse: () => void;
}

export const ContextViewer: React.FC<ContextViewerProps> = ({ messages, model, onCollapse }) => {
  return (
    <div className="flex flex-col h-full text-xs text-slate-400">
        <div className="p-4 flex items-center justify-between border-b border-cyan-900/50">
            <h2 className="text-lg font-bold text-cyan-400">Context Log</h2>
            <button onClick={onCollapse} className="p-2 text-slate-400 hover:text-cyan-400" title="Hide Context">
                <PanelRightCloseIcon className="w-5 h-5" />
            </button>
        </div>
        <div className="p-4 overflow-y-auto flex-1">
            <div className="mb-4">
                <span className="font-bold text-slate-300">MODEL: </span>
                <span>{model}</span>
            </div>
            <div className="font-bold text-slate-300 mb-2">HISTORY:</div>
            {messages.length > 0 ? (
                 messages.map((msg, index) => (
                    <div key={index} className="mb-3 pb-3 border-b border-slate-800 last:border-b-0 last:mb-0 last:pb-0">
                        <div className={`font-bold uppercase ${msg.role === 'user' ? 'text-cyan-400' : 'text-green-400'}`}>
                            [{msg.role}]
                        </div>
                        <p className="whitespace-pre-wrap break-words font-mono pt-1 text-slate-300">
                            {msg.text}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-slate-500 italic">No history yet.</p>
            )}
        </div>

    </div>
  );
};
