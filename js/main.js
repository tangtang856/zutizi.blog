/**
 * zutizi.blog - 全站通用轻量交互脚本
 * 零外部依赖，纯原生JavaScript，秒级响应
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

  // 2. FAQ 折叠手风琴逻辑
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", function () {
        const isActive = item.classList.contains("active");
        // 如果需要独占展开，可关闭其他
        faqItems.forEach(function (other) {
          if (other !== item) other.classList.remove("active");
        });
        item.classList.toggle("active", !isActive);
      });
    }
  });

  // 3. 机场列表动态快速筛选（如果页面有筛选输入框）
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
});
