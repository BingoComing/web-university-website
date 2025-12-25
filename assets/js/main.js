/**
 * Web技术大学 - 模块化JavaScript
 */

// =======================
// 1. 轮播图模块
// =======================
class Slider {
  constructor() {
    this.slideIndex = 0;
    this.timer = null;
    this.slides = document.getElementsByClassName("slide");
    this.dots = document.getElementsByClassName("dot");
    this.init();
  }

  showSlide(n) {
    if (!this.slides.length) return;

    if (typeof n === "number") this.slideIndex = n;
    if (this.slideIndex >= this.slides.length) this.slideIndex = 0;
    if (this.slideIndex < 0) this.slideIndex = this.slides.length - 1;

    // 隐藏所有幻灯片
    for (let slide of this.slides) {
      slide.style.display = "none";
    }

    // 移除所有点的active类
    for (let dot of this.dots) {
      dot.classList.remove("active");
    }

    // 显示当前幻灯片和激活当前点
    if (this.slides.length > 0) {
      this.slides[this.slideIndex].style.display = "block";
    }
    if (this.dots.length > 0 && this.dots[this.slideIndex]) {
      this.dots[this.slideIndex].classList.add("active");
    }

    // 重置定时器
    this.clearTimer();
    this.timer = setTimeout(() => {
      this.slideIndex++;
      this.showSlide(this.slideIndex);
    }, 4000);
  }

  changeSlide(n) {
    this.slideIndex += n;
    this.showSlide(this.slideIndex);
  }

  goToSlide(n) {
    this.slideIndex = n - 1;
    this.showSlide(this.slideIndex);
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  init() {
    if (this.slides.length > 0) {
      this.showSlide(0);
    }
  }
}

// =======================
// 2. 搜索功能模块
// =======================
class Search {
  static handleSearch() {
    const input = document.getElementById("headerSearchInput");
    const keyword = input.value.trim();

    if (!keyword) {
      alert("请输入搜索关键词！");
      input.focus();
      return;
    }

    // 跳转到搜索结果页
    window.location.href =
      "../search_result.html?q=" + encodeURIComponent(keyword);
  }
}

// =======================
// 3. 表单验证模块
// =======================
class FormValidator {
  static validateContactForm(event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    let isValid = true;

    // 重置错误信息
    document.querySelectorAll(".error-message").forEach((el) => {
      el.style.display = "none";
    });

    // 验证姓名
    if (!name.value.trim()) {
      document.getElementById("nameError").style.display = "block";
      isValid = false;
    }

    // 验证邮箱
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      document.getElementById("emailError").style.display = "block";
      isValid = false;
    }

    // 验证留言内容
    if (!message.value.trim()) {
      document.getElementById("messageError").style.display = "block";
      isValid = false;
    }

    if (isValid) {
      alert("提交成功！我们会尽快回复您。");
      document.getElementById("contactForm").reset();
    }

    return false;
  }
}

// =======================
// 4. 返回顶部模块
// =======================
class BackToTop {
  constructor() {
    this.init();
  }

  static scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  init() {
    // 创建返回顶部按钮
    const backBtn = document.createElement("button");
    backBtn.id = "backToTop";
    backBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backBtn.onclick = BackToTop.scrollToTop;
    document.body.appendChild(backBtn);

    // 监听滚动事件
    window.onscroll = () => {
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        backBtn.style.display = "flex";
      } else {
        backBtn.style.display = "none";
      }
    };
  }
}

// =======================
// 5. 移动端菜单模块
// =======================
class MobileMenu {
  static toggle() {
    const nav = document.querySelector(".nav");
    nav.classList.toggle("active");
  }

  static init() {
    const headerMain = document.querySelector(".header-main");
    if (headerMain) {
      const mobileBtn = document.createElement("button");
      mobileBtn.className = "mobile-menu-btn";
      mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
      mobileBtn.onclick = MobileMenu.toggle;
      headerMain.appendChild(mobileBtn);
    }
  }
}

// =======================
// 6. 导航激活模块
// =======================
class NavActivator {
  static init() {
    const currentPath =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav > ul > li > a");

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (
        href === currentPath ||
        (href === "sy.html" && currentPath === "index.html")
      ) {
        link.classList.add("active");
      }
    });
  }
}

