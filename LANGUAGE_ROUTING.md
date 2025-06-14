# 多语言路由功能说明

## 功能概述

本应用现在支持基于URL路由的多语言切换功能，用户可以通过访问不同的URL路径来切换语言。

## 支持的语言路由

- `/en` - 英文版本
- `/zh` - 中文版本

## 语言检测优先级

系统按以下优先级检测和设置语言：

1. **URL路径检测** - 优先级最高
   - 如果URL包含 `/en` 或 `/zh`，直接使用该语言
   - 例如：`http://localhost:5173/en` 显示英文版本

2. **本地存储** - 第二优先级
   - 检查 `localStorage` 中保存的用户语言偏好
   - 键名：`bg-remover-language`

3. **浏览器语言** - 第三优先级
   - 自动检测浏览器的语言设置
   - 支持的浏览器语言：`en`（英文）、`zh`（中文）

4. **默认语言** - 最后回退
   - 如果以上都无法确定，默认使用英文（`en`）

## 路由行为

### 自动重定向
- 访问根路径 `/` 时，自动重定向到当前语言路径
- 访问无效路径时，重定向到默认语言路径

### 语言切换
- 使用语言选择器切换语言时，URL会自动更新
- 保持当前页面路径，只更改语言前缀
- 例如：从 `/en/some-page` 切换到中文会变成 `/zh/some-page`

## 技术实现

### 核心组件
1. **AppRouter** - 处理路由逻辑
2. **LanguageContext** - 管理语言状态和切换
3. **LanguageSelector** - 语言选择UI组件

### 依赖包
- `react-router-dom` - 提供路由功能

## 使用示例

```javascript
// 在组件中使用语言功能
import { useLanguage } from '../i18n/LanguageContext';

function MyComponent() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div>
      <p>当前语言: {language}</p>
      <p>{t.hero.title}</p>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('zh')}>中文</button>
    </div>
  );
}
```

## 注意事项

1. 语言切换会自动保存到 `localStorage`
2. 页面刷新后会保持用户选择的语言
3. 支持浏览器前进/后退按钮
4. SEO友好的URL结构