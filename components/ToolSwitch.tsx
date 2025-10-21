import React from 'react';

interface ToolSwitchProps {
  icon: React.ReactNode;
  label: string;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const ToolSwitch: React.FC<ToolSwitchProps> = ({ icon, label, enabled, onToggle }) => {
  return (
    <button
        type="button"
        onClick={() => onToggle(!enabled)}
        aria-pressed={enabled}
        className={`flex items-center space-x-2 rounded-md border py-1.5 px-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-green-500 ${
            enabled 
                ? 'bg-green-500/20 border-green-500 text-green-300' 
                : 'bg-slate-800/50 border-green-900/50 text-slate-300 hover:bg-slate-800'
        }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
