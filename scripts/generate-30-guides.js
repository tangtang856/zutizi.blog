/**
 * zutizi.blog - 30篇高质量客户端配置与进阶教程生成器
 * 涵盖 Windows, Android, iOS, macOS, Linux, 软路由与主机全场景
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ROOT_DIR, BASE_DOMAIN, wrapHtml, AIRPORTS } from "./build-site.js";

const GUIDES_DATA = [
  // --- Windows 篇 (6篇) ---
  {
    slug: "windows-sing-box-tutorial",
    title: "Sing-box Windows客户端安装与通用订阅导入指南 - 竹梯子博客",
    h1: "Sing-box Windows客户端快速上手与配置教程",
    description: "Sing-box Windows电脑客户端新手教程。详解新一代通用代理核心Sing-box安装、订阅导入、分流规则与Tun虚拟网卡全流量接管配置。",
    platform: "Windows 10 / 11",
    readTime: "约 6 分钟",
    intro: "Sing-box 是新一代通用代理核心工具，原生支持 Shadowsocks、VLESS、Trojan 及 Hysteria 2 协议，内存占用极低且并发吞吐性能强悍，已逐渐成为广大极客用户的首选客户端。",
    steps: [
      { name: "一、下载安装 Sing-box GUI 客户端", detail: "前往 Sing-box 官方 GitHub Release 页面下载适用于 Windows 64位的图形客户端安装包（如 sing-box-windows-amd64.zip）或图形界面衍生版，解压至非中文目录。" },
      { name: "二、获取并导入服务商订阅", detail: "登录您的机场后台（如微风网络或灵猫），复制通用或 Sing-box 订阅链接；打开客户端配置管理面板，粘贴订阅 URL 并点击 Fetch 获取节点列表。" },
      { name: "三、启用 Tun 虚拟网卡与规则模式", detail: "在设置菜单中开启 'Tun Mode' 允许客户端创建虚拟网卡接管系统全局 UDP/TCP 流量；路由模式推荐选择 'Rule'（规则分流），保障国内直连海外走代理。" },
      { name: "四、启动连接与网络验证", detail: "点击右下角开关启动连接，打开浏览器访问 YouTube 或 Google 验证网络连通性。" }
    ],
    faqs: [
      { q: "提示缺少 Wintun.dll 怎么解决？", a: "请以管理员权限运行 Sing-box，或手动将同版本 wintun.dll 放置在主执行程序同级目录下。" },
      { q: "国内网络速度变慢了？", a: "检查 routing 路由规则配置，确保包含 geoip:cn 与 geosite:cn 走 direct 直连规则。" }
    ],
    recommendedBrand: "breezenet"
  },
  {
    slug: "windows-v2rayn-setup",
    title: "v2rayN Windows经典客户端核心配置与节点测速教程 - 竹梯子博客",
    h1: "v2rayN Windows经典客户端完整使用指南",
    description: "v2rayN Windows客户端教程。详细图解v2rayN订阅添加、Xray/V2Ray核心更新、批量测速与PAC/系统代理模式切换技巧。",
    platform: "Windows 7 / 10 / 11",
    readTime: "约 7 分钟",
    intro: "v2rayN 是 Windows 平台上资历最深、功能最完备的开源代理客户端之一。它具备极高的稳定性与多核心（Xray / Sing-box）自由切换能力。",
    steps: [
      { name: "一、安装与环境准备", detail: "下载 v2rayN-With-Core.zip 完整版压缩包，解压后确保本地已安装 Microsoft .NET Desktop Runtime 6.0 或更高版本运行时。" },
      { name: "二、订阅管理与更新", detail: "点击顶部菜单 '订阅分组' -> '订阅分组设置' -> 点击 '添加'，在可选地址 URL 栏粘贴机场提供的订阅链接，点击确定后按 Ctrl+U 一键更新全部节点。" },
      { name: "三、批量延迟与真连接测速", detail: "全选节点列表（Ctrl+A），右键选择 '测试服务器真实的延迟（下载测速）'，根据测速结果选择延迟最低且无丢包的香港或日本节点。" },
      { name: "四、设置系统代理与路由规则", detail: "在底部状态栏将系统代理设置为 '自动配置系统代理'，路由模式选择 '绕过大陆(Whitelist)'，即可实现国内网站直连秒开。" }
    ],
    faqs: [
      { q: "底部状态栏图标变红但网页打不开？", a: "检查是否与其他代理软件（如旧版Clash）端口冲突，确保本地默认本地监听端口为 10808 (Socks) / 10809 (HTTP)。" }
    ],
    recommendedBrand: "feimaoyun"
  },
  {
    slug: "windows-clash-meta-tun-mode",
    title: "Clash Verge开启Tun虚拟网卡全流量接管与游戏加速教程 - 竹梯子博客",
    h1: "Clash Verge Rev开启Tun模式全流量代理教程",
    description: "Windows电脑Clash Verge开启Tun模式教程。彻底解决命令行cmd、PowerShell、Git以及Steam/Uplay外服游戏不走代理问题。",
    platform: "Windows 10 / 11",
    readTime: "约 5 分钟",
    intro: "普通的系统代理（System Proxy）只能接管支持 HTTP/Socks5 的浏览器流量，而命令行终端、Docker容器及外服客户端游戏通常无法被接管。开启 Tun 虚拟网卡模式可以实现真正的系统底层全流量代理。",
    steps: [
      { name: "一、启用 Clash Verge 管理员权限服务", detail: "打开 Clash Verge Rev，进入 '设置' -> 找到 '服务模式(Service Mode)'，点击安装并重启客户端以激活底层虚拟网卡调用权限。" },
      { name: "二、开启 Tun 模式开关", detail: "在设置面板中找到 'Tun 模式'，将其开关打开。系统网络适配器中将出现名为 'Meta' 或 'Clash' 的虚拟网络适配器。" },
      { name: "三、配置严格路由与DNS防泄漏", detail: "启用 '严格路由(Strict Route)' 与 'DNS 劫持'，防止游戏或本地软件绕过虚拟网卡直连泄露真实IP。" },
      { name: "四、验证命令行代理效果", detail: "打开 CMD 或 PowerShell，输入 curl https://ipinfo.io，返回若为海外机场节点IP即表示底层全流量接管成功。" }
    ],
    faqs: [
      { q: "开启Tun后局域网打印机或NAS无法访问？", a: "在设置中的 Tun 忽略列表中加入局域网私网IP段：192.168.0.0/16, 10.0.0.0/8。" }
    ],
    recommendedBrand: "flashleap"
  },
  {
    slug: "windows-sub-store-config",
    title: "Sub-Store在Windows环境下的订阅转换与规则管理配置 - 竹梯子博客",
    h1: "Sub-Store Windows高级订阅管理与去广告配置实战",
    description: "Sub-Store订阅管理工具配置教程。教你在Windows电脑上聚合多个机场节点、自定义重命名、过滤无效节点并自动同步至客户端。",
    platform: "Windows / 跨平台",
    readTime: "约 8 分钟",
    intro: "当您同时持有主力与备用多家机场节点时，手动切换极为繁琐。Sub-Store 是一款强大的高级订阅转换与过滤管理工具，支持一键合并、正则筛选与分流规则注入。",
    steps: [
      { name: "一、部署 Sub-Store 服务端或使用 Web 托管", detail: "通过 Node.js 本地运行 npx sub-store 或访问受信的 Web 控制台添加本地工作区。" },
      { name: "二、导入多家机场原始订阅", detail: "在 'Subscriptions' 界面点击添加，录入您的主力专线机场与备用机场链接，命名后拉取。" },
      { name: "三、设置组合订阅(Collections)与过滤规则", detail: "创建组合订阅，利用正则表达式添加过滤规则（如过滤掉高倍率节点或离线节点），并设置节点前缀统一命名规范。" },
      { name: "四、输出统一订阅链接至客户端", detail: "生成专属目标链接并导出为 Clash 或 Sing-box 格式，直接导入客户端即可享受一体化自动更新。" }
    ],
    faqs: [
      { q: "Sub-Store处理后的订阅安全吗？", a: "Sub-Store纯本地逻辑处理，不上传第三方服务器，只要在受信任环境部署完全安全可控。" }
    ],
    recommendedBrand: "wuyou"
  },
  {
    slug: "windows-edge-chrome-switchyomega",
    title: "Chrome/Edge浏览器配合SwitchyOmega实现网页级精准分流配置 - 竹梯子博客",
    h1: "Chrome/Edge配置SwitchyOmega实现独立网页分流教程",
    description: "浏览器插件SwitchyOmega配置教程。在Windows无需开启全局代理，仅让指定浏览器或标签页走机场节点的高级技巧。",
    platform: "Chrome / Edge 浏览器",
    readTime: "约 5 分钟",
    intro: "如果您不希望翻墙客户端修改整个操作系统的网络代理设置，仅需要在浏览器中独立访问海外学术网站或办公平台，SwitchyOmega（ZeroOmega）是最佳轻量选择。",
    steps: [
      { name: "一、安装 ZeroOmega / SwitchyOmega 扩展", detail: "在 Edge 或 Chrome 应用商店搜索安装 ZeroOmega 扩展插件。" },
      { name: "二、新建本地情景模式", detail: "新建名为 'Clash-Proxy' 的情景模式，协议选择 SOCKS5，服务器填 127.0.0.1，端口填 7890（或客户端本地实际监听端口）。" },
      { name: "三、配置自动切换规则清单", detail: "新建 '自动切换' 模式，导入 gfwlist 规则列表，满足规则的海外域名走代理，国内其他所有流量默认直接连接。" },
      { name: "四、测试并保存", detail: "点击插件图标切换到 '自动切换' 模式，打开 Google 与百度分别测试，实现零冲突无感分流。" }
    ],
    faqs: [
      { q: "提示无法连接到代理服务器？", a: "请确认本地翻墙客户端（如Clash）已正常开启并在后台运行，且端口号与插件配置完全一致。" }
    ],
    recommendedBrand: "lingdongcloud"
  },
  {
    slug: "windows-client-error-troubleshooting",
    title: "Windows翻墙客户端常见报错排查与网络修复全手册 - 竹梯子博客",
    h1: "Windows翻墙网络报错与无法上网故障排查全手册",
    description: "Windows电脑翻墙故障解决指南。系统代理残留修复、无法连接网络但QQ能上、SSL证书错误及端口冲突排查实战。",
    platform: "Windows 全系列",
    readTime: "约 6 分钟",
    intro: "科学上网过程中难免遇到'能上QQ但打不开网页'、'SSL证书报错'或'关掉软件后电脑彻底断网'等故障。本文汇总最具实效的排查修复方案。",
    steps: [
      { name: "一、修复系统代理残留断网问题", detail: "按下 Win+I 打开系统设置 -> 网络和 Internet -> 代理 -> 检查'手动设置代理'，将其关闭即可恢复正常断网问题。" },
      { name: "二、校准系统时间与时区", detail: "大部分现代加密协议（VLESS、Trojan、Shadowsocks）严格依赖时间戳同步，时间偏差超过60秒将导致所有节点握手失败。前往系统时间设置点击'立即同步'。" },
      { name: "三、排查本地端口 7890 占用冲突", detail: "打开终端执行 netstat -ano | findstr 7890，排查是否有其他后台程序抢占端口，在客户端设置中将端口更换为其他端口（如 17890）。" },
      { name: "四、重置 Winsock 网络协议栈", detail: "以管理员权限运行 CMD，输入 netsh winsock reset 并回车，随后重启电脑可彻底修复深层协议损坏。" }
    ],
    faqs: [
      { q: "网页提示证书不受信任或被拦截？", a: "检查是否启用了第三方杀毒软件的'网页监控'功能，或关闭客户端中的 MITM 证书嗅探功能。" }
    ],
    recommendedBrand: "feiv"
  },

  // --- Android 篇 (6篇) ---
  {
    slug: "android-sing-box-guide",
    title: "Sing-box Android手机客户端订阅添加与开机自启教程 - 竹梯子博客",
    h1: "Sing-box Android安卓客户端配置与使用指南",
    description: "Sing-box安卓手机版使用教程。图解通用订阅导入、分流配置、常驻后台保活与耗电优化设置全流程。",
    platform: "Android 8.0 - 15",
    readTime: "约 6 分钟",
    intro: "Sing-box Android 官方客户端轻巧干净，无多余商业广告，原生支持最新协议，是安卓玩家体验低延迟专线节点的优秀利器。",
    steps: [
      { name: "一、获取安装 APK", detail: "前往 GitHub 官方 Releases 或 Google Play 下载并安装最新版 Sing-box APK。" },
      { name: "二、添加订阅 Profile", detail: "打开应用 -> 进入 Profiles 页面 -> 点击右上角 '+' -> 形式选择 Remote -> 粘贴机场订阅链接并启用自动更新周期。" },
      { name: "三、选择出站模式与节点", detail: "切换到 Dashboard，勾选刚刚添加的配置，在 Groups 策略组中挑选延迟较低的香港或日本节点。" },
      { name: "四、建立 VPN 连接", detail: "点击右下角运行按钮，在系统弹窗中允许建立 VPN 连接即可畅享海外网络。" }
    ],
    faqs: [
      { q: "息屏后网络容易中断？", a: "请在手机电池管理中为 Sing-box 开启'允许后台高耗电'并关闭省电策略。" }
    ],
    recommendedBrand: "breezenet"
  },
  {
    slug: "android-v2rayng-tutorial",
    title: "v2rayNG手机客户端配置与分应用代理技巧 - 竹梯子博客",
    h1: "v2rayNG安卓客户端订阅配置与分应用代理实战",
    description: "v2rayNG手机版教程。详细讲解订阅链接批量导入、按应用单独开启翻墙、绕过局域网与碎片化分流优化技巧。",
    platform: "Android 全机型",
    readTime: "约 6 分钟",
    intro: "v2rayNG 具有极简的操作界面与强大的分应用代理功能，能够随心指定只有 YouTube、Telegram、X 走代理，微信和国内银行保持完全直连。",
    steps: [
      { name: "一、添加订阅设置", detail: "打开 v2rayNG -> 点击左侧侧边栏 -> '订阅设置' -> 点击右上角 '+' -> 粘贴机场提供的 v2ray 订阅 URL 并保存。" },
      { name: "二、更新并测速节点", detail: "返回主界面，点击右上角三点菜单 -> '更新订阅'。节点全部展示后，点击三点菜单选择'测试全部真实连接'。" },
      { name: "三、设置分应用代理", detail: "侧边栏进入'设置' -> 勾选'分应用代理模式' -> 勾选需要走梯子的海外 App，未勾选的国内应用将彻底不受任何代理干扰。" },
      { name: "四、启动服务", detail: "选中延迟优秀的节点，点击右下角'V'字圆圈图标开启连接。" }
    ],
    faqs: [
      { q: "测试延迟显示 -1 或连接超时？", a: "检查手机系统时间是否精准到秒，或尝试切换 Wi-Fi 与 4G/5G 蜂窝数据重试。" }
    ],
    recommendedBrand: "feimaoyun"
  },
  {
    slug: "android-battery-optimization",
    title: "小米/华为/OPPO/vivo手机后台防杀与电池优化保活设置 - 竹梯子博客",
    h1: "国内主流安卓手机翻墙客户端后台防杀保活全攻略",
    description: "安卓手机后台杀客户端解决办法。详解小米澎湃OS、华为鸿蒙、OPPO ColorOS、vivo OriginOS防止Clash后台退出的终极设置。",
    platform: "HyperOS / HarmonyOS / ColorOS / OriginOS",
    readTime: "约 5 分钟",
    intro: "国内手机系统出于省电目的，常常在息屏几分钟后强行杀死后台运行的代理服务，导致频繁掉线断网。通过以下四步设置可永久解决杀后台顽疾。",
    steps: [
      { name: "一、锁定多任务卡片", detail: "在多任务最近任务界面，长按或向下拉动代理软件卡片，点击'加锁'小图标防止一键清理被误杀。" },
      { name: "二、关闭智能省电策略", detail: "进入手机设置 -> 应用管理 -> 找到客户端软件 -> 省电策略修改为'无限制'或'允许后台高耗电'。" },
      { name: "三、开启自启动与关联启动权限", detail: "在权限管理中，为客户端开启'自启动'与'允许被其他应用唤醒'权限。" },
      { name: "四、关闭深层睡眠与内存扩展杀后台", detail: "关闭系统的激进性能加速或游戏模式，保障 VPN 前台常驻通知图标始终显示。" }
    ],
    faqs: [
      { q: "为什么华为手机锁屏后经常断线？", a: "请前往华为设置 -> 电池 -> 更多电池设置 -> 开启'休眠时始终保持网络连接'。" }
    ],
    recommendedBrand: "lingmao"
  },
  {
    slug: "android-tv-box-clash",
    title: "智能电视盒与Android TV安装Clash观看4K海外流媒体教程 - 竹梯子博客",
    h1: "Android TV智能电视与电视盒子安装Clash看4K教程",
    description: "智能电视翻墙看Netflix/YouTube 4K教程。图解小米盒子、外贸电视盒子安装Clash for Android及遥控器适配全流程。",
    platform: "Android TV / Google TV / 电视盒子",
    readTime: "约 7 分钟",
    intro: "在客厅大屏电视上看 YouTube 4K、Netflix 杜比视界是极佳的享受。通过将 Clash 部署在电视盒子上，无需刷路由器也能让电视独立畅享海外流媒体。",
    steps: [
      { name: "一、U盘侧载安装 APK", detail: "下载适配 Android TV 的 Clash APK 安装包（推荐使用带遥控器交互优化的版本），通过U盘安装至电视盒子。" },
      { name: "二、局域网或手机推送订阅链接", detail: "利用遥控器输入订阅极为繁琐，建议打开电视端的文件传输功能，或通过手机微信发送订阅 URL 到电视浏览器粘贴。" },
      { name: "三、配置规则分流与开机自启动", detail: "确保分流模式为 Rule 规则模式，防止电视自带的国内视频平台（如奇异果、酷喵）走翻墙流量。" },
      { name: "四、启动并验证4K播放", detail: "选中高速香港或日本节点，打开 YouTube TV 开启 4K 60帧视频，打开'详细统计信息'查看缓冲跑满。" }
    ],
    faqs: [
      { q: "遥控器无法点击屏幕上的启动开关？", a: "给电视连接一只普通无线鼠标，或在手机上安装遥控器鼠标模拟器点击开关。" }
    ],
    recommendedBrand: "wavenet"
  },
  {
    slug: "android-surfboard-tutorial",
    title: "Surfboard冲浪板安卓客户端订阅导入与托管配置 - 竹梯子博客",
    h1: "Surfboard冲浪板安卓客户端配置与分流教程",
    description: "Surfboard冲浪板使用指南。全面兼容Surge配置语法的安卓轻量级代理工具使用、测速与订阅托管配置教学。",
    platform: "Android",
    readTime: "约 6 分钟",
    intro: "Surfboard（俗称冲浪板）因其UI高度对标Surge而备受好评。它内存占用极小、面板图表极其美观，是追求质感体验的安卓用户的优秀选择。",
    steps: [
      { name: "一、安装 Surfboard", detail: "通过 Google Play 商店或官方 GitHub 渠道安装 Surfboard 最新稳定版。" },
      { name: "二、通过链接添加配置 Profile", detail: "进入 Config 选项卡 -> 点击右下角 '+' 号 -> 选择 'Download from Web' -> 粘贴机场托管订阅地址下载配置。" },
      { name: "三、节点分组与延迟探测", detail: "在 Proxies 界面切换策略组，长按节点可发起即时延迟 Ping 测速。" },
      { name: "四、开启连接与监控仪表盘", detail: "点击下方中央圆形开关启动，在 Dashboard 界面可直观查看实时上传下载流量图表与分流日志。" }
    ],
    faqs: [
      { q: "是否支持 VLESS 协议？", a: "较新版本的 Surfboard 已逐步支持主流先进协议，建议保持客户端版本更新。" }
    ],
    recommendedBrand: "flashleap"
  },
  {
    slug: "android-dual-sim-bypass",
    title: "安卓双卡双待网络下代理连接与分流优化方案 - 竹梯子博客",
    h1: "安卓手机双卡环境下网络代理稳定性优化实战",
    description: "双卡安卓手机翻墙掉线排查。移动/电信/联通双卡数据切换导致VPN断流的解决办法与DNS策略调优。",
    platform: "Android 双卡机型",
    readTime: "约 5 分钟",
    intro: "许多用户手机配备了工作与生活两张电话卡，当信号在主副卡之间漫游切换时，VPN连接常因网络接口重置而断开。本文介绍如何优化双卡漫游稳定性。",
    steps: [
      { name: "一、固定数据主卡网络接入点", detail: "在系统设置中固定一张信号覆盖更好的大流量卡作为移动数据专用卡，避免频繁智能切换。" },
      { name: "二、客户端开启'重连保护(Auto-Reconnect)'", detail: "在 Clash 或 Sing-box 设置中开启网络变动自动重新连接功能。" },
      { name: "三、配置多入口智能降级策略", detail: "在节点策略组中挑选具备 BGP 多线入口的服务商，移动与电信网络均能自适应最优入口。" }
    ],
    faqs: [
      { q: "切换Wi-Fi后翻墙断开需要手动重连？", a: "在客户端中将网络监听模式设置为监听所有接口并开启自动唤醒。" }
    ],
    recommendedBrand: "quanqiuyun"
  },

  // --- iOS / iPadOS 篇 (6篇) ---
  {
    slug: "ios-foreign-apple-id",
    title: "无需信用卡注册美区/日区Apple ID下载小火箭全攻略 - 竹梯子博客",
    h1: "2026无需信用卡免费注册美区Apple ID详细教程",
    description: "美区Apple ID注册教程。无需海外信用卡、使用国内邮箱与手机号手把手注册美区苹果账号，轻松购买下载小火箭Shadowrocket。",
    platform: "iOS / iPadOS / macOS",
    readTime: "约 8 分钟",
    intro: "在中国大陆 App Store 中无法直接搜索下载 Shadowrocket（小火箭）、Loon、Quantumult X 等软件。拥有一枚属于自己的美区 Apple ID 是苹果用户科学上网的第一步。",
    steps: [
      { name: "一、准备未注册过苹果账号的纯净邮箱", detail: "准备一个全新的 163、Outlook 或 Gmail 邮箱，确保从未绑定过任何 Apple ID。" },
      { name: "二、在苹果官网创建新账号", detail: "打开苹果官方注册网页（appleid.apple.com），国家和地区务必选择'美国'，手机号可以直接使用中国大陆的 +86 手机号用于接收短信验证码。" },
      { name: "三、验证邮箱与手机号", detail: "输入收到的邮件验证码与手机验证码，成功登录账号后台。" },
      { name: "四、生成真实美国免税州免税地址", detail: "在付款与配送地址中，付款方式选择'None'（无），账单地址可利用美国地址生成器填写免税州（如俄勒冈 Oregon 或特拉华 Delaware）的真实邮编与街道。" },
      { name: "五、在手机 App Store 登录并下载", detail: "打开手机 App Store，点击右上角头像退出当前账号，换登新注册的美区 ID，即可通过购买美区苹果礼品卡充值下载 Shadowrocket。" }
    ],
    faqs: [
      { q: "切记注意：一定不要在手机设置(Settings)中登录外区账号！", a: "必须仅在 App Store 商店内登录！在系统设置中登录会触发 iCloud 锁机风险。" }
    ],
    recommendedBrand: "breezenet"
  },
  {
    slug: "ios-shadowrocket-advanced",
    title: "小火箭Shadowrocket高级分流规则与去广告策略组编写 - 竹梯子博客",
    h1: "Shadowrocket小火箭高级进阶分流与策略组配置",
    description: "Shadowrocket小火箭进阶使用指南。节点自动测速优选、去广告分流规则注入与流媒体策略组独立绑定教学。",
    platform: "iOS / iPadOS",
    readTime: "约 7 分钟",
    intro: "小火箭不仅能一键翻墙，还蕴藏着强大的规则重写、节点自动优选与去广告能力。合理配置策略组能让您的 iPhone 续航大幅提升且体验流畅。",
    steps: [
      { name: "一、添加远端规则配置文件", detail: "进入'配置'选项卡，点击右上角 '+' 号，导入流行的远程配置（如包含国内直连、海外代理、广告屏蔽的专业规则规则）。" },
      { name: "二、配置 Auto 自动测速策略组", detail: "在策略组管理中创建名为 'Auto-Select' 的策略组，类型选择 'url-test'，将低延迟亚太节点加入，客户端将每隔几分钟自动调度最低延迟节点。" },
      { name: "三、流媒体专属路由绑定", detail: "新建 'Streaming' 策略组，绑定支持 Netflix 解锁的特定节点，让所有媒体请求固定走解锁机房。" },
      { name: "四、开启 HTTPS 解密证书", detail: "在配置设置中安装并信任 CA 证书，可实现去除油管客户端部分信息流广告。" }
    ],
    faqs: [
      { q: "为什么部分银行 App 打开报错？", a: "检查规则列表，确保国内银行域名（如 icbc.com.cn, ccb.com）全部被划归为 DIRECT 直连。" }
    ],
    recommendedBrand: "lingmao"
  },
  {
    slug: "ios-loon-tutorial",
    title: "Loon轻量级网络工具配置与插件脚本使用教程 - 竹梯子博客",
    h1: "iOS轻量级代理神器Loon完整上手与插件配置指南",
    description: "Loon客户端使用教程。节点订阅导入、插件Plugin安装、BoxJS脚本配置与低功耗网络分流实战技巧。",
    platform: "iOS / iPadOS",
    readTime: "约 6 分钟",
    intro: "Loon 凭借极低的后台耗电量、优雅现代的 UI 设计和极其强大的插件生态（Plugins），近年来在 iOS 代理圈中迅速风靡。",
    steps: [
      { name: "一、订阅节点导入", detail: "打开 Loon，点击下方'配置' -> '节点订阅' -> 点击右上角加号添加订阅链接，支持各种格式自动解析。" },
      { name: "二、安装热门实用插件", detail: "进入'插件'管理，一键安装 YouTube 去广告、知乎去广告、Spotify 歌词优化等热门社区插件。" },
      { name: "三、开启分流与证书授权", detail: "在系统设置中下载并受信任根证书，将路由模式设置为'规则模式'。" },
      { name: "四、启动开关", detail: "点击主界面中心电源大按钮即可建立连接，长按可在右上角查看各个节点的即时 Ping 延迟。" }
    ],
    faqs: [
      { q: "Loon 相比小火箭有什么优势？", a: "Loon 的插件体系更加现代化，支持一键更新，对手机电池发热控制更加出色。" }
    ],
    recommendedBrand: "wavenet"
  },
  {
    slug: "ios-quantumult-x-guide",
    title: "Quantumult X圈X订阅添加、重写规则与策略组配置指南 - 竹梯子博客",
    h1: "Quantumult X (圈X) 详细配置与多策略分流实战",
    description: "Quantumult X圈X新手教程。从基础节点订阅、分流规则配置、JS脚本重写到策略组建立全流程拆解。",
    platform: "iOS / iPadOS",
    readTime: "约 8 分钟",
    intro: "Quantumult X（俗称圈X）以极致的速度、深度的自定义灵活性与丰富的功能著称，是高阶 iOS 玩家的最爱。",
    steps: [
      { name: "一、添加节点订阅源", detail: "长按右下角风车图标进入设置 -> 找到'节点' -> 点击'引用(订阅)' -> 点击右上角加号填入机场订阅地址并打开资源解析器。" },
      { name: "二、配置策略组", detail: "在策略组中自由搭建静态策略、自动优选策略或负载均衡，将不同地区节点分类管理。" },
      { name: "三、分流规则的分级引用", detail: "引用国内分流规则列表与海外分流列表，确保国内走 Direct，海外受限网站走 Proxy。" },
      { name: "四、开启 MITM 与重写功能", detail: "生成独立证书并配置系统信任，解锁高阶去广告与网络抓包调试能力。" }
    ],
    faqs: [
      { q: "节点更新出现感叹号或报错？", a: "请确认机场订阅格式是否为圈X原生支持格式，或在设置中打开订阅转换解析器。" }
    ],
    recommendedBrand: "flashleap"
  },
  {
    slug: "ios-surge-ios-setup",
    title: "Surge for iOS网络调试与企业级订阅规则配置 - 竹梯子博客",
    h1: "Surge iOS 企业级网络工具上手与策略组分流教程",
    description: "Surge iOS 配置教程。详解Surge客户端托管配置、高级策略组设计、规则引擎与低延迟漫游配置。",
    platform: "iOS",
    readTime: "约 7 分钟",
    intro: "Surge 被誉为 iOS 平台的'网络神器之王'，专为网络开发人员与高端商务人士打造，稳定性和路由能力处于金字塔顶端。",
    steps: [
      { name: "一、托管配置导入", detail: "打开 Surge，点击顶部配置名 -> 导入新配置 -> 输入服务商提供的托管配置 URL 进行拉取。" },
      { name: "二、策略组微调", detail: "根据个人网络习惯，将海外工作、流媒体、AI服务分别绑定至香港专线或日本原生节点。" },
      { name: "三、网络诊断与抓包查看", detail: "利用 Surge 的 Activity 面板，实时追踪每个网络请求的耗时、走哪个节点出站及 DNS 解析延迟。" }
    ],
    faqs: [
      { q: "Surge 价格较贵，是否有性价比替代？", a: "日常翻墙使用 Shadowrocket 或 Loon 完全足够；若需深度网络排障与强大抓包才推荐选购 Surge。" }
    ],
    recommendedBrand: "yinxingren"
  },
  {
    slug: "ios-shortcut-automation",
    title: "利用iOS快捷指令实现定时切换节点与自动化测速 - 竹梯子博客",
    h1: "用 iOS 快捷指令打造全自动化翻墙网络体验",
    description: "iOS自动化翻墙教程。使用系统快捷指令配合小火箭/Loon，实现到家自动切直连、出门自动连专线及晚高峰自动选最快节点。",
    platform: "iOS 16 - 18",
    readTime: "约 5 分钟",
    intro: "巧妙结合 iOS 系统的'快捷指令(Shortcuts)'自动化功能，可以让手机变得极其智能：离开家庭 Wi-Fi 自动连梯子，打开 YouTube 自动切流媒体节点。",
    steps: [
      { name: "一、创建自动化触发条件", detail: "打开'快捷指令' App -> 切换到'自动化' -> 点击新建个人自动化 -> 选择触发条件（例如'打开特定 App'或'离开 Wi-Fi'）。" },
      { name: "二、添加客户端动作", detail: "操作中搜索 Shadowrocket 或 Loon，添加'更新所有节点并优选延迟最低'或'开启代理'动作。" },
      { name: "三、关闭运行前确认", detail: "关闭'运行前询问'开关，确保自动化任务在后台无感静默执行。" }
    ],
    faqs: [
      { q: "提示权限受限无法静默执行？", a: "确保在 iOS 系统设置中赋予快捷指令后台常驻与位置相关必要权限。" }
    ],
    recommendedBrand: "feiv"
  },

  // --- macOS 篇 (6篇) ---
  {
    slug: "macos-surge-mac-setup",
    title: "Surge for Mac接管系统网卡与增强模式详细配置 - 竹梯子博客",
    h1: "Surge for Mac 增强模式与全方位分流配置教学",
    description: "macOS高端工具Surge配置指南。详解增强模式Enhanced Mode开启、接管终端与虚拟机流量及智能规则策略组构建。",
    platform: "macOS (Apple Silicon & Intel)",
    readTime: "约 7 分钟",
    intro: "在 Mac 上，Surge 的'增强模式(Enhanced Mode)'能够建立虚拟网络接口，无死角接管系统全部 TCP/UDP 流量，包括各类不支持代理设置的专业终端开发工具与虚拟机。",
    steps: [
      { name: "一、安装并完成系统授权", detail: "安装 Surge Mac，根据系统提示前往'隐私与安全性'允许其系统扩展安装网络过滤网卡驱动。" },
      { name: "二、开启增强模式 (Enhanced Mode)", detail: "在 Surge 控制中心勾选'Enhanced Mode'，系统所有流量将通过 Surge 核心智能分流引擎处理。" },
      { name: "三、配置智能分流规则", detail: "确保白名单规则置顶，保证国内飞书、微信、网易云音乐直连，GitHub、Docker 镜像源走高速代理。" }
    ],
    faqs: [
      { q: "开启增强模式后无法连接公司的内网VPN？", a: "在配置文件的 [General] 段落下，将企业内网网段添加到 skip-proxy 排除列表中。" }
    ],
    recommendedBrand: "wavenet"
  },
  {
    slug: "macos-sing-box-gui",
    title: "Sing-box GUI for macOS优雅轻量客户端使用指引 - 竹梯子博客",
    h1: "Sing-box GUI 苹果电脑客户端安装与配置全攻略",
    description: "Mac版Sing-box客户端使用教程。原生适配M系列芯片，超低内存占用，支持现代VLESS与Hysteria 2高速专线。",
    platform: "macOS 12+",
    readTime: "约 6 分钟",
    intro: "Sing-box 在 macOS 上提供了精致优雅的原生图形界面，没有电子框架（Electron）的臃肿感，内存常驻仅几十兆，非常适合续航敏感的 MacBook 用户。",
    steps: [
      { name: "一、下载安装 DMG 镜像", detail: "下载专为 macOS 编译的原生 Sing-box DMG 文件，拖拽到应用程序目录。" },
      { name: "二、拉取机场订阅", detail: "添加 Remote Profile，填入机场订阅地址，软件将自动校验节点格式。" },
      { name: "三、状态栏便捷控制", detail: "在 Mac 顶部菜单栏点击小图标，即可实时切换不同国家节点并查看上下行速率图表。" }
    ],
    faqs: [
      { q: "提示软件损坏无法打开？", a: "打开终端执行 sudo xattr -rd com.apple.quarantine /Applications/Sing-box.app 即可解除安全隔离。" }
    ],
    recommendedBrand: "breezenet"
  },
  {
    slug: "macos-terminal-proxy-zsh",
    title: "macOS终端Terminal与iTerm2配置zsh代理加速GitHub拉取 - 竹梯子博客",
    h1: "Mac 终端 Terminal 配置代理命令加速开发环境实战",
    description: "Mac终端翻墙配置教程。图解.zshrc环境变量设置、一键开关代理快捷指令与git clone加速技巧。",
    platform: "macOS Terminal / iTerm2",
    readTime: "约 5 分钟",
    intro: "开发人员经常遇到终端中 git clone 龟速或 curl 超时的窘境。这是因为终端默认不走系统 HTTP 代理，需通过环境变量明确声明代理通道。",
    steps: [
      { name: "一、编辑用户 Shell 配置文件", detail: "打开终端，执行 nano ~/.zshrc 编辑当前用户的 zsh 配置文件。" },
      { name: "二、添加代理快速开关别名", detail: "在文件末尾追加以下代码：\nalias setproxy=\"export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890; echo 'Proxy on'\"\nalias unsetproxy=\"unset https_proxy http_proxy all_proxy; echo 'Proxy off'\"" },
      { name: "三、保存并重新加载配置", detail: "保存退出后执行 source ~/.zshrc 使其即刻生效。" },
      { name: "四、测试终端代理", detail: "输入 setproxy 开启，随后执行 curl -I https://github.com，响应为 200/301 即表示开发终端翻墙提速成功。" }
    ],
    faqs: [
      { q: "端口号必须填 7890 吗？", a: "端口号必须与您的翻墙客户端本地混合监听端口保持一致（如 Clash 默认为 7890）。" }
    ],
    recommendedBrand: "lingmao"
  },
  {
    slug: "macos-homebrew-git-proxy",
    title: "Homebrew与Git命令行翻墙加速完整配置实战 - 竹梯子博客",
    h1: "Mac 下 Homebrew 与 Git 翻墙加速终极配置指南",
    description: "解决Mac Homebrew更新卡住与Git克隆失败。配置全局Git代理与Homebrew镜像/代理加速全套方案。",
    platform: "macOS",
    readTime: "约 6 分钟",
    intro: "每次执行 brew update 或 git clone 大型仓库时动辄报错 RPC failed 或超时。通过为 Git 和 Homebrew 独立配置代理通道，能彻底提速数十倍。",
    steps: [
      { name: "一、单独为 Git 配置代理", detail: "针对 github.com 独立配置代理：git config --global http.https://github.com.proxy http://127.0.0.1:7890" },
      { name: "二、配置 Homebrew 环境变量", detail: "在 ~/.zprofile 中注入 export HOMEBREW_BOTTLE_DOMAIN 与 brew 代理命令。" },
      { name: "三、验证克隆速度", detail: "克隆任意仓库，下载速度将直接跑满千兆节点宽带上限。" }
    ],
    faqs: [
      { q: "如何取消 Git 的全局代理设置？", a: "执行 git config --global --unset http.https://github.com.proxy 即可恢复默认直连。" }
    ],
    recommendedBrand: "yinxingren"
  },
  {
    slug: "macos-docker-pull-proxy",
    title: "Docker Desktop on macOS配置HTTP代理拉取海外镜像教程 - 竹梯子博客",
    h1: "Mac Docker Desktop 配置代理拉取 Docker Hub 镜像实战",
    description: "Mac Docker镜像拉取失败解决办法。配置Docker Desktop代理参数，秒级拉取Docker Hub海外官方镜像。",
    platform: "macOS Docker Desktop",
    readTime: "约 5 分钟",
    intro: "由于国内公共 Docker 镜像加速站大面积受限，直接执行 docker pull 经常遭遇连接拒绝。在 Docker 客户端中配置正确的宿主机代理能轻松恢复正常拉取。",
    steps: [
      { name: "一、打开 Docker Desktop 设置", detail: "点击顶部齿轮设置图标 -> 进入 'Resources' -> 选择 'Proxies' 选项卡。" },
      { name: "二、填入宿主机代理地址", detail: "打开 Manual proxy configuration 开关，Web Server (HTTP) 与 Secure Web Server (HTTPS) 填入：http://host.docker.internal:7890" },
      { name: "三、应用并重启 Docker", detail: "点击 'Apply & restart'，等待 Docker 引擎重启完成。" },
      { name: "四、验证拉取官方镜像", detail: "在终端中输入 docker pull ubuntu:latest，镜像将迅速秒级下载完成。" }
    ],
    faqs: [
      { q: "为什么填 127.0.0.1:7890 无法生效？", a: "因为 Docker 运行在独立虚拟机内，其内部 127.0.0.1 是容器本身，必须使用 host.docker.internal 才能指向宿主机 Mac。" }
    ],
    recommendedBrand: "wavenet"
  },
  {
    slug: "macos-airplay-sidecar-proxy-fix",
    title: "Mac开启代理后隔空投送AirDrop与随航Sidecar失效修复 - 竹梯子博客",
    h1: "Mac 开启翻墙代理后 AirDrop 与随航失效终极修复指南",
    description: "解决Mac开启Clash或Surge后AirDrop找不到设备、隔空播放与Sidecar随航副屏断联的设置技巧。",
    platform: "macOS & iPadOS",
    readTime: "约 5 分钟",
    intro: "不少 Mac 用户反馈，一旦打开翻墙软件，与旁边的 iPad 随航副屏（Sidecar）或向 iPhone 传输 AirDrop 就经常失败。这是局域网组播流量被代理软件误拦截所致。",
    steps: [
      { name: "一、将局域网私有网段设为完全直连", detail: "在客户端配置中，将 *.local, 192.168.0.0/16, 17.0.0.0/8 (Apple私有段) 强制绑定到 DIRECT。" },
      { name: "二、关闭局域网内的 DNS 劫持", detail: "在 Tun 模式设置中，确保将局域网 mDNS (224.0.0.251, 端口5353) 从代理拦截名单中剔除。" },
      { name: "三、重新插拔或连接隔空投送", detail: "重启一次 Wi-Fi 与蓝牙，AirDrop 与随航副屏即可恢复毫秒级顺畅响应。" }
    ],
    faqs: [
      { q: "Apple 设备的局域网发现协议主要是什么？", a: "苹果主要依赖 Bonjour 与 mDNS 协议在本地广播发现，只要不代理局域网广播即可完美兼容。" }
    ],
    recommendedBrand: "muguang"
  },

  // --- Linux, 软路由与主机联机篇 (6篇) ---
  {
    slug: "linux-ubuntu-clash-core",
    title: "Ubuntu/Debian服务器部署Clash并配置systemd系统服务守护 - 竹梯子博客",
    h1: "Linux / Ubuntu 无桌面服务器安装配置 Clash 教程",
    description: "Linux命令行翻墙指南。Ubuntu/Debian配置Clash核心、编写systemd服务自启守护及环境变量代理设置全流程。",
    platform: "Ubuntu / Debian / CentOS",
    readTime: "约 7 分钟",
    intro: "在云服务器或本地 Linux 工作站上拉取海外代码、训练 AI 模型时，往往需要在纯命令行环境下配置常驻后台的代理守护进程。",
    steps: [
      { name: "一、下载解压 Clash 二进制核心", detail: "下载 clash-linux-amd64 二进制文件，赋予执行权限 chmod +x 并移动至 /usr/local/bin/clash。" },
      { name: "二、配置 config.yaml 与 Country.mmdb", detail: "在 ~/.config/clash/ 目录下下载机场的 YAML 订阅配置文件及 IP 数据库。" },
      { name: "三、配置 systemd 开机自启服务", detail: "创建 /etc/systemd/system/clash.service 配置文件，配置 ExecStart=/usr/local/bin/clash 并执行 systemctl enable --now clash。" },
      { name: "四、配置环境变量代理", detail: "在 /etc/profile 中加入 export http_proxy 与 https_proxy 指向 127.0.0.1:7890。" }
    ],
    faqs: [
      { q: "如何远程在浏览器查看 Linux 的节点状态？", a: "在配置中开启 external-controller，配合 yacd.haishan.me 网页控制面板即可远程可视化调控节点。" }
    ],
    recommendedBrand: "lingmao"
  },
  {
    slug: "linux-sing-box-server",
    title: "Linux环境使用Sing-box实现透明代理与TProxy转发实战 - 竹梯子博客",
    h1: "Linux 使用 Sing-box 搭建高性能 TProxy 透明代理",
    description: "Linux透明代理高级教程。详解iptables与nftables规则、TProxy透明转发让服务器所有出站流量自动翻墙。",
    platform: "Linux 内核 5.0+",
    readTime: "约 8 分钟",
    intro: "TProxy（透明代理）相比普通 HTTP 代理更加底层，无需在每个程序中单独配置代理变量，即可让 Linux 服务器的所有应用程序出站流量智能通过代理转发。",
    steps: [
      { name: "一、编译或安装 Sing-box 核心", detail: "确保 Linux 内核支持 TProxy 模块，通过官方源安装 sing-box。" },
      { name: "二、配置 Inbound 为 TProxy 模式", detail: "在 config.json 的 inbounds 中添加 tproxy 监听端口（如 12345）。" },
      { name: "三、配置策略路由与 iptables 规则", detail: "设置 ip rule 和 ip route 路由表，将目标非局域网的 TCP/UDP 流量重定向至 12345 端口。" },
      { name: "四、启动并验证透明代理", detail: "无需配置任何环境变量，直接执行 wget https://www.google.com 成功下载即代表透明代理部署成功。" }
    ],
    faqs: [
      { q: "配置后无法通过 SSH 连入服务器？", a: "请务必在 iptables 规则中将来源端口 22 (SSH) 设为 RETURN 直连豁免，防止锁死失联！" }
    ],
    recommendedBrand: "flashleap"
  },
  {
    slug: "openwrt-passwall-setup",
    title: "OpenWrt软路由安装Passwall实现全家设备无感科学上网教程 - 竹梯子博客",
    h1: "OpenWrt 软路由配置 Passwall 实现全家设备免配置翻墙",
    description: "OpenWrt软路由翻墙教程。Passwall节点添加、分流规则配置、DNS防污染与全家智能电视、手机无感翻墙指南。",
    platform: "OpenWrt / 软路由固件",
    readTime: "约 8 分钟",
    intro: "通过在家庭入口路由器上部署科学上网服务，家里的 iPhone、安卓、电视盒子、PS5 主机无需安装任何软件，只要连上 Wi-Fi 就能秒开 YouTube 和 Google。",
    steps: [
      { name: "一、在 OpenWrt 固件中打开 Passwall", detail: "登录软路由后台管理界面（如 192.168.1.1），进入服务 -> Passwall。" },
      { name: "二、添加节点订阅源", detail: "进入'节点列表' -> 点击'添加订阅' -> 粘贴机场订阅链接，点击'保存并拉取节点'。" },
      { name: "三、配置主节点与自动切换", detail: "在'基本设置'中，选择主力 TCP 节点与 UDP 节点，建议开启'自动切换'实现故障自愈无缝主备冗余。" },
      { name: "四、DNS 模式与分流设置", detail: "DNS 过滤推荐使用 ChinaDNS-NG，国内域名交由运营商 DNS 直连解析，海外受限域名通过代理节点查询，彻底杜绝 DNS 污染。" }
    ],
    faqs: [
      { q: "全家翻墙后国内淘宝或银行 App 定位不准？", a: "在分流模式中选择'中国列表外(gfwlist)'或'中国大陆IP走直连'，确保国内流量完全不走软路由节点。" }
    ],
    recommendedBrand: "breezenet"
  },
  {
    slug: "openwrt-clash-openclash",
    title: "OpenClash在软路由上的分流模式选择与Dev内核升级配置 - 竹梯子博客",
    h1: "OpenClash 软路由插件配置与内核性能调优实战",
    description: "OpenClash新手指南。Fake-IP与Redir-Host模式区别、Dev/Meta内核切换及内存溢出优化实操教程。",
    platform: "OpenWrt",
    readTime: "约 7 分钟",
    intro: "OpenClash 是 OpenWrt 平台功能最丰富、可视化最出色的分流插件。合理配置内核与 Fake-IP 模式能大幅缩短网页首字解析时间（TTFB）。",
    steps: [
      { name: "一、上传配置文件并选择内核", detail: "在 OpenClash 插件设置中，升级内核至最新的 Meta 内核，全面兼容 VLESS 与 Hysteria 2 协议。" },
      { name: "二、运行模式选择 Fake-IP (TUN 模式)", detail: "相较于传统的 Redir-Host，Fake-IP 模式能让客户端跳过本地递归 DNS 查询，直接由代理落地节点解析，秒开体验极佳。" },
      { name: "三、开启 Yacd 控制面板进行规则微调", detail: "访问 192.168.1.1:9090 打开可视仪表盘，实时拖动节点并查看流量走势。" }
    ],
    faqs: [
      { q: "任天堂 Switch 联机报错 NAT F？", a: "在 OpenClash 规则中将 Nintendo 域名与特定端口设置为直连，或开启 FullCone NAT 模式。" }
    ],
    recommendedBrand: "yinxingren"
  },
  {
    slug: "ps5-switch-xbox-proxy",
    title: "PS5/Nintendo Switch/Xbox主机游戏联机利用局域网代理加速 - 竹梯子博客",
    h1: "PS5 / Switch / Xbox 主机利用局域网电脑代理联机加速教程",
    description: "游戏主机翻墙教程。无需购买专用加速盒，利用局域网PC或Mac共享代理端口，大幅降低外服联机延迟与下载速度慢难题。",
    platform: "PlayStation / Switch / Xbox",
    readTime: "约 6 分钟",
    intro: "玩 PS5 港服/美服商城下载慢，或者 Switch 联机《马里奥赛车》《喷射战士》频繁掉线？只要局域网内有一台开着 Clash 的电脑，就能零成本为主机提供加速通道。",
    steps: [
      { name: "一、电脑端开启'允许局域网连接(Allow LAN)'", detail: "在电脑上的 Clash Verge 中，打开'允许来自局域网的连接(Allow LAN)'开关，记录当前电脑的局域网 IP（如 192.168.1.50）与端口（7890）。" },
      { name: "二、在游戏主机上配置网络代理", detail: "进入 PS5 / Switch 网络设置 -> 选择当前 Wi-Fi -> 高级设置 -> 将'代理服务器(Proxy)'从关闭改为使用。" },
      { name: "三、输入电脑的 IP 与端口", detail: "代理服务器填入电脑的局域网 IP (192.168.1.50)，端口填入 7890，保存连接。" },
      { name: "四、测试网络连接", detail: "在主机上测试网络，NAT 类型将由 NAT D/C 跃升为 NAT A/B，商城与游戏联机下载提速数十倍。" }
    ],
    faqs: [
      { q: "电脑睡眠后主机断网了？", a: "加速期间电脑需要保持唤醒状态，或者建议在软路由上直接部署代理服务。" }
    ],
    recommendedBrand: "flashleap"
  },
  {
    slug: "smart-tv-apple-tv-proxy",
    title: "Apple TV配合Surge/Loon配置海外4K流媒体网关分流教程 - 竹梯子博客",
    h1: "Apple TV tvOS 部署原生代理观看 Netflix 4K 全攻略",
    description: "Apple TV翻墙看网飞教程。tvOS 17+ 原生支持 VPN 客户端（Shadowrocket/Loon），无需软路由在电视端秒开 4K HDR 杜比视界。",
    platform: "Apple TV 4K (tvOS 17+)",
    readTime: "约 7 分钟",
    intro: "自 tvOS 17 起，苹果官方正式为 Apple TV 引入了系统级第三方 VPN 框架支持。您可以在 Apple TV App Store 直接下载安装 Shadowrocket 或 Loon，彻底告别复杂的软路由与旁路由方案！",
    steps: [
      { name: "一、在 Apple TV 上登录外区账号", detail: "在 Apple TV 账户设置中添加美区或日区 Apple ID，打开 App Store 搜索下载已购买的 Shadowrocket 或 Loon。" },
      { name: "二、隔空投送或扫码导入订阅", detail: "打开电视端小火箭，利用同一 iCloud 账号直接同步手机上的订阅节点，或用手机相机扫描电视屏幕二维码导入。" },
      { name: "三、开启分流与连接", detail: "选择支持 Netflix/Disney+ 4K 解锁的高速香港或日本节点，打开连接开关并在系统设置中信任网络配置。" },
      { name: "四、大屏畅享 4K 杜比视界", detail: "打开原生 Netflix 与 YouTube App，画质无缝直接拉满 4K 60帧杜比视界！" }
    ],
    faqs: [
      { q: "遥控器操作是否顺畅？", a: "Apple TV 版本的 Shadowrocket 专门针对遥控器进行了适配，操作极其丝滑。" }
    ],
    recommendedBrand: "wavenet"
  }
];

console.log(`🛠️ 开始生成全部 ${GUIDES_DATA.length} 篇进阶教程页面...`);

GUIDES_DATA.forEach((g, idx) => {
  const brand = AIRPORTS.find(a => a.id === g.recommendedBrand) || AIRPORTS[0];
  const prevGuide = idx > 0 ? GUIDES_DATA[idx - 1] : GUIDES_DATA[GUIDES_DATA.length - 1];
  const nextGuide = idx < GUIDES_DATA.length - 1 ? GUIDES_DATA[idx + 1] : GUIDES_DATA[0];

  // 筛选3篇相关平台或邻近教程
  let related = GUIDES_DATA.filter(item => item.slug !== g.slug && item.platform.split(" ")[0] === g.platform.split(" ")[0]);
  if (related.length < 3) {
    const additional = GUIDES_DATA.filter(item => item.slug !== g.slug && !related.includes(item));
    related = related.concat(additional);
  }
  const relatedThree = related.slice(0, 3);

  const content = `
  <div class="container container-narrow">
    <div class="article-header">
      <h1 class="article-title">${g.h1}</h1>
      <div class="article-meta">
        <span>适用平台：<strong>${g.platform}</strong></span>
        <span>更新日期：2026年11月26日</span>
        <span>阅读耗时：${g.readTime}</span>
        <span>编写：竹梯子技术组</span>
      </div>
    </div>

    <div class="article-body">
      <div class="callout-box">
        <div class="callout-title">💡 教程导读与核心要点</div>
        <p>${g.intro}</p>
      </div>

      <!-- 站内全局便捷导航带 -->
      <div class="article-hub-ribbon">
        <span class="article-hub-title">🧭 站内便捷导航：</span>
        <div class="article-hub-links">
          <a href="index.html">💻 教程总库</a>
          <a href="../blog/index.html">📚 深度博客</a>
          <a href="../ranking/overall.html">👑 综合排行榜</a>
          <a href="../compare/index.html">⚖️ 机场对比工具</a>
          <a href="../review/index.html">🚀 14家深度评测</a>
        </div>
      </div>

      <h2>一、详细分步实操流程</h2>
      ${g.steps.map(s => `
        <div style="margin-bottom:1.5rem; background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:1.25rem;">
          <h3 style="margin-top:0; font-size:1.15rem; color:var(--primary);">${s.name}</h3>
          <p style="margin-bottom:0; font-size:0.95rem; line-height:1.7;">${s.detail}</p>
        </div>
      `).join("")}

      <h2>二、优质适配机场节点推荐</h2>
      <p>
        好的客户端必须搭配高质量、低延迟的优质线路。针对当前教程场景，我们实测推荐使用 <strong>${brand.name}</strong>：
      </p>
      <div style="background:var(--bg-subtle); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin:1.5rem 0;">
        <div>
          <h3 style="margin:0 0 0.3rem; font-size:1.15rem; color:var(--secondary);">${brand.name}</h3>
          <p style="margin:0; font-size:0.85rem; color:var(--text-muted);">${brand.description}</p>
          <p style="margin:0.3rem 0 0; font-size:0.85rem; color:var(--text-main);">
            起步资费：<strong>¥${brand.startingPrice.toFixed(Number.isInteger(brand.startingPrice)?0:1)}/月</strong> | 包含：<strong>${brand.plans[0].trafficGb}GB</strong>
            ${brand.coupon ? `| 优惠券: <code style="font-weight:700; color:var(--primary);">${brand.coupon}</code>` : ''}
          </p>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <a href="${brand.affiliateUrl}" target="_blank" rel="noopener nofollow" class="btn btn-primary btn-sm">直达官网</a>
          <a href="../review/${brand.slug}.html" class="btn btn-outline btn-sm">详细评测</a>
        </div>
      </div>

      <h2>三、常见故障与高频问答 (FAQ)</h2>
      ${g.faqs.map(f => `
        <div class="faq-item active" style="margin-bottom:0.75rem;">
          <div class="faq-question" style="cursor:default;">${f.q}</div>
          <div class="faq-answer" style="display:block;"><p>${f.a}</p></div>
        </div>
      `).join("")}

      <h2>四、相关教程与延伸阅读</h2>
      <p>
        返回浏览全部指南：<a href="index.html">使用教程中心</a>；对比更多服务商线路参数：<a href="../compare/index.html">机场横向对比工具</a>；查阅最新速率排行：<a href="../ranking/overall.html">综合排行榜</a>。
      </p>

      <!-- 上一篇 / 下一篇 持续教程游览卡片 -->
      <div class="article-navigation">
        <a href="${prevGuide.slug}.html" class="nav-card nav-prev">
          <span class="nav-direction">← 上一篇实操教程</span>
          <span class="nav-card-title">${prevGuide.h1}</span>
        </a>
        <a href="${nextGuide.slug}.html" class="nav-card nav-next">
          <span class="nav-direction">下一篇实操教程 →</span>
          <span class="nav-card-title">${nextGuide.h1}</span>
        </a>
      </div>

      <!-- 相关平台教程推荐阅读矩阵 -->
      <div class="related-section">
        <div class="related-section-title">📌 平台相关精选教程</div>
        <div class="related-grid">
          ${relatedThree.map(rel => `
            <a href="${rel.slug}.html" class="related-card">
              <span class="related-tag">${rel.platform}</span>
              <span class="related-title">${rel.h1}</span>
              <span class="related-read-more">阅读实操指南 &rarr;</span>
            </a>
          `).join("")}
        </div>
      </div>
    </div>
  </div>
  `;

  fs.writeFileSync(path.join(ROOT_DIR, "guides", `${g.slug}.html`), wrapHtml({
    title: `${g.title}`,
    description: `${g.description}`,
    canonicalPath: `guides/${g.slug}.html`,
    relPrefix: "../",
    activeNav: "guides",
    breadcrumbs: [{ name: "使用教程", href: "index.html" }, { name: g.h1 }],
    content: content,
    schemaJson: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": g.h1,
      "description": g.description,
      "step": g.steps.map((s, i) => ({
        "@type": "HowToStep",
        "position": i + 1,
        "name": s.name,
        "text": s.detail
      }))
    }
  }), "utf-8");
});

// 同步更新 guides/index.html 导航列表
const guidesIndexGrid = `
<div class="container">
  <div class="article-header">
    <h1 class="article-title">科学上网客户端配置与使用教程中心 (30篇精选)</h1>
    <p style="color:var(--text-muted);">
      覆盖 Windows、Android、iOS、macOS、Linux、软路由与主机全平台客户端安装、进阶规则与排错全流程实战指南。
    </p>
  </div>

  <div class="grid-3">
    ${GUIDES_DATA.map(g => `
      <div class="category-box" style="flex-direction:column; align-items:flex-start;">
        <span class="badge badge-blue" style="margin-bottom:0.4rem;">${g.platform}</span>
        <h3 style="font-size:1.05rem; font-weight:700; margin-bottom:0.4rem;"><a href="${g.slug}.html">${g.h1}</a></h3>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">${g.description}</p>
        <div style="margin-top:auto; padding-top:0.75rem;">
          <a href="${g.slug}.html" class="btn btn-outline btn-sm">阅读实操指南 &rarr;</a>
        </div>
      </div>
    `).join("")}
  </div>
</div>
`;

fs.writeFileSync(path.join(ROOT_DIR, "guides", "index.html"), wrapHtml({
  title: "科学上网客户端使用教程中心 - Windows/Android/iOS/Mac/软路由全配置 - 竹梯子博客",
  description: "科学上网客户端进阶配置教程中心。30篇图文详解Windows、Android、iOS苹果、macOS、Linux与软路由各大平台Clash、Sing-box与小火箭配置实战。",
  canonicalPath: "guides/index.html",
  relPrefix: "../",
  activeNav: "guides",
  breadcrumbs: [{ name: "使用教程" }],
  content: guidesIndexGrid
}), "utf-8");

console.log(`✅ 30篇教程及 guides/index.html 索引页面全部生成完毕！`);
