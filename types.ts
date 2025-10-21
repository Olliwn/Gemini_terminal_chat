// types.ts

export interface Source {
  uri: string;
  title?: string;
}

export interface ExecutedCode {
    language: string;
    code: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  sources?: Source[];
  executedCode?: ExecutedCode[];
  images?: string[];
}
