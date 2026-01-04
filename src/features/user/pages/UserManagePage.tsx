import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import type { User, UserFormData } from '../types';
import { roleLabels, statusLabels } from '../types';
import UserEditModal from '../components/UserEditModal';
import UserAddModal from '../components/UserAddModal';

// 模拟用户数据
const initialUsers: User[] = [
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

export default function UserManagePage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // 编辑用户
  const handleEdit = async (id: string, data: UserFormData): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        setUsers(prev =>
          prev.map(user =>
            user.id === id ? { ...user, ...data } : user
          )
        );
        resolve(true);
      }, 500);
    });
  };

  // 添加用户
  const handleAdd = async (data: UserFormData): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          ...data,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setUsers(prev => [...prev, newUser]);
        resolve(true);
      }, 500);
    });
  };

  // 删除用户
  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    setDeleteConfirm(null);
  };

  // 查看详情
  const handleViewDetail = (id: string) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">用户管理</h1>
          <p className="text-muted-foreground mt-1">管理系统用户账号</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          添加用户
        </button>
      </div>

      {/* 用户表格 */}
      <div className="card overflow-hidden">
        <table className="table">
          <thead>
            <tr>
              <th>用户名</th>
              <th>密码</th>
              <th>角色</th>
              <th>状态</th>
              <th className="text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="font-medium">{user.username}</td>
                <td className="text-muted-foreground">••••••</td>
                <td>
                  <span className="badge-primary">{roleLabels[user.role]}</span>
                </td>
                <td>
                  <span
                    className={
                      user.status === 'active'
                        ? 'badge-success'
                        : 'badge-destructive'
                    }
                  >
                    {statusLabels[user.status]}
                  </span>
                </td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    {/* 查看详情 */}
                    <button
                      onClick={() => handleViewDetail(user.id)}
                      className="btn-ghost btn-icon"
                      title="查看详情"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {/* 编辑 */}
                    <button
                      onClick={() => setEditingUser(user)}
                      className="btn-ghost btn-icon"
                      title="编辑"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    {/* 删除 */}
                    {deleteConfirm === user.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn-destructive text-xs px-2 py-1"
                        >
                          确认
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="btn-secondary text-xs px-2 py-1"
                        >
                          取消
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(user.id)}
                        className="btn-ghost btn-icon text-destructive hover:bg-destructive/10"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            暂无用户数据
          </div>
        )}
      </div>

      {/* 编辑弹窗 */}
      {editingUser && (
        <UserEditModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleEdit}
        />
      )}

      {/* 添加弹窗 */}
      {showAddModal && (
        <UserAddModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
        />
      )}
    </div>
  );
}
