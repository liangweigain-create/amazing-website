# 核心依赖库
## 1. 状态管理 Zustand + immer

## 2. 框架 Vite + React 19.2.3

## 3. UI 组件库 Shadcn/lucide-react

## 4. 样式库 TailwindCSS V4 + clsx 

## 5. 路由管理 React Router Dom

# 开发工具
## 1. ESLint + Prettier

## 2. TypeScript

## 3. Git

# 项目基础结构
```
src/
├── app/                    # 全局应用配置中心
│   ├── router.tsx          # 路由配置 (React Router)
│   ├── provider.tsx        # 全局 Context/Theme/Query Client Provider
│   └── index.css           # 全局样式入口
├── assets/                 # 静态资源 (Images, SVGs)
├── components/             # 全局共享 UI 组件 (无业务逻辑/笨组件)
│   ├── ui/                 # 基础样式组件 (Shadcn UI: Button, Input...)
│   ├── common/             # 业务无关的通用组件 (Loading, EmptyState...)
│   └── layout/             # 全局布局组件 (Sidebar, Navbar, Footer)
├── features/               # [核心] 业务功能模块 (Feature-Sliced Design 思想)
│   └── [feature-name]/     # 具体业务模块 (如: auth, dashboard)
│       ├── components/     # 该业务独有的组件
│       ├── hooks/          # 该业务独有的 Hooks
│       ├── types/          # 该业务独有的类型定义
│       └── index.ts        # 模块对外暴露的 API
├── hooks/                  # 全局通用 Hooks (useTheme, useMediaQuery)
├── lib/                    # 第三方库配置与工具函数 (utils.ts, axios.ts, constants.ts)
├── stores/                 # 全局状态管理 (Global Stores - Zustand)
├── types/                  # 全局通用类型定义 (User, APIResponse)
├── pages/                  # 页面路由组件 (仅作为路由入口，具体逻辑在 features 中)
└── main.tsx                # 应用入口文件
```