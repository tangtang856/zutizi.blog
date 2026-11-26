/**
 * zutizi.blog - 自动化 SEO 技术审查脚本
 * 检查：缺失Title、重复Title、缺失Description、单H1约束、Canonical规范、Robots、OG标签
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const BASE_DOMAIN = "https://zutizi.blog";

function getHtmlFiles(dir, fileList = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (![".git", "node_modules", "scripts", "docs", ".gemini"].includes(item)) {
        getHtmlFiles(fullPath, fileList);
      }
    } else if (item.endsWith(".html")) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const htmlFiles = getHtmlFiles(ROOT_DIR);
console.log(`🔎 开始执行 SEO 技术参数审计，共检视 ${htmlFiles.length} 个页面...`);

const titlesMap = new Map();
let errors = [];

htmlFiles.forEach(file => {
  const relFile = path.relative(ROOT_DIR, file).replace(/\\/g, "/");
  const content = fs.readFileSync(file, "utf-8");

  // 1. 检查 Title
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    errors.push(`[${relFile}] 缺失 <title> 标签或内容为空`);
  } else {
    const title = titleMatch[1].trim();
    if (title.length < 10) {
      errors.push(`[${relFile}] <title> 过短 (${title.length}字符): "${title}"`);
    }
    if (titlesMap.has(title)) {
      errors.push(`[${relFile}] Title 与 [${titlesMap.get(title)}] 重复: "${title}"`);
    } else {
      titlesMap.set(title, relFile);
    }
  }

  // 2. 检查 Description
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=(["'])(.*?)\1/is);
  if (!descMatch || !descMatch[2].trim()) {
    errors.push(`[${relFile}] 缺失 <meta name="description"> 或内容为空`);
  } else {
    const desc = descMatch[2].trim();
    if (desc.length < 20) {
      errors.push(`[${relFile}] Meta Description 过短 (${desc.length}字符): "${desc}"`);
    }
  }

  // 3. 检查 H1 数量（必须严格为 1 个）
  const h1Matches = content.match(/<h1[^>]*>.*?<\/h1>/gis) || [];
  if (h1Matches.length === 0) {
    errors.push(`[${relFile}] 缺失 <h1> 标签`);
  } else if (h1Matches.length > 1) {
    errors.push(`[${relFile}] 存在多个 <h1> 标签 (${h1Matches.length}个)，违背唯一H1准则`);
  }

  // 4. 检查 Canonical URL
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  if (!canonicalMatch || !canonicalMatch[1].trim()) {
    errors.push(`[${relFile}] 缺失 Canonical URL`);
  } else {
    const canUrl = canonicalMatch[1].trim();
    if (!canUrl.startsWith(BASE_DOMAIN)) {
      errors.push(`[${relFile}] Canonical URL 未指向正式域名: "${canUrl}"`);
    }
  }

  // 5. 检查 Robots Meta
  const robotsMatch = content.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
  if (!robotsMatch) {
    errors.push(`[${relFile}] 缺失 <meta name="robots">`);
  }

  // 6. 检查 OpenGraph
  const ogTitle = content.match(/<meta\s+property=["']og:title["']/i);
  const ogDesc = content.match(/<meta\s+property=["']og:description["']/i);
  if (!ogTitle || !ogDesc) {
    errors.push(`[${relFile}] 缺失必要 OpenGraph (og:title 或 og:description) 标签`);
  }

  // 7. 检查 Keywords Meta
  const kwMatch = content.match(/<meta\s+name=["']keywords["']\s+content=(["'])(.*?)\1/is);
  if (!kwMatch || !kwMatch[2].trim()) {
    errors.push(`[${relFile}] 缺失 <meta name="keywords"> 或内容为空`);
  }
});

if (errors.length > 0) {
  console.error(`\n❌ 发现 ${errors.length} 项 SEO 技术指标不合规：`);
  errors.forEach((err, i) => console.error(`  ${i + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`✅ 全站 ${htmlFiles.length} 个页面 SEO 参数审计通过（Title唯一且非空、单H1、TDK健全、Canonical正确）！`);
}