// =======================
// 7. 日期显示模块
// =======================
class DateDisplay {
  static init() {
    const headerTop = document.querySelector(".header-top");
    if (headerTop) {
      const dateDiv = document.createElement("div");
      dateDiv.className = "top-left";

      const now = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      };

      dateDiv.innerText = "今天是：" + now.toLocaleDateString("zh-CN", options);
      headerTop.insertBefore(dateDiv, headerTop.firstChild);
    }
  }
}

// =======================
// 9. 滚动动画模块
// =======================
class ScrollAnimation {
  static init() {
    // 添加页面加载动画
    this.addLoadingAnimation();

    // 初始化滚动动画
    this.animateOnScroll();

    // 监听滚动事件
    window.addEventListener("scroll", () => {
      this.animateOnScroll();
    });
  }

  static addLoadingAnimation() {
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading-animation";
    loadingDiv.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingDiv);

    // 页面加载完成后移除加载动画
    window.addEventListener("load", () => {
      setTimeout(() => {
        loadingDiv.style.opacity = "0";
        setTimeout(() => {
          loadingDiv.remove();
        }, 500);
      }, 300);
    });
  }

  static animateOnScroll() {
    const animatedElements = document.querySelectorAll(".scroll-animate");

    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // 当元素进入视口时添加动画
      if (elementPosition < windowHeight - 100) {
        element.classList.add("animated");
      }
    });
  }
}

// =======================
// 10. 校园活动日历模块
// =======================
class CampusCalendar {
  constructor() {
    this.currentDate = new Date();
    this.events = this.generateMockEvents();
    this.init();
  }

  // 生成模拟活动数据
  generateMockEvents() {
    const events = [];
    const today = new Date();

    // 生成未来3个月的活动
    for (let i = 0; i < 90; i++) {
      const eventDate = new Date(today);
      eventDate.setDate(today.getDate() + i);

      // 随机生成0-2个活动
      const eventCount = Math.floor(Math.random() * 3);

      for (let j = 0; j < eventCount; j++) {
        const event = {
          id: `${eventDate.toISOString()}-${j}`,
          title: this.getRandomEventTitle(),
          date: eventDate,
          time: this.getRandomTime(),
          location: this.getRandomLocation(),
          description: this.getRandomDescription(),
          category: this.getRandomCategory(),
        };
        events.push(event);
      }
    }

    return events;
  }

