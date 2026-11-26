/**
 * zutizi.blog - 统一重新生成根目录辅助页面
 * 包含 contact.html, about.html, editorial-policy.html, privacy-policy.html, disclaimer.html, 404.html
 */

import fs from "fs";
import path from "path";
import { ROOT_DIR, wrapHtml, getHeader } from "./build-site.js";

// 1. contact.html
const contactContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">联系我们与商务合作</h1>
    <p style="color:var(--text-muted);">
      欢迎优质机场服务商商务入驻洽谈、横向测速送测、节点故障反馈及读者交流探讨。我们承诺在 24 小时内快速响应。
    </p>
  </div>

  <div class="article-body">
    <!-- 核心联络渠道卡片矩阵 -->
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem; margin:2rem 0;">
      <!-- Telegram 官方号 -->
      <div class="contact-channel-card tg-theme" style="padding:1.25rem; background:#ffffff; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
        <div class="channel-card-top" style="margin-bottom:0.75rem;">
          <span class="channel-icon" style="font-size:1.6rem; width:44px; height:44px;">✈️</span>
          <div class="channel-text-meta">
            <div class="channel-title-row">
              <strong style="font-size:1.1rem; color:var(--secondary);">Telegram 官方商务直达</strong>
              <span class="channel-tag priority" style="font-size:0.75rem;">实时在线 / 优先</span>
            </div>
            <span class="channel-sub">即时加密沟通 · 商务洽谈 · 紧急故障申报</span>
          </div>
        </div>
        <div class="channel-value-box" style="font-size:1rem; padding:0.6rem 0.85rem; margin-bottom:1rem;">
          <span class="channel-val-text">@xintangtang</span>
        </div>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:1rem;">
          支持 7×24 小时即时加密私聊，通常在 2 小时内优先答复，适合紧急入驻与即时沟通。
        </p>
        <div class="channel-actions-row">
          <a href="https://t.me/xintangtang" target="_blank" rel="noopener nofollow" class="channel-action-btn primary-tg" style="padding:0.6rem 1rem; font-size:0.9rem;">
            <span>👉 直达 Telegram 洽谈</span>
          </a>
          <button type="button" class="channel-copy-btn" data-copy-text="@xintangtang" style="padding:0.6rem 1rem; font-size:0.85rem;">
            <span>📋 复制账号</span>
          </button>
        </div>
      </div>

      <!-- Gmail 商务邮箱 -->
      <div class="contact-channel-card mail-theme" style="padding:1.25rem; background:#ffffff; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
        <div class="channel-card-top" style="margin-bottom:0.75rem;">
          <span class="channel-icon" style="font-size:1.6rem; width:44px; height:44px;">✉️</span>
          <div class="channel-text-meta">
            <div class="channel-title-row">
              <strong style="font-size:1.1rem; color:var(--secondary);">官方 Gmail 商务邮箱</strong>
              <span class="channel-tag official" style="font-size:0.75rem;">正式信函</span>
            </div>
            <span class="channel-sub">商业合作案 · 评测送测 · 售后凭证仲裁</span>
          </div>
        </div>
        <div class="channel-value-box" style="font-size:1rem; padding:0.6rem 0.85rem; margin-bottom:1rem;">
          <span class="channel-val-text">xintangtang888@gmail.com</span>
        </div>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:1rem;">
          接收正式商务提案、详细技术合作文档及图文举报材料，工作日 24 小时内正式回函。
        </p>
        <div class="channel-actions-row">
          <a href="mailto:xintangtang888@gmail.com" class="channel-action-btn primary-mail" style="padding:0.6rem 1rem; font-size:0.9rem;">
            <span>✉️ 发送正式邮件</span>
          </a>
          <button type="button" class="channel-copy-btn" data-copy-text="xintangtang888@gmail.com" style="padding:0.6rem 1rem; font-size:0.85rem;">
            <span>📋 复制邮箱</span>
          </button>
        </div>
      </div>
    </div>

    <div class="callout-box" style="margin:2rem 0;">
      <div class="callout-title">🛡️ 官方防伪与沟通说明：</div>
      <p>1. <strong>认准唯一联系方式：</strong>竹梯子博客（zutizi.blog）唯一官方 Telegram 账号为 <code>@xintangtang</code>，唯一官方联络邮箱为 <code>xintangtang888@gmail.com</code>。我们绝不会以其他小号主动私信索要密码或资金，请注意防范仿冒诈骗。</p>
      <p>2. <strong>服务商送测与商务入驻：</strong>请在来信或私聊中提供服务商官方域名、线路架构说明（BGP/IPLC/IEPL）、测试订阅凭证及合作意向，我们将在完成基础可用性与丢包率初筛后启动评测排期。</p>
      <p>3. <strong>读者维权与跑路举报：</strong>若读者在通过本站推荐的品牌购买服务后遭遇突发失联或工单长期无人回复，请附带付款凭证与工单截图来信，我们将根据《编辑政策与评测标准》启动复查与强制下架警告机制。</p>
    </div>

    <h2>常见沟通类别</h2>
    <ul>
      <li><strong>商务合作与广告展示：</strong>首页推荐位、排行榜赞助通道或独立评测送测；</li>
      <li><strong>技术纠错与参数更新：</strong>套餐价格变动、节点线路升级或优惠券失效更正；</li>
      <li><strong>学术探讨与技术交流：</strong>关于 GFW 阻断机制、Sing-box/Clash 核心路由规则与网络安全策略的技术探讨。</li>
    </ul>
  </div>
</div>
`;

fs.writeFileSync(path.join(ROOT_DIR, "contact.html"), wrapHtml({
  title: "联系我们与商务合作 - Telegram与Gmail官方联络渠道 - 竹梯子博客",
  description: "联系竹梯子博客评测团队。获取官方 Telegram (@xintangtang) 与官方 Gmail (xintangtang888@gmail.com) 联络方式，提交节点测速纠错反馈、品牌入驻与商务合作沟通。",
  keywords: "联系我们, 商务合作, 机场送测, 节点纠错, Telegram联系, Gmail联系, 竹梯子博客",
  canonicalPath: "contact.html",
  relPrefix: "./",
  breadcrumbs: [{ name: "联系我们" }],
  content: contactContent
}), "utf-8");

console.log("✅ contact.html 重新生成完毕");

// 同步更新其他静态基础页面的 header
const newHeader = getHeader("./");

const rootPages = ["about.html", "editorial-policy.html", "privacy-policy.html", "disclaimer.html", "404.html"];
rootPages.forEach(file => {
  const filePath = path.join(ROOT_DIR, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, "utf-8");
    content = content.replace(/<header class="site-header">[\s\S]*?<\/header>/, newHeader.trim());
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ ${file} 头部导航与联络按钮同步更新完成`);
  }
});
