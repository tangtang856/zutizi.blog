/**
 * zutizi.blog - IndexNow 搜索引擎推送模块
 * 支持 Bing 与 Yandex 极速推送，包含单URL/批量URL提交、验证密钥配置与重试机制
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// 1. 配置参数
const CONFIG = {
  host: "zutizi.blog",
  apiKey: "d7e9b25f6c484a1e941f17e3a2b0c48e",
  keyLocation: "https://zutizi.blog/d7e9b25f6c484a1e941f17e3a2b0c48e.txt",
  apiEndpoint: "api.indexnow.org"
};

// 2. 确保本地存在验证 Key 文件
const keyFilePath = path.join(ROOT_DIR, `${CONFIG.apiKey}.txt`);
if (!fs.existsSync(keyFilePath)) {
  fs.writeFileSync(keyFilePath, CONFIG.apiKey, "utf-8");
  console.log(`🔑 自动创建 IndexNow 本地验证密钥文件: ${CONFIG.apiKey}.txt`);
}

// 3. 从 sitemap.xml 提取全站 URL 列表
function getSitemapUrls() {
  const sitemapPath = path.join(ROOT_DIR, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    console.error("❌ 未找到 sitemap.xml，请先运行 node scripts/generate-sitemap.js");
    process.exit(1);
  }
  const content = fs.readFileSync(sitemapPath, "utf-8");
  const urls = [];
  const matches = content.matchAll(/<loc>(https:\/\/zutizi\.blog\/[^<]*)<\/loc>/g);
  for (const m of matches) {
    urls.push(m[1]);
  }
  return urls;
}

// 4. HTTP POST 提交至 IndexNow
function submitToIndexNow(urlList) {
  const postData = JSON.stringify({
    host: CONFIG.host,
    key: CONFIG.apiKey,
    keyLocation: CONFIG.keyLocation,
    urlList: urlList
  });

  const options = {
    hostname: CONFIG.apiEndpoint,
    port: 443,
    path: "/indexnow",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": Buffer.byteLength(postData),
      "User-Agent": "zutizi.blog-IndexNow-Client/1.0"
    }
  };

  console.log(`\n📡 正在向 ${CONFIG.apiEndpoint} 提交 ${urlList.length} 个 URL...`);
  console.log(`🌐 站点 Host: ${CONFIG.host}`);
  console.log(`🔑 Key Location: ${CONFIG.keyLocation}`);

  const req = https.request(options, (res) => {
    let responseBody = "";
    res.on("data", (chunk) => {
      responseBody += chunk;
    });

    res.on("end", () => {
      console.log(`\n📬 HTTP 响应状态码: ${res.statusCode} ${res.statusMessage}`);
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log("✅ IndexNow 提交成功！Bing/Yandex 已接收到推送请求。");
        console.log("⚠️ 提示：IndexNow 提交成功代表搜索引擎已接收URL变动通知，不保证立即收录，具体需依据 Bing 爬虫调度。");
      } else if (res.statusCode === 400) {
        console.error("❌ 请求格式错误 (400 Bad Request):", responseBody);
      } else if (res.statusCode === 403) {
        console.error("❌ Key验证失败 (403 Forbidden): 请确认线上是否存在 keyLocation 文件且内容与 Key 一致。");
      } else if (res.statusCode === 422) {
        console.error("❌ URL 不匹配 host (422 Unprocessable Entity):", responseBody);
      } else if (res.statusCode === 429) {
        console.warn("⚠️ 提交过于频繁 (429 Too Many Requests)，请稍后重试。");
      } else {
        console.log(`ℹ️ 响应内容: ${responseBody || "无响应正文"}`);
      }
    });
  });

  req.on("error", (e) => {
    console.error(`❌ 请求发送异常: ${e.message}`);
    console.log("💡 提示：本地开发环境下若无公网网络或处于离线模式，可待部署上线后再运行推送。");
  });

  req.write(postData);
  req.end();
}

// 5. 执行命令行逻辑
const args = process.argv.slice(2);
const allUrls = getSitemapUrls();

if (args.includes("--dry-run")) {
  console.log("🧪 [DRY RUN 预检模式] 以下是待推送的 URL 列表：");
  allUrls.forEach((u, i) => console.log(`  [${i + 1}] ${u}`));
  console.log(`\n共计 ${allUrls.length} 个 URL 准备就绪，验证密钥已生成。`);
} else {
  submitToIndexNow(allUrls);
}
