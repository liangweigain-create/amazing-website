import { useState } from 'react';
import { X } from 'lucide-react';
import type { User, UserFormData, UserRole, UserStatus } from '../types';
import { roleLabels, statusLabels } from '../types';

interface UserEditModalProps {
  user: User;
  onClose: () => void;
  onSave: (id: string, data: UserFormData) => Promise<boolean>;
}

export default function UserEditModal({ user, onClose, onSave }: UserEditModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    username: user.username,
    password: user.password,
    role: user.role,
    status: user.status,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await onSave(user.id, formData);
      if (success) {
        onClose();
      } else {
        setError('编辑用户失败，请重试');
      }
    } catch {
      setError('编辑用户失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold">编辑用户</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* 用户名 */}
          <div className="space-y-2">
            <label htmlFor="edit-username" className="label">
              用户名
            </label>
            <input
              id="edit-username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          {/* 密码 */}
          <div className="space-y-2">
            <label htmlFor="edit-password" className="label">
              密码
            </label>
            <input
              id="edit-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          {/* 角色 */}
          <div className="space-y-2">
            <label htmlFor="edit-role" className="label">
              角色
            </label>
            <select
              id="edit-role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="input"
            >
              {(Object.keys(roleLabels) as UserRole[]).map(role => (
                <option key={role} value={role}>
                  {roleLabels[role]}
                </option>
              ))}
            </select>
          </div>

          {/* 状态 */}
          <div className="space-y-2">
            <label htmlFor="edit-status" className="label">
              状态
            </label>
            <select
              id="edit-status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="input"
            >
              {(Object.keys(statusLabels) as UserStatus[]).map(status => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </select>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* 按钮 */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex-1"
            >
              {isLoading ? '保存中...' : '保存'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
