---
title: "macOS终端Terminal与iTerm2配置zsh代理加速GitHub拉取 - 竹梯子博客"
description: "Mac终端翻墙配置教程。图解.zshrc环境变量设置、一键开关代理快捷指令与git clone加速技巧。"
keywords: "机场推荐, 机场节点, 性价比机场, 梯子推荐, vpn, vpn机场, vpn节点, vpn推荐, 科学上网"
h1: "Mac 终端 Terminal 配置代理命令加速开发环境实战"
platform: "macOS (Apple Silicon / Intel)"
readTime: "约 6 分钟"
publishDate: "2026-11-26"
author: "竹梯子教程团队"
---

💡 教程导读与核心要点
        
开发人员经常遇到终端中 git clone 龟速或 curl 超时的窘境。这是因为终端默认不走系统 HTTP 代理，需通过环境变量明确声明代理通道。

      

      
## 一、详细分步实操流程

      
        
          一、编辑用户 Shell 配置文件
          打开终端，执行 nano ~/.zshrc 编辑当前用户的 zsh 配置文件。
        
      
        
          二、添加代理快速开关别名
          在文件末尾追加以下代码：
alias setproxy="export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890; echo 'Proxy on'"
alias unsetproxy="unset https_proxy http_proxy all_proxy; echo 'Proxy off'"
        
      
        
          三、保存并重新加载配置
          保存退出后执行 source ~/.zshrc 使其即刻生效。
        
      
        
          四、测试终端代理
          输入 setproxy 开启，随后执行 curl -I https://github.com，响应为 200/301 即表示开发终端翻墙提速成功。
        
      

      
## 二、优质适配机场节点推荐

      

        好的客户端必须搭配高质量、低延迟的优质线路。针对当前教程场景，我们实测推荐使用 **灵猫**：
      

      
        
          灵猫
          高端IPLC内网专线机场，¥25/月起提供150GB专线配额，千兆大端口，全节点原生住宅IP解锁主流AI与流媒体。
          
            起步资费：**¥25/月** | 包含：**150GB**
            
          
        
        
          [直达官网](https://vip02.civetaff.com/#/?code=SXY8qyrG)
          [详细评测](../review/lingmao.html)
        
      

      
## 三、常见故障与高频问答 (FAQ)

      
        
          
#### 问：端口号必须填 7890 吗？

          
答：
端口号必须与您的翻墙客户端本地混合监听端口保持一致（如 Clash 默认为 7890）。

        
      

      
## 四、相关教程与延伸阅读

      

        返回浏览全部指南：[使用教程中心](index.html)；对比更多服务商线路参数：[机场横向对比工具](../compare/index.html)；查阅最新速率排行：[综合排行榜](../ranking/overall.html)。
