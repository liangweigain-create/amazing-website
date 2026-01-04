
import { createRoot } from 'react-dom/client';
import { AppProvider } from '@/app/provider';
import '@/app/index.css'; 


createRoot(document.getElementById('root')!).render(<AppProvider />);