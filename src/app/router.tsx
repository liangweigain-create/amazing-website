import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import LoginPage from '@/features/auth/pages/LoginPage';
import HomePage from '@/pages/HomePage';
import UserManagePage from '@/features/user/pages/UserManagePage';
import UserDetailPage from '@/features/user/pages/UserDetailPage';
import MarketingPage from '@/features/marketing/pages/MarketingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'users',
        element: <UserManagePage />,
      },
      {
        path: 'users/:id',
        element: <UserDetailPage />,
      },
      {
        path: 'marketing',
        element: <MarketingPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '*',
    element: <div className="flex items-center justify-center min-h-screen text-muted-foreground">404 Not Found</div>,
  },
]);