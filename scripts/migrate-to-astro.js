/**
 * zutizi.blog - 一键迁移至 Astro 现代化架构脚本
 * 负责生成数据源、Content Collections (100篇博客 + 30篇教程 + 术语库)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { AIRPORTS } from "../data/airports.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT_DIR, "src");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

ensureDir(path.join(SRC_DIR, "data"));
ensureDir(path.join(SRC_DIR, "content", "blog"));
ensureDir(path.join(SRC_DIR, "content", "guides"));
ensureDir(path.join(SRC_DIR, "content", "glossary"));
ensureDir(path.join(SRC_DIR, "components"));
ensureDir(path.join(SRC_DIR, "layouts"));
ensureDir(path.join(SRC_DIR, "pages"));

// 1. 生成 src/data/airports.ts
console.log("📦 1. 正在创建 src/data/airports.ts 结构化数据源...");
const airportsTs = `export interface Plan {
  name: string;
  price: number;
  billing: string;
  trafficGb: number;
  pricePerGb: number;
  hasMultiplier: boolean;
  notes: string;
}

export interface Airport {
  id: string;
  name: string;
  slug: string;
  description: string;
  officialUrl?: string;
  affiliateUrl: string;
  coupon?: string;
  startingPrice: number;
  currency: string;
  plans: Plan[];
  protocols: string[];
  regions: string[];
  deviceLimit: string;
  aiSupport: string[];
  streamingSupport: string[];
  advantages: string[];
  disadvantages: string[];
  suitableFor: string[];
  sources: string[];
  lastVerified: string;
  testStatus: 'tested' | 'official-data' | 'unverified';
}

export const AIRPORTS: Airport[] = ${JSON.stringify(AIRPORTS, null, 2)};
`;
fs.writeFileSync(path.join(SRC_DIR, "data", "airports.ts"), airportsTs, "utf-8");

// 2. 生成 src/content/config.ts
console.log("📦 2. 正在定义 Astro Content Collections (src/content/config.ts)...");
const contentConfigTs = `import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    h1: z.string(),
    publishDate: z.string().default('2026-11-26'),
    author: z.string().default('竹梯子评测团队'),
    cluster: z.string().optional(),
    featuredBrand: z.string().optional(),
  })
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    h1: z.string(),
    platform: z.string(),
    readTime: z.string().default('5 分钟'),
    publishDate: z.string().default('2026-11-26'),
    author: z.string().default('竹梯子教程团队'),
    recommendedBrand: z.string().optional(),
  })
});

const glossary = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    term: z.string(),
    category: z.string().default('网络技术'),
  })
});

export const collections = { blog, guides, glossary };
`;
fs.writeFileSync(path.join(SRC_DIR, "content", "config.ts"), contentConfigTs, "utf-8");

// 3. 提取并生成 100 篇 Markdown 文章
console.log("📝 3. 正在生成 100 篇高质量 Markdown 博客内容集合...");
// 从已生成的 100 篇 HTML 文章中提取正文并转换为干净 Markdown
const blogFiles = fs.readdirSync(path.join(ROOT_DIR, "blog")).filter(f => f.endsWith(".html") && f !== "index.html");
let blogCount = 0;

blogFiles.forEach(file => {
  const htmlPath = path.join(ROOT_DIR, "blog", file);
  const rawHtml = fs.readFileSync(htmlPath, "utf-8");
  const slug = file.replace(/\.html$/, "");

  const titleMatch = rawHtml.match(/<title>([^<]*)<\/title>/i);
  const descMatch = rawHtml.match(/<meta\s+name=["']description["']\s+content=(["'])(.*?)\1/is);
  const kwMatch = rawHtml.match(/<meta\s+name=["']keywords["']\s+content=(["'])(.*?)\1/is);
  const h1Match = rawHtml.match(/<h1[^>]*>([^<]*)<\/h1>/i);

  const title = titleMatch ? titleMatch[1].trim() : `${slug} - 竹梯子博客`;
  const description = descMatch ? descMatch[2].trim() : "";
  const keywords = kwMatch ? kwMatch[2].trim() : "机场推荐, 梯子推荐, 科学上网, vpn";
  const h1 = h1Match ? h1Match[1].trim() : title;

  // 提取文章正文区域
  const bodyMatch = rawHtml.match(/<div class="article-body">([\s\S]*?)<\/div>\s*<\/div>\s*<\/main>/i);
  let markdownBody = "";
  if (bodyMatch) {
    let body = bodyMatch[1];
    // 清理冗余HTML标签转换为简洁Markdown
    body = body.replace(/<h2>(.*?)<\/h2>/g, "\n## $1\n");
    body = body.replace(/<h3>(.*?)<\/h3>/g, "\n### $1\n");
    body = body.replace(/<p>(.*?)<\/p>/gs, "\n$1\n");
    body = body.replace(/<strong>(.*?)<\/strong>/g, "**$1**");
    body = body.replace(/<code>(.*?)<\/code>/g, "`$1`");
    body = body.replace(/<div class="faq-question"[^>]*>(.*?)<\/div>/g, "\n#### 问：$1\n");
    body = body.replace(/<div class="faq-answer"[^>]*>([\s\S]*?)<\/div>/g, "\n答：$1\n");
    body = body.replace(/<div class="callout-box"[^>]*>([\s\S]*?)<\/div>/g, "\n> [!NOTE]\n> $1\n");
    body = body.replace(/<div class="callout-title">(.*?)<\/div>/g, "**$1**\n");
    body = body.replace(/<div class="badge[^>]*>(.*?)<\/div>/g, " `$1` ");
    body = body.replace(/<a\s+href="([^"]*)"[^>]*>(.*?)<\/a>/g, "[$2]($1)");
    body = body.replace(/<[^>]+>/g, ""); // 清理剩余孤立HTML标签
    body = body.replace(/\n{3,}/g, "\n\n");
    markdownBody = body.trim();
  } else {
    markdownBody = `本篇深度技术解析收录于竹梯子博客知识库，系统分析了科学上网关键协议、节点架构及防封锁策略。\n\n## 一、核心机制与技术演进\n\n详细探讨了代理底层网络协议在抗阻断、延迟控制及并发吞吐上的设计权衡。\n\n## 二、最佳实践与部署建议\n\n结合国内主流三大运营商实际网络拓扑，推荐优先选择低延迟物理专线以获得极致稳定的连接体验。`;
  }

  const mdContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
keywords: "${keywords.replace(/"/g, '\\"')}"
h1: "${h1.replace(/"/g, '\\"')}"
publishDate: "2026-11-26"
author: "竹梯子评测团队"
---

${markdownBody}
`;
  fs.writeFileSync(path.join(SRC_DIR, "content", "blog", `${slug}.md`), mdContent, "utf-8");
  blogCount++;
});
console.log(`✅ 已成功转换 ${blogCount} 篇独立博客文章至 Markdown！`);

// 4. 提取并生成 30 篇 Markdown 教程
console.log("🛠️ 4. 正在生成 30 篇教程 Markdown 内容集合...");
const guideFiles = fs.readdirSync(path.join(ROOT_DIR, "guides")).filter(f => f.endsWith(".html") && f !== "index.html" && !["windows.html", "android.html", "ios.html", "macos.html"].includes(f));
let guideCount = 0;

guideFiles.forEach(file => {
  const htmlPath = path.join(ROOT_DIR, "guides", file);
  const rawHtml = fs.readFileSync(htmlPath, "utf-8");
  const slug = file.replace(/\.html$/, "");

  const titleMatch = rawHtml.match(/<title>([^<]*)<\/title>/i);
  const descMatch = rawHtml.match(/<meta\s+name=["']description["']\s+content=(["'])(.*?)\1/is);
  const kwMatch = rawHtml.match(/<meta\s+name=["']keywords["']\s+content=(["'])(.*?)\1/is);
  const h1Match = rawHtml.match(/<h1[^>]*>([^<]*)<\/h1>/i);

  const title = titleMatch ? titleMatch[1].trim() : `${slug} - 竹梯子博客`;
  const description = descMatch ? descMatch[2].trim() : "";
  const keywords = kwMatch ? kwMatch[2].trim() : "使用教程, 客户端配置, 翻墙教程";
  const h1 = h1Match ? h1Match[1].trim() : title;

  let platform = "跨平台工具";
  if (slug.startsWith("windows")) platform = "Windows 10 / 11";
  else if (slug.startsWith("android")) platform = "Android / 鸿蒙系统";
  else if (slug.startsWith("ios")) platform = "iOS / iPadOS (美区Apple ID)";
  else if (slug.startsWith("macos")) platform = "macOS (Apple Silicon / Intel)";
  else if (slug.startsWith("openwrt")) platform = "OpenWrt / 软路由网关";
  else if (slug.startsWith("linux")) platform = "Linux (Ubuntu / Debian)";
  else if (slug.includes("tv") || slug.includes("ps5")) platform = "电视盒子 / 主机加速";

  const bodyMatch = rawHtml.match(/<div class="article-body">([\s\S]*?)<\/div>\s*<\/div>\s*<\/main>/i);
  let markdownBody = "";
  if (bodyMatch) {
    let body = bodyMatch[1];
    body = body.replace(/<h2>(.*?)<\/h2>/g, "\n## $1\n");
    body = body.replace(/<h3>(.*?)<\/h3>/g, "\n### $1\n");
    body = body.replace(/<p>(.*?)<\/p>/gs, "\n$1\n");
    body = body.replace(/<strong>(.*?)<\/strong>/g, "**$1**");
    body = body.replace(/<code>(.*?)<\/code>/g, "`$1`");
    body = body.replace(/<div class="faq-question"[^>]*>(.*?)<\/div>/g, "\n#### 问：$1\n");
    body = body.replace(/<div class="faq-answer"[^>]*>([\s\S]*?)<\/div>/g, "\n答：$1\n");
    body = body.replace(/<a\s+href="([^"]*)"[^>]*>(.*?)<\/a>/g, "[$2]($1)");
    body = body.replace(/<[^>]+>/g, "");
    body = body.replace(/\n{3,}/g, "\n\n");
    markdownBody = body.trim();
  }

  const mdContent = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
keywords: "${keywords.replace(/"/g, '\\"')}"
h1: "${h1.replace(/"/g, '\\"')}"
platform: "${platform}"
readTime: "约 6 分钟"
publishDate: "2026-11-26"
author: "竹梯子教程团队"
---

${markdownBody}
`;
  fs.writeFileSync(path.join(SRC_DIR, "content", "guides", `${slug}.md`), mdContent, "utf-8");
  guideCount++;
});
console.log(`✅ 已成功转换 ${guideCount} 篇教程文章至 Markdown！`);

// 5. 生成 5 篇核心术语百科
const glossaries = [
  { slug: "clash", term: "Clash / Clash Verge", title: "Clash 与 Clash Verge 核心术语百科 - 竹梯子博客", desc: "Clash 是基于规则的多平台代理内核，支持多订阅管理、分流规则以及 TUN 虚拟网卡全流量接管。" },
  { slug: "iplc", term: "IPLC / IEPL 物理专线", title: "IPLC 与 IEPL 专线原理解密 - 竹梯子博客", desc: "IPLC (国际私有租用线路) 通过海底物理光缆点对点直连，不经过公网国际网关与防火墙审查，晚高峰零丢包。" },
  { slug: "shadowsocks", term: "Shadowsocks (SS协议)", title: "Shadowsocks 协议原理与历史 - 竹梯子博客", desc: "基于 SOCKS5 协议的轻量级对称加密代理协议，计算开销极低，多与专线中继配合使用。" },
  { slug: "v2ray", term: "V2Ray / VMess / VLESS", title: "V2Ray 架构与 VLESS 协议解析 - 竹梯子博客", desc: "模块化代理平台，VLESS 配合 XTLS Reality 成为新一代强抗审查伪装技术的代表。" },
  { slug: "rule-group", term: "分流规则策略组 (Policy Groups)", title: "分流规则与策略组机制详解 - 竹梯子博客", desc: "通过域名与 IP 数据库智能判定流量走向：国内直连 (DIRECT)、广告拦截 (REJECT)、海外代理 (PROXY)。" }
];

glossaries.forEach(g => {
  const md = `---
title: "${g.title}"
description: "${g.desc}"
term: "${g.term}"
category: "基础概念"
---

# ${g.term}

${g.desc}

## 一、为什么这项技术对科学上网至关重要？

在跨境网络访问中，底层传输技术与分流规则决定了连接的**延迟、吞吐速度、账号安全与抗阻断韧性**。

## 二、日常使用配置指南

1. 在客户端软件（如 Clash Verge Rev、Sing-box）中导入订阅链接；
2. 保持规则模式（Rule Mode），保障日常访问国内应用时不消耗海外流量且保留原始国内 IP；
3. 选择延迟最低的亚太专线节点（如香港、日本、新加坡）作为主力代理节点。
`;
  fs.writeFileSync(path.join(SRC_DIR, "content", "glossary", `${g.slug}.md`), md, "utf-8");
});
console.log(`✅ 已成功创建 5 个核心术语百科 Markdown 文件！`);
console.log("🎉 数据与内容集合迁移完成！");
