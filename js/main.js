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
});
