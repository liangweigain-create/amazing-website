import { useState } from 'react';
import { Pencil, Trash2, Eye, MessageSquare, Heart, Share2, Bookmark } from 'lucide-react';
import type { Category, MarketingMaterial, MaterialStatus, MaterialType } from '../types';
import { materialTypeLabels, materialStatusLabels } from '../types';
import CategoryTree from '../components/CategoryTree';

// 模拟分类数据
const initialCategories: Category[] = [
  {
    id: '1',
    name: '产品宣传',
    parentId: null,
    children: [
      { id: '1-1', name: '新品发布', parentId: '1' },
      { id: '1-2', name: '促销活动', parentId: '1' },
    ],
  },
  {
    id: '2',
    name: '品牌故事',
    parentId: null,
    children: [
      { id: '2-1', name: '企业文化', parentId: '2' },
      { id: '2-2', name: '客户案例', parentId: '2' },
    ],
  },
  {
    id: '3',
    name: '行业资讯',
    parentId: null,
  },
];

// 模拟素材数据
const initialMaterials: MarketingMaterial[] = [
  {
    id: '1',
    name: '2024新品发布海报',
    type: 'poster',
    status: 'published',
    categoryId: '1-1',
    stats: { views: 1234, shares: 89, favorites: 156, likes: 423, comments: 45 },
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: '春季促销活动视频',
    type: 'video',
    status: 'published',
    categoryId: '1-2',
    stats: { views: 5678, shares: 234, favorites: 567, likes: 890, comments: 123 },
    createdAt: '2024-02-01',
  },
  {
    id: '3',
    name: '企业文化宣传文章',
    type: 'article',
    status: 'draft',
    categoryId: '2-1',
    stats: { views: 890, shares: 45, favorites: 78, likes: 234, comments: 12 },
    createdAt: '2024-02-15',
  },
  {
    id: '4',
    name: '客户成功案例图片集',
    type: 'image',
    status: 'published',
    categoryId: '2-2',
    stats: { views: 2345, shares: 123, favorites: 234, likes: 567, comments: 67 },
    createdAt: '2024-03-01',
  },
];

export default function MarketingPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [materials, setMaterials] = useState<MarketingMaterial[]>(initialMaterials);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedStatsId, setExpandedStatsId] = useState<string | null>(null);

  // 添加分类
  const handleAddCategory = (parentId: string | null, name: string) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      name,
      parentId,
    };

    if (parentId === null) {
      setCategories(prev => [...prev, newCategory]);
    } else {
      const addToParent = (cats: Category[]): Category[] => {
        return cats.map(cat => {
          if (cat.id === parentId) {
            return {
              ...cat,
              children: [...(cat.children || []), newCategory],
            };
          }
          if (cat.children) {
            return { ...cat, children: addToParent(cat.children) };
          }
          return cat;
        });
      };
      setCategories(prev => addToParent(prev));
    }
  };

  // 删除分类
  const handleDeleteCategory = (id: string) => {
    const removeCategory = (cats: Category[]): Category[] => {
      return cats
        .filter(cat => cat.id !== id)
        .map(cat => ({
          ...cat,
          children: cat.children ? removeCategory(cat.children) : undefined,
        }));
    };
    setCategories(prev => removeCategory(prev));
    if (selectedCategoryId === id) {
      setSelectedCategoryId(null);
    }
  };

  // 删除素材
  const handleDeleteMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
    setDeleteConfirm(null);
  };

  // 根据选中分类筛选素材
  const filteredMaterials = selectedCategoryId
    ? materials.filter(m => m.categoryId === selectedCategoryId)
    : materials;

  // 获取状态样式类
  const getStatusClass = (status: MaterialStatus) => {
    switch (status) {
      case 'published':
        return 'badge-success';
      case 'draft':
        return 'badge-warning';
      case 'archived':
        return 'badge-destructive';
    }
  };

  // 获取类型样式类
  const getTypeClass = (type: MaterialType) => {
    switch (type) {
      case 'image':
        return 'bg-blue-100 text-blue-700';
      case 'video':
        return 'bg-purple-100 text-purple-700';
      case 'article':
        return 'bg-green-100 text-green-700';
      case 'poster':
        return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面头部 */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">营销素材管理</h1>
        <p className="text-muted-foreground mt-1">管理营销素材分类和内容</p>
      </div>

      {/* 主体内容 */}
      <div className="flex gap-6">
        {/* 左侧分类树 */}
        <div className="w-64 shrink-0">
          <div className="card p-4">
            <h2 className="text-sm font-semibold text-foreground mb-4">素材分类</h2>
            <CategoryTree
              categories={categories}
              selectedId={selectedCategoryId}
              onSelect={setSelectedCategoryId}
              onAdd={handleAddCategory}
              onDelete={handleDeleteCategory}
            />
            {selectedCategoryId && (
              <button
                onClick={() => setSelectedCategoryId(null)}
                className="btn-ghost w-full h-8 text-sm mt-4"
              >
                查看全部素材
              </button>
            )}
          </div>
        </div>

        {/* 右侧素材列表 */}
        <div className="flex-1">
          <div className="card overflow-hidden">
            <table className="table">
              <thead>
                <tr>
                  <th>素材名称</th>
                  <th>类型</th>
                  <th>状态</th>
                  <th>穿透数据</th>
                  <th className="text-right">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map(material => (
                  <>
                    <tr key={material.id}>
                      <td className="font-medium">{material.name}</td>
                      <td>
                        <span className={`badge ${getTypeClass(material.type)}`}>
                          {materialTypeLabels[material.type]}
                        </span>
                      </td>
                      <td>
                        <span className={getStatusClass(material.status)}>
                          {materialStatusLabels[material.status]}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            setExpandedStatsId(
                              expandedStatsId === material.id ? null : material.id
                            )
                          }
                          className="btn-ghost text-xs px-2 py-1"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          {expandedStatsId === material.id ? '收起' : '查看'}
                        </button>
                      </td>
                      <td>
                        <div className="flex items-center justify-end gap-2">
                          {/* 编辑 */}
                          <button
                            onClick={() => alert('编辑功能待实现')}
                            className="btn-ghost btn-icon"
                            title="编辑"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          {/* 删除 */}
                          {deleteConfirm === material.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDeleteMaterial(material.id)}
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
                              onClick={() => setDeleteConfirm(material.id)}
                              className="btn-ghost btn-icon text-destructive hover:bg-destructive/10"
                              title="删除"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {/* 穿透数据展开行 */}
                    {expandedStatsId === material.id && (
                      <tr key={`${material.id}-stats`}>
                        <td colSpan={5} className="bg-muted/30">
                          <div className="flex items-center justify-around py-3">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Eye className="w-4 h-4" />
                              <span className="text-sm">阅读</span>
                              <span className="font-semibold text-foreground">
                                {material.stats.views.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Share2 className="w-4 h-4" />
                              <span className="text-sm">分享</span>
                              <span className="font-semibold text-foreground">
                                {material.stats.shares.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Bookmark className="w-4 h-4" />
                              <span className="text-sm">收藏</span>
                              <span className="font-semibold text-foreground">
                                {material.stats.favorites.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">点赞</span>
                              <span className="font-semibold text-foreground">
                                {material.stats.likes.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MessageSquare className="w-4 h-4" />
                              <span className="text-sm">评论</span>
                              <span className="font-semibold text-foreground">
                                {material.stats.comments.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>

            {filteredMaterials.length === 0 && (
              <div className="p-12 text-center text-muted-foreground">
                {selectedCategoryId ? '该分类下暂无素材' : '暂无素材数据'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
