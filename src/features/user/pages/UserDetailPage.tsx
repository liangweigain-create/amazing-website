import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User as UserIcon, Shield, Activity, Calendar } from 'lucide-react';
import type { User } from '../types';
import { roleLabels, statusLabels } from '../types';

// 模拟用户数据（实际应从 API 获取）
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    username: 'editor01',
    password: 'editor123',
    role: 'editor',
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    username: 'viewer01',
    password: 'viewer123',
    role: 'viewer',
    status: 'inactive',
    createdAt: '2024-02-01',
  },
];

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 查找用户
  const user = mockUsers.find(u => u.id === id);

  // 用户不存在
  if (!user) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => navigate('/users')}
          className="btn-ghost"
        >
          <ArrowLeft className="w-4 h-4" />
          返回用户列表
        </button>
        <div className="card p-12 text-center">
          <p className="text-destructive">用户不存在或已被删除</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 返回按钮 */}
      <button
        onClick={() => navigate('/users')}
        className="btn-ghost"
      >
        <ArrowLeft className="w-4 h-4" />
        返回用户列表
      </button>

      {/* 用户信息卡片 */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <UserIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{user.username}</h1>
              <p className="text-muted-foreground">用户详情</p>
            </div>
          </div>
        </div>

        <div className="card-content">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 用户名 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <UserIcon className="w-4 h-4" />
                <span className="text-sm">用户名</span>
              </div>
              <p className="font-medium">{user.username}</p>
            </div>

            {/* 密码 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span className="text-sm">密码</span>
              </div>
              <p className="font-medium">••••••••</p>
            </div>

            {/* 角色 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span className="text-sm">角色</span>
              </div>
              <span className="badge-primary">{roleLabels[user.role]}</span>
            </div>

            {/* 状态 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Activity className="w-4 h-4" />
                <span className="text-sm">状态</span>
              </div>
              <span
                className={
                  user.status === 'active' ? 'badge-success' : 'badge-destructive'
                }
              >
                {statusLabels[user.status]}
              </span>
            </div>

            {/* 创建时间 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">创建时间</span>
              </div>
              <p className="font-medium">{user.createdAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
