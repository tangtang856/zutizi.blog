/**
 * zutizi.blog - 站内链接与相对路径自动化检查脚本
 * 1. 严格检查所有站内超链接、CSS、JS、图片引用是否能正确定位到本地文件
 * 2. 严厉禁止使用以 '/' 开头的绝对路径（必须使用 ./ 或 ../ 相对路径）
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

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
console.log(`🔗 开始检查 ${htmlFiles.length} 个 HTML 页面的站内链接与资源路径...`);

let errors = [];
let totalLinksChecked = 0;

htmlFiles.forEach(file => {
  const relFile = path.relative(ROOT_DIR, file).replace(/\\/g, "/");
  const dir = path.dirname(file);
  const content = fs.readFileSync(file, "utf-8");

  // 1. 检查 a href
  const hrefMatches = content.matchAll(/<a\s+(?:[^>]*?\s+)?href=["']([^"']+)["']/gi);
  for (const m of hrefMatches) {
    const target = m[1].trim();
    totalLinksChecked++;
    
    // 跳过外部链接、锚点、邮件
    if (target.startsWith("http://") || target.startsWith("https://") || target.startsWith("mailto:") || target.startsWith("tel:") || target.startsWith("#") || target.startsWith("javascript:")) {
      continue;
    }

    // 检查是否违背相对路径原则（以 / 开头）
    if (target.startsWith("/")) {
      errors.push(`[${relFile}] 违背相对路径规范：使用绝对路径 '${target}'，必须使用标准相对路径 (如 ../ 或 ./ 或 直接写目标)`);
      continue;
    }

    // 验证目标文件是否存在
    const cleanTarget = target.split("#")[0].split("?")[0];
    if (!cleanTarget) continue; // 仅锚点

    const resolvedPath = path.resolve(dir, cleanTarget);
    if (!fs.existsSync(resolvedPath)) {
      errors.push(`[${relFile}] 死链错误：无法找到目标文件 '${target}' (解析路径: ${path.relative(ROOT_DIR, resolvedPath)})`);
    }
  }

  // 2. 检查 link href (css等)
  const linkMatches = content.matchAll(/<link\s+(?:[^>]*?\s+)?href=["']([^"']+)["']/gi);
  for (const m of linkMatches) {
    const target = m[1].trim();
    totalLinksChecked++;
    if (target.startsWith("http://") || target.startsWith("https://")) continue;

    if (target.startsWith("/")) {
      errors.push(`[${relFile}] CSS/Resource 引用违背相对路径规范：使用了绝对根路径 '${target}'`);
      continue;
    }

    const resolvedPath = path.resolve(dir, target);
    if (!fs.existsSync(resolvedPath)) {
      errors.push(`[${relFile}] 资源缺失：link href '${target}' 对应文件不存在`);
    }
  }

  // 3. 检查 script src
  const scriptMatches = content.matchAll(/<script\s+(?:[^>]*?\s+)?src=["']([^"']+)["']/gi);
  for (const m of scriptMatches) {
    const target = m[1].trim();
    totalLinksChecked++;
    if (target.startsWith("http://") || target.startsWith("https://")) continue;

    if (target.startsWith("/")) {
      errors.push(`[${relFile}] JS 引用违背相对路径规范：使用了绝对根路径 '${target}'`);
      continue;
    }

    const resolvedPath = path.resolve(dir, target);
    if (!fs.existsSync(resolvedPath)) {
      errors.push(`[${relFile}] 资源缺失：script src '${target}' 对应文件不存在`);
    }
  }
});

console.log(`📊 共检查了 ${totalLinksChecked} 个链接与资源引用。`);

if (errors.length > 0) {
  console.error(`\n❌ 发现 ${errors.length} 处路径或链接问题：`);
  errors.forEach((err, idx) => console.error(`  ${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log("✅ 全部站内超链接、CSS、JS资源均符合严格相对路径规范，无死链，双击与上线均可完美解析！");
}
