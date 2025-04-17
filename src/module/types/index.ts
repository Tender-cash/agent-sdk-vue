export interface ITheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

export interface ConfigContextType {
  apiUrl: string;
  theme?: ITheme;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  confirmationInterval?: number;
} 