---
title: "Docker Desktop on macOS配置HTTP代理拉取海外镜像教程 - 竹梯子博客"
description: "Mac Docker镜像拉取失败解决办法。配置Docker Desktop代理参数，秒级拉取Docker Hub海外官方镜像。"
keywords: "机场推荐, 机场节点, 性价比机场, 梯子推荐, vpn, vpn机场, vpn节点, vpn推荐, 科学上网"
h1: "Mac Docker Desktop 配置代理拉取 Docker Hub 镜像实战"
platform: "macOS (Apple Silicon / Intel)"
readTime: "约 6 分钟"
publishDate: "2026-11-26"
author: "竹梯子教程团队"
---

💡 教程导读与核心要点
        
由于国内公共 Docker 镜像加速站大面积受限，直接执行 docker pull 经常遭遇连接拒绝。在 Docker 客户端中配置正确的宿主机代理能轻松恢复正常拉取。

      

      
## 一、详细分步实操流程

      
        
          一、打开 Docker Desktop 设置
          点击顶部齿轮设置图标 -> 进入 'Resources' -> 选择 'Proxies' 选项卡。
        
      
        
          二、填入宿主机代理地址
          打开 Manual proxy configuration 开关，Web Server (HTTP) 与 Secure Web Server (HTTPS) 填入：http://host.docker.internal:7890
        
      
        
          三、应用并重启 Docker
          点击 'Apply & restart'，等待 Docker 引擎重启完成。
        
      
        
          四、验证拉取官方镜像
          在终端中输入 docker pull ubuntu:latest，镜像将迅速秒级下载完成。
        
      

      
## 二、优质适配机场节点推荐

      

        好的客户端必须搭配高质量、低延迟的优质线路。针对当前教程场景，我们实测推荐使用 **浪网 WaveNet**：
      

      
        
          浪网 WaveNet
          自研客户端优化线路架构，¥30/月起提供150GB专属配额，千兆端口VLESS先进协议，延迟低至12ms，极致抗封锁。
          
            起步资费：**¥30/月** | 包含：**150GB**
            
          
        
        
          [直达官网](https://varnexa.wavenetaff.com/#/?code=8fwQQBdy)
          [详细评测](../review/wavenet.html)
        
      

      
## 三、常见故障与高频问答 (FAQ)

      
        
          
#### 问：为什么填 127.0.0.1:7890 无法生效？

          
答：
因为 Docker 运行在独立虚拟机内，其内部 127.0.0.1 是容器本身，必须使用 host.docker.internal 才能指向宿主机 Mac。

        
      

      
## 四、相关教程与延伸阅读

      

        返回浏览全部指南：[使用教程中心](index.html)；对比更多服务商线路参数：[机场横向对比工具](../compare/index.html)；查阅最新速率排行：[综合排行榜](../ranking/overall.html)。
