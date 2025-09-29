import { question } from 'readline-sync'

declare global {
  const input: (message?: string) => string;
  const print: (message?: string | number) => void;
}

;(global as any).input = question

;(global as any).print = (message = '') => {
  console.log(String(message))
}
