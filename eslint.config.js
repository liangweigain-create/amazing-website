import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // 防止常见错误
      'no-console': 'warn', // 提醒移除 console.log
      'no-debugger': 'warn',

      // React 最佳实践
      'react-hooks/exhaustive-deps': 'warn', // Hook 依赖检查

      // TypeScript 严格模式
      '@typescript-eslint/no-explicit-any': 'warn', // 避免 any
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',  // 允许 _arg 这种占位参数
        varsIgnorePattern: '^_'
      }],
    },
  },
])
