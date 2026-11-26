/**
 * zutizi.blog - 机场横向比较系统 (14家核心品牌)
 * 纯原生JS交互，支持动态添加/移除候选机场，多维度参数矩阵对比
 */

(function () {
  const AIRPORTS_DATA = [
    {
      id: "breezenet",
      name: "微风网络 Breezenet",
      slug: "breezenet",
      price: "¥8.00/月起",
      startingPrice: 8.00,
      mainPlan: "入门版 200GB / ¥8",
      pricePerGb: "¥0.040 / GB",
      billingType: "月付",
      protocols: "VLESS, Shadowsocks, Trojan",
      regions: "香港, 日本, 新加坡, 台湾, 美国, 韩国",
      deviceLimit: "支持 4~6 台",
      aiSupport: "ChatGPT, Claude, Gemini, Copilot",
      streamingSupport: "Netflix 4K (港/美/日/新), Disney+, YouTube",
      pros: "¥8即可享200GB大流量，IEPL专线，双ISP原生住宅IP",
      cons: "大促期间低价套餐偶发需要抢购",
      suitable: "大流量视频观众、学生、高频AI内容创作者",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/breezenet.html",
      airportUrl: "../airport/breezenet.html",
      affiliateUrl: "https://edp01.breezenetaff.com/#/?code=h4GlIXwC"
    },
    {
      id: "muguang",
      name: "暮光网络",
      slug: "muguang",
      price: "¥20.00/月起",
      startingPrice: 20.00,
      mainPlan: "专线基础 120GB / ¥20",
      pricePerGb: "¥0.167 / GB",
      billingType: "月付",
      protocols: "VLESS, Trojan",
      regions: "香港, 日本, 新加坡, 美国, 台湾",
      deviceLimit: "支持 4~6 台",
      aiSupport: "ChatGPT, Claude, Gemini",
      streamingSupport: "Netflix 全区, Disney+, YouTube 4K",
      pros: "专线节点架构，晚高峰丢包<0.2%，原生住宅落地丰富",
      cons: "起步价20元，偏向主力稳定型人群",
      suitable: "主力稳定型用户、远程办公、流媒体深度依赖",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/muguang.html",
      airportUrl: "../airport/muguang.html",
      affiliateUrl: "https://varnexa.twilightaff.com/#/?code=8EtJCnBT"
    },
    {
      id: "feimaoyun",
      name: "飞猫云",
      slug: "feimaoyun",
      price: "¥7.00/月起 (折算)",
      startingPrice: 7.00,
      mainPlan: "特惠年付 150GB / ¥7",
      pricePerGb: "¥0.047 / GB",
      billingType: "年付折算 / 月付",
      protocols: "Shadowsocks, Trojan, VMess",
      regions: "香港, 日本, 新加坡, 美国, 台湾, 德国",
      deviceLimit: "支持 4~6 台",
      aiSupport: "ChatGPT, Claude, Gemini, Poe",
      streamingSupport: "Netflix 4K, Disney+, YouTube 4K",
      pros: "年付折算约¥7/月提供150GB，IEPL与中继双线冗余调度",
      cons: "超低价主要集中在年付折算方案中",
      suitable: "大流量学生党、轻度办公、高性价比追求者",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/feimaoyun.html",
      airportUrl: "../airport/feimaoyun.html",
      affiliateUrl: "https://flycat1.flycatvipaff.cc/#/?code=MlwqPqcx"
    },
    {
      id: "wuyou",
      name: "无忧 (无忧链接)",
      slug: "wuyou",
      price: "¥19.00/月起",
      startingPrice: 19.00,
      mainPlan: "无忧基础 100GB / ¥19",
      pricePerGb: "¥0.190 / GB",
      billingType: "月付",
      protocols: "Shadowsocks, V2Ray (VMess)",
      regions: "香港, 日本, 新加坡, 美国, 台湾",
      deviceLimit: "支持 4~6 台",
      aiSupport: "ChatGPT (原生住宅IP), Claude, Gemini",
      streamingSupport: "Netflix 全区, Disney+, YouTube 4K",
      pros: "真实物理IPLC内网专线，晚高峰丢包<0.1%，优惠码 wuyou666",
      cons: "节点集中于亚太热门核心区域",
      suitable: "跨境电商外贸卖家、远程办公、商业用户",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/wuyou.html",
      airportUrl: "../airport/wuyou.html",
      affiliateUrl: "https://wep01.worryfreeaff.com/#/?code=oGi9FQ0J"
    },
    {
      id: "lingmao",
      name: "灵猫",
      slug: "lingmao",
      price: "¥25.00/月起",
      startingPrice: 25.00,
      mainPlan: "IPLC专线 150GB / ¥25",
      pricePerGb: "¥0.167 / GB",
      billingType: "月付",
      protocols: "Shadowsocks, Trojan, VLESS",
      regions: "香港, 日本, 新加坡, 美国, 台湾, 英国",
      deviceLimit: "支持 4~6 台",
      aiSupport: "原生住宅纯净IP，ChatGPT/Claude全节点畅通",
      streamingSupport: "Netflix 全区, Disney+, YouTube 4K, BBC",
      pros: "高端真实IPLC专线，千兆端口，纯净住宅原生IP池",
      cons: "月付起步25元，门槛稍高于大众平价机场",
      suitable: "AI生产力工作者、跨境办公、4K秒开发烧友",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/lingmao.html",
      airportUrl: "../airport/lingmao.html",
      affiliateUrl: "https://vip02.civetaff.com/#/?code=SXY8qyrG"
    },
    {
      id: "flashleap",
      name: "闪跃 FlashLeap",
      slug: "flashleap",
      price: "¥24.00/月起",
      startingPrice: 24.00,
      mainPlan: "纯专线入门 150GB / ¥24",
      pricePerGb: "¥0.160 / GB",
      billingType: "月付",
      protocols: "Shadowsocks, Trojan, VLESS",
      regions: "香港, 日本, 新加坡, 美国, 台湾, 韩国",
      deviceLimit: "支持 4~6 台",
      aiSupport: "ChatGPT, Claude, Gemini, Copilot",
      streamingSupport: "Netflix 4K, Disney+, YouTube 4K",
      pros: "专注低延迟IPLC纯专线，千兆BGP骨干，优惠码 shanyue",
      cons: "节点更替时需定期在客户端更新订阅",
      suitable: "外服联机加速、语音会议、YouTube 4K画质发烧友",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/flashleap.html",
      airportUrl: "../airport/flashleap.html",
      affiliateUrl: "https://vip02.flashleapaff.com/#/?code=8ZIV6HQ3"
    },
    {
      id: "firefly",
      name: "萤火虫（Firefly）",
      slug: "firefly",
      price: "¥8.00/月起 (折算)",
      startingPrice: 8.00,
      mainPlan: "标准月付 160GB / ¥16",
      pricePerGb: "¥0.100 / GB",
      billingType: "年付折算 / 月付",
      protocols: "VLESS, Trojan, Shadowsocks",
      regions: "香港, 日本, 新加坡, 美国, 台湾",
      deviceLimit: "支持 3~5 台",
      aiSupport: "ChatGPT, Claude, Gemini",
      streamingSupport: "Netflix 4K, Disney+, YouTube 4K",
      pros: "标准月付¥16提供160GB大流量，VLESS新协议抗封锁强",
      cons: "年付入门款月度流量为60GB",
      suitable: "轻度日常翻墙、备用防断网第二梯子、学生党",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/firefly.html",
      airportUrl: "../airport/firefly.html",
      affiliateUrl: "https://vip02.fireflyaff.com/#/?code=uTKLkAyC"
    },
    {
      id: "kuajiecloud",
      name: "跨界",
      slug: "kuajiecloud",
      price: "¥20.00/月起",
      startingPrice: 20.00,
      mainPlan: "全专线基础 120GB / ¥20",
      pricePerGb: "¥0.167 / GB",
      billingType: "月付",
      protocols: "Shadowsocks, Trojan",
      regions: "香港, 日本, 新加坡, 美国, 台湾",
      deviceLimit: "支持 4~6 台",
      aiSupport: "ChatGPT, Claude, Gemini",
      streamingSupport: "Netflix 4K, Disney+, YouTube 4K",
      pros: "全专线架构无公网拥堵，通用Shadowsocks协议易用性好",
      cons: "节点集中在亚太热门地区",
      suitable: "跨界跨境出海、日常社媒运营、家庭软路由分流",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/kuajiecloud.html",
      airportUrl: "../airport/kuajiecloud.html",
      affiliateUrl: "https://vip02.kuajieaff.com/#/?code=CpJKZicY"
    },
    {
      id: "yinxingren",
      name: "隐形人",
      slug: "yinxingren",
      price: "¥24.00/月起",
      startingPrice: 24.00,
      mainPlan: "纯专线入门 144GB / ¥24",
      pricePerGb: "¥0.167 / GB",
      billingType: "月付",
      protocols: "Shadowsocks, Trojan, VLESS",
      regions: "香港, 日本, 新加坡, 美国, 台湾, 英国",
      deviceLimit: "支持 5~8 台",
      aiSupport: "原生住宅IP支持 ChatGPT, Claude, Poe",
      streamingSupport: "Netflix 全球区, Disney+, YouTube 4K",
      pros: "老牌IEPL纯专线，千兆大带宽，支持多达8台设备并发",
      cons: "不提供免费试水体验",
      suitable: "多设备家庭与团队共享、跨国远程开发者、商务人士",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/yinxingren.html",
      airportUrl: "../airport/yinxingren.html",
      affiliateUrl: "https://varnexa.invisibleaff.com/#/?code=5BkMj6bD"
    },
    {
      id: "feiv",
      name: "飞V",
      slug: "feiv",
      price: "¥4.90/月起",
      startingPrice: 4.90,
      mainPlan: "轻量入门 100GB / ¥4.9",
      pricePerGb: "¥0.049 / GB",
      billingType: "月付 / 不限时按量",
      protocols: "Shadowsocks, V2Ray",
      regions: "香港, 日本, 新加坡, 美国, 台湾",
      deviceLimit: "支持 3~5 台",
      aiSupport: "ChatGPT, Gemini, Copilot",
      streamingSupport: "YouTube 4K, Netflix 常用区",
      pros: "起步月付仅需¥4.9享100GB，更有¥29不限时按量永不过期",
      cons: "入门款晚高峰偶有波动，非物理独占专线",
      suitable: "极低预算新手、寻找长期备用梯子的防失联用户",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/feiv.html",
      airportUrl: "../airport/feiv.html",
      affiliateUrl: "https://varnexa.flyvaff.com/#/?code=Ks7qO8qe"
    },
    {
      id: "laddercloud",
      name: "梯子云 LadderCloud",
      slug: "laddercloud",
      price: "¥25.00/月起",
      startingPrice: 25.00,
      mainPlan: "中转基础 125GB / ¥25",
      pricePerGb: "¥0.200 / GB",
      billingType: "月付",
      protocols: "Shadowsocks, Trojan, V2Ray",
      regions: "香港, 日本, 新加坡, 美国, 台湾, 德国",
      deviceLimit: "支持 4~6 台",
      aiSupport: "ChatGPT, Claude, Gemini",
      streamingSupport: "Netflix 4K, Disney+, YouTube 4K",
      pros: "混合BGP中转与专线，最高支持500GB超大流量方案",
      cons: "月付起步25元，价格适中",
      suitable: "大流量下载、多设备共享、日常主力梯子",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/laddercloud.html",
      airportUrl: "../airport/laddercloud.html",
      affiliateUrl: "https://varnexa.ladderaff.com/#/?code=eC6eLAbq"
    },
    {
      id: "wavenet",
      name: "浪网 WaveNet",
      slug: "wavenet",
      price: "¥30.00/月起",
      startingPrice: 30.00,
      mainPlan: "自研优化 150GB / ¥30",
      pricePerGb: "¥0.200 / GB",
      billingType: "月付",
      protocols: "VLESS, Trojan, Shadowsocks",
      regions: "香港, 日本, 新加坡, 美国, 台湾, 英国",
      deviceLimit: "支持 5~8 台",
      aiSupport: "ChatGPT (原生住宅IP), Claude (零风控)",
      streamingSupport: "Netflix 全球区, Disney+, YouTube 8K",
      pros: "自研优化线路，吞吐峰值近千兆，香港延迟12ms丢包0.0%",
      cons: "月付30元起，偏向高端旗舰定位",
      suitable: "画质与速度发烧友、跨国外贸与金融交易、极客用户",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/wavenet.html",
      airportUrl: "../airport/wavenet.html",
      affiliateUrl: "https://varnexa.wavenetaff.com/#/?code=8fwQQBdy"
    },
    {
      id: "lingdongcloud",
      name: "灵动云",
      slug: "lingdongcloud",
      price: "¥20.00/月起",
      startingPrice: 20.00,
      mainPlan: "均衡基础 100GB / ¥20",
      pricePerGb: "¥0.200 / GB",
      billingType: "月付",
      protocols: "Trojan, Shadowsocks, V2Ray",
      regions: "香港, 日本, 新加坡, 美国, 台湾",
      deviceLimit: "支持 4~6 台",
      aiSupport: "ChatGPT, Claude, Gemini",
      streamingSupport: "Netflix 4K, Disney+, YouTube 4K",
      pros: "Trojan安全协议抗封锁表现稳健，套餐无暗扣倍率套路",
      cons: "带宽峰值约500Mbps，不及千兆专线激进",
      suitable: "追求省心简单、日常办公与轻度娱乐的用户",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/lingdongcloud.html",
      airportUrl: "../airport/lingdongcloud.html",
      affiliateUrl: "https://varnexa.lingdongaff.com/#/?code=kd4yTgUr"
    },
    {
      id: "quanqiuyun",
      name: "全球云",
      slug: "quanqiuyun",
      price: "¥20.00/月起",
      startingPrice: 20.00,
      mainPlan: "中转经典 120GB / ¥20",
      pricePerGb: "¥0.167 / GB",
      billingType: "月付",
      protocols: "VLESS, Trojan, Shadowsocks",
      regions: "香港, 日本, 新加坡, 美国, 台湾, 韩国",
      deviceLimit: "支持 4~6 台",
      aiSupport: "ChatGPT, Claude, Gemini, Copilot",
      streamingSupport: "Netflix 4K, Disney+, YouTube 4K",
      pros: "中转优化网络，香港延迟12ms，支持双协议与优惠券 tt88",
      cons: "大促期间中转入口负载偶有增高",
      suitable: "全球主流节点切换、外贸与网购、超低延迟游戏视频",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/quanqiuyun.html",
      airportUrl: "../airport/quanqiuyun.html",
      affiliateUrl: "https://sswdh.gcvipaff.com/#/?code=8N1mSmYo"
    }
  ];

  // 默认选中前三家
  let selectedIds = ["breezenet", "feimaoyun", "yinxingren"];

  function renderChips() {
    const container = document.getElementById("compare-chips-container");
    if (!container) return;

    container.innerHTML = "";
    AIRPORTS_DATA.forEach(function (airport) {
      const isSelected = selectedIds.includes(airport.id);
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "compare-chip" + (isSelected ? " selected" : "");
      chip.innerHTML = (isSelected ? "✓ " : "+ ") + airport.name;
      chip.addEventListener("click", function () {
        toggleSelection(airport.id);
      });
      container.appendChild(chip);
    });
  }

  function toggleSelection(id) {
    const index = selectedIds.indexOf(id);
    if (index > -1) {
      if (selectedIds.length <= 2) {
        alert("至少需要保留2家机场进行横向对比");
        return;
      }
      selectedIds.splice(index, 1);
    } else {
      if (selectedIds.length >= 4) {
        alert("最多同时对比4家机场，请先取消某一家");
        return;
      }
      selectedIds.push(id);
    }
    renderChips();
    renderTable();
  }

  function renderTable() {
    const wrapper = document.getElementById("compare-matrix-wrapper");
    if (!wrapper) return;

    const list = AIRPORTS_DATA.filter(function (a) {
      return selectedIds.includes(a.id);
    });

    if (list.length === 0) {
      wrapper.innerHTML = "<div class='callout-box'><p>暂无选中的对比机场，请点击上方按钮添加。</p></div>";
      return;
    }

    const rows = [
      { label: "起步价格", key: "price" },
      { label: "主力代表套餐", key: "mainPlan" },
      { label: "每GB单价折算", key: "pricePerGb" },
      { label: "计费周期方式", key: "billingType" },
      { label: "支持协议", key: "protocols" },
      { label: "覆盖地区", key: "regions" },
      { label: "在线设备限制", key: "deviceLimit" },
      { label: "AI工具解锁", key: "aiSupport" },
      { label: "流媒体解锁能力", key: "streamingSupport" },
      { label: "核心优势", key: "pros" },
      { label: "主要缺点与限制", key: "cons" },
      { label: "最适合人群", key: "suitable" },
      { label: "测试验证状态", key: "testStatus" }
    ];

    let html = "<table class='data-table'><thead><tr><th style='min-width:140px;'>对比维度</th>";
    list.forEach(function (a) {
      html += "<th style='min-width:200px;'>" + a.name + "</th>";
    });
    html += "</tr></thead><tbody>";

    rows.forEach(function (r) {
      html += "<tr><td style='font-weight:700; background-color:var(--bg-subtle);'>" + r.label + "</td>";
      list.forEach(function (a) {
        html += "<td>" + (a[r.key] || "尚未核实") + "</td>";
      });
      html += "</tr>";
    });

    // 详情评测链接与直达链接行
    html += "<tr><td style='font-weight:700; background-color:var(--bg-subtle);'>评测与直达</td>";
    list.forEach(function (a) {
      html += "<td>" +
        "<a href='" + a.affiliateUrl + "' target='_blank' rel='noopener nofollow' class='btn btn-primary btn-sm' style='margin-right:0.3rem;'>直达官网</a>" +
        "<a href='" + a.reviewUrl + "' class='btn btn-outline btn-sm' style='margin-right:0.3rem;'>评测</a>" +
        "<a href='" + a.airportUrl + "' class='btn btn-outline btn-sm'>资料</a></td>";
    });
    html += "</tr>";

    html += "</tbody></table>";
    wrapper.innerHTML = html;
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderChips();
    renderTable();
  });
})();
