import React, { useState, useRef, useEffect } from 'react';
import { SendIcon } from './icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="flex items-start space-x-2">
      <textarea
        ref={textareaRef}
        className="flex-1 bg-slate-800 text-green-200 rounded-md p-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 max-h-40 overflow-y-auto"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        rows={1}
      />
      <button
        onClick={handleSend}
        disabled={isLoading || !message.trim()}
        className="bg-green-600 hover:bg-green-700 text-white rounded-md p-2.5 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors flex-shrink-0"
        aria-label="Send message"
      >
        <SendIcon className="w-6 h-6" />
      </button>
    </div>
  );
};
