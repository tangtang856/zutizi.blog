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
let updatedCount = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, "utf-8");
  const relFile = path.relative(ROOT_DIR, file).replace(/\\/g, "/");

  const hasKeywords = /<meta\s+name=["']keywords["']/i.test(content);
  if (!hasKeywords) {
    let kw = "机场推荐, 机场节点, 性价比机场, 梯子推荐, vpn, vpn机场, vpn节点, vpn推荐, 科学上网";
    if (relFile.startsWith("glossary/")) {
      kw = "翻墙术语, 代理协议, 机场知识百科, IPLC专线, Clash规则, 科学上网概念";
    } else if (relFile.startsWith("guides/")) {
      kw = "使用教程, 客户端配置, 翻墙软件下载, 节点订阅导入, 科学上网设置";
    } else if (relFile.startsWith("compare/")) {
      kw = "机场横向对比, 梯子测速对比, 节点价格比较, 每GB单价测算, 翻墙机场比较工具";
    } else if (["about.html", "editorial-policy.html", "contact.html", "privacy-policy.html", "disclaimer.html"].includes(relFile)) {
      kw = "竹梯子博客, 客观中立评测, 编辑部政策, 隐私声明, 联系合作, 机场推荐标准";
    }

    // 在 <meta name="description" ...> 后面插入
    content = content.replace(/(<meta\s+name=["']description["'][^>]*>)/i, `$1\n  <meta name="keywords" content="${kw}">`);
    fs.writeFileSync(file, content, "utf-8");
    updatedCount++;
    console.log(`+ 添加 Keywords: ${relFile}`);
  }
});

console.log(`✅ 成功为 ${updatedCount} 个页面补充了 Keywords 元标签！`);