  getRandomEventTitle() {
    const titles = [
      "校园十佳歌手大赛",
      "金秋文化艺术节",
      "科技文化节",
      "高雅艺术进校园",
      "学术讲座：人工智能发展趋势",
      "运动会开幕式",
      "社团招新活动",
      "校园书法展",
      "英语演讲比赛",
      "创业论坛",
      "校园美食节",
      "读书分享会",
      "校园音乐会",
      "志愿者招募活动",
      "心理健康讲座",
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  getRandomTime() {
    const hours = Math.floor(Math.random() * 12) + 8; // 8:00-20:00
    const minutes = Math.floor(Math.random() * 2) * 30; // 00或30
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
  }

  getRandomLocation() {
    const locations = [
      "学术报告厅",
      "大礼堂",
      "图书馆报告厅",
      "体育馆",
      "学生活动中心",
      "教学楼A101",
      "校园广场",
      "实验楼B202",
      "艺术楼展厅",
      "操场",
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  }

  getRandomDescription() {
    return "这是一个精彩的校园活动，欢迎广大师生积极参与！活动将提供丰富的内容和精彩的表演，期待您的到来。";
  }

  getRandomCategory() {
    const categories = ["文化", "学术", "体育", "艺术", "科技", "志愿"];
    return categories[Math.floor(Math.random() * categories.length)];
  }

  init() {
    this.renderCalendar();
    this.renderTodayEvents();
    this.renderUpcomingEvents();
    this.addEventListeners();
  }

  renderCalendar() {
    const currentMonth = this.currentDate.getMonth();
    const currentYear = this.currentDate.getFullYear();

    // 更新月份标题
    const monthNames = [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ];
    document.getElementById(
      "currentMonth"
    ).textContent = `${currentYear}年${monthNames[currentMonth]}`;

    // 获取当月第一天和最后一天
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    // 获取当月第一天是星期几
    const startDay = firstDay.getDay();

    // 获取当月总天数
    const daysInMonth = lastDay.getDate();

    // 渲染日历天数
    const calendarDays = document.getElementById("calendarDays");
    calendarDays.innerHTML = "";

    // 渲染上个月的天数
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0);
    const prevMonthDays = prevMonthLastDay.getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      const dayElement = this.createDayElement(prevMonthDays - i, false);
      dayElement.classList.add("other-month");
      calendarDays.appendChild(dayElement);
    }

    // 渲染当月的天数
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = this.createDayElement(i, true);

      // 检查是否是今天
      const today = new Date();
      if (
        i === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear()
      ) {
        dayElement.classList.add("today");
      }

      // 添加活动点
      const eventsOnDay = this.getEventsOnDate(
        new Date(currentYear, currentMonth, i)
      );
      if (eventsOnDay.length > 0) {
        this.addEventDots(dayElement, eventsOnDay.length);
      }

      calendarDays.appendChild(dayElement);
    }

    // 渲染下个月的天数
    const remainingDays = 42 - (startDay + daysInMonth); // 42 = 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const dayElement = this.createDayElement(i, false);
      dayElement.classList.add("other-month");
      calendarDays.appendChild(dayElement);
    }
  }

  createDayElement(dayNumber, isCurrentMonth) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";

    const dayNumberElement = document.createElement("div");
    dayNumberElement.className = "day-number";
    dayNumberElement.textContent = dayNumber;

    dayElement.appendChild(dayNumberElement);

    // 添加点击事件，显示当天活动详情
    if (isCurrentMonth) {
      dayElement.addEventListener("click", () => {
        const clickedDate = new Date(
          this.currentDate.getFullYear(),
          this.currentDate.getMonth(),
          dayNumber
        );
        this.showDayEvents(clickedDate);
      });
    }

    return dayElement;
  }

  addEventDots(dayElement, count) {
    const maxDots = 3;
    const dotsToShow = Math.min(count, maxDots);

    for (let i = 0; i < dotsToShow; i++) {
      const dotElement = document.createElement("div");
      dotElement.className = "event-dot";
      dayElement.appendChild(dotElement);
    }

    if (count > maxDots) {
      const moreElement = document.createElement("div");
      moreElement.className = "event-more";
      moreElement.textContent = `+${count - maxDots}`;
      moreElement.style.fontSize = "10px";
      moreElement.style.color = "var(--text-secondary)";
      moreElement.style.marginTop = "2px";
      dayElement.appendChild(moreElement);
    }
  }

  getEventsOnDate(date) {
    return this.events.filter((event) => {
      return (
        event.date.getDate() === date.getDate() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getFullYear() === date.getFullYear()
      );
    });
  }

  renderTodayEvents() {
    const today = new Date();
    const todayEvents = this.getEventsOnDate(today);
    const todayEventsContainer = document.getElementById("todayEvents");

    if (todayEvents.length === 0) {
      todayEventsContainer.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-calendar-times"></i>
          <p>今天没有活动</p>
        </div>
      `;
      return;
    }

    todayEventsContainer.innerHTML = todayEvents
      .map((event) => this.createEventElement(event))
      .join("");
  }

  renderUpcomingEvents() {
    const today = new Date();
    const upcomingEvents = this.events
      .filter((event) => event.date >= today)
      .sort((a, b) => a.date - b.date)
      .slice(0, 5);

    const upcomingEventsContainer = document.getElementById("upcomingEvents");

    if (upcomingEvents.length === 0) {
      upcomingEventsContainer.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-calendar-times"></i>
          <p>近期没有活动</p>
        </div>
      `;
      return;
    }

    upcomingEventsContainer.innerHTML = upcomingEvents
      .map((event) => this.createEventElement(event))
      .join("");
  }

  createEventElement(event) {
    return `
      <div class="event-item" onclick="CampusCalendar.showEventDetail('${event.id}')">
        <h4>${event.title}</h4>
        <div class="event-time">${event.time}</div>
        <div class="event-location">${event.location}</div>
      </div>
    `;
  }

  static showEventDetail(eventId) {
    const calendar = window.campusCalendar;
    if (calendar) {
      const event = calendar.events.find((e) => e.id === eventId);
      if (event) {
        calendar.showEventModal(event);
      }
    }
  }

  showEventModal(event) {
    const modal = document.getElementById("eventModal");
    const modalBody = document.getElementById("eventModalBody");

    modalBody.innerHTML = `
      <h3>${event.title}</h3>
      <div class="event-info">
        <div class="event-info-item">
          <i class="fas fa-calendar"></i>
          <span>${event.date.toLocaleDateString("zh-CN")}</span>
        </div>
        <div class="event-info-item">
          <i class="fas fa-clock"></i>
          <span>${event.time}</span>
        </div>
        <div class="event-info-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>${event.location}</span>
        </div>
        <div class="event-info-item">
          <i class="fas fa-tag"></i>
          <span>${event.category}</span>
        </div>
      </div>
      <div class="event-description">
        ${event.description}
      </div>
    `;

    modal.style.display = "block";
  }

  closeEventModal() {
    const modal = document.getElementById("eventModal");
    modal.style.display = "none";
  }

  showDayEvents(date) {
    const eventsOnDay = this.getEventsOnDate(date);
    const modal = document.getElementById("eventModal");
    const modalBody = document.getElementById("eventModalBody");

    const dateStr = date.toLocaleDateString("zh-CN");

    if (eventsOnDay.length === 0) {
      modalBody.innerHTML = `
        <h3>${dateStr} 活动</h3>
        <div class="empty-state">
          <i class="fas fa-calendar-times"></i>
          <p>这一天没有活动</p>
        </div>
      `;
    } else {
      modalBody.innerHTML = `
        <h3>${dateStr} 活动</h3>
        <div class="event-list">
          ${eventsOnDay.map((event) => this.createEventElement(event)).join("")}
        </div>
      `;
    }

    modal.style.display = "block";
  }

  prevMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }

  addEventListeners() {
    // 月份导航按钮
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");

    if (prevMonthBtn && nextMonthBtn) {
      prevMonthBtn.addEventListener("click", () => this.prevMonth());
      nextMonthBtn.addEventListener("click", () => this.nextMonth());
    }

    // 模态框关闭按钮
    const modalClose = document.querySelector(".event-modal-close");
    const modal = document.getElementById("eventModal");

    if (modalClose && modal) {
      modalClose.addEventListener("click", () => this.closeEventModal());

      // 点击模态框外部关闭
      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          this.closeEventModal();
        }
      });
    }
  }
}

