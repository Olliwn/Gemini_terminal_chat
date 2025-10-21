import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';
import { CopyIcon, TerminalIcon } from './icons';

const CodeBlock: React.FC<any> = ({ node, inline, className, children, ...props }) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return !inline ? (
    <div className="relative bg-slate-900/70 rounded-md my-2 text-sm">
      <div className="flex items-center justify-between px-4 py-1 text-xs text-slate-400 border-b border-green-900/50">
        <span>{match ? match[1] : 'code'}</span>
        <button onClick={handleCopy} className="flex items-center gap-1 hover:text-green-300 transition-colors">
          <CopyIcon className="w-4 h-4" />
          {isCopied ? 'Copied!' : 'Copy code'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto" {...props}>
        <code className={className}>{children}</code>
      </pre>
    </div>
  ) : (
    <code className="bg-green-500/20 text-green-300 px-1 py-0.5 rounded-sm font-mono text-sm" {...props}>
      {children}
    </code>
  );
};

export const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';

  const components = {
    code: CodeBlock,
    table: (props: any) => <table className="w-full my-2 border-collapse border border-green-900/50 text-sm" {...props} />,
    thead: (props: any) => <thead className="bg-green-500/10" {...props} />,
    th: (props: any) => <th className="p-2 border border-green-900/50 text-left font-semibold text-green-300" {...props} />,
    td: (props: any) => <td className="p-2 border border-green-900/50" {...props} />,
    ul: (props: any) => {
        const isTaskList = props.className?.includes('task-list');
        return <ul className={`pl-5 my-2 ${isTaskList ? 'list-none pl-0' : 'list-disc'}`} {...props} />;
    },
    li: (props: any) => {
        const isTaskListItem = props.className?.includes('task-list-item');
        return <li className={`mb-1 ${isTaskListItem ? 'flex items-center gap-2' : ''}`} {...props} />;
    },
    input: (props: any) => {
        if (props.type === 'checkbox') {
            return <input {...props} className="appearance-none w-4 h-4 border-2 border-green-400 rounded-sm bg-slate-800 checked:bg-green-500 checked:border-green-500 align-middle cursor-default" />;
        }
        return <input {...props} />;
    },
    a: (props: any) => <a className="text-blue-400 hover:underline" {...props} />,
    p: (props: any) => <p className="mb-2 last:mb-0" {...props} />,
    h1: (props: any) => <h1 className="text-xl font-bold text-green-400 border-b border-green-900/50 pb-1 mb-2 mt-4" {...props} />,
    h2: (props: any) => <h2 className="text-lg font-bold text-green-400 border-b border-green-900/50 pb-1 mb-2 mt-3" {...props} />,
    h3: (props: any) => <h3 className="text-base font-bold text-green-400 mb-2 mt-2" {...props} />,
    blockquote: (props: any) => <blockquote className="border-l-4 border-green-700 pl-4 italic text-slate-400 my-2" {...props} />,
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-3 rounded-lg ${
          isUser
            ? 'max-w-2xl bg-cyan-900/50 text-cyan-200'
            : 'max-w-3xl bg-slate-800/50 text-green-200'
        }`}
      >
        <div className="leading-relaxed">
          {isUser ? (
             <div className="whitespace-pre-wrap">{message.text}</div>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {message.text}
            </ReactMarkdown>
          )}
        </div>
        {/* FIX: Render images if they exist in the message. */}
        {message.images && message.images.length > 0 && (
            <div className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2">
                {message.images.map((imgSrc, index) => (
                    <img 
                        key={index}
                        src={imgSrc}
                        alt={`Generated image ${index + 1}`}
                        className="max-w-full rounded-md border-2 border-green-900/50"
                    />
                ))}
            </div>
        )}
        {message.executedCode && message.executedCode.length > 0 && (
            <div className="mt-2 pt-2 border-t border-slate-700">
                <h3 className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4" />
                    <span>Executed Code</span>
                </h3>
                {message.executedCode.map((exec, index) => (
                    <CodeBlock key={index} className={`language-${exec.language.toLowerCase()}`}>
                        {exec.code}
                    </CodeBlock>
                ))}
            </div>
        )}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 pt-2 border-t border-slate-700">
            <h3 className="text-xs font-bold text-slate-400 mb-1">Sources:</h3>
            <ul className="text-xs space-y-1">
              {message.sources.map((source, index) => (
                <li key={index}>
                  <a
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {index + 1}. {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
