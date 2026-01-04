// 登录表单数据类型
export interface LoginFormData {
  username: string;
  password: string;
}

// 登录响应类型
export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
}
