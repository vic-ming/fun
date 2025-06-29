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
// function turnMobileMenu(number, subNumber){
//   if (!subNumber) {
//     if ($('#no_' + number + '_btn').hasClass('menu_level_1_active')) {
//       $('.mobile_operate_level_1').removeClass('menu_level_1_active')
//       $('.mobile_sub_menu_list_1').css("display",'none')
//     } else {
//       $('.mobile_operate_level_1').removeClass('menu_level_1_active')
//       $('.mobile_sub_menu_list_1').css("display",'none')
//       $('#no_' + number + '_btn').addClass('menu_level_1_active')
//       $('#no_' + number + '_menu').css("display",'block')
//     }
//   } else {
//     if ($('#no_' + number + '_sub_' + subNumber + '_btn').hasClass('menu_level_2_active')) {
//       $('.mobile_operate_level_2').removeClass('menu_level_2_active')
//       $('.mobile_sub_menu_list_2').css("display",'none')
//     } else {
//       $('.mobile_operate_level_2').removeClass('menu_level_2_active')
//       $('.mobile_sub_menu_list_2').css("display",'none')
//       $('#no_' + number + '_sub_' + subNumber + '_btn').addClass('menu_level_2_active')
//       $('#no_' + number + '_sub_' + subNumber + '_menu').css("display",'block')
//     }
//   }
// }

// $(window).resize((e) => {
//   if ( window.innerWidth > 1200) {
//     this.menuTurn('close')
//   }
// })


// $(window).scroll((e) => {
//   // 返回頂部按鈕顯示判斷
//   if ($(document).scrollTop() > 500) {
//     $('.top_btn').css("display",'flex')
//   }else{
//     $('.top_btn').css("display",'none')
//   }
// })