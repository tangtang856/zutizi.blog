/**
 * zutizi.blog - 全站通用轻量交互脚本
 * 零外部依赖，纯原生JavaScript，极速秒开，完美支持本地 file:/// 与线上部署
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. 移动端折叠导航切换
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", function () {
      navLinks.classList.toggle("show");
      const isExpanded = navLinks.classList.contains("show");
      mobileToggle.setAttribute("aria-expanded", isExpanded);
    });
  }

  // 2. 交互式分类标签切换 (Tab Filter)
  const tabButtons = document.querySelectorAll(".filter-tab-btn");
  if (tabButtons.length > 0) {
    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        tabButtons.forEach(function (b) { b.classList.remove("active"); });
        this.classList.add("active");
        const targetCategory = this.getAttribute("data-category");
        const cards = document.querySelectorAll(".airport-card[data-category]");
        cards.forEach(function (card) {
          const cats = card.getAttribute("data-category") || "";
          if (targetCategory === "all" || cats.includes(targetCategory)) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // 3. FAQ 折叠手风琴逻辑
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", function () {
        const isActive = item.classList.contains("active");
        faqItems.forEach(function (other) {
          if (other !== item) other.classList.remove("active");
        });
        item.classList.toggle("active", !isActive);
      });
    }
  });

  // 4. 机场列表动态搜索过滤
  const filterInput = document.getElementById("airport-filter-input");
  if (filterInput) {
    filterInput.addEventListener("input", function (e) {
      const term = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll(".airport-card, .data-table tbody tr");
      cards.forEach(function (card) {
        const text = card.textContent.toLowerCase();
        if (text.includes(term)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // 5. 页面顶部阅读进度条 (Reading Progress Bar)
  if (!document.getElementById("scroll-progress")) {
    const progressBar = document.createElement("div");
    progressBar.id = "scroll-progress";
    document.body.prepend(progressBar);
  }

  // 6. 悬浮“回到顶部”按钮 (Floating Back to Top Button)
  let backToTopBtn = document.getElementById("back-to-top");
  if (!backToTopBtn) {
    backToTopBtn = document.createElement("button");
    backToTopBtn.id = "back-to-top";
    backToTopBtn.setAttribute("aria-label", "回到顶部");
    backToTopBtn.title = "回到顶部";
    backToTopBtn.innerHTML = "↑";
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 7. 滚动事件监听 (更新进度条 & 控制回到顶部按钮显隐)
  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    const pBar = document.getElementById("scroll-progress");
    if (pBar && docHeight > 0) {
      const progress = (scrollTop / docHeight) * 100;
      pBar.style.width = Math.min(100, Math.max(0, progress)) + "%";
    }

    if (backToTopBtn) {
      if (scrollTop > 280) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }
  }, { passive: true });

  // 8. 头部“联络我们”弹窗交互与剪贴板一键复制
  const contactTrigger = document.getElementById("header-contact-trigger");
  const contactPanel = document.getElementById("contact-dropdown-panel");
  const contactClose = document.getElementById("contact-dropdown-close");

  if (contactTrigger && contactPanel) {
    contactTrigger.addEventListener("click", function (e) {
      e.stopPropagation();
      const isActive = contactPanel.classList.toggle("active");
      contactTrigger.classList.toggle("active", isActive);
      contactTrigger.setAttribute("aria-expanded", isActive);
    });

    if (contactClose) {
      contactClose.addEventListener("click", function (e) {
        e.stopPropagation();
        contactPanel.classList.remove("active");
        contactTrigger.classList.remove("active");
        contactTrigger.setAttribute("aria-expanded", "false");
      });
    }

    // 点击弹窗外部区域自动关闭
    document.addEventListener("click", function (e) {
      if (!contactPanel.contains(e.target) && !contactTrigger.contains(e.target)) {
        contactPanel.classList.remove("active");
        contactTrigger.classList.remove("active");
        contactTrigger.setAttribute("aria-expanded", "false");
      }
    });

    // 阻止点击弹窗内部时冒泡导致关闭
    contactPanel.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }

  // 9. 一键复制功能（支持现代 API 及优雅降级）
  const copyButtons = document.querySelectorAll(".channel-copy-btn");
  if (copyButtons.length > 0) {
    copyButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const textToCopy = this.getAttribute("data-copy-text");
        if (!textToCopy) return;

        const originalText = this.innerHTML;
        const currentBtn = this;

        function showCopiedFeedback() {
          currentBtn.innerHTML = "<span>✓ 已复制！</span>";
          currentBtn.classList.add("copied");
          setTimeout(function () {
            currentBtn.innerHTML = originalText;
            currentBtn.classList.remove("copied");
          }, 2000);
        }

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(textToCopy).then(showCopiedFeedback).catch(function () {
            fallbackCopy(textToCopy, showCopiedFeedback);
          });
        } else {
          fallbackCopy(textToCopy, showCopiedFeedback);
        }
      });
    });
  }

  function fallbackCopy(text, callback) {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    tempInput.style.position = "fixed";
    tempInput.style.opacity = "0";
    document.body.appendChild(tempInput);
    tempInput.focus();
    tempInput.select();
    try {
      document.execCommand("copy");
      if (callback) callback();
    } catch (err) {
      console.warn("复制失败", err);
    }
    document.body.removeChild(tempInput);
  }

  // 9. 首页高清极速光轨动态引擎 (Ultra-HD Fiber Dynamic Canvas Engine)
  const canvas = document.getElementById("hero-dynamic-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let dpr = 1;
    let animId = null;
    let isVisible = true;

    // 高清适配视网膜屏幕 (Retina / 4K / 2K)
    function resize() {
      const hero = canvas.parentElement;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.scale(dpr, dpr);
    }

    // 光轨粒子类：蓝光流与金光流交汇
    const particles = [];
    const PARTICLE_COUNT = 45;

    function createParticle(initialProgress) {
      const isCyan = Math.random() < 0.58;
      return {
        isCyan: isCyan,
        // 运动轨迹插值参数
        progress: typeof initialProgress === 'number' ? initialProgress : Math.random(),
        speed: 0.0035 + Math.random() * 0.007,
        // 起点与曲率偏置
        startX: isCyan ? (Math.random() * 0.35) : (0.55 + Math.random() * 0.45),
        startY: 0.75 + Math.random() * 0.35,
        curveBend: (Math.random() - 0.5) * 0.25,
        // 视觉特征
        size: 1.2 + Math.random() * 2.2,
        length: 25 + Math.random() * 55,
        alpha: 0.4 + Math.random() * 0.55,
      };
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(Math.random()));
    }

    // 目标汇聚点 (远方地平线透视中心)
    function getHorizonPoint() {
      return {
        x: width * 0.70,
        y: height * 0.52
      };
    }

    function render() {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      const target = getHorizonPoint();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          particles[i] = createParticle(0);
          continue;
        }

        // 二次贝塞尔曲线插值计算当前位置
        const t = p.progress;
        const x0 = p.startX * width;
        const y0 = p.startY * height;
        const ctrlX = (x0 + target.x) * 0.5 + p.curveBend * width;
        const ctrlY = y0 - (y0 - target.y) * 0.35;

        // 当前头部坐标
        const currentX = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * ctrlX + t * t * target.x;
        const currentY = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * ctrlY + t * t * target.y;

        // 尾部坐标 (滞后一小段)
        const tTail = Math.max(0, t - (p.length / Math.max(width, height)) * 0.45);
        const tailX = (1 - tTail) * (1 - tTail) * x0 + 2 * (1 - tTail) * tTail * ctrlX + tTail * tTail * target.x;
        const tailY = (1 - tTail) * (1 - tTail) * y0 + 2 * (1 - tTail) * tTail * ctrlY + tTail * tTail * target.y;

        // 渐变光迹
        const currentAlpha = Math.sin(t * Math.PI) * p.alpha;
        const grad = ctx.createLinearGradient(tailX, tailY, currentX, currentY);

        if (p.isCyan) {
          grad.addColorStop(0, "rgba(0, 240, 255, 0)");
          grad.addColorStop(0.7, "rgba(56, 189, 248, " + (currentAlpha * 0.6) + ")");
          grad.addColorStop(1, "rgba(147, 197, 253, " + currentAlpha + ")");
        } else {
          grad.addColorStop(0, "rgba(245, 158, 11, 0)");
          grad.addColorStop(0.7, "rgba(251, 191, 36, " + (currentAlpha * 0.6) + ")");
          grad.addColorStop(1, "rgba(254, 243, 199, " + currentAlpha + ")");
        }

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = p.size;
        ctx.lineCap = "round";
        ctx.stroke();

        // 头部发光微光子
        ctx.beginPath();
        ctx.arc(currentX, currentY, p.size * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = p.isCyan ? "rgba(224, 242, 254, " + currentAlpha + ")" : "rgba(254, 243, 199, " + currentAlpha + ")";
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    }

    // 智能性能优化：视口离开自动停止，进入自动恢复 (0% 闲置开销)
    window.addEventListener("resize", function () {
      resize();
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              animId = requestAnimationFrame(render);
            }
          } else {
            isVisible = false;
            if (animId) cancelAnimationFrame(animId);
          }
        });
      }, { threshold: 0.05 });
      observer.observe(canvas.parentElement || canvas);
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        isVisible = false;
        if (animId) cancelAnimationFrame(animId);
      } else {
        isVisible = true;
        animId = requestAnimationFrame(render);
      }
    });

    resize();
    animId = requestAnimationFrame(render);
  }

});
