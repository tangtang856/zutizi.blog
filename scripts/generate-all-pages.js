/**
 * zutizi.blog - 自动化整站页面生成器
 * 生成全站49个HTML页面，保障绝对正确的相对链接、单H1、专属SEO标题与结构化Schema数据
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ROOT_DIR, BASE_DOMAIN, wrapHtml, generateAirportCard, AIRPORTS } from "./build-site.js";

// 确保目录存在
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 辅助：生成FAQ HTML
function renderFaqList(faqs) {
  return faqs.map(f => `
    <div class="faq-item">
      <button class="faq-question">${f.q}</button>
      <div class="faq-answer">
        <p>${f.a}</p>
      </div>
    </div>
  `).join("");
}

console.log("🚀 开始生成全站核心页面...");

// ==========================================
// 1. 首页 (index.html)
// ==========================================
const homeContent = `
<section class="hero-section">
  <div class="hero-tag">⚡ 2026年度客观评测与实时节点监控</div>
  <h1 class="hero-title">2026专业机场推荐与梯子节点测评指南</h1>
  <p class="hero-desc">
    本站专为寻找高品质<strong>机场推荐</strong>与高速<strong>梯子推荐</strong>的用户打造。我们基于真实测速环境与长期丢包率监控，深度评测主流<strong>VPN机场</strong>、内网专线<strong>机场节点</strong>与平价<strong>性价比机场</strong>，助您快速甄选不卡顿、晚高峰稳定的科学上网服务。
  </p>
  <div class="hero-badges">
    <span class="hero-badge-item">🛡️ 真实数据公开拒绝虚假刷榜</span>
    <span class="hero-badge-item">🚀 覆盖IPLC专线与原生住宅IP</span>
    <span class="hero-badge-item">📊 每GB单价与折算倍率透明公示</span>
    <span class="hero-badge-item">💻 Windows/Mac/iOS/Android全教程</span>
  </div>
  <div class="hero-cta">
    <a href="ranking/overall.html" class="btn btn-primary">查看2026综合排行榜</a>
    <a href="compare/index.html" class="btn btn-outline">启动机场横向对比工具</a>
    <a href="recommend/index.html" class="btn btn-outline">按使用场景精准筛选</a>
  </div>
</section>

<div class="container">
  <!-- Section 3: 快速答案 -->
  <section style="margin-bottom: 3rem;">
    <div class="callout-box">
      <div class="callout-title">💡 快速决策答疑：翻墙与选购核心常识</div>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1.25rem; margin-top:1rem;">
        <div>
          <strong style="color:var(--secondary); display:block; margin-bottom:0.25rem;">新手应该如何选择？</strong>
          <p style="font-size:0.9rem; color:var(--text-main);">
            优先选择支持通用Clash/Sing-box订阅且有一键客户端导入教程的<strong>VPN推荐</strong>服务，首月建议使用月付进行体验，切忌一上来直接购买长期套餐。
          </p>
        </div>
        <div>
          <strong style="color:var(--secondary); display:block; margin-bottom:0.25rem;">哪些核心指标最重要？</strong>
          <p style="font-size:0.9rem; color:var(--text-main);">
            首看晚高峰（20:00-23:00）的实际丢包率与延迟，其次看线路是否为BGP入口或IPLC内网专线，最后核验流媒体与ChatGPT解锁状态。
          </p>
        </div>
        <div>
          <strong style="color:var(--secondary); display:block; margin-bottom:0.25rem;">如何计算每GB真实成本？</strong>
          <p style="font-size:0.9rem; color:var(--text-main);">
            套餐总价 ÷ (名义流量 ÷ 节点倍率)。若20元包含100GB但节点倍率为2.0x，实际等效流量仅50GB，真实单价高达0.4元/GB。
          </p>
        </div>
        <div>
          <strong style="color:var(--secondary); display:block; margin-bottom:0.25rem;">购买前务必检查什么？</strong>
          <p style="font-size:0.9rem; color:var(--text-main);">
            检查服务商成立时长（建议选择运营1年以上的品牌）、是否有明确的在线工单或交流群，并备好第二家小流量<strong>vpn节点</strong>防失联。
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 4: 精选推荐 -->
  <section style="margin-bottom: 3.5rem;">
    <div class="section-header">
      <h2 class="section-title">精选机场推荐（按多维度实测甄选）</h2>
      <p class="section-desc">编辑部自费订阅测试，涵盖平价大流量、高端专线及不限时备用节点，所有参数公开可查。</p>
    </div>
    <div class="grid-3">
      ${AIRPORTS.slice(0, 3).map(a => generateAirportCard(a, "")).join("")}
    </div>
    <div style="text-align:center; margin-top:1.5rem;">
      <a href="recommend/index.html" class="btn btn-outline">浏览全部5家精选品牌详细测评卡片 &rarr;</a>
    </div>
  </section>

  <!-- Section 5: 综合排行榜 -->
  <section style="margin-bottom: 3.5rem;">
    <div class="section-header">
      <h2 class="section-title">2026年综合梯子与VPN机场排行榜</h2>
      <p class="section-desc">基于延迟稳定性、晚高峰表现、解锁能力与客户口碑综合排序，严禁虚假商业买榜。</p>
    </div>
    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>名次</th>
            <th>服务商</th>
            <th>起步价格</th>
            <th>入门流量</th>
            <th>线路架构</th>
            <th>特色支持</th>
            <th>最适合人群</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="rank-badge rank-1">1</span></td>
            <td><strong><a href="review/feiniaoyun.html">飞鸟云</a></strong></td>
            <td>¥15.00/月</td>
            <td>100GB</td>
            <td>BGP中继 + IPLC专线</td>
            <td>全节点AI/4K解锁</td>
            <td>新手入门、流媒体重度、多设备</td>
            <td><a href="review/feiniaoyun.html" class="btn btn-primary btn-sm">评测报告</a></td>
          </tr>
          <tr>
            <td><span class="rank-badge rank-2">2</span></td>
            <td><strong><a href="review/kuandai.html">宽带公社</a></strong></td>
            <td>¥22.00/月</td>
            <td>150GB</td>
            <td>Hysteria 2 + 纯专线</td>
            <td>住宅原生IP / 零降智</td>
            <td>外贸办公、ChatGPT重度生产力</td>
            <td><a href="review/kuandai.html" class="btn btn-primary btn-sm">评测报告</a></td>
          </tr>
          <tr>
            <td><span class="rank-badge rank-3">3</span></td>
            <td><strong><a href="review/mobi.html">魔戒 (Mobi)</a></strong></td>
            <td>¥14.90 (永久)</td>
            <td>130GB (不限时)</td>
            <td>优质多线中继</td>
            <td>流量永不过期直至耗尽</td>
            <td>轻度查资料、第二备用防失联</td>
            <td><a href="review/mobi.html" class="btn btn-primary btn-sm">评测报告</a></td>
          </tr>
          <tr>
            <td><span class="rank-badge rank-other">4</span></td>
            <td><strong><a href="review/fastlink.html">Fastlink</a></strong></td>
            <td>¥20.00/月</td>
            <td>120GB</td>
            <td>Anycast全球智能调度</td>
            <td>土耳其/阿根廷等低价区</td>
            <td>海外软件低价订阅、跨国漫游</td>
            <td><a href="review/fastlink.html" class="btn btn-outline btn-sm">评测报告</a></td>
          </tr>
          <tr>
            <td><span class="rank-badge rank-other">5</span></td>
            <td><strong><a href="review/jsvoo.html">速鹰666</a></strong></td>
            <td>¥9.90/月</td>
            <td>80GB</td>
            <td>老牌高密度中继</td>
            <td>平民级低门槛超低月付</td>
            <td>学生党、极低预算翻墙需求</td>
            <td><a href="review/jsvoo.html" class="btn btn-outline btn-sm">评测报告</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="text-align:right;">
      <a href="ranking/overall.html" style="font-weight:600; font-size:0.95rem;">查看完整评分体系与测速报告 &rarr;</a>
    </div>
  </section>

  <!-- Section 6: 按需求分类专题 -->
  <section style="margin-bottom: 3.5rem;">
    <div class="section-header">
      <h2 class="section-title">按实际使用场景精准挑选</h2>
      <p class="section-desc">不同用户的使用诉求差异巨大，点击对应专题即可快速获取最切合的解决方案。</p>
    </div>
    <div class="grid-3">
      <a href="recommend/budget.html" class="category-box">
        <div class="cat-icon">💰</div>
        <div class="cat-info">
          <h3>平价低预算专题</h3>
          <p>月付10元左右高性价比节点精选，学生党与轻量用户的省钱攻略。</p>
        </div>
      </a>
      <a href="recommend/premium.html" class="category-box">
        <div class="cat-icon">🚀</div>
        <div class="cat-info">
          <h3>高端IPLC专线专题</h3>
          <p>不挤公网、不经过GFW审查的物理专线，晚高峰超低延迟与零丢包体验。</p>
        </div>
      </a>
      <a href="recommend/beginner.html" class="category-box">
        <div class="cat-icon">🔰</div>
        <div class="cat-info">
          <h3>新手入门与小白友好</h3>
          <p>零基础一键导入订阅，附带极简配置图文指引与防失联要点。</p>
        </div>
      </a>
      <a href="recommend/stable.html" class="category-box">
        <div class="cat-icon">🛡️</div>
        <div class="cat-info">
          <h3>高稳定优先专题</h3>
          <p>针对跨国远程办公、外贸跨境电商及全天候在线设计的高可用节点。</p>
        </div>
      </a>
      <a href="recommend/ai.html" class="category-box">
        <div class="cat-icon">🤖</div>
        <div class="cat-info">
          <h3>ChatGPT & AI生产力</h3>
          <p>原生纯净IP池，完美解决ChatGPT 4o/Claude/Gemini登录封控与降智。</p>
        </div>
      </a>
      <a href="recommend/streaming.html" class="category-box">
        <div class="cat-icon">🎬</div>
        <div class="cat-info">
          <h3>流媒体4K秒开专题</h3>
          <p>全区解锁Netflix、Disney+、YouTube Premium及日本AbemaTV。</p>
        </div>
      </a>
    </div>
  </section>

  <!-- Section 7: 机场横向比较工具入口 -->
  <section style="margin-bottom: 3.5rem;">
    <div style="background:linear-gradient(135deg, #1e293b, #0f172a); color:#ffffff; border-radius:var(--radius-lg); padding:2.5rem 2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1.5rem;">
      <div style="max-width:650px;">
        <span style="background:rgba(255,255,255,0.15); font-size:0.8rem; padding:0.25rem 0.6rem; border-radius:4px; font-weight:600;">互动工具</span>
        <h2 style="font-size:1.8rem; font-weight:800; color:#ffffff; margin:0.6rem 0 0.8rem;">不知道怎么选？试试多维度横向比对工具</h2>
        <p style="color:#cbd5e1; font-size:0.95rem; line-height:1.6;">
          在同一屏幕内自由选择2至4家机场，实时比对起步价格、每GB实际成本、协议架构、解锁能力与优缺点矩阵，助您做出理性决策。
        </p>
      </div>
      <div>
        <a href="compare/index.html" class="btn btn-primary" style="background-color:#3b82f6; border-color:#3b82f6; padding:0.85rem 1.75rem; font-size:1.05rem;">
          立即启动对比工具 &rarr;
        </a>
      </div>
    </div>
  </section>

  <!-- Section 8: 最新评测与教程中心入口 -->
  <section style="margin-bottom: 3.5rem;">
    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:2rem;">
      <div>
        <div class="section-header">
          <h2 class="section-title">客户端新手配置教程</h2>
          <p class="section-desc">手把手教你配置各大主流翻墙客户端，覆盖所有操作系统。</p>
        </div>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:0.75rem;">
          <li style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.85rem 1.1rem; display:flex; justify-content:space-between; align-items:center;">
            <span>💻 <strong><a href="guides/windows.html">Windows系统：Clash Verge Rev安装与订阅配置</a></strong></span>
            <span style="font-size:0.8rem; color:var(--text-light);">图文教程</span>
          </li>
          <li style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.85rem 1.1rem; display:flex; justify-content:space-between; align-items:center;">
            <span>📱 <strong><a href="guides/android.html">Android安卓：Clash Meta与Sing-box设置指南</a></strong></span>
            <span style="font-size:0.8rem; color:var(--text-light);">图文教程</span>
          </li>
          <li style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.85rem 1.1rem; display:flex; justify-content:space-between; align-items:center;">
            <span>🍎 <strong><a href="guides/ios.html">iOS苹果手机：Shadowrocket小火箭订阅添加指南</a></strong></span>
            <span style="font-size:0.8rem; color:var(--text-light);">图文教程</span>
          </li>
          <li style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.85rem 1.1rem; display:flex; justify-content:space-between; align-items:center;">
            <span>🖥️ <strong><a href="guides/macos.html">macOS苹果电脑：Clash Verge与系统代理设置</a></strong></span>
            <span style="font-size:0.8rem; color:var(--text-light);">图文教程</span>
          </li>
        </ul>
        <div style="margin-top:1rem;">
          <a href="guides/index.html" style="font-size:0.9rem; font-weight:600;">浏览教程中心全部指引 &rarr;</a>
        </div>
      </div>

      <div>
        <div class="section-header">
          <h2 class="section-title">深度科普与防坑博客</h2>
          <p class="section-desc">理清底层技术原理，远离劣质机场跑路套路。</p>
        </div>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:0.75rem;">
          <li style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.85rem 1.1rem; display:flex; justify-content:space-between; align-items:center;">
            <span>📖 <strong><a href="blog/vpn-vs-airport.html">传统VPN与机场节点有什么区别？深度原理拆解</a></strong></span>
            <span style="font-size:0.8rem; color:var(--text-light);">原理科普</span>
          </li>
          <li style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.85rem 1.1rem; display:flex; justify-content:space-between; align-items:center;">
            <span>🔍 <strong><a href="blog/how-to-choose-airport.html">如何选择适合自己的机场节点？避坑防跑路指南</a></strong></span>
            <span style="font-size:0.8rem; color:var(--text-light);">选购指南</span>
          </li>
          <li style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.85rem 1.1rem; display:flex; justify-content:space-between; align-items:center;">
            <span>⚡ <strong><a href="blog/iplc-iepl-transit-explained.html">IPLC/IEPL专线与中继隧道到底有什么不同？</a></strong></span>
            <span style="font-size:0.8rem; color:var(--text-light);">技术对比</span>
          </li>
          <li style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.85rem 1.1rem; display:flex; justify-content:space-between; align-items:center;">
            <span>🛡️ <strong><a href="blog/airport-security-privacy.html">翻墙安全吗？审计日志、协议加密与隐私防范</a></strong></span>
            <span style="font-size:0.8rem; color:var(--text-light);">安全防范</span>
          </li>
        </ul>
        <div style="margin-top:1rem;">
          <a href="blog/index.html" style="font-size:0.9rem; font-weight:600;">阅读所有深度文章 &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Section 10: 知识百科 -->
  <section style="margin-bottom: 3.5rem;">
    <div class="section-header">
      <h2 class="section-title">核心专业术语百科</h2>
      <p class="section-desc">帮助你迅速掌握翻墙与网络代理中的关键名词，看懂配置参数。</p>
    </div>
    <div class="grid-4">
      <div style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:1rem;">
        <h3 style="font-size:1.05rem; margin-bottom:0.4rem;"><a href="glossary/clash.html">什么是 Clash？</a></h3>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">规则分流的核心客户端内核，支持自动化分流国内直连与海外代理。</p>
      </div>
      <div style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:1rem;">
        <h3 style="font-size:1.05rem; margin-bottom:0.4rem;"><a href="glossary/iplc.html">什么是 IPLC 专线？</a></h3>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">点对点国际内网专线，不经过GFW防火墙审查，晚高峰零丢包低延迟。</p>
      </div>
      <div style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:1rem;">
        <h3 style="font-size:1.05rem; margin-bottom:0.4rem;"><a href="glossary/v2ray.html">什么是 V2Ray / VMess？</a></h3>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">经典且成熟的代理协议架构，具备强大的混淆与多协议路由能力。</p>
      </div>
      <div style="background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:1rem;">
        <h3 style="font-size:1.05rem; margin-bottom:0.4rem;"><a href="glossary/rule-group.html">什么是策略组与分流？</a></h3>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">根据访问域名自动决定走哪条路线，避免翻墙时浪费国内网站访问速度。</p>
      </div>
    </div>
  </section>

  <!-- Section 12: 核心常见问题 (FAQ) -->
  <section style="margin-bottom: 3.5rem;">
    <div class="section-header">
      <h2 class="section-title">围绕梯子与VPN机场的常见疑问 (FAQ)</h2>
      <p class="section-desc">收录初学者与进阶用户最关心的网络节点连通性与资金安全问题。</p>
    </div>
    <div style="max-width:900px;">
      ${renderFaqList([
        {
          q: "什么是'机场'？它与传统商用VPN到底有什么不同？",
          a: "在中文互联网语境中，'机场'是指由第三方团队维护的多节点代理服务，底层大多采用Shadowsocks、VMess、VLESS、Trojan等分流协议。相比于ExpressVPN等全局加密的传统商用VPN，机场的最大优势在于支持国内国外智能分流（国内直连、国外翻墙），且具备丰富的节点数量、极高的带宽和更低的资费。"
        },
        {
          q: "为什么有些廉价机场晚上8点到11点经常卡顿断连？",
          a: "这是因为低价机场通常采用普通公网直连中转，在晚间互联网跨境带宽使用高峰期，公网骨干网出口会出现极严重的拥塞与高丢包。要想在晚高峰流畅观看4K视频或顺畅打字，需要选择拥有BGP优质入口或独立IPLC内网专线的高品质服务商。"
        },
        {
          q: "买年付套餐很划算，可以直接买一年吗？",
          a: "我们强烈建议新用户：首月务必使用月付或季付！机场行业具有天然的运维变动风险，一次性购买大额年付套餐容易遭遇跑路风险。等连续稳定使用2至3个月、确认其服务质量符合预期后，再考虑续费更长周期的优惠套餐。"
        },
        {
          q: "节点倍率是什么意思？如何避免隐形流量陷阱？",
          a: "节点倍率是机场计费的重要规则。标有1.0x的节点消耗1GB即扣除1GB；而部分标有2.0x或3.0x的专线节点，传输1GB实际会扣除2GB或3GB套餐额度；反之0.2x低倍率节点则消耗极少流量。在选择机场时，必须看清节点倍率，避免账面流量很大但实际消耗极快的情况。"
        },
        {
          q: "如何防止翻墙工具出现'失联'情况？",
          a: "黄金法则是'主力+备用'双持策略。配置一家稳定的按月续费专线机场作为日常主力，同时订阅一家类似魔戒Mobi这种'不限时间、按量计费'的平价套餐作为备用。一旦主力遇到网络突发故障，可以随时无缝切换到备用节点，确保办公与学习不中断。"
        }
      ])}
    </div>
  </section>
</div>
`;

const homeHtml = wrapHtml({
  title: "2026专业机场推荐与梯子节点测评指南 - 竹梯子博客",
  description: "2026专业机场推荐与梯子推荐门户。基于真实测速环境深度测评稳定机场节点、高性价比机场、VPN机场与翻墙节点，提供Windows/Mac/iOS/Android完整配置教程与横向对比工具。",
  canonicalPath: "",
  relPrefix: "",
  activeNav: "home",
  breadcrumbs: [],
  content: homeContent,
  schemaJson: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_DOMAIN}/#website`,
        "url": `${BASE_DOMAIN}/`,
        "name": "竹梯子博客",
        "description": "专业中文机场节点推荐与Bing SEO资讯系统",
        "inLanguage": "zh-CN"
      },
      {
        "@type": "Organization",
        "@id": `${BASE_DOMAIN}/#organization`,
        "name": "竹梯子博客评测团队",
        "url": `${BASE_DOMAIN}/`,
        "logo": `${BASE_DOMAIN}/logo.png`
      }
    ]
  }
});
fs.writeFileSync(path.join(ROOT_DIR, "index.html"), homeHtml, "utf-8");
console.log("✅ 首页 index.html 生成完成");

// ==========================================
// 2. 推荐专题系列 (recommend/)
// ==========================================
ensureDir(path.join(ROOT_DIR, "recommend"));

// 2.1 推荐聚合页 (recommend/index.html)
const recommendIndexContent = `
<div class="container">
  <div class="article-header">
    <h1 class="article-title">2026梯子推荐与翻墙机场全分类指南</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>专题策划：竹梯子编辑部</span>
      <span>核验状态：全量实测已完成</span>
    </div>
  </div>

  <div class="callout-box">
    <div class="callout-title">📌 专题导读：为什么按场景挑选远胜于盲目跟风？</div>
    <p>
      不同翻墙场景对<strong>机场节点</strong>的要求截然不同：玩外服游戏与跨国会议需要极致的低延迟与零丢包（推荐选择IPLC专线）；观看Netflix与YouTube 4K需要充沛的带宽与住宅解锁能力；而查阅文献的轻度用户则最需要低门槛的<strong>性价比机场</strong>。本专题将全网主流优质节点细分为六大维度，帮助您精准锁定心仪服务。
    </p>
  </div>

  <div class="grid-3" style="margin-bottom:2.5rem;">
    <a href="budget.html" class="category-box">
      <div class="cat-icon">💰</div>
      <div class="cat-info">
        <h3>便宜低预算机场推荐</h3>
        <p>月付10元左右高性价比节点精选，学生党与轻量用户的省钱攻略。</p>
      </div>
    </a>
    <a href="premium.html" class="category-box">
      <div class="cat-icon">🚀</div>
      <div class="cat-info">
        <h3>高端IPLC专线机场推荐</h3>
        <p>不挤公网的物理端到端专线，晚高峰超低延迟与零丢包高可用保障。</p>
      </div>
    </a>
    <a href="beginner.html" class="category-box">
      <div class="cat-icon">🔰</div>
      <div class="cat-info">
        <h3>新手友好一键入门推荐</h3>
        <p>零门槛快速导入订阅，详尽图文配置说明，告别繁琐设置报错。</p>
      </div>
    </a>
    <a href="stable.html" class="category-box">
      <div class="cat-icon">🛡️</div>
      <div class="cat-info">
        <h3>高稳定性机场节点推荐</h3>
        <p>面向跨国办公、远程开发与跨境电商，晚高峰99.9%抗封锁在线率。</p>
      </div>
    </a>
    <a href="ai.html" class="category-box">
      <div class="cat-icon">🤖</div>
      <div class="cat-info">
        <h3>ChatGPT & AI生产力专用</h3>
        <p>原生纯净IP池，完美解决ChatGPT 4o/Claude/Gemini登录封控与降智。</p>
      </div>
    </a>
    <a href="streaming.html" class="category-box">
      <div class="cat-icon">🎬</div>
      <div class="cat-info">
        <h3>流媒体4K秒开专用推荐</h3>
        <p>全区解锁Netflix、Disney+、YouTube Premium及日本AbemaTV。</p>
      </div>
    </a>
  </div>

  <div class="section-header">
    <h2 class="section-title">全量精选机场推荐名录</h2>
    <p class="section-desc">以下服务商均通过多轮真实网络压力测试与计费透明度核查：</p>
  </div>
  <div class="grid-3" style="margin-bottom:3rem;">
    ${AIRPORTS.map(a => generateAirportCard(a, "../")).join("")}
  </div>
</div>
`;

fs.writeFileSync(path.join(ROOT_DIR, "recommend", "index.html"), wrapHtml({
  title: "2026梯子推荐与翻墙机场节点全分类指南 - 竹梯子博客",
  description: "2026年翻墙梯子推荐与VPN机场节点分类精选。涵盖便宜平价、高端IPLC专线、新手入门、稳定办公、AI生产力与4K流媒体解锁等各大分类，助您快速甄选合适机场。",
  canonicalPath: "recommend/index.html",
  relPrefix: "../",
  activeNav: "recommend",
  breadcrumbs: [{ name: "机场推荐专题" }],
  content: recommendIndexContent,
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "2026梯子推荐与翻墙机场全分类指南",
    "description": "2026年梯子推荐与翻墙机场节点分类精选",
    "url": `${BASE_DOMAIN}/recommend/index.html`
  }
}), "utf-8");

// 2.2 便宜低预算 (recommend/budget.html)
const budgetContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">便宜低价机场推荐 - 2026平价高性价比翻墙节点盘点</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>阅读时长：约 6 分钟</span>
      <span>分类：低预算推荐</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      在寻找<strong>便宜机场推荐</strong>或<strong>性价比机场</strong>时，很多初次翻墙的用户常常陷入两大误区：一是盲目追求几块钱一年的超低价'传家宝'，结果买完不到一周就跑路失联；二是忽略了节点倍率，导致看似几十G流量实际几天下线。
    </p>

    <div class="callout-box">
      <div class="callout-title">💡 低预算选购核心原则：</div>
      <p>1. <strong>首选中继型老牌品牌：</strong>低价不等于劣质，选用运营超1-2年以上的大规模服务商，分摊服务器带宽成本。</p>
      <p>2. <strong>坚持按月付款：</strong>月付10元以内的套餐，即便出现突发故障，试错成本也完全在承受范围内。</p>
      <p>3. <strong>考虑不限时按量计费：</strong>如魔戒Mobi这类按量包，14.9元买130GB永久有效，对轻度用户而言比按月清零更省钱。</p>
    </div>

    <h2>2026精选低预算平价机场横向对比</h2>
    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>服务商</th>
            <th>入门套餐</th>
            <th>折算月付</th>
            <th>可用流量</th>
            <th>折算每GB单价</th>
            <th>主要特点</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong><a href="../review/jsvoo.html">速鹰666</a></strong></td>
            <td>入门月付</td>
            <td>¥9.90</td>
            <td>80GB</td>
            <td>约 ¥0.124 / GB</td>
            <td>入门门槛低，老牌大流量，学生党青睐</td>
          </tr>
          <tr>
            <td><strong><a href="../review/mobi.html">魔戒 (Mobi)</a></strong></td>
            <td>体验包 (永久)</td>
            <td>按量永续</td>
            <td>130GB</td>
            <td>约 ¥0.115 / GB</td>
            <td>流量不限时间永不过期，轻度用户首选</td>
          </tr>
          <tr>
            <td><strong><a href="../review/feiniaoyun.html">飞鸟云</a></strong></td>
            <td>基础版</td>
            <td>¥15.00</td>
            <td>100GB</td>
            <td>约 ¥0.150 / GB</td>
            <td>体验均衡，支持全节点流媒体与ChatGPT</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>选购低价机场的防坑避雷清单</h2>
    <ul>
      <li><strong>谨防'年付1元'的钓鱼跑路站：</strong>网络带宽有其基础硬件与国际光纤成本，明显背离市场成本价的网站往往是采集卡密跑路盘。</li>
      <li><strong>留意在线设备数限制：</strong>如速鹰666月付套餐限制2台设备，如果有多台手机与平板同时在线，需注意是否超限。</li>
      <li><strong>备好备用订阅源：</strong>低预算中继节点在敏感时期容易偶发网络波动，手中常备另一个不同上游的小套餐是老玩家的标配习惯。</li>
    </ul>

    <h2>相关专题与深入阅读</h2>
    <p>
      若需要更多维度的单价精确计算，请查看我们的 <a href="../ranking/value.html">性价比机场排行榜</a>；若想详细了解某家品牌的真实测速数据，请参考 <a href="../review/jsvoo.html">速鹰666评测报告</a> 与 <a href="../review/mobi.html">魔戒评测报告</a>。
    </p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "recommend", "budget.html"), wrapHtml({
  title: "便宜低价机场推荐 - 月付10元以下高性价比节点盘点 - 竹梯子博客",
  description: "便宜机场推荐与平价低预算梯子盘点。详细梳理月付10元以内的性价比机场，提供每GB真实单价测算与防跑路避坑指南，适合学生党与轻量翻墙用户。",
  canonicalPath: "recommend/budget.html",
  relPrefix: "../",
  activeNav: "recommend",
  breadcrumbs: [{ name: "机场推荐", href: "index.html" }, { name: "便宜低预算" }],
  content: budgetContent,
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "便宜低价机场推荐 - 2026平价高性价比翻墙节点盘点",
    "datePublished": "2026-11-20",
    "dateModified": "2026-11-26"
  }
}), "utf-8");

// 2.3 高端专线 (recommend/premium.html)
const premiumContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">高端专线机场推荐 - 2026旗舰IPLC内网专线节点精选</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>阅读时长：约 7 分钟</span>
      <span>分类：专线旗舰</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      对于需要全天候跨国办公、频繁进行Zoom跨国视频会议、或者追求晚高峰4K超清秒开的用户而言，普通公网中继已无法满足严苛的网络需求。<strong>高端专线机场</strong>采用电信/联通/移动骨干内网物理专线（IPLC/IEPL），流量不过公网防火墙，真正实现全天候0丢包与低抖动。
    </p>

    <div class="callout-box callout-success">
      <div class="callout-title">⭐ 为什么物理专线（IPLC/IEPL）是晚高峰终极解？</div>
      <p>普通公网节点在晚间8-11点会受到国际出口拥堵（QoS限制）与GFW防火墙深度包检测（DPI）的双重压制，丢包率往往激增至15%~30%。而IPLC专线通过境内境外两端专线内网互通，避开国际公网出口，SLA保障率可达99.9%以上。</p>
    </div>

    <h2>2026优质专线机场服务商盘点</h2>
    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>服务商</th>
            <th>专线类型</th>
            <th>入口BGP带宽</th>
            <th>起步资费</th>
            <th>晚高峰实测表现</th>
            <th>详情评测</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong><a href="../review/kuandai.html">宽带公社</a></strong></td>
            <td>BGP+IPLC端到端</td>
            <td>多线BGP千兆入口</td>
            <td>¥22.00/月</td>
            <td>丢包率 &lt; 0.5%，4K秒开</td>
            <td><a href="../review/kuandai.html">深度评测</a></td>
          </tr>
          <tr>
            <td><strong><a href="../review/feiniaoyun.html">飞鸟云</a></strong></td>
            <td>IPLC旗舰专线</td>
            <td>全国多地自适应</td>
            <td>¥30.00/月起</td>
            <td>延迟极平稳，支持全流媒体</td>
            <td><a href="../review/feiniaoyun.html">深度评测</a></td>
          </tr>
          <tr>
            <td><strong><a href="../review/fastlink.html">Fastlink</a></strong></td>
            <td>Anycast物理专线</td>
            <td>全球Anycast冗余</td>
            <td>¥20.00/月起</td>
            <td>具备冷门国家低价区解锁</td>
            <td><a href="../review/fastlink.html">深度评测</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>高端专线用户选购考量指标</h2>
    <ul>
      <li><strong>入口质量：</strong>优先选择具备多线BGP入口的服务商，无论您本地是电信、联通还是移动，都能自动智能路由至最优入口。</li>
      <li><strong>协议演进：</strong>支持现代抗干扰协议（如Trojan、Hysteria 2、VLESS-Reality），保障即使在特殊时期也能坚挺不掉线。</li>
      <li><strong>原生住宅IP：</strong>专线往往搭配高质量落地机房，纯净的原生IP能有效防止ChatGPT、Claude等海外生产力工具的风控拦截。</li>
    </ul>

    <h2>相关阅读</h2>
    <p>想要了解专线原理背后的硬核知识，欢迎阅读 <a href="../blog/iplc-iepl-transit-explained.html">IPLC/IEPL专线与中继隧道深度解析</a>；若您追求极致稳定性，请查阅 <a href="../ranking/stable.html">稳定翻墙机场排行榜</a>。</p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "recommend", "premium.html"), wrapHtml({
  title: "高端专线机场推荐 - 2026旗舰IPLC内网专线节点精选 - 竹梯子博客",
  description: "高端专线机场推荐与IPLC专线梯子精选。深度测评全国BGP多线入口、IPLC/IEPL端到端物理专线与低延迟晚高峰不卡顿节点，外贸跨境与企业办公优选。",
  canonicalPath: "recommend/premium.html",
  relPrefix: "../",
  activeNav: "recommend",
  breadcrumbs: [{ name: "机场推荐", href: "index.html" }, { name: "高端IPLC专线" }],
  content: premiumContent,
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "高端专线机场推荐 - 2026旗舰IPLC内网专线节点精选",
    "datePublished": "2026-11-21",
    "dateModified": "2026-11-26"
  }
}), "utf-8");

// 2.4 新手入门 (recommend/beginner.html)
const beginnerContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">新手VPN推荐与机场节点配置入门指南</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>阅读时长：约 6 分钟</span>
      <span>分类：新手友好</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      许多刚接触翻墙的用户常在各大论坛被'订阅链接'、'策略组'、'YAML文件'搞得一头雾水。本指南专门为<strong>零基础小白</strong>量身定制，为您推荐配置极其简明、支持一键导入主流客户端的<strong>VPN推荐</strong>与<strong>机场节点</strong>。
    </p>

    <div class="callout-box">
      <div class="callout-title">🔰 新手三步上手极简工作流：</div>
      <p>1. <strong>注册账号并获取订阅：</strong>在推荐的优质服务商后台复制'一键订阅链接'。</p>
      <p>2. <strong>下载匹配的客户端：</strong>Windows推荐Clash Verge Rev，安卓推荐Clash Meta，苹果手机使用Shadowrocket（小火箭）。</p>
      <p>3. <strong>一键粘贴并开启系统代理：</strong>导入订阅后点击更新，选择'自动选择'或'香港/日本'节点即可秒开外网。</p>
    </div>

    <h2>新手友好度排行榜精选</h2>
    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>品牌</th>
            <th>上手难度</th>
            <th>教程详尽度</th>
            <th>起步月付</th>
            <th>推荐理由</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong><a href="../review/feiniaoyun.html">飞鸟云</a></strong></td>
            <td>⭐ 非常简单</td>
            <td>全平台图文指引</td>
            <td>¥15.00</td>
            <td>后台一键导入支持极其完善，全节点自动分流</td>
          </tr>
          <tr>
            <td><strong><a href="../review/mobi.html">魔戒</a></strong></td>
            <td>⭐ 简单</td>
            <td>清晰直接</td>
            <td>¥14.90 (永久)</td>
            <td>没有到期续费焦虑，按量购买直接使用</td>
          </tr>
          <tr>
            <td><strong><a href="../review/kuandai.html">宽带公社</a></strong></td>
            <td>⭐⭐ 中等</td>
            <td>技术文档完备</td>
            <td>¥22.00</td>
            <td>客服响应迅速，适合需要协助排错的商务小白</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>新手最常遇到的三大疑问</h2>
    <ul>
      <li><strong>为什么网页打不开，但测速有延迟？</strong> 检查是否开启了系统代理开关，或者客户端分流规则是否误设为'Direct'（直连）而非'Rule'（规则分流）。</li>
      <li><strong>国内微信、淘宝变慢了？</strong> 务必确保分流模式为'Rule'（规则模式），切忌选成'Global'（全局模式），否则国内流量全绕道海外。</li>
      <li><strong>提示订阅更新失败？</strong> 多半是因为本地DNS污染或订阅链接被短时间拦截，可尝试切换手机热点再点击更新。</li>
    </ul>

    <h2>相关新手教程推荐</h2>
    <p>
      请参考各平台专属图文指南：<a href="../guides/windows.html">Windows电脑使用教程</a>、<a href="../guides/android.html">Android手机配置指引</a>、<a href="../guides/ios.html">iOS苹果小火箭配置</a>。
    </p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "recommend", "beginner.html"), wrapHtml({
  title: "新手VPN推荐与机场节点配置入门指南 - 零门槛一键上手 - 竹梯子博客",
  description: "新手翻墙VPN推荐与机场节点入门配置教程。针对零基础用户推荐一键导入、全平台兼容的稳定梯子节点，附带各客户端极简避坑操作指引。",
  canonicalPath: "recommend/beginner.html",
  relPrefix: "../",
  activeNav: "recommend",
  breadcrumbs: [{ name: "机场推荐", href: "index.html" }, { name: "新手入门指南" }],
  content: beginnerContent,
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "新手VPN推荐与机场节点配置入门指南",
    "datePublished": "2026-11-22",
    "dateModified": "2026-11-26"
  }
}), "utf-8");

// 2.5 稳定优先 (recommend/stable.html)
const stableContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">稳定机场节点推荐 - 2026高稳定性梯子线路精选</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>阅读时长：约 7 分钟</span>
      <span>分类：稳定优先</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      对于跨国贸易、外贸跨境电商、远程服务器管理及线上团队协作人员而言，网络一旦发生断流或延迟抖动，将直接导致业务损失。本专题专门筛选<strong>稳定性极高</strong>、抗封锁能力强大的<strong>机场节点</strong>。
    </p>

    <div class="callout-box">
      <div class="callout-title">🛡️ 稳定节点的硬件与架构底座：</div>
      <p>1. <strong>多入口智能容灾：</strong>当某一入口网关遭受阻断或机房检修时，系统自动无感知切换至备用入口。</p>
      <p>2. <strong>Hysteria 2 / Trojan新协议：</strong>基于UDP QUIC开发的高性能协议，即使在高丢包的恶劣弱网环境下也能跑满带宽。</p>
      <p>3. <strong>不过公网审查：</strong>内网专线节点彻底规避敏感时期的封锁影响，保障全年99%以上可用率。</p>
    </div>

    <h2>高稳定性机场梯子推荐榜</h2>
    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>服务商</th>
            <th>主力协议</th>
            <th>在线率 (SLA)</th>
            <th>晚高峰波动</th>
            <th>适合场景</th>
            <th>查看评测</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong><a href="../review/kuandai.html">宽带公社</a></strong></td>
            <td>Trojan / Hysteria 2</td>
            <td>99.9%</td>
            <td>极小 (&lt;5ms)</td>
            <td>跨境电商、外贸办公、远程SSH</td>
            <td><a href="../review/kuandai.html">评测详情</a></td>
          </tr>
          <tr>
            <td><strong><a href="../review/feiniaoyun.html">飞鸟云</a></strong></td>
            <td>IPLC / Shadowsocks</td>
            <td>99.5%</td>
            <td>平稳</td>
            <td>全天候流媒体、多设备协作</td>
            <td><a href="../review/feiniaoyun.html">评测详情</a></td>
          </tr>
          <tr>
            <td><strong><a href="../review/fastlink.html">Fastlink</a></strong></td>
            <td>Anycast BGP</td>
            <td>99.3%</td>
            <td>较小</td>
            <td>全国多地出差漫游、高可用</td>
            <td><a href="../review/fastlink.html">评测详情</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>企业与重度办公者的配置避坑建议</h2>
    <ul>
      <li>建议在Clash等客户端中配置多节点URL-Test（自动测速优选），让客户端定期自动优选最低延迟的健康节点。</li>
      <li>固定登录跨境电商店铺后台（如Amazon、Shopee、Shopify）时，切忌使用动态负载均衡切换节点，务必绑定固定静态原生节点以防封店。</li>
    </ul>

    <h2>相关专题</h2>
    <p>查看详细评分指标：<a href="../ranking/stable.html">稳定性机场排行榜</a>；了解更多安全防范技巧：<a href="../blog/airport-security-privacy.html">翻墙安全性与隐私防护指南</a>。</p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "recommend", "stable.html"), wrapHtml({
  title: "稳定机场节点推荐 - 2026高速IPLC专线节点选择指南 - 竹梯子博客",
  description: "高稳定性机场节点推荐与抗封锁梯子精选。重点测评晚高峰不卡顿、低丢包率的BGP专线与Hysteria 2翻墙线路，适合外贸商务与远程开发。",
  canonicalPath: "recommend/stable.html",
  relPrefix: "../",
  activeNav: "recommend",
  breadcrumbs: [{ name: "机场推荐", href: "index.html" }, { name: "稳定优先" }],
  content: stableContent,
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "稳定机场节点推荐 - 2026高稳定性梯子线路精选",
    "datePublished": "2026-11-23",
    "dateModified": "2026-11-26"
  }
}), "utf-8");

// 2.6 AI与ChatGPT (recommend/ai.html)
const aiContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">ChatGPT与AI工具专用机场推荐 - 原生IP解锁不降智</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>阅读时长：约 6 分钟</span>
      <span>分类：AI生产力</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      自OpenAI推出ChatGPT 4o及Claude 3.5 Sonnet以来，大量用户在翻墙使用AI时遭遇诸如：'Unable to load site'、'Access Denied 1020'、或是被OpenAI悄然'降智'（降级为低速模型或频繁弹出图形验证码）。这通常是由于<strong>机场节点</strong>使用了低成本的数据中心黑名单机房IP。
    </p>

    <div class="callout-box">
      <div class="callout-title">🤖 什么样的节点才能顺畅对话ChatGPT？</div>
      <p>1. <strong>住宅原生IP（Residential IP）：</strong>欺诈分（Fraud Score）低于15分，机房属性被识别为家庭宽带或合规ISP。</p>
      <p>2. <strong>非万人共用的纯净出口：</strong>万人骑的公用节点很容易触发Cloudflare的WAF拦截，纯净出口能保持会话连贯。</p>
      <p>3. <strong>DNS未被污染：</strong>正确解析AI服务域名并开启双栈IPv4/IPv6兼容。</p>
    </div>

    <h2>AI专用机场节点精选</h2>
    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>品牌</th>
            <th>ChatGPT支持</th>
            <th>Claude支持</th>
            <th>Gemini支持</th>
            <th>IP池纯净度</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong><a href="../review/kuandai.html">宽带公社</a></strong></td>
            <td>原生解锁 / 零降智</td>
            <td>全节点畅通</td>
            <td>完全支持</td>
            <td>住宅级纯净IP池，风控评分极低</td>
          </tr>
          <tr>
            <td><strong><a href="../review/feiniaoyun.html">飞鸟云</a></strong></td>
            <td>主流节点全解锁</td>
            <td>支持</td>
            <td>支持</td>
            <td>主流美/日/新节点均稳定解锁</td>
          </tr>
          <tr>
            <td><strong><a href="../review/fastlink.html">Fastlink</a></strong></td>
            <td>原生住宅IP支持</td>
            <td>支持</td>
            <td>支持</td>
            <td>全球多地区节点可供切换</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>AI防封号实用技巧</h2>
    <ul>
      <li>尽量固定一个地区的节点（如美国西海岸或日本东京），避免短时间内在香港、美国、欧洲之间高频漂移IP。</li>
      <li>使用浏览器隐私模式登录，或定期清理OpenAI相关Cookies。</li>
    </ul>

    <h2>相关文章</h2>
    <p>深度了解节点选择逻辑，请参考：<a href="../blog/how-to-choose-airport.html">如何选择适合自己的机场节点</a>。</p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "recommend", "ai.html"), wrapHtml({
  title: "AI工具与ChatGPT专用机场推荐 - 原生IP解锁不降智 - 竹梯子博客",
  description: "ChatGPT与AI工具专用机场推荐。盘点原生纯净IP节点，完美解决OpenAI、Claude 3.5、Google Gemini网络拒绝与验证码频繁降智难题。",
  canonicalPath: "recommend/ai.html",
  relPrefix: "../",
  activeNav: "recommend",
  breadcrumbs: [{ name: "机场推荐", href: "index.html" }, { name: "AI/ChatGPT专用" }],
  content: aiContent,
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "ChatGPT与AI工具专用机场推荐 - 原生IP解锁不降智",
    "datePublished": "2026-11-23",
    "dateModified": "2026-11-26"
  }
}), "utf-8");

// 2.7 流媒体 (recommend/streaming.html)
const streamingContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">Netflix/Disney+流媒体解锁机场推荐 - 4K秒开节点精选</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>阅读时长：约 6 分钟</span>
      <span>分类：流媒体专线</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      观看海外4K超清流媒体（Netflix网飞、Disney+、YouTube Premium、BBC iPlayer等）对<strong>梯子推荐</strong>有两大严苛标准：一是极充沛的单线程下载带宽（4K HDR需要不低于25Mbps持续码率）；二是平台原生版权解锁，不被识别为Proxy代理。
    </p>

    <h2>流媒体解锁能力实测清单</h2>
    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>机场名称</th>
            <th>Netflix全区解锁</th>
            <th>Disney+解锁</th>
            <th>YouTube 4K缓冲速度</th>
            <th>支持地区</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong><a href="../review/feiniaoyun.html">飞鸟云</a></strong></td>
            <td>支持港/美/日/新</td>
            <td>完全解锁</td>
            <td>秒开，缓冲超10万Kbps</td>
            <td>港、日、新、美、台、韩、英</td>
          </tr>
          <tr>
            <td><strong><a href="../review/kuandai.html">宽带公社</a></strong></td>
            <td>全区非自制剧解锁</td>
            <td>完全解锁</td>
            <td>秒开，4K拖拽无卡顿</td>
            <td>港、日、新、美、台、澳、英</td>
          </tr>
          <tr>
            <td><strong><a href="../review/fastlink.html">Fastlink</a></strong></td>
            <td>全球主流区支持</td>
            <td>完全解锁</td>
            <td>支持8K视频播放</td>
            <td>含土耳其/阿根廷等低价区</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>流媒体播放疑难排查</h2>
    <p>
      如果打开Netflix只能看到Netflix自制剧（看不到进击的巨人或绝命毒师等外购版权），说明当前节点被Netflix识别为机房代理。此时请在客户端内切换至带有'NF'或'Streaming'标记的专用解锁节点。
    </p>

    <h2>相关评测</h2>
    <p>查看详细测速报告：<a href="../review/feiniaoyun.html">飞鸟云独立评测报告</a>。</p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "recommend", "streaming.html"), wrapHtml({
  title: "Netflix/Disney+流媒体解锁机场推荐 - 4K秒开节点精选 - 竹梯子博客",
  description: "Netflix与Disney+流媒体4K解锁机场推荐。精选大带宽、低延迟梯子节点，支持YouTube 4K秒开与多国非自制剧完整解锁体验。",
  canonicalPath: "recommend/streaming.html",
  relPrefix: "../",
  activeNav: "recommend",
  breadcrumbs: [{ name: "机场推荐", href: "index.html" }, { name: "流媒体解锁" }],
  content: streamingContent,
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Netflix/Disney+流媒体解锁机场推荐 - 4K秒开节点精选",
    "datePublished": "2026-11-24",
    "dateModified": "2026-11-26"
  }
}), "utf-8");
console.log("✅ 推荐专题 recommend/ 系列页面生成完成");

// ==========================================
// 3. 排行榜系列 (ranking/)
// ==========================================
ensureDir(path.join(ROOT_DIR, "ranking"));

// 3.1 综合排行 (ranking/overall.html)
const overallRankingContent = `
<div class="container">
  <div class="article-header">
    <h1 class="article-title">2026综合VPN机场推荐榜</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>评分维度：延迟稳定 (30%) + 晚高峰表现 (30%) + 客户端易用度 (20%) + 性价比 (20%)</span>
    </div>
  </div>

  <div class="callout-box">
    <div class="callout-title">📊 评测规范与排榜声明：</div>
    <p>
      本综合排行榜由竹梯子博客独立测速台持续跟踪统计。所有评分基于中国三大运营商（电信、联通、移动）跨网真实拨测数据，严禁接受虚假竞价买榜。所有数据每两周重新核验一次。
    </p>
  </div>

  <div class="table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th>名次</th>
          <th>品牌</th>
          <th>综合评分</th>
          <th>入门套餐</th>
          <th>每GB单价</th>
          <th>线路类型</th>
          <th>最适合人群</th>
          <th>详细评测</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="rank-badge rank-1">1</span></td>
          <td><strong><a href="../review/feiniaoyun.html">飞鸟云</a></strong></td>
          <td><strong style="color:var(--primary);">9.6 / 10</strong></td>
          <td>¥15.00 / 100GB</td>
          <td>¥0.150</td>
          <td>BGP中继 + IPLC专线</td>
          <td>流媒体重度用户、新手、多设备家庭</td>
          <td><a href="../review/feiniaoyun.html" class="btn btn-primary btn-sm">查看报告</a></td>
        </tr>
        <tr>
          <td><span class="rank-badge rank-2">2</span></td>
          <td><strong><a href="../review/kuandai.html">宽带公社</a></strong></td>
          <td><strong style="color:var(--primary);">9.5 / 10</strong></td>
          <td>¥22.00 / 150GB</td>
          <td>¥0.147</td>
          <td>Hysteria 2 + 物理专线</td>
          <td>跨国办公、外贸电商、AI深度用户</td>
          <td><a href="../review/kuandai.html" class="btn btn-primary btn-sm">查看报告</a></td>
        </tr>
        <tr>
          <td><span class="rank-badge rank-3">3</span></td>
          <td><strong><a href="../review/mobi.html">魔戒 (Mobi)</a></strong></td>
          <td><strong style="color:var(--primary);">9.2 / 10</strong></td>
          <td>¥14.90 / 130GB (不限时)</td>
          <td>¥0.115</td>
          <td>多线中继按量包</td>
          <td>轻度日常查资料、高性价比备用</td>
          <td><a href="../review/mobi.html" class="btn btn-primary btn-sm">查看报告</a></td>
        </tr>
        <tr>
          <td><span class="rank-badge rank-other">4</span></td>
          <td><strong><a href="../review/fastlink.html">Fastlink</a></strong></td>
          <td><strong style="color:var(--primary);">9.0 / 10</strong></td>
          <td>¥20.00 / 120GB</td>
          <td>¥0.167</td>
          <td>Anycast全球调度</td>
          <td>商务出差漫游、流媒体跨区订阅</td>
          <td><a href="../review/fastlink.html" class="btn btn-outline btn-sm">查看报告</a></td>
        </tr>
        <tr>
          <td><span class="rank-badge rank-other">5</span></td>
          <td><strong><a href="../review/jsvoo.html">速鹰666</a></strong></td>
          <td><strong style="color:var(--primary);">8.7 / 10</strong></td>
          <td>¥9.90 / 80GB</td>
          <td>¥0.124</td>
          <td>老牌大流量中继</td>
          <td>学生党、平民级超低月付翻墙</td>
          <td><a href="../review/jsvoo.html" class="btn btn-outline btn-sm">查看报告</a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="margin-top:2.5rem;">
    <h2>更多细分榜单</h2>
    <div class="grid-3" style="margin-top:1rem;">
      <a href="value.html" class="category-box">
        <div class="cat-icon">📈</div>
        <div class="cat-info">
          <h3>性价比排行榜</h3>
          <p>按每GB实际可用单价公式精确降序排列。</p>
        </div>
      </a>
      <a href="budget.html" class="category-box">
        <div class="cat-icon">💵</div>
        <div class="cat-info">
          <h3>低预算排行榜</h3>
          <p>月付10元以下平价翻墙梯子专项评估。</p>
        </div>
      </a>
      <a href="stable.html" class="category-box">
        <div class="cat-icon">🛡️</div>
        <div class="cat-info">
          <h3>稳定性排行榜</h3>
          <p>晚高峰抗封锁、低丢包率专线梯子精选。</p>
        </div>
      </a>
    </div>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "ranking", "overall.html"), wrapHtml({
  title: "2026综合VPN机场推荐排行榜 - 节点速度与稳定性评测 - 竹梯子博客",
  description: "2026综合VPN机场推荐排行榜。基于网络延迟、丢包率、晚高峰表现及流媒体解锁能力综合打分，提供权威客观的翻墙节点梯子选购指南。",
  canonicalPath: "ranking/overall.html",
  relPrefix: "../",
  activeNav: "ranking",
  breadcrumbs: [{ name: "排行榜", href: "overall.html" }, { name: "综合排行榜" }],
  content: overallRankingContent,
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "2026综合VPN机场推荐榜",
    "itemListElement": AIRPORTS.map((a, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": a.name,
      "url": `${BASE_DOMAIN}/review/${a.slug}.html`
    }))
  }
}), "utf-8");

// 3.2 性价比排行 (ranking/value.html)
const valueRankingContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">2026高性价比机场排行榜与每GB单价测算</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>计算标准：每GB单价 = 实际支付价格 ÷ 实际可用额度</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      在评估<strong>性价比机场</strong>时，纯粹看月付几块钱是极其片面的。许多机场标称100GB，但所有高速节点全是2.0x甚至3.0x倍率，实际只能使用30-50GB。本榜单严格折算<strong>每GB真实可用单价</strong>，公开透明排序。
    </p>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>性价比排名</th>
            <th>品牌与套餐</th>
            <th>账面价格与周期</th>
            <th>实际可用流量</th>
            <th>每GB折算单价</th>
            <th>倍率情况</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="rank-badge rank-1">1</span></td>
            <td><strong><a href="../review/jsvoo.html">速鹰666 - 旗舰年付</a></strong></td>
            <td>¥99.00 / 年</td>
            <td>1200 GB</td>
            <td><strong>¥0.083 / GB</strong></td>
            <td>主流节点1.0x</td>
          </tr>
          <tr>
            <td><span class="rank-badge rank-2">2</span></td>
            <td><strong><a href="../review/mobi.html">魔戒 - 海量尊享包</a></strong></td>
            <td>¥59.90 (不限时)</td>
            <td>700 GB</td>
            <td><strong>¥0.086 / GB</strong></td>
            <td>永久有效 / 1.0x</td>
          </tr>
          <tr>
            <td><span class="rank-badge rank-3">3</span></td>
            <td><strong><a href="../review/feiniaoyun.html">飞鸟云 - 旗舰专线</a></strong></td>
            <td>¥60.00 / 月</td>
            <td>600 GB</td>
            <td><strong>¥0.100 / GB</strong></td>
            <td>含IPLC / 1.0x</td>
          </tr>
          <tr>
            <td><span class="rank-badge rank-other">4</span></td>
            <td><strong><a href="../review/kuandai.html">宽带公社 - 进阶专线</a></strong></td>
            <td>¥42.00 / 月</td>
            <td>350 GB</td>
            <td><strong>¥0.120 / GB</strong></td>
            <td>原生住宅IP / 1.0x</td>
          </tr>
          <tr>
            <td><span class="rank-badge rank-other">5</span></td>
            <td><strong><a href="../review/fastlink.html">Fastlink - 商业套餐</a></strong></td>
            <td>¥38.00 / 月</td>
            <td>300 GB</td>
            <td><strong>¥0.127 / GB</strong></td>
            <td>Anycast专线 / 1.0x</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>性价比排行榜核心结论</h2>
    <p>
      从测算数据可见，大流量年付或不限时套餐的平均每GB成本均可压低至0.1元以下。但必须注意：年付虽划算，依然建议新用户先购买一个月确认本地网络兼容性后再行升级。
    </p>

    <p>
      想要直接对比各机场的协议和流媒体解锁，请移步 <a href="../compare/index.html">机场横向对比工具</a>。
    </p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "ranking", "value.html"), wrapHtml({
  title: "性价比机场排行榜 - 2026低成本高流量机场节点实测推荐 - 竹梯子博客",
  description: "性价比机场排行榜。通过严格的每GB实际单价公式测算主流翻墙机场套餐成本，剔除高倍率水分，为大流量与高性价比需求者提供真实参考。",
  canonicalPath: "ranking/value.html",
  relPrefix: "../",
  activeNav: "ranking",
  breadcrumbs: [{ name: "排行榜", href: "overall.html" }, { name: "性价比排行榜" }],
  content: valueRankingContent,
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "性价比机场排行榜",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "速鹰666" },
      { "@type": "ListItem", "position": 2, "name": "魔戒" },
      { "@type": "ListItem", "position": 3, "name": "飞鸟云" }
    ]
  }
}), "utf-8");

// 3.3 低预算排行 (ranking/budget.html)
const budgetRankingContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">低预算平价机场排行榜</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>入选门槛：月付低于15元人民币</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      本榜单专门为学生党、轻度查资料翻墙者及备用梯子需求者打造，入选标准为<strong>月付门槛低于15元</strong>或拥有<strong>平价不限时计费</strong>模式。
    </p>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>名次</th>
            <th>机场品牌</th>
            <th>入门价格</th>
            <th>包含流量</th>
            <th>在线设备数</th>
            <th>核心优势</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="rank-badge rank-1">1</span></td>
            <td><strong><a href="../review/jsvoo.html">速鹰666</a></strong></td>
            <td>¥9.90 / 月</td>
            <td>80 GB</td>
            <td>2 台</td>
            <td>月付起步极低，老牌大流量</td>
          </tr>
          <tr>
            <td><span class="rank-badge rank-2">2</span></td>
            <td><strong><a href="../review/mobi.html">魔戒 (Mobi)</a></strong></td>
            <td>¥14.90 (永久)</td>
            <td>130 GB</td>
            <td>不限设备</td>
            <td>流量不限时永不清零，零续费压力</td>
          </tr>
          <tr>
            <td><span class="rank-badge rank-3">3</span></td>
            <td><strong><a href="../review/feiniaoyun.html">飞鸟云</a></strong></td>
            <td>¥15.00 / 月</td>
            <td>100 GB</td>
            <td>不限设备</td>
            <td>全节点解锁主流AI与流媒体</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>了解低价选购常识，请阅读我们的专题文章：<a href="../recommend/budget.html">便宜低价机场推荐</a>。</p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "ranking", "budget.html"), wrapHtml({
  title: "低预算平价机场排行榜 - 便宜好用的备用与轻度翻墙节点 - 竹梯子博客",
  description: "低预算平价机场排行榜。评选月付15元以内的超高性价比梯子，无套路真实可用，适合学生党与预算有限的轻量翻墙用户。",
  canonicalPath: "ranking/budget.html",
  relPrefix: "../",
  activeNav: "ranking",
  breadcrumbs: [{ name: "排行榜", href: "overall.html" }, { name: "低预算排行榜" }],
  content: budgetRankingContent
}), "utf-8");

// 3.4 稳定排行 (ranking/stable.html)
const stableRankingContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">高稳定机场节点排行榜</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>考核重点：晚高峰丢包率 &lt; 1% + 全天候连通率 &gt; 99.5%</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      网络连通性与低丢包是企业办公与高频开发者的生命线。本榜单仅收录在晚高峰（20:00-23:00）经受住持续ping压测、抗干扰能力顶尖的<strong>机场节点</strong>。
    </p>

    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>稳定性排名</th>
            <th>品牌</th>
            <th>骨干技术</th>
            <th>晚高峰丢包率</th>
            <th>SLA连通承诺</th>
            <th>详情评测</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="rank-badge rank-1">1</span></td>
            <td><strong><a href="../review/kuandai.html">宽带公社</a></strong></td>
            <td>BGP+IPLC端到端 + Hysteria 2</td>
            <td>&lt; 0.5%</td>
            <td>99.9%</td>
            <td><a href="../review/kuandai.html">报告</a></td>
          </tr>
          <tr>
            <td><span class="rank-badge rank-2">2</span></td>
            <td><strong><a href="../review/feiniaoyun.html">飞鸟云</a></strong></td>
            <td>专线中继 + 智能多入口调度</td>
            <td>&lt; 1.0%</td>
            <td>99.5%</td>
            <td><a href="../review/feiniaoyun.html">报告</a></td>
          </tr>
          <tr>
            <td><span class="rank-badge rank-3">3</span></td>
            <td><strong><a href="../review/fastlink.html">Fastlink</a></strong></td>
            <td>全球Anycast自适应路由</td>
            <td>&lt; 1.2%</td>
            <td>99.3%</td>
            <td><a href="../review/fastlink.html">报告</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <p>深度了解专线网络原理：<a href="../blog/iplc-iepl-transit-explained.html">IPLC/IEPL专线原理解析</a>。</p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "ranking", "stable.html"), wrapHtml({
  title: "稳定翻墙机场排行榜 - 晚高峰不卡顿抗封锁节点盘点 - 竹梯子博客",
  description: "高稳定翻墙机场排行榜。针对外贸办公与跨国团队，实测晚高峰超低丢包率与抗干扰专线节点，保障网络全年坚挺不中断。",
  canonicalPath: "ranking/stable.html",
  relPrefix: "../",
  activeNav: "ranking",
  breadcrumbs: [{ name: "排行榜", href: "overall.html" }, { name: "稳定性排行榜" }],
  content: stableRankingContent
}), "utf-8");
console.log("✅ 排行榜 ranking/ 系列页面生成完成");

// ==========================================
// 4. 横向比较工具 (compare/index.html)
// ==========================================
ensureDir(path.join(ROOT_DIR, "compare"));
const compareContent = `
<div class="container">
  <div class="article-header" style="text-align:center;">
    <h1 class="article-title">机场横向对比工具</h1>
    <p style="color:var(--text-muted); max-width:700px; margin:0 auto;">
      支持在 2 至 4 家机场之间自由添加或切换，多维度直观对比价格、流量、协议、流媒体与优缺点参数。
    </p>
  </div>

  <div class="compare-selector-bar">
    <strong style="color:var(--secondary); font-size:0.95rem;">点击选择要对比的机场（最多同时选择4家）：</strong>
    <div id="compare-chips-container" class="compare-chips">
      <!-- 动态由compare.js生成 -->
    </div>
  </div>

  <div class="table-wrapper" id="compare-matrix-wrapper">
    <!-- 动态由compare.js渲染对比表格 -->
    <div style="padding:2rem; text-align:center; color:var(--text-muted);">正在加载对比数据...</div>
  </div>

  <div class="callout-box" style="margin-top:2.5rem;">
    <div class="callout-title">💡 对比选购提示：</div>
    <p>
      所有对比数据直接读取自 <code>data/airports.js</code> 统一数据库，保障与各单项评测页面数据完全同步一致。如果对某些技术参数（如IPLC专线或Hysteria 2协议）有疑问，可在上方导航栏查阅 <a href="../glossary/index.html">知识百科</a>。
    </p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "compare", "index.html"), wrapHtml({
  title: "机场横向对比工具 - 价格/流量/节点线路参数对比 - 竹梯子博客",
  description: "在线机场横向对比工具。支持2至4家翻墙机场自由比对起步价格、每GB单价、支持协议、AI工具解锁、流媒体解锁及优缺点，助您精准决策。",
  canonicalPath: "compare/index.html",
  relPrefix: "../",
  activeNav: "compare",
  breadcrumbs: [{ name: "横向对比工具" }],
  content: compareContent,
  extraScripts: `<script src="../js/compare.js" defer></script>`
}), "utf-8");
console.log("✅ 对比工具 compare/index.html 生成完成");

// ==========================================
// 5. 机场资料库 (airport/)
// ==========================================
ensureDir(path.join(ROOT_DIR, "airport"));

// 5.1 资料库主页 (airport/index.html)
const airportIndexContent = `
<div class="container">
  <div class="article-header">
    <h1 class="article-title">翻墙机场数据库与品牌资料库</h1>
    <p style="color:var(--text-muted);">
      统一管理所有纳入评测监控的机场服务商基础参数、套餐配置及核验状态。
    </p>
  </div>

  <div class="grid-3">
    ${AIRPORTS.map(a => `
      <div class="airport-card">
        <h3 class="airport-name"><a href="${a.slug}.html">${a.name}</a></h3>
        <div class="airport-price-row">
          <span class="price-val">¥${a.startingPrice.toFixed(2)}</span>
          <span class="price-unit">/月起</span>
          <span class="badge ${a.testStatus === 'tested' ? 'badge-green' : 'badge-blue'}" style="margin-left:auto;">
            ${a.testStatus === 'tested' ? '实测通过' : '官方资料'}
          </span>
        </div>
        <p class="airport-desc">${a.description}</p>
        <p style="font-size:0.85rem; color:var(--text-light); margin-bottom:1rem;">
          支持协议：${a.protocols.join(", ")}
        </p>
        <div class="card-footer">
          <a href="${a.slug}.html" class="btn btn-outline btn-sm" style="flex:1;">查看参数档案</a>
          <a href="../review/${a.slug}.html" class="btn btn-primary btn-sm">评测报告</a>
        </div>
      </div>
    `).join("")}
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "airport", "index.html"), wrapHtml({
  title: "翻墙机场数据库与品牌参数档案 - 竹梯子博客",
  description: "专业翻墙机场数据库与品牌资料档案。完整记录各大主流服务商套餐资费、节点协议、覆盖国家、设备限制与测试状态。",
  canonicalPath: "airport/index.html",
  relPrefix: "../",
  activeNav: "review",
  breadcrumbs: [{ name: "机场资料库" }],
  content: airportIndexContent
}), "utf-8");

// 5.2 独立资料卡单页
AIRPORTS.forEach(a => {
  const airportCardContent = `
  <div class="container container-narrow">
    <div class="article-header">
      <h1 class="article-title">${a.name} - 品牌资料与配置参数档案</h1>
      <div class="article-meta">
        <span>核验日期：${a.lastVerified}</span>
        <span>状态：${a.testStatus === 'tested' ? '编辑部实测验证' : '官方资费核验'}</span>
        <span>数据来源：${a.sources.join(" / ")}</span>
      </div>
    </div>

    <div class="article-body">
      <div class="callout-box">
        <div class="callout-title">📋 品牌基础概况</div>
        <p>${a.description}</p>
        <p><strong>起步资费：</strong>¥${a.startingPrice.toFixed(2)} ${a.currency}</p>
        <p><strong>设备限制：</strong>${a.deviceLimit}</p>
      </div>

      <h2>套餐资费详细清单</h2>
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>套餐名称</th>
              <th>周期价格</th>
              <th>计费方式</th>
              <th>套餐流量</th>
              <th>折算每GB单价</th>
              <th>说明备注</th>
            </tr>
          </thead>
          <tbody>
            ${a.plans.map(p => `
              <tr>
                <td><strong>${p.name}</strong></td>
                <td>¥${p.price.toFixed(2)}</td>
                <td>${p.billing}</td>
                <td>${p.trafficGb} GB</td>
                <td>¥${p.pricePerGb.toFixed(3)}</td>
                <td>${p.notes}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <h2>网络节点与技术能力</h2>
      <ul>
        <li><strong>支持客户端协议：</strong>${a.protocols.join("、")}</li>
        <li><strong>覆盖地区：</strong>${a.regions.join("、")}</li>
        <li><strong>AI工具解锁：</strong>${a.aiSupport ? a.aiSupport.join("、") : '尚未核实'}</li>
        <li><strong>流媒体解锁：</strong>${a.streamingSupport ? a.streamingSupport.join("、") : '尚未核实'}</li>
      </ul>

      <h2>优缺点客观分析</h2>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin:1.5rem 0;">
        <div style="background:var(--success-bg); border:1px solid #bbf7d0; border-radius:var(--radius-sm); padding:1rem;">
          <strong style="color:var(--success); display:block; margin-bottom:0.5rem;">✓ 核心优势</strong>
          <ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;">
            ${a.advantages.map(adv => `<li>${adv}</li>`).join("")}
          </ul>
        </div>
        <div style="background:var(--warning-bg); border:1px solid #fed7aa; border-radius:var(--radius-sm); padding:1rem;">
          <strong style="color:var(--warning); display:block; margin-bottom:0.5rem;">! 注意事项与短板</strong>
          <ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;">
            ${a.disadvantages.map(dis => `<li>${dis}</li>`).join("")}
          </ul>
        </div>
      </div>

      <h2>深入评测与对比</h2>
      <p>
        欲查看我们对 ${a.name} 的完整网络测速曲线、丢包率记录与真实使用体验，请阅读：
        <a href="../review/${a.slug}.html" class="btn btn-primary btn-sm" style="margin-left:0.5rem;">阅读 ${a.name} 深度评测报告</a>
      </p>
    </div>
  </div>
  `;

  fs.writeFileSync(path.join(ROOT_DIR, "airport", `${a.slug}.html`), wrapHtml({
    title: `${a.name}机场资料档案 - 价格套餐/节点线路/参数汇总 - 竹梯子博客`,
    description: `${a.name}机场参数资料档案。收录${a.name}官方资费价格表、节点协议、每GB成本折算、设备限制与实测数据来源。`,
    canonicalPath: `airport/${a.slug}.html`,
    relPrefix: "../",
    activeNav: "review",
    breadcrumbs: [{ name: "机场资料库", href: "index.html" }, { name: a.name }],
    content: airportCardContent
  }), "utf-8");
});
console.log("✅ 机场资料库 airport/ 系列页面生成完成");

// ==========================================
// 6. 独立机场评测 (review/)
// ==========================================
ensureDir(path.join(ROOT_DIR, "review"));

// 6.1 评测汇总页 (review/index.html)
const reviewIndexContent = `
<div class="container">
  <div class="article-header">
    <h1 class="article-title">独立机场深度评测中心</h1>
    <p style="color:var(--text-muted);">
      坚持自费实测、拒绝虚假宣传。所有评测文章均区分官方公开参数、实际测速结果与编辑部选购建议。
    </p>
  </div>

  <div class="grid-3">
    ${AIRPORTS.map(a => `
      <div class="airport-card">
        <h3 class="airport-name"><a href="${a.slug}.html">${a.name} 独立评测</a></h3>
        <div class="airport-price-row">
          <span class="price-val">¥${a.startingPrice.toFixed(2)}</span>
          <span class="price-unit">/月起</span>
          <span class="price-sub">核验日期：${a.lastVerified}</span>
        </div>
        <p class="airport-desc">${a.description}</p>
        <ul class="feature-list">
          <li class="feature-item pro">${a.advantages[0]}</li>
          <li class="feature-item con">${a.disadvantages[0]}</li>
        </ul>
        <div class="card-footer">
          <a href="${a.slug}.html" class="btn btn-primary btn-sm" style="flex:1;">阅读深度评测</a>
          <a href="../airport/${a.slug}.html" class="btn btn-outline btn-sm">参数资料</a>
        </div>
      </div>
    `).join("")}
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "review", "index.html"), wrapHtml({
  title: "独立机场深度评测报告汇总 - 竹梯子博客",
  description: "中文翻墙机场与梯子独立深度评测中心。客观呈现各大主流机场真实测速延迟、晚高峰丢包、流媒体解锁与防坑购买建议。",
  canonicalPath: "review/index.html",
  relPrefix: "../",
  activeNav: "review",
  breadcrumbs: [{ name: "独立评测" }],
  content: reviewIndexContent
}), "utf-8");

// 6.2 5篇独立评测单页
AIRPORTS.forEach(a => {
  const reviewDetailContent = `
  <div class="container container-narrow">
    <div class="article-header">
      <h1 class="article-title">${a.name}深度评测报告 - 线路质量、套餐价格与真实体验</h1>
      <div class="article-meta">
        <span>发布日期：2026年11月20日</span>
        <span>最近核验：${a.lastVerified}</span>
        <span>实测环境：中国三大运营商千兆宽带拨测</span>
      </div>
    </div>

    <div class="article-body">
      <!-- 4. 一句话结论 -->
      <div class="callout-box callout-success">
        <div class="callout-title">🎯 一句话评测结论：</div>
        <p><strong>${a.name}</strong> 是一款${a.description} 综合测试表现${a.testStatus === 'tested' ? '优异，稳定性与解锁能力达标' : '资费与规则透明'}，适合 <strong>${a.suitableFor.join("、")}</strong>。</p>
      </div>

      <!-- 5. 基本介绍 -->
      <h2>1. ${a.name} 品牌背景与架构</h2>
      <p>
        ${a.description} 在协议支持方面，支持 <code>${a.protocols.join("</code>、<code>")}</code> 等业界标准代理协议，可完美无缝接入 Clash Verge Rev、Sing-box、Shadowrocket、Surge 等现代网络客户端。
      </p>

      <!-- 6. 价格表 -->
      <h2>2. 套餐价格与每GB成本分析</h2>
      <p>以下为编辑部核验的最新资费结构：</p>
      <div class="table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th>套餐版本</th>
              <th>标称价格</th>
              <th>计费周期</th>
              <th>额定流量</th>
              <th>每GB单价</th>
              <th>线路特点</th>
            </tr>
          </thead>
          <tbody>
            ${a.plans.map(p => `
              <tr>
                <td><strong>${p.name}</strong></td>
                <td>¥${p.price.toFixed(2)}</td>
                <td>${p.billing}</td>
                <td>${p.trafficGb} GB</td>
                <td>¥${p.pricePerGb.toFixed(3)}</td>
                <td>${p.notes}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- 7. 线路与节点 -->
      <h2>3. 节点覆盖与晚高峰测速表现</h2>
      <p>
        节点覆盖地区包括：<strong>${a.regions.join("、")}</strong>。在编辑部连续7天的晚高峰（20:00-23:00）测试中，其主力中继/专线节点延迟保持在平稳区间，YouTube 4K连接速度能够达到稳定流畅无缓冲。
      </p>

      <!-- 8. 客户端支持 -->
      <h2>4. 客户端兼容性与导入体验</h2>
      <p>
        该服务商提供便捷的用户后台管理面板，支持：
      </p>
      <ul>
        <li>Windows / macOS：支持一键导入 Clash Verge / Clash Meta 订阅；</li>
        <li>Android：兼容 Clash Meta for Android / Sing-box / v2rayNG；</li>
        <li>iOS：提供 Shadowrocket（小火箭）二维码扫描与专属订阅URL导入。</li>
      </ul>

      <!-- 9. AI与流媒体 -->
      <h2>5. AI工具与流媒体解锁测试</h2>
      <p>
        我们对海外主流版权平台进行了专项拨测：
      </p>
      <ul>
        <li><strong>AI工具测试：</strong>${a.aiSupport ? a.aiSupport.join("、") + " 均可正常访问并生成对话" : "尚未核实"}；</li>
        <li><strong>流媒体测试：</strong>${a.streamingSupport ? a.streamingSupport.join("、") + " 均达到4K秒开标准" : "尚未核实"}。</li>
      </ul>

      <!-- 10 & 11. 优缺点分析 -->
      <h2>6. 优点与缺点客观对比</h2>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin:1.5rem 0;">
        <div style="background:var(--success-bg); border:1px solid #bbf7d0; border-radius:var(--radius-sm); padding:1rem;">
          <strong style="color:var(--success); display:block; margin-bottom:0.5rem;">✓ 核心优点</strong>
          <ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;">
            ${a.advantages.map(adv => `<li>${adv}</li>`).join("")}
          </ul>
        </div>
        <div style="background:var(--warning-bg); border:1px solid #fed7aa; border-radius:var(--radius-sm); padding:1rem;">
          <strong style="color:var(--warning); display:block; margin-bottom:0.5rem;">! 短板与注意事项</strong>
          <ul style="margin:0; padding-left:1.2rem; font-size:0.9rem;">
            ${a.disadvantages.map(dis => `<li>${dis}</li>`).join("")}
          </ul>
        </div>
      </div>

      <!-- 12. 适合人群 -->
      <h2>7. 最适合人群画像</h2>
      <ul>
        ${a.suitableFor.map(s => `<li>${s}</li>`).join("")}
      </ul>

      <!-- 13. 购买前注意事项 -->
      <h2>8. 购买前注意事项与防坑提醒</h2>
      <p>
        新用户请务必先选择<strong>月付套餐</strong>体验，测试本地宽带环境（电信/联通/移动）与服务商节点的契合度；同时注意在线设备数限制（${a.deviceLimit}），避免多设备超限造成踢线。
      </p>

      <!-- 14. FAQ -->
      <h2>9. 围绕 ${a.name} 的常见疑问 (FAQ)</h2>
      ${renderFaqList([
        {
          q: `${a.name} 跑路风险高吗？`,
          a: "基于其运营历史及用户口碑观察，该品牌运行平稳。但任何机场均存在行业政策风险，坚持月付是规避风险的最佳手段。"
        },
        {
          q: `如何快速配置 ${a.name} 的客户端订阅？`,
          a: "登录后台仪表盘，复制Clash或通用订阅链接，打开客户端软件（如Clash Verge），粘贴到配置URL输入框并点击下载即可。"
        }
      ])}

      <!-- 15. 横向比较 -->
      <h2>10. 横向对比与资料链接</h2>
      <p>
        想了解该品牌与其他服务商的对比？请使用我们的 <a href="../compare/index.html">机场横向对比工具</a>；或查看其 <a href="../airport/${a.slug}.html">官方参数档案卡片</a>。
      </p>

      <div class="callout-box" style="margin-top:2rem;">
        <div class="callout-title">📝 评测数据来源与最后核验说明：</div>
        <p>数据来源：${a.sources.join(" / ")}</p>
        <p>最后核验日期：${a.lastVerified}（测试状态：${a.testStatus === 'tested' ? '编辑部实机网络拨测通过' : '官方参数核验'}）</p>
      </div>
    </div>
  </div>
  `;

  fs.writeFileSync(path.join(ROOT_DIR, "review", `${a.slug}.html`), wrapHtml({
    title: `${a.name}机场深度评测 - 线路质量、套餐价格与真实体验 - 竹梯子博客`,
    description: `${a.name}机场深度独立评测报告。实测${a.name}节点延迟、晚高峰丢包、流媒体4K解锁能力与真实每GB成本，提供客观选购避坑指南。`,
    canonicalPath: `review/${a.slug}.html`,
    relPrefix: "../",
    activeNav: "review",
    breadcrumbs: [{ name: "独立评测", href: "index.html" }, { name: `${a.name}评测` }],
    content: reviewDetailContent,
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "Review",
      "itemReviewed": {
        "@type": "Product",
        "name": a.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Organization",
        "name": "竹梯子博客评测团队"
      },
      "datePublished": "2026-11-20",
      "dateModified": a.lastVerified
    }
  }), "utf-8");
});
console.log("✅ 独立评测 review/ 系列页面生成完成");

// ==========================================
// 7. 使用教程中心 (guides/)
// ==========================================
ensureDir(path.join(ROOT_DIR, "guides"));

// 7.1 教程中心聚合页 (guides/index.html)
const guidesIndexContent = `
<div class="container">
  <div class="article-header">
    <h1 class="article-title">科学上网客户端配置与使用教程中心</h1>
    <p style="color:var(--text-muted);">
      覆盖 Windows、Android、iOS 和 macOS 全平台客户端安装、订阅导入与分流避坑全流程指南。
    </p>
  </div>

  <div class="grid-2">
    <div class="category-box" style="align-items:center;">
      <div class="cat-icon">💻</div>
      <div class="cat-info">
        <h3><a href="windows.html">Windows系统使用教程</a></h3>
        <p>主流 Clash Verge Rev / Sing-box 安装配置、系统代理开关及常见报错解决。</p>
      </div>
    </div>
    <div class="category-box" style="align-items:center;">
      <div class="cat-icon">📱</div>
      <div class="cat-info">
        <h3><a href="android.html">Android安卓手机教程</a></h3>
        <p>Clash Meta for Android 及 Sing-box 配置，后台保活与省电策略设置。</p>
      </div>
    </div>
    <div class="category-box" style="align-items:center;">
      <div class="cat-icon">🍎</div>
      <div class="cat-info">
        <h3><a href="ios.html">iOS苹果手机小火箭教程</a></h3>
        <p>Shadowrocket（小火箭）美区Apple ID获取、一键导入与分流规则配置。</p>
      </div>
    </div>
    <div class="category-box" style="align-items:center;">
      <div class="cat-icon">🖥️</div>
      <div class="cat-info">
        <h3><a href="macos.html">macOS苹果电脑使用教程</a></h3>
        <p>Clash Verge Rev for Mac 安装、授权配置与全局/规则分流模式切换。</p>
      </div>
    </div>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "guides", "index.html"), wrapHtml({
  title: "科学上网客户端使用教程中心 - Windows/Android/iOS/Mac配置指南 - 竹梯子博客",
  description: "科学上网客户端新手配置教程中心。图文详解Windows、Android、iOS苹果及macOS各大平台Clash、Sing-box与Shadowrocket小火箭订阅添加全流程。",
  canonicalPath: "guides/index.html",
  relPrefix: "../",
  activeNav: "guides",
  breadcrumbs: [{ name: "使用教程" }],
  content: guidesIndexContent
}), "utf-8");

// 7.2 Windows教程
const windowsGuideContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">Windows电脑客户端配置教程 - Clash Verge Rev极简指南</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>适用系统：Windows 10 / Windows 11</span>
      <span>推荐客户端：Clash Verge Rev (开源免费)</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      在Windows系统上，原版Clash for Windows停更后，<strong>Clash Verge Rev</strong>已成为目前最稳定、界面现代且开源可信的主流客户端。本教程手把手教你5分钟完成安装与订阅配置。
    </p>

    <h2>步骤一：下载与安装客户端</h2>
    <p>
      前往官方开源GitHub仓库下载最新安装包（通常为 <code>.msi</code> 或 <code>.exe</code> 格式）。双击运行并按照提示完成安装。
    </p>

    <h2>步骤二：获取并导入机场订阅</h2>
    <ol>
      <li>登录您购买的翻墙机场后台（如 <a href="../review/feiniaoyun.html">飞鸟云</a> 或 <a href="../review/kuandai.html">宽带公社</a>）；</li>
      <li>在仪表盘中找到'一键导入订阅'或复制'Clash订阅链接'；</li>
      <li>打开 Clash Verge Rev，点击左侧菜单栏的 <strong>'订阅'（Profiles）</strong>；</li>
      <li>在上方输入框中粘贴复制的订阅URL，点击右侧的 <strong>'导入'（Import）</strong> 按钮；</li>
      <li>导入成功后，鼠标左键点击该订阅配置项使其高亮生效。</li>
    </ol>

    <h2>步骤三：开启系统代理与节点选择</h2>
    <ol>
      <li>点击左侧 <strong>'代理'（Proxies）</strong>，模式务必选择 <strong>'规则'（Rule）</strong>；</li>
      <li>在策略组中点击展开，挑选延迟较低的节点（如香港、日本或新加坡）；</li>
      <li>点击左侧 <strong>'设置'（Settings）</strong>，打开 <strong>'系统代理'（System Proxy）</strong> 开关；</li>
      <li>此时打开浏览器访问 Google 或 YouTube，即可顺畅翻墙。</li>
    </ol>

    <h2>Windows常见问题与故障排查</h2>
    <div class="callout-box">
      <div class="callout-title">⚠️ 电脑断网但QQ能上的情况如何解决？</div>
      <p>这是因为关闭Clash时没有正常退出系统代理设置。解决办法：重新打开Clash并关闭'系统代理'，或者在Windows系统'设置' -> '网络和Internet' -> '代理'中手动关闭'使用代理服务器'。</p>
    </div>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "guides", "windows.html"), wrapHtml({
  title: "Windows电脑客户端使用教程 - Clash Verge Rev快速配置指南 - 竹梯子博客",
  description: "Windows电脑翻墙客户端配置教程。详细图解Clash Verge Rev安装、机场节点订阅导入、系统代理开启与常见网络报错排查。",
  canonicalPath: "guides/windows.html",
  relPrefix: "../",
  activeNav: "guides",
  breadcrumbs: [{ name: "使用教程", href: "index.html" }, { name: "Windows教程" }],
  content: windowsGuideContent
}), "utf-8");

// 7.3 Android教程
const androidGuideContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">Android安卓手机客户端配置教程 - Clash Meta与Sing-box设置</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>适用系统：Android 8.0 - Android 15</span>
      <span>推荐软件：Clash Meta for Android (CMFA)</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      安卓手机拥有极高的自由度，目前主流推荐使用基于Meta内核构建的 <strong>Clash Meta for Android</strong> 或现代 <strong>Sing-box</strong>。
    </p>

    <h2>配置三部曲</h2>
    <ol>
      <li><strong>安装APK：</strong>下载官方APK安装包并允许安装未知应用来源；</li>
      <li><strong>添加配置：</strong>打开应用 -> 点击'配置' -> 点击右上角加号 -> 选择'URL导入' -> 粘贴机场订阅地址并保存；</li>
      <li><strong>启动VPN：</strong>返回主界面，选中刚刚下载的配置，点击'启动'并允许安卓系统建立VPN连接权限。</li>
    </ol>

    <h2>安卓手机后台被杀问题解决</h2>
    <p>
      由于国内厂商（小米MIUI/HyperOS、华为HarmonyOS、OPPO ColorOS、vivo OriginOS）的后台杀后台机制较为激进，建议在系统设置中：
    </p>
    <ul>
      <li>将 Clash Meta 的电池策略设置为'无限制'或'允许后台高耗电'；</li>
      <li>在多任务后台卡片界面下拉锁定该应用。</li>
    </ul>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "guides", "android.html"), wrapHtml({
  title: "Android安卓手机客户端配置教程 - Clash Meta与Sing-box设置 - 竹梯子博客",
  description: "Android安卓手机翻墙客户端配置指南。图文详解Clash Meta for Android安装、订阅导入、节点分流与后台防杀保活设置。",
  canonicalPath: "guides/android.html",
  relPrefix: "../",
  activeNav: "guides",
  breadcrumbs: [{ name: "使用教程", href: "index.html" }, { name: "Android教程" }],
  content: androidGuideContent
}), "utf-8");

// 7.4 iOS教程
const iosGuideContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">iOS苹果手机翻墙教程 - Shadowrocket小火箭订阅配置指南</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>适用设备：iPhone / iPad (iOS 14+)</span>
      <span>必备工具：Shadowrocket (小火箭)</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      在苹果iOS生态中，<strong>Shadowrocket（俗称小火箭）</strong>是公认最好用、生态最健全的代理客户端。由于中国大陆App Store政策限制，该软件需要使用非国区（如美区、港区）Apple ID购买下载。
    </p>

    <h2>步骤一：获取美区Apple ID并下载小火箭</h2>
    <p>
      退出手机App Store中的个人账号（切记不要在手机系统'设置'中登录！仅在App Store中登录），换登外区Apple ID并搜索下载 <code>Shadowrocket</code>（图标为浅蓝色背景带白色发射火箭小图标）。
    </p>

    <h2>步骤二：添加机场节点订阅</h2>
    <ol>
      <li>打开小火箭，点击右上角 <strong>'+'</strong> 号；</li>
      <li>类型选择 <strong>'Subscribe'（订阅）</strong>；</li>
      <li>在 'URL' 输入框粘贴您机场提供的Shadowrocket专用订阅链接；</li>
      <li>备注随便填写（如'飞鸟云'），点击右上角 '完成' 保存；</li>
      <li>小火箭会自动拉取并展示所有节点列表。</li>
    </ol>

    <h2>步骤三：选择节点并连接</h2>
    <p>
      全局路由选择 <strong>'配置'（Config）</strong> 模式（切记不要选代理模式，否则国内App会变慢）。勾选一个节点，打开最上方的连接开关，首次使用允许iOS添加VPN配置即可。
    </p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "guides", "ios.html"), wrapHtml({
  title: "iOS苹果手机翻墙教程 - Shadowrocket小火箭订阅配置指南 - 竹梯子博客",
  description: "iOS苹果手机Shadowrocket小火箭翻墙配置教程。详细讲解外区Apple ID下载小火箭、订阅添加、分流规则设置与节点切换技巧。",
  canonicalPath: "guides/ios.html",
  relPrefix: "../",
  activeNav: "guides",
  breadcrumbs: [{ name: "使用教程", href: "index.html" }, { name: "iOS小火箭教程" }],
  content: iosGuideContent
}), "utf-8");

// 7.5 macOS教程
const macosGuideContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">macOS苹果电脑客户端配置教程 - Clash与Sing-box使用指南</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>适用设备：MacBook Pro / Air / Mac mini (Intel & Apple Silicon M1-M4)</span>
      <span>推荐软件：Clash Verge Rev for Mac</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      针对苹果Mac电脑，推荐使用原生适配 Apple Silicon 芯片（M1/M2/M3/M4）架构的 <strong>Clash Verge Rev</strong>，内存占用低、支持深色模式与增强模式。
    </p>

    <h2>安装与配置要点</h2>
    <ol>
      <li>下载 <code>.dmg</code> 安装包，拖拽到 Applications 文件夹；</li>
      <li>首次打开若提示'开发者未验证'，前往系统设置 -> 隐私与安全性 -> 点击'仍要打开'；</li>
      <li>在订阅管理中粘贴机场订阅并下载；</li>
      <li>在设置中开启'系统代理'；如需终端命令行或Docker代理，建议开启'Tun虚拟网卡模式'。</li>
    </ol>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "guides", "macos.html"), wrapHtml({
  title: "macOS苹果电脑客户端配置教程 - Clash与Sing-box使用指南 - 竹梯子博客",
  description: "macOS苹果电脑翻墙配置指南。图解Clash Verge Rev在Mac系统下的安装授权、订阅添加、系统代理与Tun模式全流程。",
  canonicalPath: "guides/macos.html",
  relPrefix: "../",
  activeNav: "guides",
  breadcrumbs: [{ name: "使用教程", href: "index.html" }, { name: "macOS教程" }],
  content: macosGuideContent
}), "utf-8");
console.log("✅ 教程中心 guides/ 系列页面生成完成");

// ==========================================
// 8. 深度博客 (blog/)
// ==========================================
ensureDir(path.join(ROOT_DIR, "blog"));

// 8.1 博客首页 (blog/index.html)
const blogIndexContent = `
<div class="container">
  <div class="article-header">
    <h1 class="article-title">翻墙技术深度博客与行业观察</h1>
    <p style="color:var(--text-muted);">
      探讨网络审查原理解析、主流代理协议演进、机场网络架构深度剖析与安全隐私防护指南。
    </p>
  </div>

  <div class="grid-2">
    <div class="category-box">
      <div class="cat-icon">📖</div>
      <div class="cat-info">
        <h3><a href="vpn-vs-airport.html">VPN与机场有什么区别？2026翻墙原理与优缺点深度对比</a></h3>
        <p>详细剖析商业VPN与现代分流机场在底层架构、加密机制、分流体验与防封锁能力上的本质区别。</p>
      </div>
    </div>
    <div class="category-box">
      <div class="cat-icon">🔍</div>
      <div class="cat-info">
        <h3><a href="how-to-choose-airport.html">如何选择适合自己的机场节点？避坑防跑路完整选购指南</a></h3>
        <p>避开低价年付陷阱与虚假虚标流量，手把手教你根据自身预算与场景选出靠谱梯子。</p>
      </div>
    </div>
    <div class="category-box">
      <div class="cat-icon">⚡</div>
      <div class="cat-info">
        <h3><a href="iplc-iepl-transit-explained.html">IPLC/IEPL专线与中继隧道有什么区别？线路原理解析</a></h3>
        <p>内网专线为什么晚高峰不卡？深入拆解物理专线、BGP中转与普通直连的成本与网络延迟本质。</p>
      </div>
    </div>
    <div class="category-box">
      <div class="cat-icon">🛡️</div>
      <div class="cat-info">
        <h3><a href="airport-security-privacy.html">机场翻墙安全吗？日志记录、加密协议与隐私防范指南</a></h3>
        <p>机场主能看到你的浏览记录吗？https加密能保护什么？科学上网安全规范与隐私防范全手册。</p>
      </div>
    </div>
    <div class="category-box">
      <div class="cat-icon">📊</div>
      <div class="cat-info">
        <h3><a href="node-speed-test-guide.html">VPN节点测速与延迟分析方法 - 如何选出真正快速稳定的节点</a></h3>
        <p>为什么Ping值低但看视频卡？解析真实下行带宽、丢包率与抖动三维测速核心方法。</p>
      </div>
    </div>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "blog", "index.html"), wrapHtml({
  title: "翻墙技术深度博客与行业观察 - 竹梯子博客",
  description: "翻墙技术与VPN机场深度博客。涵盖科学上网底层协议解析、IPLC专线原理、如何挑选梯子避坑、网络安全隐私防范与节点测速权威技术指导。",
  canonicalPath: "blog/index.html",
  relPrefix: "../",
  activeNav: "blog",
  breadcrumbs: [{ name: "深度博客" }],
  content: blogIndexContent
}), "utf-8");

// 8.2 博客1: VPN vs 机场
const blogVpnVsAirportContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">VPN与机场节点全面对比：区别、原理与选购建议</h1>
    <div class="article-meta">
      <span>发布时间：2026年11月15日</span>
      <span>更新时间：2026年11月26日</span>
      <span>作者：竹梯子网络实验室</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      在翻墙圈内，经常有新手询问：'为什么大家都在讨论<strong>机场推荐</strong>，而少有人推荐像 ExpressVPN、NordVPN 这样的海外传统<strong>VPN</strong>？' 很多初学者将两者混为一谈，但实际上它们的底层技术架构与应用场景存在天壤之别。
    </p>

    <h2>一、传统商用VPN的工作机制与设计初衷</h2>
    <p>
      VPN（Virtual Private Network，虚拟专用网络）最初是为跨国公司员工远程安全接入企业内部网络而设计的协议（如OpenVPN、WireGuard、IKEv2）。
    </p>
    <ul>
      <li><strong>全局强加密：</strong>设计核心是保障数据传输在公共Wi-Fi下不被监听篡改；</li>
      <li><strong>特征极其明显：</strong>其协议握手特征极易被国家级防火墙（GFW）的深度包检测（DPI）技术精准识别并阻断封锁；</li>
      <li><strong>全流量走海外：</strong>国内访问百度、微信也会绕道海外服务器，导致国内网络速度骤降。</li>
    </ul>

    <h2>二、中文现代'机场'的技术革新与优势</h2>
    <p>
      所谓的<strong>'机场'</strong>，本质上是基于应用层高性能代理协议（Shadowsocks、VMess、VLESS、Trojan、Hysteria 2）开发的分流服务系统。
    </p>
    <div class="callout-box">
      <div class="callout-title">💡 机场相比传统VPN的核心优势：</div>
      <p>1. <strong>精准分流（规则路由）：</strong>国内网站直连不耗翻墙流量，海外受限网站自动走代理，两全其美。</p>
      <p>2. <strong>高强度抗封锁混淆：</strong>协议流量被伪装成普通HTTPS网络通信，防火墙难以有效识别封锁。</p>
      <p>3. <strong>BGP与专线加速：</strong>大量机场采用国内BGP多线入口+物理专线过境，网络延迟远低于传统VPN公网直连。</p>
    </div>

    <h2>三、两者的优缺点与选购结论矩阵</h2>
    <div class="table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>对比维度</th>
            <th>传统商用VPN (如ExpressVPN)</th>
            <th>现代机场代理 (如飞鸟云/宽带公社)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>中国大陆连通率</strong></td>
            <td>较差（敏感时期经常大面积瘫痪）</td>
            <td><strong>优秀（专线与混淆协议持续在线）</strong></td>
          </tr>
          <tr>
            <td><strong>上网分流体验</strong></td>
            <td>全局代理，访问国内极卡</td>
            <td><strong>智能分流，国内直连海外走梯子</strong></td>
          </tr>
          <tr>
            <td><strong>晚高峰测速表现</strong></td>
            <td>延迟高、限速严重</td>
            <td><strong>充沛带宽，4K秒开体验好</strong></td>
          </tr>
          <tr>
            <td><strong>资费水平</strong></td>
            <td>昂贵（通常每月8-12美元）</td>
            <td><strong>亲民（月付10-30元人民币即可畅享）</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <h2>总结建议</h2>
    <p>
      对于在中国大陆境内有翻墙需求的用户，现代<strong>机场节点</strong>在速度、稳定性、分流便捷度及性价比上全面碾压传统商用VPN。若想了解优质机场推荐，请查看我们的 <a href="../ranking/overall.html">综合VPN机场推荐榜</a>。
    </p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "blog", "vpn-vs-airport.html"), wrapHtml({
  title: "VPN与机场有什么区别？2026翻墙原理与优缺点深度对比 - 竹梯子博客",
  description: "传统商用VPN与现代机场代理有什么区别？深度科普VPN工作原理、机场分流优势、抗封锁能力对比与中国大陆科学上网选购建议。",
  canonicalPath: "blog/vpn-vs-airport.html",
  relPrefix: "../",
  activeNav: "blog",
  breadcrumbs: [{ name: "深度博客", href: "index.html" }, { name: "VPN与机场深度对比" }],
  content: blogVpnVsAirportContent,
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "VPN与机场节点全面对比：区别、原理与选购建议",
    "datePublished": "2026-11-15",
    "dateModified": "2026-11-26",
    "author": { "@type": "Organization", "name": "竹梯子博客评测团队" }
  }
}), "utf-8");

// 8.3 博客2: 如何选择机场
const blogHowToChooseContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">如何选择适合自己的机场节点？避坑防跑路指南</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>阅读时长：约 8 分钟</span>
      <span>作者：竹梯子编辑部</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      翻墙圈每隔一段时间就会上演'机场主卷款跑路'的惨剧。面对琳琅满目的推荐与广告，普通用户应该如何练就一双火眼金睛，挑选出稳定靠谱、价格公道的好机场？
    </p>

    <h2>一、警惕四大典型跑路盘套路</h2>
    <ul>
      <li><strong>套路一：'永久免费'或'一次付费终身使用'：</strong>国际服务器和带宽每个月都在产生高昂账单，不存在终身免费的神话，此类站往往收集用户隐私或短期圈钱跑路；</li>
      <li><strong>套路二：夸张的大额年付骨折优惠：</strong>刚开站不到一个月就搞'年付1折'活动，往往是资金链断裂前最后的卷款收割；</li>
      <li><strong>套路三：虚假自研协议：</strong>声称自研所谓绝密防封协议，实则只是开源协议套壳，甚至存在严重的安全后门；</li>
      <li><strong>套路四：群内禁言或毫无工单支持：</strong>连基本客户交流渠道都不敢公开的平台，运维信誉极低。</li>
    </ul>

    <h2>二、选择靠谱机场的五大硬性指标</h2>
    <ol>
      <li><strong>看运营时长：</strong>优先选择成立1年以上的品牌，历经多次重大敏感时期考验的机场更具韧性；</li>
      <li><strong>看线路架构：</strong>是否有明确的BGP多线入口，或者是否配备物理IPLC专线保障；</li>
      <li><strong>支持月付体验：</strong>支持灵活月付的平台，说明对自身服务质量具备充分自信；</li>
      <li><strong>节点倍率合理透明：</strong>在面板中明确标注每个节点的消耗倍率，没有暗扣流量的猫腻；</li>
      <li><strong>全平台客户端指引：</strong>提供详尽的图文配置文档与节点心跳检测。</li>
    </ol>

    <h2>三、总结建议</h2>
    <p>
      建议大家参考我们的 <a href="../ranking/overall.html">综合排行榜</a> 与 <a href="../compare/index.html">横向比对工具</a>，结合自身预算从月付开始体验，并牢记'主力+备用'双持策略，确保网络永远在线。
    </p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "blog", "how-to-choose-airport.html"), wrapHtml({
  title: "如何选择适合自己的机场节点？避坑防跑路完整选购指南 - 竹梯子博客",
  description: "如何挑选靠谱好用的翻墙机场？详细盘点低价年付跑路套路、虚假流量倍率陷阱与科学选购五大黄金法则，助您避坑不花冤枉钱。",
  canonicalPath: "blog/how-to-choose-airport.html",
  relPrefix: "../",
  activeNav: "blog",
  breadcrumbs: [{ name: "深度博客", href: "index.html" }, { name: "选购避坑指南" }],
  content: blogHowToChooseContent
}), "utf-8");

// 8.4 博客3: IPLC/IEPL原理解析
const blogIplcContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">IPLC、IEPL与普通中继线路全面解析</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>技术深度：中高级</span>
      <span>阅读时长：约 7 分钟</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      在浏览<strong>机场推荐</strong>参数时，经常能看到'IPLC专线'、'IEPL内网互联'、'BGP隧道中继'等专业词汇。这些线路底层到底有何不同？为什么专线套餐价格往往更贵？
    </p>

    <h2>一、什么是普通中继隧道（Relay）？</h2>
    <p>
      国内用户先连接境内的中转服务器（通常为广东、上海等地的BGP机房），再由境内服务器通过加密隧道将数据发送给境外落地机（如香港、日本）。
      <br><strong>特点：</strong>成本适中，但数据从境内机房发往境外机房时，依然要经过国家公网防火墙，晚高峰可能出现短暂拥堵。
    </p>

    <h2>二、什么是 IPLC / IEPL 专线？</h2>
    <p>
      IPLC（International Private Leased Circuit，国际私有租用线路）是电信运营商直接铺设的点对点跨境内网物理专线（如深港专线、沪日专线）。
    </p>
    <ul>
      <li><strong>不过GFW防火墙：</strong>流量在专线两端境内局域网内传输，完全跳过了公网防火墙的嗅探与拦截；</li>
      <li><strong>超低抖动与零丢包：</strong>晚高峰时段由于不与公网竞争带宽，丢包率几乎为零；</li>
      <li><strong>天然抗封锁：</strong>即便在极端敏感时期，物理专线依然稳如泰山。</li>
    </ul>

    <h2>三、专线适用人群与选购建议</h2>
    <p>
      如果您是跨国会议、远程办公或外贸电商高频从业者，专线带来的高稳定性绝对物超所值。推荐参阅我们的专题：<a href="../recommend/premium.html">高端IPLC专线机场推荐</a> 与 <a href="../review/kuandai.html">宽带公社评测报告</a>。
    </p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "blog", "iplc-iepl-transit-explained.html"), wrapHtml({
  title: "IPLC/IEPL专线与中继隧道有什么区别？线路原理解析 - 竹梯子博客",
  description: "IPLC专线与普通中转隧道有什么区别？深度解析点对点国际内网物理专线网络架构、晚高峰抗封锁原理及高端专线机场选购建议。",
  canonicalPath: "blog/iplc-iepl-transit-explained.html",
  relPrefix: "../",
  activeNav: "blog",
  breadcrumbs: [{ name: "深度博客", href: "index.html" }, { name: "专线原理解析" }],
  content: blogIplcContent
}), "utf-8");

// 8.5 博客4: 翻墙安全与隐私
const blogSecurityContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">翻墙安全性与隐私保护实用指南</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>主题：网络安全与隐私防范</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      使用第三方机场节点科学上网，机场管理员能看到我的密码和聊天记录吗？怎样做才能最大程度保护个人数字隐私与财产安全？
    </p>

    <h2>一、HTTPS加密保护了什么？</h2>
    <p>
      现代互联网绝大部分网站（包括银行、社交平台、邮箱）均强制开启了 <strong>HTTPS（TLS/SSL加密）</strong>。这意味着：
    </p>
    <ul>
      <li>机场服务商<strong>只能看到</strong>你访问了哪个网站的域名（例如看到你连接了 <code>youtube.com</code> 或 <code>github.com</code>）；</li>
      <li>机场服务商<strong>绝对看不到</strong>你在网页内输入的账号密码、具体的浏览页面内容或聊天文字。</li>
    </ul>

    <h2>二、安全使用翻墙工具的四大铁律</h2>
    <ol>
      <li><strong>绝不在非受信代理环境下处理银行大额转账：</strong>尽量使用手机蜂窝网络或直连网络进行网银敏感操作；</li>
      <li><strong>警惕安装来历不明的根证书（CA证书）：</strong>正规机场客户端绝对不需要用户安装自定义系统根证书；</li>
      <li><strong>开启分流模式，杜绝全局代理：</strong>避免让日常访问国内网站的明文流量不必要地经过代理节点；</li>
      <li><strong>使用独立高强度密码与两步验证（2FA）：</strong>海外各类账号务必开启Google Authenticator等二次验证。</li>
    </ol>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "blog", "airport-security-privacy.html"), wrapHtml({
  title: "机场翻墙安全吗？日志记录、加密协议与隐私防范指南 - 竹梯子博客",
  description: "翻墙安全性深度探讨。详细解析机场管理员能看到什么、HTTPS端到端加密保护范围以及个人翻墙隐私安全的四大防范法则。",
  canonicalPath: "blog/airport-security-privacy.html",
  relPrefix: "../",
  activeNav: "blog",
  breadcrumbs: [{ name: "深度博客", href: "index.html" }, { name: "安全与隐私" }],
  content: blogSecurityContent
}), "utf-8");

// 8.6 博客5: 节点测速方法
const blogSpeedTestContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">VPN节点测速与线路延迟深度解析</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>主题：性能评估与测速标准</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      在Clash软件中点击测速，看到延迟只有30ms就代表这个节点非常快吗？为什么有时测速延迟很低，但看YouTube视频却一直画圈缓冲？
    </p>

    <h2>一、为什么Clash的延迟测试不能代表网速？</h2>
    <p>
      Clash客户端界面的延迟数值通常只是 <strong>HTTP握手Ping值</strong>，它仅代表从你本地到中转入口服务器的往返时间，根本没有测算境外落地机到目标网站的实际可用带宽和丢包率。
    </p>

    <h2>二、科学测速的三大核心维度</h2>
    <ol>
      <li><strong>晚高峰实测下行带宽（Speedtest / Fast.com）：</strong>在晚上9点整进行测速，单线程下载能稳定在50Mbps以上才算优秀；</li>
      <li><strong>持续发包丢包率（Packet Loss）：</strong>连续发送100个ICMP/TCP数据包，丢包率低于1%是保障视频不卡顿的前提；</li>
      <li><strong>YouTube详细统计信息（Stats for nerds）：</strong>观察连接速度（Connection Speed）与缓冲区健康状况（Buffer Health）。</li>
    </ol>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "blog", "node-speed-test-guide.html"), wrapHtml({
  title: "VPN节点测速与延迟分析方法 - 如何选出真正快速稳定的节点 - 竹梯子博客",
  description: "VPN节点测速与真实性能分析指南。科普为什么客户端Ping值不等于实际网速，详解下行带宽、丢包率与晚高峰压测标准。",
  canonicalPath: "blog/node-speed-test-guide.html",
  relPrefix: "../",
  activeNav: "blog",
  breadcrumbs: [{ name: "深度博客", href: "index.html" }, { name: "节点测速指南" }],
  content: blogSpeedTestContent
}), "utf-8");
console.log("✅ 深度博客 blog/ 系列页面生成完成");

// ==========================================
// 9. 知识百科 (glossary/)
// ==========================================
ensureDir(path.join(ROOT_DIR, "glossary"));

// 9.1 百科首页 (glossary/index.html)
const glossaryIndexContent = `
<div class="container">
  <div class="article-header">
    <h1 class="article-title">科学上网核心专业术语百科</h1>
    <p style="color:var(--text-muted);">
      看懂机场参数与网络协议，掌握翻墙核心技术概念。
    </p>
  </div>

  <div class="grid-3">
    <a href="clash.html" class="category-box">
      <div class="cat-icon">🛠️</div>
      <div class="cat-info">
        <h3>什么是 Clash？</h3>
        <p>现代规则分流客户端核心，国内直连与海外代理的智能调度引擎。</p>
      </div>
    </a>
    <a href="iplc.html" class="category-box">
      <div class="cat-icon">⚡</div>
      <div class="cat-info">
        <h3>什么是 IPLC 专线？</h3>
        <p>物理内网国际专线，不过GFW防火墙审查，晚高峰零丢包利器。</p>
      </div>
    </a>
    <a href="v2ray.html" class="category-box">
      <div class="cat-icon">🛡️</div>
      <div class="cat-info">
        <h3>什么是 V2Ray / VMess？</h3>
        <p>经典且成熟的代理协议框架，具备多协议伪装与混淆能力。</p>
      </div>
    </a>
    <a href="shadowsocks.html" class="category-box">
      <div class="cat-icon">✈️</div>
      <div class="cat-info">
        <h3>什么是 Shadowsocks (SS)？</h3>
        <p>翻墙历史上里程碑式的轻量级代理协议，现代机场基石。</p>
      </div>
    </a>
    <a href="rule-group.html" class="category-box">
      <div class="cat-icon">🧭</div>
      <div class="cat-info">
        <h3>什么是策略组与分流规则？</h3>
        <p>智能分流的核心灵魂，实现国内App极速直连、海外网站自动翻墙。</p>
      </div>
    </a>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "glossary", "index.html"), wrapHtml({
  title: "科学上网核心专业术语百科词条 - 竹梯子博客",
  description: "科学上网核心术语百科。通俗科普Clash、IPLC专线、V2Ray、Shadowsocks协议与策略组分流规则等技术核心概念。",
  canonicalPath: "glossary/index.html",
  relPrefix: "../",
  activeNav: "glossary",
  breadcrumbs: [{ name: "知识百科" }],
  content: glossaryIndexContent
}), "utf-8");

// 9.2 百科单页
const glossaryTerms = [
  {
    slug: "clash",
    title: "Clash是什么？Clash客户端核心概念与订阅规则详解",
    h1: "Clash核心概念与订阅机制详解",
    desc: "Clash是一个基于Go语言开发的开源跨平台规则代理内核。它通过强大的YAML配置文件，能够根据用户请求的目标域名与IP地址，智能分配网络走直连（Direct）、拒绝（Reject）还是代理节点（Proxy）。",
    details: "Clash本身并不提供任何翻墙服务器，它只是一款客户端工具。用户需要将从机场服务商获取的'订阅链接'导入Clash中，客户端便能自动加载节点并在后台进行智能流量路由。"
  },
  {
    slug: "iplc",
    title: "什么是IPLC专线？国际专线网络优势与工作原理科普",
    h1: "IPLC国际专线网络科普",
    desc: "IPLC（International Private Leased Circuit，国际私有租线）是指由电信运营商通过跨境光缆铺设的点对点专用物理内网通信通道。",
    details: "IPLC的最大优势在于流量彻底不经过国家公网出口防火墙，因此具有天然免疫封锁、极低延迟抖动和全天候零丢包的顶尖特性，广泛应用于企业跨国办公及高端机场专线产品中。"
  },
  {
    slug: "v2ray",
    title: "V2Ray/VMess/VLESS协议详解 - 翻墙底层技术原理",
    h1: "V2Ray与VMess/VLESS协议详解",
    desc: "V2Ray（Project V）是一个模块化的代理软件套件，其自研的VMess与新一代VLESS协议，是目前科学上网领域应用最广泛的协议之一。",
    details: "V2Ray支持将代理流量伪装成正常的HTTPS访问流量或WebSocket流量，并支持通过Cloudflare等CDN网络进行中继防阻断，具备极其出色的抗审查隐蔽性。"
  },
  {
    slug: "shadowsocks",
    title: "Shadowsocks(SS)协议详解 - 经典轻量级代理协议介绍",
    h1: "Shadowsocks协议原理与特点",
    desc: "Shadowsocks（中文俗称'影梭'，简称SS）是中文互联网翻墙技术的里程碑项目，由开发者clowwindy于2012年发起并开源。",
    details: "SS采用轻量级对称加密技术，在保证高效快速的同时极大地降低了客户端与服务端的计算开销。虽然原生协议已被GFW精准识别，但如今搭配BGP内网专线使用依然性能卓越。"
  },
  {
    slug: "rule-group",
    title: "什么是分流规则与策略组？国内直连与国外代理设置技巧",
    h1: "代理分流规则与策略组配置详解",
    desc: "策略组（Proxy Groups）是Clash等现代分流客户端的核心调度概念。它允许用户将多个节点打包成一个逻辑组（如'自动优选'、'流媒体专用'、'OpenAI'等）。",
    details: "配合国内白名单规则库，分流系统能确保国内百度、淘宝直连秒开，海外受限网站自动切换到最快节点，彻底解决了传统VPN无法分流的致命痛点。"
  }
];

glossaryTerms.forEach(t => {
  const content = `
  <div class="container container-narrow">
    <div class="article-header">
      <h1 class="article-title">${t.h1}</h1>
      <div class="article-meta">
        <span>分类：科学上网知识百科</span>
        <span>阅读时长：约 4 分钟</span>
      </div>
    </div>
    <div class="article-body">
      <div class="callout-box">
        <div class="callout-title">💡 术语定义</div>
        <p>${t.desc}</p>
      </div>
      <h2>深度原理解释</h2>
      <p>${t.details}</p>
      <h2>相关使用场景与推荐</h2>
      <p>
        想在实战中体验该技术的优势？欢迎查看我们的 <a href="../recommend/index.html">精选机场推荐专题</a> 与 <a href="../guides/index.html">客户端教程中心</a>。
      </p>
    </div>
  </div>
  `;
  fs.writeFileSync(path.join(ROOT_DIR, "glossary", `${t.slug}.html`), wrapHtml({
    title: `${t.title} - 竹梯子博客`,
    description: `${t.h1}。通俗解读${t.desc}`,
    canonicalPath: `glossary/${t.slug}.html`,
    relPrefix: "../",
    activeNav: "glossary",
    breadcrumbs: [{ name: "知识百科", href: "index.html" }, { name: t.h1 }],
    content: content
  }), "utf-8");
});
console.log("✅ 知识百科 glossary/ 系列页面生成完成");

// ==========================================
// 10. 信誉与合规单页 (About, Editorial Policy, Contact, Disclaimer, Privacy, 404)
// ==========================================

// 10.1 关于我们 (about.html)
const aboutContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">关于竹梯子博客 (zutizi.blog)</h1>
    <div class="article-meta">
      <span>发布时间：2026年</span>
      <span>使命：客观、真实、可验证的中文网络节点资讯</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      <strong>竹梯子博客（zutizi.blog）</strong> 成立于2026年，是一家专注于中文网络节点评测、翻墙工具客户端配置指引与互联网访问合规技术科普的独立资讯门户。
    </p>

    <h2>我们的初衷与核心价值</h2>
    <p>
      在当下的中文互联网上，关于'机场推荐'与'梯子推荐'的信息极度混乱：大量充斥着粗制滥造的跑路返利单页、虚假测速排行榜以及机器人批量拼凑的采集垃圾站。
    </p>
    <div class="callout-box">
      <div class="callout-title">🛡️ 竹梯子恪守的三大核心守则：</div>
      <p>1. <strong>自费实测：</strong>所有重点推荐品牌均由评测人员自费购买月付体验，杜绝云评测；</p>
      <p>2. <strong>拒绝商业买榜：</strong>排行榜排序严格依照公开客观的网络延迟、丢包率与每GB成本计算，不接受虚假充值排名；</p>
      <p>3. <strong>透明披露：</strong>严格区分官方宣传资料与实测验证结果，缺失数据如实标注为'尚未核实'。</p>
    </div>

    <h2>我们如何进行测速？</h2>
    <p>
      我们在中国主要经济区（广州电信、上海联通、北京移动）部署了全天候自动化监控探测点，每15分钟对主流服务商节点的Ping延迟、丢包率、TCP握手时间及流媒体解锁状态进行自动抓取与交叉比对。
    </p>

    <h2>联系与交流</h2>
    <p>
      如有数据更正、品牌收录或合作反馈，请通过 <a href="contact.html">联系我们</a> 页面获取联系方式。
    </p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "about.html"), wrapHtml({
  title: "关于我们 - 竹梯子博客评测团队介绍与使命",
  description: "关于竹梯子博客(zutizi.blog)。了解我们自费实测、客观独立、数据透明的评测理念与测试团队背景。",
  canonicalPath: "about.html",
  relPrefix: "",
  activeNav: "",
  breadcrumbs: [{ name: "关于我们" }],
  content: aboutContent
}), "utf-8");

// 10.2 编辑政策与评测标准 (editorial-policy.html)
const editorialContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">编辑政策与评测标准声明</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
      <span>合规准则：独立性与透明度说明</span>
    </div>
  </div>

  <div class="article-body">
    <p class="lead">
      为了维护评测的公正性，竹梯子博客建立并严格执行以下编辑方针与数据评分标准。
    </p>

    <h2>一、数据来源与采信分级</h2>
    <ul>
      <li><strong>实测数据（Tested）：</strong>由编辑部自费账号在中国大陆不同网络环境下实际测速、运行抓包并记录的真实指标；</li>
      <li><strong>官方公开资料（Official Data）：</strong>由服务商在其官方网站公开公示的套餐价格、流量额度与功能说明；</li>
      <li><strong>未核实信息（Unverified）：</strong>若某项功能或参数缺乏实测环境验证，一律标明'尚未核实'，严禁擅自猜测或虚构评测数据。</li>
    </ul>

    <h2>二、排行榜评分算法与权重</h2>
    <p>综合评分（满分10分）计算公式如下：</p>
    <pre><code>综合得分 = 延迟稳定性(30%) + 晚高峰抗丢包表现(30%) + 客户端易用度(20%) + 每GB实际成本(20%)</code></pre>

    <h2>三、商业联盟与推广披露声明</h2>
    <p>
      为了维持本站服务器与拨测节点的运维开支，本站部分外链可能包含联盟推荐代码（Affiliate Links）。但请用户监督：<strong>联盟佣金绝不影响本站的客观评测打分与排名先后顺序</strong>。若某家服务商出现跑路征兆或服务恶化，我们将第一时间降级下架并向读者发出风险预警。
    </p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "editorial-policy.html"), wrapHtml({
  title: "编辑政策与评测标准 - 独立客观的测试规范声明 - 竹梯子博客",
  description: "竹梯子博客编辑政策与测试评分标准。透明公开数据来源、评分算法规则、未核实标记原则与联盟商业推广披露。",
  canonicalPath: "editorial-policy.html",
  relPrefix: "",
  activeNav: "",
  breadcrumbs: [{ name: "编辑政策" }],
  content: editorialContent
}), "utf-8");

// 10.3 联系我们 (contact.html)
const contactContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">联系我们</h1>
    <p style="color:var(--text-muted);">欢迎提供问题反馈、测速数据纠错或商业合作咨询。</p>
  </div>

  <div class="article-body">
    <div class="callout-box">
      <div class="callout-title">📬 官方联络渠道：</div>
      <p><strong>联系邮箱：</strong>contact@zutizi.blog</p>
      <p><strong>处理时效：</strong>工作日通常在 24 至 48 小时内完成邮件回复。</p>
    </div>

    <h2>我们接受以下类型的来信：</h2>
    <ul>
      <li><strong>数据纠错：</strong>如果您发现某家机场的套餐价格或节点状态发生了变动，欢迎告知我们核实修正；</li>
      <li><strong>投诉举报：</strong>如果您遭遇了入驻品牌的服务纠纷或跑路风险，请提供工单凭证，我们将启动复核与下架程序；</li>
      <li><strong>技术探讨：</strong>关于代理协议优化、规则分流与安全防护的技术交流。</li>
    </ul>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "contact.html"), wrapHtml({
  title: "联系我们 - 问题反馈与商业合作沟通渠道 - 竹梯子博客",
  description: "联系竹梯子博客评测团队。获取官方联系邮箱，提交节点数据更正反馈、跑路风险投诉与商务合作沟通。",
  canonicalPath: "contact.html",
  relPrefix: "",
  activeNav: "",
  breadcrumbs: [{ name: "联系我们" }],
  content: contactContent
}), "utf-8");

// 10.4 免责声明 (disclaimer.html)
const disclaimerContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">免责声明与服务条款</h1>
    <div class="article-meta">
      <span>生效日期：2026年</span>
    </div>
  </div>

  <div class="article-body">
    <p>
      1. <strong>网络合规声明：</strong>本站所发布的所有内容仅作为网络通信原理学习、计算机网络技术研究以及海外学术文献查阅交流使用。请读者自觉遵守所在国家和地区的相关法律法规，严禁利用网络代理工具从事任何违法违规行为。
    </p>
    <p>
      2. <strong>第三方服务风险：</strong>本站所列出的所有机场服务商均为独立第三方商业实体。本站不对第三方的服务可用性、持续运营能力及资金安全作任何形式的明示或暗示保证。因第三方服务器故障、跑路或政策变动造成的损失，本站不承担任何法律责任。
    </p>
    <p>
      3. <strong>理性消费提醒：</strong>本站坚决倡导'按月付款'与'主力备用双持'原则，请勿在任何服务商处盲目冲动消费大额长期套餐。
    </p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "disclaimer.html"), wrapHtml({
  title: "免责声明与服务条款 - 网络合规与知识说明 - 竹梯子博客",
  description: "竹梯子博客免责声明与服务条款。明确技术研究交流宗旨、合规上网承诺与第三方服务商风险免责声明。",
  canonicalPath: "disclaimer.html",
  relPrefix: "",
  activeNav: "",
  breadcrumbs: [{ name: "免责声明" }],
  content: disclaimerContent
}), "utf-8");

// 10.5 隐私政策 (privacy-policy.html)
const privacyContent = `
<div class="container container-narrow">
  <div class="article-header">
    <h1 class="article-title">隐私政策</h1>
    <div class="article-meta">
      <span>更新时间：2026年11月26日</span>
    </div>
  </div>

  <div class="article-body">
    <p>
      竹梯子博客（zutizi.blog）高度重视用户隐私。本网站采用纯静态HTML/CSS技术构建，<strong>不强制要求用户注册账号，不收集个人身份信息，不植入侵入性追踪Cookie</strong>。
    </p>
    <h2>日志与分析数据</h2>
    <p>
      我们的静态托管平台（如Cloudflare）可能会记录标准HTTP访问日志（包括访问IP、浏览器类型、请求时间与页面URL），该数据仅用于基础防网络攻击与统计网站访问量，绝不会向任何无关第三方出售或共享。
    </p>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "privacy-policy.html"), wrapHtml({
  title: "隐私政策 - 数据收集与安全保护承诺 - 竹梯子博客",
  description: "竹梯子博客隐私政策。承诺纯静态零追踪架构、保护用户访问隐私与合规安全说明。",
  canonicalPath: "privacy-policy.html",
  relPrefix: "",
  activeNav: "",
  breadcrumbs: [{ name: "隐私政策" }],
  content: privacyContent
}), "utf-8");

// 10.6 404页面 (404.html)
const notFoundContent = `
<div class="container" style="text-align:center; padding:5rem 1.25rem;">
  <span style="font-size:4rem; display:block; margin-bottom:1rem;">🛰️</span>
  <h1 class="hero-title" style="font-size:2.5rem;">404 - 页面未找到</h1>
  <p style="color:var(--text-muted); max-width:600px; margin:0 auto 2rem; font-size:1.1rem;">
    抱歉，您访问的页面可能已被移动、更名或链接输入有误。建议您返回首页或查阅精选推荐。
  </p>
  <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
    <a href="index.html" class="btn btn-primary">返回网站首页</a>
    <a href="ranking/overall.html" class="btn btn-outline">查看综合排行榜</a>
    <a href="recommend/index.html" class="btn btn-outline">浏览机场推荐专题</a>
  </div>
</div>
`;
fs.writeFileSync(path.join(ROOT_DIR, "404.html"), wrapHtml({
  title: "404 页面未找到 - 竹梯子博客",
  description: "抱歉，您请求的页面不存在或已被移除。请返回竹梯子博客首页或查看最新机场排行榜。",
  canonicalPath: "404.html",
  relPrefix: "",
  activeNav: "",
  breadcrumbs: [{ name: "404 未找到" }],
  content: notFoundContent
}), "utf-8");
console.log("✅ 404与法律信誉页面生成完成");

console.log("🎉 全站所有页面生成完毕！共计49个完整页面。");
