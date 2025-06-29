// 返回頂部
function backToTop() {
  $("html, body").animate({ scrollTop: 0 }, 1000);
}

// 點擊輸入框時觸發日期選擇器
document.getElementById('start_date').addEventListener('click', function() {
  this.showPicker(); // 顯示日期選擇器彈窗
});

document.getElementById('end_date').addEventListener('click', function() {
  this.showPicker(); // 顯示日期選擇器彈窗
});

// 展開/收起手機子選單
function turnMobileMenu(){
    const mobileMenu = document.getElementById('mobile_menu');
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
    } else {
      mobileMenu.classList.add('active');
    }
}

$(window).resize((e) => {
  if ( window.innerWidth > 1000) {
    document.getElementById('mobile_menu').classList.remove('active');
  }
})