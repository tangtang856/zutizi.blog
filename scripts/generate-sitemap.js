/**
 * zutizi.blog - Sitemap 自动生成脚本
 * 遍历全站正式HTML页面，剔除404与草稿，输出标准XML站点地图
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const BASE_DOMAIN = "https://zutizi.blog";
const TODAY = new Date().toISOString().split("T")[0];

// 递归查找所有.html文件
function getHtmlFiles(dir, fileList = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // 排除node_modules, .git, scripts, docs等非页面目录
      if (![".git", "node_modules", "scripts", "docs", ".gemini"].includes(item)) {
        getHtmlFiles(fullPath, fileList);
      }
    } else if (item.endsWith(".html") && item !== "404.html") {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const htmlFiles = getHtmlFiles(ROOT_DIR);
console.log(`🔍 扫描到 ${htmlFiles.length} 个正式页面文件用于生成 Sitemap...`);

const urls = htmlFiles.map(filePath => {
  const rel = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
  let url = `${BASE_DOMAIN}/${rel}`;
  if (rel === "index.html") {
    url = `${BASE_DOMAIN}/`;
  }

  // 优先级计算
  let priority = "0.7";
  let changefreq = "weekly";
  if (rel === "index.html") {
    priority = "1.0";
    changefreq = "daily";
  } else if (rel.startsWith("ranking/") || rel.startsWith("recommend/")) {
    priority = "0.9";
    changefreq = "weekly";
  } else if (rel.startsWith("review/") || rel.startsWith("compare/")) {
    priority = "0.8";
    changefreq = "weekly";
  } else if (rel.startsWith("blog/") || rel.startsWith("guides/")) {
    priority = "0.8";
    changefreq = "monthly";
  } else if (rel.startsWith("glossary/") || rel.startsWith("airport/")) {
    priority = "0.6";
    changefreq = "monthly";
  } else {
    priority = "0.5";
    changefreq = "monthly";
  }

  return {
    loc: url,
    lastmod: TODAY,
    changefreq,
    priority
  };
});

// 生成 sitemap.xml
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

fs.writeFileSync(path.join(ROOT_DIR, "sitemap.xml"), sitemapXml, "utf-8");
console.log(`✅ sitemap.xml 生成完毕，共包含 ${urls.length} 个正式URL`);

// 生成 sitemap-index.xml
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_DOMAIN}/sitemap.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(ROOT_DIR, "sitemap-index.xml"), sitemapIndexXml, "utf-8");
console.log(`✅ sitemap-index.xml 生成完毕`);
