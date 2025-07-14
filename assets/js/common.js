// 返回頂部
function backToTop() {
  $("html, body").animate({ scrollTop: 0 }, 1000);
  // 設置焦點到跳過導航連結或主要內容
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.focus();
  }
}

// 聯絡我們
function scrollToBottom() {
  $("html, body").animate({ scrollTop: $(document).height() }, 1000);
}

// 點擊輸入框時觸發日期選擇器
document.getElementById('start_date').addEventListener('click', function() {
  this.showPicker(); // 顯示日期選擇器彈窗
});

document.getElementById('end_date').addEventListener('click', function() {
  this.showPicker(); // 顯示日期選擇器彈窗
});

// 展開/收起手機子選單 - 加強無障礙支援
function turnMobileMenu(){
    const mobileMenu = document.getElementById('mobile_menu');
    const menuButton = document.querySelector('.header_right_mobile');
    
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      // 更新 ARIA 狀態
      menuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      // 移除鍵盤陷阱
      removeTrapFocus(mobileMenu);
    } else {
      mobileMenu.classList.add('active');
      // 更新 ARIA 狀態
      menuButton.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      // 設置焦點到第一個連結
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) {
        firstLink.focus();
      }
      // 設置鍵盤陷阱
      trapFocus(mobileMenu);
    }
}

// 鍵盤陷阱功能 - 確保焦點停留在選單內
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', function(e) {
    const isTabPressed = e.key === 'Tab' || e.keyCode === 9;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        e.preventDefault();
      }
    } else { // Tab
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
        e.preventDefault();
      }
    }
  });
}

// 移除鍵盤陷阱
function removeTrapFocus(element) {
  element.removeEventListener('keydown', trapFocus);
}

// ESC 鍵關閉選單
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' || e.keyCode === 27) {
    const mobileMenu = document.getElementById('mobile_menu');
    if (mobileMenu.classList.contains('active')) {
      turnMobileMenu();
      // 將焦點返回到選單按鈕
      document.querySelector('.header_right_mobile').focus();
    }
  }
});

// 點擊選單外部關閉選單
document.addEventListener('click', function(e) {
  const mobileMenu = document.getElementById('mobile_menu');
  const menuButton = document.querySelector('.header_right_mobile');
  
  if (mobileMenu.classList.contains('active') && 
      !mobileMenu.contains(e.target) && 
      !menuButton.contains(e.target)) {
    turnMobileMenu();
  }
});

// 窗口大小變更時處理選單狀態
$(window).resize((e) => {
  if (window.innerWidth > 1000) {
    const mobileMenu = document.getElementById('mobile_menu');
    const menuButton = document.querySelector('.header_right_mobile');
    
    mobileMenu.classList.remove('active');
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    removeTrapFocus(mobileMenu);
  }
});

// 改善表單輸入的無障礙性
document.addEventListener('DOMContentLoaded', function() {
  // 為所有表單輸入添加錯誤處理
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    input.addEventListener('invalid', function(e) {
      // 添加 aria-invalid 屬性
      this.setAttribute('aria-invalid', 'true');
      
      // 創建或更新錯誤訊息
      let errorId = this.id + '-error';
      let errorElement = document.getElementById(errorId);
      
      if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = errorId;
        errorElement.className = 'error-message';
        errorElement.setAttribute('role', 'alert');
        this.parentNode.appendChild(errorElement);
      }
      
      errorElement.textContent = this.validationMessage;
      this.setAttribute('aria-describedby', errorId);
    });
    
    input.addEventListener('input', function(e) {
      // 移除錯誤狀態當用戶開始輸入
      if (this.validity.valid) {
        this.removeAttribute('aria-invalid');
        const errorElement = document.getElementById(this.id + '-error');
        if (errorElement) {
          errorElement.remove();
        }
      }
    });
  });
  
  // 改善搜尋結果的公告
  const searchButton = document.querySelector('.search_button');
  if (searchButton) {
    searchButton.addEventListener('click', function() {
      // 模擬搜尋完成後更新結果公告
      setTimeout(() => {
        const resultElement = document.querySelector('.main_content_search_total');
        if (resultElement) {
          resultElement.setAttribute('aria-live', 'polite');
          // 觸發螢幕閱讀器公告
          const text = resultElement.textContent;
          resultElement.textContent = '';
          setTimeout(() => {
            resultElement.textContent = text;
          }, 100);
        }
      }, 1000);
    });
  }
});

// 改善輪播的無障礙性
document.addEventListener('DOMContentLoaded', function() {
  // 監聽輪播變化並更新 ARIA 狀態
  if (typeof BannerSwiper !== 'undefined') {
    BannerSwiper.on('slideChange', function() {
      const slides = document.querySelectorAll('.banner_swiper_slide');
      slides.forEach((slide, index) => {
        if (index === this.activeIndex) {
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.setAttribute('aria-hidden', 'true');
        }
      });
    });
  }
});

// 添加鍵盤支援給分頁導航
document.addEventListener('DOMContentLoaded', function() {
  const paginationLinks = document.querySelectorAll('.common_pagination a');
  
  paginationLinks.forEach(link => {
    link.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
});

// 公告狀態變更給螢幕閱讀器
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // 清除公告元素
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// 訂閱彈窗開啟
function openModal(){
  const subscribeModal = document.querySelector('.subscribe_modal');
  subscribeModal.classList.add('active');
  
  // 設置 ARIA 屬性
  subscribeModal.setAttribute('aria-hidden', 'false');
  subscribeModal.setAttribute('aria-modal', 'true');
  
  // 保存當前焦點元素
  const activeElement = document.activeElement;
  subscribeModal.setAttribute('data-previous-focus', activeElement.tagName);
  
  // 設置焦點到第一個可聚焦元素
  setTimeout(() => {
    const firstFocusable = subscribeModal.querySelector('input, button, a');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }, 100);
  
  // 設置鍵盤陷阱
  trapFocus(subscribeModal);
  
  // 添加 ESC 鍵監聽
  document.addEventListener('keydown', handleModalEscape);
  
  // 添加背景點擊關閉
  subscribeModal.addEventListener('click', handleModalBackgroundClick);
  
  // 防止背景滾動
  document.body.style.overflow = 'hidden';
}

// 訂閱彈窗關閉
function closeModal(){
  const subscribeModal = document.querySelector('.subscribe_modal');
  subscribeModal.classList.remove('active');
  
  // 恢復 ARIA 屬性
  subscribeModal.setAttribute('aria-hidden', 'true');
  subscribeModal.removeAttribute('aria-modal');
  
  // 恢復焦點到觸發元素
  const triggerButtons = document.querySelectorAll('button[onclick="openModal()"]');
  if (triggerButtons.length > 0) {
    triggerButtons[0].focus();
  }
  
  // 移除事件監聽器
  document.removeEventListener('keydown', handleModalEscape);
  subscribeModal.removeEventListener('click', handleModalBackgroundClick);
  
  // 移除鍵盤陷阱
  removeTrapFocus(subscribeModal);
  
  // 恢復背景滾動
  document.body.style.overflow = '';
}

// ESC 鍵關閉彈窗
function handleModalEscape(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

// 背景點擊關閉彈窗
function handleModalBackgroundClick(e) {
  if (e.target === e.currentTarget) {
    closeModal();
  }
}