# Bing Webmaster Tools 操作指南 (zutizi.blog)

本指南针对 `https://zutizi.blog` 的 Bing 搜索引擎优化（SEO）与站长平台接入进行标准化说明。

---

## 一、站点添加与归属权验证

1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters) 并使用 Microsoft 账号登录。
2. 点击 **“添加网站” (Add a site)**：
   - 方式 A（推荐）：直接通过 Google Search Console (GSC) 一键导入授权；
   - 方式 B：手动输入 `https://zutizi.blog`。
3. 验证所有权方式（任选其一）：
   - **方式 1：XML 文件验证**
     下载 Bing 提供的 `BingSiteAuth.xml` 文件，放置在网站根目录下，部署后点击验证。
   - **方式 2：HTML 元标记验证**
     将 Bing 提供的 `<meta name="msvalidate.01" content="..." />` 粘贴至 `index.html` 的 `<head>` 区域内。
   - **方式 3：CNAME / DNS TXT 记录**
     在域名 DNS 解析商（如 Cloudflare）处添加相应的 TXT 记录。

---

## 二、提交 Sitemap 站点地图

1. 登录 Bing Webmaster Tools 后台，进入左侧菜单 **“站点地图” (Sitemaps)**。
2. 在右上角点击 **“提交站点地图” (Submit sitemap)**。
3. 输入完整绝对路径：
   - `https://zutizi.blog/sitemap.xml`
   - `https://zutizi.blog/sitemap-index.xml`
4. 点击“提交”，状态将在 24-48 小时内变更为“成功”，Bing 将开始排队抓取 47 个正式内容页。

---

## 三、IndexNow 实时推送验证

本项目已内置自动化 IndexNow 引擎：

1. **密钥验证文件：**
   根目录已生成 `d7e9b25f6c484a1e941f17e3a2b0c48e.txt`，上线后可通过 `https://zutizi.blog/d7e9b25f6c484a1e941f17e3a2b0c48e.txt` 访问验证。
2. **日常推送命令：**
   ```bash
   npm run indexnow
   ```
3. **Bing 后台查看：**
   在 Bing Webmaster Tools 左侧菜单点击 **“IndexNow”**，可实时监控已提交 URL 的数量、提交时间戳及 Bing 抓取响应状态。

---

## 四、URL Inspection (URL 检查)

1. 点击左侧 **“URL 检查” (URL Inspection)**。
2. 输入首页 `https://zutizi.blog/` 或重要落地页（如 `https://zutizi.blog/ranking/overall.html`）。
3. 检查：
   - 是否已索引 (Indexed)
   - 抓取状态 (Crawl status: Success)
   - 是否存在 Schema 结构化数据解析警告
   - 移动端可用性检测 (Mobile Friendliness)
4. 若页面有重大更新，可手动点击 **“请求索引” (Request Indexing)**。

---

## 五、搜索表现与抓取排错监控

- **搜索表现 (Search Performance)：** 监控关键词 `机场推荐`、`机场节点`、`性价比机场`、`梯子推荐` 的展现量 (Impressions)、点击量 (Clicks) 与平均排名 (Average Position)。
- **抓取控制 (Crawl Control)：** 建议设置抓取高峰时段为服务器负载较低的时间。
- **抓取问题 (Crawl Issues)：** 定期排查是否存在 404 错误、死链或服务器超时告警。