// =======================
// 11. 主初始化模块
// =======================
class App {
  static init() {
    // 初始化轮播图
    if (document.querySelector(".slide")) {
      window.sliderInstance = new Slider();
    }

    // 初始化返回顶部按钮
    new BackToTop();

    // 初始化移动端菜单
    MobileMenu.init();

    // 激活当前导航
    NavActivator.init();

    // 显示当前日期
    DateDisplay.init();

    // 初始化滚动动画
    ScrollAnimation.init();

    // 初始化校园活动日历
    if (document.querySelector(".campus-calendar-container")) {
      window.campusCalendar = new CampusCalendar();
    }

    // 添加事件监听器
    App.addEventListeners();
  }

  static addEventListeners() {
    // 搜索按钮点击事件
    const searchBtn = document.querySelector(".search-box button");
    if (searchBtn) {
      searchBtn.addEventListener("click", Search.handleSearch);
    }

    // 搜索输入框回车事件
    const searchInput = document.getElementById("headerSearchInput");
    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          Search.handleSearch();
        }
      });
    }

    // 联系表单提交事件
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", FormValidator.validateContactForm);
    }
  }
}

// 页面加载完成后初始化应用
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

// 暴露全局方法，兼容原有代码
window.handleSearch = Search.handleSearch;
window.validateContactForm = FormValidator.validateContactForm;
window.scrollToTop = BackToTop.scrollToTop;
window.toggleMobileMenu = MobileMenu.toggle;
window.showSlide = (n) => {
  // 兼容原有代码，实际使用时建议使用Slider类
  if (window.sliderInstance) {
    window.sliderInstance.showSlide(n);
  }
};
window.changeSlide = (n) => {
  if (window.sliderInstance) {
    window.sliderInstance.changeSlide(n);
  }
};
window.goToSlide = (n) => {
  if (window.sliderInstance) {
    window.sliderInstance.goToSlide(n);
  }
};