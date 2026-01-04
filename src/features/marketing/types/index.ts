// 素材类型枚举
export type MaterialType = 'image' | 'video' | 'article' | 'poster';

// 素材状态枚举
export type MaterialStatus = 'published' | 'draft' | 'archived';

// 分类节点类型
export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  children?: Category[];
}

// 穿透数据类型
export interface MaterialStats {
  views: number;      // 阅读次数
  shares: number;     // 分享次数
  favorites: number;  // 收藏次数
  likes: number;      // 点赞次数
  comments: number;   // 评论次数
}

// 营销素材类型
export interface MarketingMaterial {
  id: string;
  name: string;
  type: MaterialType;
  status: MaterialStatus;
  categoryId: string;
  stats: MaterialStats;
  createdAt: string;
}

// 素材类型显示名称
export const materialTypeLabels: Record<MaterialType, string> = {
  image: '图片',
  video: '视频',
  article: '文章',
  poster: '海报',
};

// 素材状态显示名称
export const materialStatusLabels: Record<MaterialStatus, string> = {
  published: '已发布',
  draft: '草稿',
  archived: '已归档',
};
