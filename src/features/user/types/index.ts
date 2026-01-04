// 用户角色枚举
export type UserRole = 'admin' | 'editor' | 'viewer';

// 用户状态枚举
export type UserStatus = 'active' | 'inactive';

// 用户数据类型
export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

// 用户表单数据类型
export interface UserFormData {
  username: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}

// 角色显示名称映射
export const roleLabels: Record<UserRole, string> = {
  admin: '管理员',
  editor: '编辑者',
  viewer: '查看者',
};

// 状态显示名称映射
export const statusLabels: Record<UserStatus, string> = {
  active: '启用',
  inactive: '禁用',
};
