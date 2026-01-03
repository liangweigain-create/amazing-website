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
├── constants/              # 全局常量定义 (Enums, Configs, Regex)
├── features/               # [核心] 业务功能模块 (Feature-Sliced Design 思想)
│   └── [feature-name]/     # 具体业务模块 (如: auth, dashboard)
│       ├── components/     # 该业务独有的组件
│       ├── hooks/          # 该业务独有的 Hooks
│       ├── types/          # 该业务独有的类型定义
│       ├── stores/         # 该业务独有的状态 (可选)
│       └── index.ts        # 模块对外暴露的 API
├── hooks/                  # 全局通用 Hooks (useTheme, useMediaQuery)
├── lib/                    # 第三方库配置与工具函数 (utils.ts, axios.ts)
├── stores/                 # 全局状态管理 (Global Stores - Zustand)
├── types/                  # 全局通用类型定义 (User, APIResponse)
├── pages/                  # 页面路由组件 (仅作为路由入口，具体逻辑在 features 中)
└── main.tsx                # 应用入口文件
```

# AI 代码生成规范 (Architecture Guidelines)

在协助编写或生成代码时，请严格遵守以下文件职责划分：

1.  **全局配置 (`src/app`)**
    - 涉及全局 `Provider` (如 ThemeProvider, AuthProvider) 或路由结构调整时，必须修改此目录。
    - 不要在此处编写具体业务逻辑。

2.  **UI 组件 (`src/components`)**
    - 所有的 **通用 UI 组件** (如 Shadcn 组件) 必须放在 `src/components/ui`。
    - 所有的 **布局组件** (Sidebar, Header) 必须放在 `src/components/layout`。
    - 这里只存放 **无状态** 或 **纯展示** 组件，严禁包含特定的业务逻辑。

3.  **常量管理 (`src/constants`)**
    - 所有全局常量（如 API 端点前缀、分页默认值、正则表达式、枚举）必须存放于此。
    - 避免将硬编码的字符串散落在业务代码中。

4.  **业务功能 (`src/features`)** - **[最重要]**
    - 所有具体的 **业务逻辑** 必须按功能封装在 `src/features/[feature-name]` 下。
    - **严禁** 将某个业务独有的组件或 Hooks 放在全局 `components` 或 `hooks` 目录中。
    - 例：`LoginForm` 组件应位于 `src/features/auth/components/LoginForm.tsx`，而不是 `src/components`。

5.  **状态管理 (`src/stores` vs `features/**/stores`)**
    - 所有zustand store 都必须放在 `src/stores`。
    - 仅属于某个模块的局部状态，优先使用 React State

6.  **工具与类型 (`src/lib`, `src/types`)**
    - `src/lib`: 存放 `utils` (如 `cn` 函数), SDK 初始化 (如 `firebase.ts`, `axios.ts`)。
    - `src/types`: 存放跨模块共享的 TS 类型定义。

请遵循以上架构进行文件创建和代码组织。

