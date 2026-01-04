import { Outlet, NavLink } from 'react-router-dom';
import { Home, Users, Image, LogOut, Menu } from 'lucide-react';
import { useSidebarStore } from '@/stores/sidebar-store';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/home', label: '首页', icon: Home },
  { to: '/users', label: '用户管理', icon: Users },
  { to: '/marketing', label: '营销素材', icon: Image },
];

export default function MainLayout() {
  const toggle = useSidebarStore(state => state.toggle);
  const isOpen = useSidebarStore(state => state.isOpen);

  return (
    <div className="flex h-screen w-full bg-background">
      {/* 侧边栏 */}
      <aside 
        className={cn(
          "bg-card border-r border-border hidden md:flex flex-col transition-all duration-300 ease-in-out overflow-hidden", 
          isOpen ? 'w-64' : 'w-20'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 shrink-0">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-sm">U</span>
          </div>
          <span 
            className={cn(
              "ml-3 font-semibold text-foreground whitespace-nowrap transition-opacity duration-300",
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            用户管理系统
          </span>
        </div>

        {/* 导航链接 */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(isActive ? 'nav-link-active' : 'nav-link', 'flex items-center nav-link')
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span 
                className={cn(
                  "ml-3 whitespace-nowrap transition-opacity duration-300",
                  isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* 底部退出 */}
        <div className="p-4 border-t border-border shrink-0">
          <NavLink 
            to="/login" 
            className="flex items-center nav-link text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span 
              className={cn(
                "ml-3 whitespace-nowrap transition-opacity duration-300",
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              退出登录
            </span>
          </NavLink>
        </div>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部栏 */}
        <header className="h-16 bg-background flex items-center justify-between px-6 shrink-0">
          <button 
            onClick={toggle} 
            className="p-2 rounded-md transition-colors"
          >
            <Menu className={cn("h-5 w-5 text-foreground", isOpen ? "" : "rotate-90" )} />
          </button>
          <h2 className="text-lg font-medium text-foreground">管理后台</h2>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-medium text-sm">A</span>
            </div>
            <span className="text-sm text-muted-foreground">Admin</span>
          </div>
        </header>

        {/* 页面内容 */}
        <div className="flex-1 overflow-auto p-6 bg-background">
          <Outlet />
        </div>
      </main>
    </div>
  );
}