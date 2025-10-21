// App.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Message } from './types';
import { runQuery } from './services/geminiService';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import { ModelSelector } from './components/ModelSelector';
import { ContextViewer } from './components/ContextViewer';
import { ToolSwitch } from './components/ToolSwitch';
import { SearchIcon, CodeIcon, PanelLeftOpenIcon } from './components/icons';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
      {role: 'model', text: 'Welcome to Gemini Chat. You can ask me questions and I can use Google Search and a Code Interpreter to find up-to-date information and perform complex tasks.'}
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const [useGoogleSearch, setUseGoogleSearch] = useState(true);
  const [useCodeInterpreter, setUseCodeInterpreter] = useState(false);
  const [isContextVisible, setIsContextVisible] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    setIsLoading(true);
    const userMessage: Message = { role: 'user', text: messageText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const history = messages.filter(m => !m.text.startsWith('Welcome'));

    try {
      const result = await runQuery({
        message: messageText,
        history,
        model: selectedModel,
        googleSearch: useGoogleSearch,
        codeInterpreter: useCodeInterpreter,
      });

      // FIX: Pass the 'images' array from the result to the model's message.
      const modelMessage: Message = {
        role: 'model',
        text: result.text,
        sources: result.sources,
        executedCode: result.executedCode,
        images: result.images,
      };
      setMessages((prevMessages) => [...prevMessages, modelMessage]);
    // FIX: Corrected catch block syntax from `catch(error) =>` to `catch(error)`.
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: 'model',
        text: `Sorry, something went wrong. ${error instanceof Error ? error.message : ''}`,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const historyForContext = messages.filter(m => !m.text.startsWith('Welcome'));

  return (
    <div className="flex h-screen bg-slate-900 text-white font-mono">
      <div className="flex flex-col flex-1 min-w-0">
        <header className="bg-slate-800/50 border-b border-green-900/50 p-4 flex items-center justify-between z-10">
          <h1 className="text-xl font-bold text-green-400">Gemini Chat</h1>
          <div className="flex items-center space-x-4">
             {/* FIX: Make tool switches mutually exclusive to align with API guidelines where Google Search cannot be combined with other tools. */}
             <ToolSwitch
                icon={<SearchIcon className="w-5 h-5" />}
                label="Google Search"
                enabled={useGoogleSearch}
                onToggle={(enabled) => {
                  setUseGoogleSearch(enabled);
                  if (enabled) {
                    setUseCodeInterpreter(false);
                  }
                }}
             />
             <ToolSwitch
                icon={<CodeIcon className="w-5 h-5" />}
                label="Code Execution"
                enabled={useCodeInterpreter}
                onToggle={(enabled) => {
                  setUseCodeInterpreter(enabled);
                  if (enabled) {
                    setUseGoogleSearch(false);
                  }
                }}
             />
             <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
             {!isContextVisible && (
                <button onClick={() => setIsContextVisible(true)} className="p-2 text-slate-400 hover:text-green-400" title="Show Context">
                    <PanelLeftOpenIcon className="w-5 h-5" />
                </button>
             )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {isLoading && <div className="flex justify-start"><div className="p-3 rounded-lg bg-slate-800/50 text-green-200 animate-pulse">Thinking...</div></div>}
          <div ref={messagesEndRef} />
        </main>

        <footer className="bg-slate-800/50 border-t border-green-900/50 p-4">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </footer>
      </div>
      {isContextVisible && (
        <aside className="w-96 bg-slate-950/80 backdrop-blur-sm border-l border-green-900/50 flex flex-col">
            <ContextViewer 
                messages={historyForContext} 
                model={selectedModel}
                onCollapse={() => setIsContextVisible(false)}
            />
        </aside>
      )}
    </div>
  );
};

export default App;