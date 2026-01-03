import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
// 懒加载页面，优化首屏性能
import LoginPage from '@/features/auth/pages/LoginPage';
import DashboardPage from '@/pages/DashBoardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // 带有 Sidebar 和 Header 的主布局
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      // 未来可以加更多：
      // { path: 'settings', element: <SettingsPage /> }
    ],
  },
  {
    path: '/login',
    element: <LoginPage />, // 没有任何布局的独立页面
  },
  {
    path: '*',
    element: <div>404 Not Found</div>,
  },
]);