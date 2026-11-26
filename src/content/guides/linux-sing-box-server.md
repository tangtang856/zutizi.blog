---
title: "Linux环境使用Sing-box实现透明代理与TProxy转发实战 - 竹梯子博客"
description: "Linux透明代理高级教程。详解iptables与nftables规则、TProxy透明转发让服务器所有出站流量自动翻墙。"
keywords: "机场推荐, 机场节点, 性价比机场, 梯子推荐, vpn, vpn机场, vpn节点, vpn推荐, 科学上网"
h1: "Linux 使用 Sing-box 搭建高性能 TProxy 透明代理"
platform: "Linux (Ubuntu / Debian)"
readTime: "约 6 分钟"
publishDate: "2026-11-26"
author: "竹梯子教程团队"
---

💡 教程导读与核心要点
        
TProxy（透明代理）相比普通 HTTP 代理更加底层，无需在每个程序中单独配置代理变量，即可让 Linux 服务器的所有应用程序出站流量智能通过代理转发。

      

      
## 一、详细分步实操流程

      
        
          一、编译或安装 Sing-box 核心
          确保 Linux 内核支持 TProxy 模块，通过官方源安装 sing-box。
        
      
        
          二、配置 Inbound 为 TProxy 模式
          在 config.json 的 inbounds 中添加 tproxy 监听端口（如 12345）。
        
      
        
          三、配置策略路由与 iptables 规则
          设置 ip rule 和 ip route 路由表，将目标非局域网的 TCP/UDP 流量重定向至 12345 端口。
        
      
        
          四、启动并验证透明代理
          无需配置任何环境变量，直接执行 wget https://www.google.com 成功下载即代表透明代理部署成功。
        
      

      
## 二、优质适配机场节点推荐

      

        好的客户端必须搭配高质量、低延迟的优质线路。针对当前教程场景，我们实测推荐使用 **闪跃 FlashLeap**：
      

      
        
          闪跃 FlashLeap
          专注极速低延迟的IPLC纯专线机场，¥24/月起提供150GB配额，千兆BGP骨干网络，低延迟游戏与4K流媒体首选。
          
            起步资费：**¥24/月** | 包含：**150GB**
            | 优惠券: shanyue
          
        
        
          [直达官网](https://vip02.flashleapaff.com/#/?code=8ZIV6HQ3)
          [详细评测](../review/flashleap.html)
        
      

      
## 三、常见故障与高频问答 (FAQ)

      
        
          
#### 问：配置后无法通过 SSH 连入服务器？

          
答：
请务必在 iptables 规则中将来源端口 22 (SSH) 设为 RETURN 直连豁免，防止锁死失联！

        
      

      
## 四、相关教程与延伸阅读

      

        返回浏览全部指南：[使用教程中心](index.html)；对比更多服务商线路参数：[机场横向对比工具](../compare/index.html)；查阅最新速率排行：[综合排行榜](../ranking/overall.html)。
