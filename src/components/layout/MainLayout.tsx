import { Outlet, NavLink  } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* 侧边栏 */}
      <aside className="w-64 bg-white border-r hidden md:block">
        <div className="p-4 font-bold text-xl">My App</div>
        <nav className="p-4 space-y-2">
          {/* 这里放 NavLink */}
          <NavLink to="/dashboard">
            <div className="text-sm text-gray-500">Dashboard</div>
          </NavLink>
        </nav>
      </aside>

      {/* 主内容区 */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center px-6">
          Header Area
        </header>
        <div className="flex-1 overflow-auto p-6">
          <Outlet /> {/* <-- 子路由页面会渲染在这里 */}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;