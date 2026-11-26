/**
 * zutizi.blog - 机场横向比较系统
 * 纯原生JS交互，支持动态添加/移除候选机场，多维度参数矩阵对比
 */

(function () {
  const AIRPORTS_DATA = [
    {
      id: "feiniaoyun",
      name: "飞鸟云",
      slug: "feiniaoyun",
      price: "¥15.00/月起",
      startingPrice: 15.00,
      mainPlan: "基础版 100GB / ¥15",
      pricePerGb: "¥0.150 / GB",
      billingType: "月付 / 季付 / 年付",
      protocols: "Shadowsocks, Trojan, VMess",
      regions: "香港, 日本, 新加坡, 美国, 台湾, 韩国, 英国, 德国",
      deviceLimit: "不限设备数（合理使用）",
      aiSupport: "全节点支持 ChatGPT, Claude, Gemini",
      streamingSupport: "Netflix 4K (港/美/日/新), Disney+, YouTube",
      pros: "节点均衡度高，晚高峰专线稳定，新手一键导入简单",
      cons: "入门低价套餐不含纯物理IPLC专线",
      suitable: "流媒体爱好者、新手入门、多设备家庭",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/feiniaoyun.html",
      airportUrl: "../airport/feiniaoyun.html"
    },
    {
      id: "jsvoo",
      name: "速鹰666",
      slug: "jsvoo",
      price: "¥9.90/月起",
      startingPrice: 9.90,
      mainPlan: "入门版 80GB / ¥9.9",
      pricePerGb: "¥0.124 / GB",
      billingType: "月付 / 季付 / 年付",
      protocols: "Shadowsocks, VMess",
      regions: "香港, 日本, 美国, 新加坡, 台湾",
      deviceLimit: "限制 2 台设备",
      aiSupport: "部分美日节点支持 ChatGPT / Copilot",
      streamingSupport: "YouTube 4K, 部分自制剧解锁",
      pros: "月付极低不到10元，大流量年付折算成本极佳",
      cons: "晚高峰延迟略有波动，限制2台设备",
      suitable: "学生党、低预算轻度用户、应急备用",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/jsvoo.html",
      airportUrl: "../airport/jsvoo.html"
    },
    {
      id: "kuandai",
      name: "宽带公社",
      slug: "kuandai",
      price: "¥22.00/月起",
      startingPrice: 22.00,
      mainPlan: "基础中继 150GB / ¥22",
      pricePerGb: "¥0.147 / GB",
      billingType: "月付 / 季付 / 年付",
      protocols: "Trojan, VLESS, Hysteria 2",
      regions: "香港, 日本, 新加坡, 美国, 台湾, 英国, 澳洲",
      deviceLimit: "限制 5 台设备",
      aiSupport: "原生纯净IP，原生解锁 ChatGPT / Claude",
      streamingSupport: "Netflix 全区, Disney+, BBC, Hulu 4K",
      pros: "Hysteria 2抗封锁强，住宅原生IP不降智，晚高峰丢包<0.5%",
      cons: "月付略高，需较新的客户端支持新协议",
      suitable: "外贸电商、跨国办公、重度ChatGPT依赖者",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/kuandai.html",
      airportUrl: "../airport/kuandai.html"
    },
    {
      id: "mobi",
      name: "魔戒",
      slug: "mobi",
      price: "¥14.90起 (不限时)",
      startingPrice: 14.90,
      mainPlan: "极速包 130GB / ¥14.9 (永久有效)",
      pricePerGb: "¥0.115 / GB",
      billingType: "不限时长按量计费",
      protocols: "Shadowsocks, VMess",
      regions: "香港, 日本, 新加坡, 美国, 台湾, 英国",
      deviceLimit: "不限设备数",
      aiSupport: "部分节点支持 ChatGPT, Gemini",
      streamingSupport: "YouTube 4K, Netflix 常用区",
      pros: "流量永不过期直至耗尽，零月租清零浪费，最佳备用",
      cons: "无独享企业专线保障，工单响应中速",
      suitable: "翻墙频次较低者、第二备用防断网、IoT设备",
      testStatus: "官方资费验证 (2026-11)",
      reviewUrl: "../review/mobi.html",
      airportUrl: "../airport/mobi.html"
    },
    {
      id: "fastlink",
      name: "Fastlink",
      slug: "fastlink",
      price: "¥20.00/月起",
      startingPrice: 20.00,
      mainPlan: "体验套餐 120GB / ¥20",
      pricePerGb: "¥0.167 / GB",
      billingType: "月付 / 季付 / 年付",
      protocols: "Shadowsocks, Trojan, V2Ray",
      regions: "香港, 日本, 美国, 新加坡, 台湾, 德/法/土耳其/阿根廷",
      deviceLimit: "限制 4 台设备",
      aiSupport: "原生住宅IP支持 ChatGPT, Claude, Poe",
      streamingSupport: "Netflix 全球区, Disney+, YouTube 8K, DAZN",
      pros: "Anycast智能调度，冷门低价区覆盖多，千兆物理专线",
      cons: "多节点分流规则对纯小白略复杂",
      suitable: "流媒体跨区低价订阅玩家、商务漫游出差",
      testStatus: "实测通过 (2026-11)",
      reviewUrl: "../review/fastlink.html",
      airportUrl: "../airport/fastlink.html"
    }
  ];

  // 默认选中前三家
  let selectedIds = ["feiniaoyun", "kuandai", "mobi"];

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

    // 详情评测链接行
    html += "<tr><td style='font-weight:700; background-color:var(--bg-subtle);'>评测与详情</td>";
    list.forEach(function (a) {
      html += "<td><a href='" + a.reviewUrl + "' class='btn btn-primary btn-sm' style='margin-right:0.4rem;'>深度评测</a>" +
              "<a href='" + a.airportUrl + "' class='btn btn-outline btn-sm'>资料卡</a></td>";
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
