// src/main.tsx
import { createRoot } from 'react-dom/client';
import { AppProvider } from '@/app/provider';
import '@/app/index.css'; // 引入 Tailwind


createRoot(document.getElementById('root')!).render(<AppProvider />);