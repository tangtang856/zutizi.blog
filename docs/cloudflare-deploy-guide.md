# Cloudflare Pages 部署指南 (zutizi.blog)

本项目采用**纯静态 HTML + 原生 CSS** 架构，无需任何外部 Node 构建依赖，秒级构建、全球 CDN 边缘节点零延迟响应。

---

## 一、GitHub 仓库准备

当前网站代码与结构已配置就绪，远程仓库地址：
`https://github.com/tangtang856/zutizi.blog.git`

---

## 二、Cloudflare Pages 部署步骤

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
2. 点击左侧导航栏 **Workers & Pages** -> **Create application** -> 选择 **Pages** 选项卡。
3. 点击 **Connect to Git**（连接到 GitHub），选择您的 GitHub 账号及仓库：`tangtang856/zutizi.blog`。
4. 在 **Set up builds and deployments** 配置界面：
   - **Project name:** `zutizi-blog`（或自定义）
   - **Production branch:** `main`（或 `master`）
   - **Framework preset:** `None`（选择空/无框架）
   - **Build command:** 留空（或输入 `npm run build`）
   - **Build output directory:** `.`（表示当前仓库根目录）
5. 点击 **Save and Deploy**（保存并部署）。
6. Cloudflare 将在 10 秒内完成全站部署并分配一个免费的 `*.pages.dev` 预览域名。

---

## 三、绑定自定义正式域名 (zutizi.blog)

1. 在刚刚创建的 Pages 项目主页，点击 **Custom domains**（自定义域）选项卡。
2. 点击 **Set up a custom domain**。
3. 输入您的域名：`zutizi.blog`。
4. 如果域名已托管在 Cloudflare DNS 上，Cloudflare 将自动配置 CNAME 记录；若在其他注册商，请按提示在 DNS 中添加一条指向 `zutizi-blog.pages.dev` 的 CNAME 解析记录。
5. 等待 SSL 证书签发完成，即可通过 `https://zutizi.blog` 全球极速访问！

---

## 四、本地与双击查看说明

本项目所有 CSS、JS 及页面跳转链接**严格使用相对路径**（如 `css/style.css`、`../css/style.css`、`recommend/budget.html`）：
- **本地双击体验：** 在 Windows 电脑资源管理器中直接双击任意 `index.html` 或 `.html` 文件，浏览器均能完美加载样式、脚本并自由跳转，完全不需要配置本地 Web 服务器！
- **线上部署体验：** 部署在 Cloudflare Pages 后，无论带不带 `.html` 扩展名均能正常秒开。
