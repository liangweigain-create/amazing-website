import { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, Plus, Trash2 } from 'lucide-react';
import type { Category } from '../types';

interface CategoryTreeProps {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: (parentId: string | null, name: string) => void;
  onDelete: (id: string) => void;
}

interface TreeNodeProps {
  category: Category;
  level: number;
  selectedId: string | null;
  expandedIds: Set<string>;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
  onAdd: (parentId: string | null, name: string) => void;
  onDelete: (id: string) => void;
}

function TreeNode({
  category,
  level,
  selectedId,
  expandedIds,
  onSelect,
  onToggle,
  onAdd,
  onDelete,
}: TreeNodeProps) {
  const [showAddInput, setShowAddInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  // Animation refs and state
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>('0px');

  const hasChildren = category.children && category.children.length > 0;
  const isExpanded = expandedIds.has(category.id);
  const isSelected = selectedId === category.id;

  // Update height when children or expansion state changes
  useEffect(() => {
    if (contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [category.children, isExpanded]);

  const handleAddSubmit = () => {
    if (newCategoryName.trim()) {
      onAdd(category.id, newCategoryName.trim());
      setNewCategoryName('');
      setShowAddInput(false);
    }
  };

  const handleDelete = () => {
    onDelete(category.id);
    setDeleteConfirm(false);
  };

  return (
    <div>
      <div
        className={`
          group flex items-center gap-1 px-2 py-1.5 rounded-lg cursor-pointer
          transition-colors duration-150
          ${isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}
        `}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(category.id)}
      >
        {/* 展开/折叠按钮 */}
        <button
          onClick={e => {
            e.stopPropagation();
            onToggle(category.id);
          }}
          className="p-0.5 hover:bg-accent rounded"
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )
          ) : (
            <span className="w-4 h-4" />
          )}
        </button>

        {/* 图标 */}
        {isExpanded ? (
          <FolderOpen className="w-4 h-4 text-primary" />
        ) : (
          <Folder className="w-4 h-4 text-muted-foreground" />
        )}

        {/* 名称 */}
        <span className="flex-1 text-sm truncate">{category.name}</span>

        {/* 操作按钮 */}
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1">
          <button
            onClick={e => {
              e.stopPropagation();
              setShowAddInput(!showAddInput);
            }}
            className="p-1 hover:bg-accent rounded"
            title="添加子分类"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
          {deleteConfirm ? (
            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
              <button
                onClick={handleDelete}
                className="px-1.5 py-0.5 text-xs bg-destructive text-destructive-foreground rounded"
              >
                确认
              </button>
              <button
                onClick={() => setDeleteConfirm(false)}
                className="px-1.5 py-0.5 text-xs bg-muted rounded"
              >
                取消
              </button>
            </div>
          ) : (
            <button
              onClick={e => {
                e.stopPropagation();
                setDeleteConfirm(true);
              }}
              className="p-1 hover:bg-destructive/10 text-destructive rounded"
              title="删除分类"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 添加子分类输入框 */}
      {showAddInput && (
        <div
          className="flex items-center gap-2 py-1"
          style={{ paddingLeft: `${(level + 1) * 16 + 8}px` }}
        >
          <input
            type="text"
            value={newCategoryName}
            onChange={e => setNewCategoryName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddSubmit()}
            placeholder="分类名称"
            className="input h-7 text-sm flex-1"
            autoFocus
          />
          <button onClick={handleAddSubmit} className="btn-primary h-7 px-2 text-xs">
            添加
          </button>
          <button
            onClick={() => {
              setShowAddInput(false);
              setNewCategoryName('');
            }}
            className="btn-secondary h-7 px-2 text-xs"
          >
            取消
          </button>
        </div>
      )}

      {/* 子节点 (带动画) */}
      {hasChildren && (
        <div
          data-state={isExpanded ? 'open' : 'closed'}
          className={`
            overflow-hidden transition-all
            data-[state=open]:animate-accordion-down 
            data-[state=closed]:animate-accordion-up
          `}
          style={{ 
            '--radix-accordion-content-height': height,
            animationFillMode: 'forwards'
          } as React.CSSProperties}
        >
          <div ref={contentRef}>
            {category.children!.map(child => (
              <TreeNode
                key={child.id}
                category={child}
                level={level + 1}
                selectedId={selectedId}
                expandedIds={expandedIds}
                onSelect={onSelect}
                onToggle={onToggle}
                onAdd={onAdd}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CategoryTree({
  categories,
  selectedId,
  onSelect,
  onAdd,
  onDelete,
}: CategoryTreeProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['1']));
  const [showRootAdd, setShowRootAdd] = useState(false);
  const [rootCategoryName, setRootCategoryName] = useState('');

  const handleToggle = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleRootAddSubmit = () => {
    if (rootCategoryName.trim()) {
      onAdd(null, rootCategoryName.trim());
      setRootCategoryName('');
      setShowRootAdd(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* 添加根分类按钮 */}
      <div className="px-2">
        {showRootAdd ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={rootCategoryName}
              onChange={e => setRootCategoryName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleRootAddSubmit()}
              placeholder="分类名称"
              className="input h-7 text-sm flex-1"
              autoFocus
            />
            <button onClick={handleRootAddSubmit} className="btn-primary h-7 px-2 text-xs">
              添加
            </button>
            <button
              onClick={() => {
                setShowRootAdd(false);
                setRootCategoryName('');
              }}
              className="btn-secondary h-7 px-2 text-xs"
            >
              取消
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowRootAdd(true)}
            className="btn-outline w-full h-8 text-sm"
          >
            <Plus className="w-4 h-4" />
            添加分类
          </button>
        )}
      </div>

      {/* 树形结构 */}
      <div className="space-y-0.5">
        {categories.map(category => (
          <TreeNode
            key={category.id}
            category={category}
            level={0}
            selectedId={selectedId}
            expandedIds={expandedIds}
            onSelect={onSelect}
            onToggle={handleToggle}
            onAdd={onAdd}
            onDelete={onDelete}
          />
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center text-muted-foreground text-sm py-4">
          暂无分类
        </div>
      )}
    </div>
  );
}
