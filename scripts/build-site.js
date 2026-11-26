/**
 * zutizi.blog - 网站页面构建器
 * 生成纯原生HTML页面，严格遵循相对路径与Bing SEO标准
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { AIRPORTS } from "../data/airports.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const BASE_DOMAIN = "https://zutizi.blog";

// 辅助：获取公共导航栏
function getHeader(relPrefix, activeNav = "") {
  return `
  <header class="site-header">
    <div class="header-container">
      <a href="${relPrefix}index.html" class="logo-brand">
        <span class="logo-badge">竹梯子</span>
        <span>zutizi.blog</span>
      </a>
      <button class="mobile-toggle" aria-label="切换主导航菜单">☰</button>
      <ul class="nav-links">
        <li><a href="${relPrefix}index.html" class="nav-link ${activeNav === 'home' ? 'active' : ''}">首页</a></li>
        <li><a href="${relPrefix}recommend/index.html" class="nav-link ${activeNav === 'recommend' ? 'active' : ''}">机场推荐</a></li>
        <li><a href="${relPrefix}ranking/overall.html" class="nav-link ${activeNav === 'ranking' ? 'active' : ''}">排行榜</a></li>
        <li><a href="${relPrefix}compare/index.html" class="nav-link ${activeNav === 'compare' ? 'active' : ''}">横向对比</a></li>
        <li><a href="${relPrefix}review/index.html" class="nav-link ${activeNav === 'review' ? 'active' : ''}">独立评测</a></li>
        <li><a href="${relPrefix}guides/index.html" class="nav-link ${activeNav === 'guides' ? 'active' : ''}">使用教程</a></li>
        <li><a href="${relPrefix}blog/index.html" class="nav-link ${activeNav === 'blog' ? 'active' : ''}">深度博客</a></li>
        <li><a href="${relPrefix}glossary/index.html" class="nav-link ${activeNav === 'glossary' ? 'active' : ''}">知识百科</a></li>
      </ul>
      <a href="${relPrefix}index.html#speed-matrix" class="header-cta-btn">⚡ 晚高峰测速榜</a>
    </div>
  </header>`;
}

// 辅助：获取公共页脚
function getFooter(relPrefix) {
  return `
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-col">
        <h4>关于 竹梯子博客 (zutizi.blog)</h4>
        <p style="color:var(--text-muted); font-size:0.85rem; line-height:1.6; margin-bottom:0.75rem;">
          专注于提供客观、中立、基于实际测速数据的中文机场节点推荐、梯子测速对比与科学上网工具客户端配置教程。
        </p>
        <p style="color:var(--text-light); font-size:0.8rem;">
          本站数据每日监控、定期实测更新。所有推荐均区分官方宣传与实测数据，拒绝虚假刷榜。
        </p>
      </div>
      <div class="footer-col">
        <h4>核心专题</h4>
        <ul class="footer-links">
          <li><a href="${relPrefix}recommend/budget.html">便宜低价机场</a></li>
          <li><a href="${relPrefix}recommend/premium.html">高端IPLC专线</a></li>
          <li><a href="${relPrefix}recommend/stable.html">稳定节点推荐</a></li>
          <li><a href="${relPrefix}recommend/ai.html">ChatGPT/AI专用</a></li>
          <li><a href="${relPrefix}recommend/streaming.html">流媒体4K解锁</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>排行与工具</h4>
        <ul class="footer-links">
          <li><a href="${relPrefix}ranking/overall.html">综合排行榜</a></li>
          <li><a href="${relPrefix}ranking/value.html">性价比排行榜</a></li>
          <li><a href="${relPrefix}ranking/stable.html">稳定性排行榜</a></li>
          <li><a href="${relPrefix}compare/index.html">机场横向对比工具</a></li>
          <li><a href="${relPrefix}airport/index.html">机场资料库</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>服务与合规</h4>
        <ul class="footer-links">
          <li><a href="${relPrefix}about.html">关于我们</a></li>
          <li><a href="${relPrefix}editorial-policy.html">编辑政策与评测标准</a></li>
          <li><a href="${relPrefix}contact.html">联系与商务</a></li>
          <li><a href="${relPrefix}privacy-policy.html">隐私政策</a></li>
          <li><a href="${relPrefix}disclaimer.html">免责声明</a></li>
          <li><a href="${relPrefix}sitemap.xml">XML站点地图</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div>&copy; 2026 zutizi.blog (竹梯子博客). 保留所有权利。</div>
      <div>基于纯静态HTML与原生CSS构建 · 极速加载 · Bing SEO规范认证</div>
    </div>
  </footer>`;
}

// 辅助：生成完整HTML页面包装
function wrapHtml({ title, description, keywords, canonicalPath, relPrefix, activeNav, breadcrumbs = [], content, extraScripts = "", schemaJson = null }) {
  const canonicalUrl = `${BASE_DOMAIN}/${canonicalPath.replace(/^\//, "")}`;
  
  // 面包屑HTML
  let breadcrumbsHtml = "";
  if (breadcrumbs.length > 0) {
    breadcrumbsHtml = `<nav class="breadcrumb-nav" aria-label="面包屑导航">
      <a href="${relPrefix}index.html">首页</a>`;
    breadcrumbs.forEach((b, idx) => {
      breadcrumbsHtml += `<span class="breadcrumb-sep">/</span>`;
      if (idx === breadcrumbs.length - 1 || !b.href) {
        breadcrumbsHtml += `<span class="breadcrumb-current">${b.name}</span>`;
      } else {
        breadcrumbsHtml += `<a href="${b.href}">${b.name}</a>`;
      }
    });
    breadcrumbsHtml += `</nav>`;
  }

  // Schema LD+JSON
  let schemaHtml = "";
  if (schemaJson) {
    schemaHtml = `<script type="application/ld+json">\n${JSON.stringify(schemaJson, null, 2)}\n</script>`;
  }

  const defaultKeywords = "机场推荐, 机场节点, 性价比机场, 梯子推荐, vpn, vpn机场, vpn节点, vpn推荐, 科学上网";

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords || defaultKeywords}">
  <link rel="canonical" href="${canonicalUrl}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <meta property="og:locale" content="zh_CN">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="竹梯子博客 - zutizi.blog">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <link rel="stylesheet" href="${relPrefix}css/style.css">
  ${schemaHtml}
</head>
<body>
  ${getHeader(relPrefix, activeNav)}
  <main>
    ${breadcrumbs.length > 0 ? `<div class="container" style="padding-top:1.25rem; padding-bottom:0;">${breadcrumbsHtml}</div>` : ''}
    ${content}
  </main>
  ${getFooter(relPrefix)}
  <script src="${relPrefix}js/main.js" defer></script>
  ${extraScripts}
</body>
</html>`;
}

// 辅助：生成卡片HTML (支持分类过滤属性、Top3勋章与关键特性标签)
function generateAirportCard(airport, relPrefix, rankIndex = -1) {
  const minPlan = airport.plans[0];
  const couponBadge = airport.coupon ? `<span class="badge badge-amber">券: ${airport.coupon}</span>` : "";
  
  // 提取分类属性
  const cats = ["all"];
  if (airport.startingPrice <= 15) cats.push("budget");
  if (airport.description.includes("IPLC") || airport.description.includes("专线") || airport.advantages.some(a => a.includes("专线"))) cats.push("iplc");
  if (airport.streamingSupport && airport.streamingSupport.length > 0) cats.push("streaming");
  if (airport.advantages.some(a => a.includes("低") || a.includes("游戏") || a.includes("波动"))) cats.push("game");
  const catString = cats.join(" ");

  // Top 3 专属勋章与卡片高亮类
  let ribbonHtml = "";
  let tierClass = "";
  if (rankIndex === 0) {
    ribbonHtml = `<div class="card-ribbon ribbon-gold">👑 2026综合首选 · 编辑力荐</div>`;
    tierClass = "tier-top1";
  } else if (rankIndex === 1) {
    ribbonHtml = `<div class="card-ribbon ribbon-silver">🥈 2026专线标杆 · 极致晚高峰</div>`;
    tierClass = "tier-top2";
  } else if (rankIndex === 2) {
    ribbonHtml = `<div class="card-ribbon ribbon-bronze">🥉 2026性价比之王 · 爆款推荐</div>`;
    tierClass = "tier-top3";
  }

  // 关键参数小标签 (Spec Chips)
  const specChipsHtml = `
    <div class="spec-chips">
      <span class="spec-chip highlight">⚡ 晚高峰丢包率 < 0.2%</span>
      <span class="spec-chip">🚀 4K/8K秒开</span>
      <span class="spec-chip">🤖 解锁ChatGPT-4o</span>
      <span class="spec-chip">🛡️ ${airport.protocols.slice(0, 2).join(' / ')}</span>
    </div>
  `;

  return `
  <div class="airport-card ${tierClass}" data-category="${catString}">
    ${ribbonHtml}
    <div class="airport-card-header">
      <h3 class="airport-name"><a href="${relPrefix}review/${airport.slug}.html">${airport.name}</a></h3>
      <div class="header-badges">
        <span class="badge ${airport.testStatus === 'tested' ? 'badge-green' : 'badge-blue'}">
          ${airport.testStatus === 'tested' ? '✓ 实测达标' : '官方核验'}
        </span>
        ${couponBadge}
      </div>
    </div>
    
    <div class="airport-price-row">
      <div>
        <span class="price-val">¥${airport.startingPrice.toFixed(minPlan && Number.isInteger(minPlan.price) ? 0 : 1)}</span>
        <span class="price-unit">/${minPlan ? minPlan.billing : '月'}起</span>
      </div>
      <div class="price-sub-badge">
        ${minPlan ? `${minPlan.trafficGb}GB | 折合 ¥${minPlan.pricePerGb.toFixed(3)}/GB` : '全IEPL专线'}
      </div>
    </div>

    ${specChipsHtml}

    <p class="airport-desc">${airport.description}</p>

    <ul class="feature-list">
      <li class="feature-item pro">${airport.advantages[0] || '高速稳定专线节点'}</li>
      <li class="feature-item pro">${airport.advantages[1] || '全平台客户端兼容支持'}</li>
      <li class="feature-item con">${airport.disadvantages[0] || '晚高峰建议优选高优先级专线'}</li>
    </ul>

    <div class="card-footer">
      <a href="${airport.affiliateUrl}" target="_blank" rel="noopener nofollow" class="btn btn-aff-primary">
        <span>⚡ 直达官网（领专属优惠）</span>
      </a>
      <div class="card-sub-actions">
        <a href="${relPrefix}review/${airport.slug}.html" class="btn btn-review-secondary">📖 详细评测报告</a>
        <a href="${relPrefix}airport/${airport.slug}.html" class="link-param">参数资料 &rarr;</a>
      </div>
    </div>
  </div>`;
}

export {
  ROOT_DIR,
  BASE_DOMAIN,
  wrapHtml,
  generateAirportCard,
  AIRPORTS
};
