// components/icons.tsx
import React from 'react';

export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

export const CopyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path
      d="M15.75 3H8.25A2.25 2.25 0 006 5.25v13.5A2.25 2.25 0 008.25 21h7.5A2.25 2.25 0 0018 18.75V5.25A2.25 2.25 0 0015.75 3zM16.5 18.75a.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V5.25c0-.414.336-.75.75-.75h7.5c.414 0 .75.336.75.75v13.5z"
    />
  </svg>
);

export const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
  </svg>
);

export const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M6.72 5.66a.75.75 0 01.47 1.38L4.267 9.5H19.75a.75.75 0 010 1.5H4.267l2.923 2.46a.75.75 0 11-.94 1.16l-4.25-3.582a.75.75 0 010-1.16l4.25-3.582a.75.75 0 01.47-.22zm10.56 12.68a.75.75 0 01-.47-1.38L19.733 15H4.25a.75.75 0 010-1.5h15.483l-2.923-2.46a.75.75 0 11.94-1.16l4.25 3.582a.75.75 0 010 1.16l-4.25 3.582a.75.75 0 01-.47.22z" clipRule="evenodd" />
    </svg>
);

export const PanelRightCloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.22 14.03a.75.75 0 001.06-1.06l-4.47-4.47 4.47-4.47a.75.75 0 00-1.06-1.06l-5 5a.75.75 0 000 1.06l5 5z" clipRule="evenodd" />
    </svg>
);

export const PanelLeftOpenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.78 16.28a.75.75 0 001.06-1.06l-4.47-4.47 4.47-4.47a.75.75 0 00-1.06-1.06l-5 5a.75.75 0 000 1.06l5 5z" clipRule="evenodd" />
    </svg>
);

export const TerminalIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v.008a.75.75 0 01-1.5 0v-.008a.75.75 0 01.75-.75z" clipRule="evenodd" />
        <path d="M8.25 7.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM9 11.25a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z" />
    </svg>
);
