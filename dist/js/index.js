"use strict";

// header
$(".nav li").hover(function () {
  $(this).addClass('active');
  $(this).find('.item').stop().slideDown('fast');
  $(this).find('.navi').addClass('iactive');
}, function () {
  $(this).find('.item').stop().slideUp('fast');
  $(this).removeClass('active');
  $(this).find('.navi').removeClass('iactive');
});
$(".nav .item a ").hover(function () {
  $(this).addClass('current');
}, function () {
  $(this).removeClass('current');
}); // 移动端的操作

$('.icon').click(function () {
  if (!$('.icon').hasClass('icon-menu-close')) {
    $(this).addClass('icon-menu-close');
    $('.nav-phone-box').addClass('no');
  } else {
    $(this).removeClass('icon-menu-close');
    $('.nav-phone-box').removeClass('no');
  }
});

if ($('.on').css('display') != 'none') {
  $('.nav-phone').find('li').click(function () {
    var Li = $(this).find('i');

    if (Li.hasClass('icon-ico_open')) {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        Li.removeClass('iactive');
        $(this).find('ul').hide(200);
      } else {
        $(this).addClass('active');
        Li.addClass('iactive');
        $(this).find('ul').show(200);
      }
    }
  });
} //   页面nav高亮


function navActive(num) {
  var sub = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  // 移动端nav高亮
  if ($('.nav-phone-box').css('display') != 'none') {
    $('.nav-phone').children('li').each(function (index, item) {
      if (index == num) {
        $(this).addClass('active');

        if (sub) {
          $(this).find('ul').css('display', 'block');
          $(this).find('ul li').eq(sub - 1).addClass('active');
        }

        return;
      }
    });
  } else {
    $('.nav').find('li').each(function (index, item) {
      if (index == num) {
        $(this).addClass('actives');

        if (sub) {
          $(this).find('.item a').eq(sub - 1).addClass('currents');
        }

        return;
      }
    });
  }
} // product


$(".product-btn a").on('mouseenter', function () {
  $(this).addClass('active').siblings().removeClass('active');
});
var helpList = []; // 遍历帮助列表里的高度

$('.helpbox').each(function (index, el) {
  var top = $(".helpbox:eq(".concat(index, ")")).offset().top - $(".helpbox:eq(".concat(index, ")")).outerHeight() - 400;
  helpList.push({
    'offTop': top,
    'index': index
  });
});
var topScroll;
$(window).scroll(function () {
  topScroll = $(window).scrollTop();
}); // 滑动动画

function scrollrecommended() {
  // 推荐页面
  if ($('.recommendedContent').offset()) {
    var recommend = $('.recommendedContent').offset().top - $('.recommendedContent ul').outerHeight() - 100;

    if (topScroll >= recommend) {
      $('.recommendedContent li').each(function (index, el) {
        $(".recommendedContent li:eq(".concat(index, ")")).addClass("move-top".concat(index + 1));
      });
    }
  }
}

function scrollproblem() {
  if ($('.problem').offset()) {
    var topPin = $('.problem').offset().top - $('.problem ul').outerHeight() - 100;

    if (topScroll >= topPin) {
      $('.problem').find('li').addClass('move-top2');
    }

    helpList.forEach(function (res, index) {
      if (topScroll >= res.offTop) {
        $(".helpbox:eq(".concat(res.index, ")")).find('.helpleft').addClass('move-left');
        $(".helpbox:eq(".concat(res.index, ")")).find('.helpright').addClass('move-right');
      }
    });
  }
} // });
// 初始化首页轮播


function initIndexSwiper() {
  // swiper 初始化
  var indexSwiper = new Swiper('.index-swiper', {
    autoplay: 3000,
    // effect: 'fade',
    pagination: '.index-swiper-pagination',
    paginationClickable: true
  }); //鼠标移入停止播放，鼠标离开  继续轮播

  $('.index-swiper').mouseenter(function () {
    console.log(indexSwiper);
    indexSwiper.stopAutoplay();
  });
  $('.index-swiper').mouseleave(function () {
    indexSwiper.startAutoplay();
  });
}

var activeIndex = 0;
var timer = null;

function defaultActibe() {
  $('.swiper-slide-active').find('.box').addClass('swiper-slide-move');
} // 数据分析轮播初始化


function initDataSwiper() {
  // swiper 初始化
  var indexSwiper = new Swiper('.analysis-swiper', {
    // effect: 'fade',
    pagination: '.analysis-swiper-pagination',
    paginationClickable: true,
    prevButton: '.swiper-button-prev',
    nextButton: '.swiper-button-next',
    onSlideChangeEnd: function onSlideChangeEnd(swiperHere) {
      activeIndex = swiperHere.activeIndex;
      $('.swiper-slide').each(function (index, el) {
        $(this).find('.box').removeClass('swiper-slide-move');
      });
      $('.swiper-slide-active').find('.box').addClass('swiper-slide-move');
      $(".analysis-swiper-pagination").find('.swiper-pagination-bullet').each(function (index) {
        if (index == activeIndex) {
          $(this).trigger('click');
        }
      });
    }
  }); //鼠标移入停止播放，鼠标离开  继续轮播

  $('.analysis-swiper').mouseenter(function () {
    indexSwiper.stopAutoplay();
  });
  $('.analysis-swiper').mouseleave(function () {
    indexSwiper.startAutoplay();
  });
  setTimeout(function () {
    initBullet();
  }, 100);
} // 监听串口变化 swiper初始化


function resizeSwiper() {
  $(window).resize(function () {
    setTimeout(function () {
      initBullet();
    }, 100);
  });
} // 分页器填值


function initBullet() {
  var arr = ['事件分析', 'Session分析', '漏斗分析', '留存分析', '分布分析', '路径分析', '间隔分析', '归因分析', '渠道分析', '用户分析', '热力图分析', '自定义查询'];
  var timer = setInterval(function () {
    if ($('.data-swiper').find('.swiper-pagination-bullet').length > 0) {
      $('.analysis-swiper-pagination .swiper-pagination-bullet').each(function (index) {
        $(this).html(arr[index]);
      });
      clearInterval(timer);
      timer = null;
    }
  }, 100);
} // 分页器点击  大于4的高亮移动到中间


$(document).on('click', '.analysis-swiper-pagination  .swiper-pagination-bullet', function () {
  var index = $(this).index();

  if (index >= 3) {
    $('.analysis-swiper-pagination').animate({
      scrollLeft: 158 * (index - 3) + 79
    }, 300);
  } else {
    $('.analysis-swiper-pagination').scrollLeft(0);
  }
});
var flage; // 推荐页面产品说明鼠标移入

if ($('.movebox')) {
  $('.movebox').find('img').each(function (index, el) {
    var _this = $(this);

    _this.on({
      mouseover: function mouseover() {
        allclear();
        $(".Picindex:eq(".concat(index, ")")).stop().fadeIn('normal');
        $(_this).siblings('.ripple').addClass('moveripple');
      }
    });
  });
}

function allclear() {
  $('.movebox').find('img').each(function (index, el) {
    var _this = $(this);

    $(".Picindex:eq(".concat(index, ")")).stop().fadeOut('normal');
    $(_this).siblings('.ripple').removeClass('moveripple');
  });
} // 箭头倒计时


var arrowTimer = null;
var arrowTime = 0; // 箭头鼠标移入

$('.line-wrap .item').hover(function () {
  $('.line-wrap .item').removeClass('active');
  $(this).addClass('active');
  var index = $(this).index();
  handleTreeIn(index);
  clearInterval(arrowTimer);
  arrowTimer = null;
  $('.arrow-bg').each(function (i) {
    if (i > index * 4 - 1) {
      $(this).removeClass('arrow1 arrow2 arrow3 arrow4');
    } else {
      initClass(i);
    }
  });
}, function () {
  var index = $(this).index();
  handleTreeOut(index);
  arrowTime = index * 4;
  arrowTimeDown();
});

function handleTreeIn(index) {
  var i = index;

  switch (i) {
    case 0:
      i = 5;
      $('.data3').addClass('active');
      break;

    case 1:
      i = 4;
      $('.data5').addClass('active');
      break;

    case 2:
      i = 3;
      $('.data2').addClass('active');
      break;

    case 3:
      i = 2;
      $('.data4').addClass('active');
      break;

    case 4:
      i = 1;
      $('.data1').addClass('active');
      break;
  }

  $('.timg' + i).removeClass('actives');
  $('.timg' + i).addClass('active');
}

function handleTreeOut(index) {
  var i = index;

  switch (i) {
    case 0:
      i = 5;
      $('.data3').removeClass('active');
      break;

    case 1:
      $('.data5').removeClass('active');
      i = 4;
      break;

    case 2:
      $('.data2').removeClass('active');
      i = 3;
      break;

    case 3:
      $('.data4').removeClass('active');
      i = 2;
      break;

    case 4:
      $('.data1').removeClass('active');
      i = 1;
      break;
  }

  $('.data' + i).removeClass('active');
  $('.timg' + i).removeClass('active');
  $('.timg' + i).addClass('actives');
} // 初始化灰色箭头


function setArrowClass(time) {
  initClass(time);

  if (time > 16) {
    clearInterval(arrowTimer);
    arrowTimer = null;
    $('.arrow-bg').removeClass('arrow1 arrow2 arrow3 arrow4');
    arrowTimeDown();
  }
} // 初始化箭头class


function initClass(time) {
  if ([0, 4, 8, 12].indexOf(time) != -1) {
    $('.arrow-bg').eq(time).addClass('arrow1');
  } else if ([1, 5, 9, 13].indexOf(time) != -1) {
    $('.arrow-bg').eq(time).addClass('arrow2');
  } else if ([2, 6, 10, 14].indexOf(time) != -1) {
    $('.arrow-bg').eq(time).addClass('arrow3');
  } else if ([3, 7, 11, 15].indexOf(time) != -1) {
    $('.arrow-bg').eq(time).addClass('arrow4');
  }
} // 箭头循环


function arrowTimeDown() {
  arrowTimer = setInterval(function () {
    setArrowClass(arrowTime);

    if (arrowTime > 16) {
      arrowTime = 0;
    } else {
      arrowTime += 1;
    }
  }, 300);
} // 说明图动画


function initTreeScroll() {
  var treeTop = $(".img-tree").offset().top,
      docTop = $(document).height(),
      winHeight = $(window).height();

  if (winHeight - treeTop > 10) {
    initTreeAnimate();
  }

  $(window).scroll(function () {
    var winTop = $(window).scrollTop(); // console.log(treeTop, winTop, winHeight)

    if (winTop + winHeight > treeTop + 50) {
      initTreeAnimate();
    }
  });
}

function initTreeAnimate() {
  // 添加动画
  $('.timg1').addClass('tree-top1');
  $('.timg2').addClass('tree-top2');
  $('.timg3').addClass('tree-top3');
  $('.timg4').addClass('tree-top4');
  $('.timg5').addClass('tree-top5');
  $('.img-tree .data1').addClass('tree-data1');
  $('.img-tree .data2').addClass('tree-data2');
  $('.img-tree .data3').addClass('tree-data3');
  $('.img-tree .data4').addClass('tree-data4');
  $('.img-tree .data5').addClass('tree-data5');
  $('.img-tree .line1').addClass('tree-line1  ');
  $('.img-tree .line2').addClass('tree-line2');
  $('.img-tree .line3').addClass('tree-line3');
  $('.img-tree .line4').addClass('tree-line4');
  $('.img-tree .line5').addClass('tree-line5');
} // 返回顶部


$(window).scroll(function () {
  var winTops = $(window).scrollTop();

  if (winTops > 500) {
    $('.to-top').show();
  } else {
    $('.to-top').hide();
  }
});
$(document).on('click', '.to-top', function () {
  $('body,html').animate({
    scrollTop: 0
  }, 300);
}); // 倒计时

window['loginTimer'] = null;
var loginTime = 60; // 登录弹出框

$('.header').find('.btn').click(function () {
  $('.Login').fadeIn(200);
}); // 关闭登录框

$('.Login').click(function () {
  $('.Login').fadeOut(200); // 初始化表单信息

  initLoginInfo();
});
$('.Login-box').click(function (event) {
  event.stopPropagation();
}); // 登陆相关

$('.login-phone,.login-code').on({
  focus: function focus() {
    $(this).parent('.Login-item').css('border', '1px solid #3c96ff');
  },
  blur: function blur() {
    console.log(123);
    $(this).parent('.Login-item').css('border', '1px solid #dfe2e6');
  }
}); // 记住密码
// $('.check-wrap').on('click', function () {
//     if ($('.checkbox').hasClass('active')) {
//         $('.checkbox').removeClass('active')
//     } else {
//         $('.checkbox').addClass('active')
//     }
// })
// 清除错误

$('.login-phone').on('input', function () {
  $('.phone-err').hide();
});
$('.login-code').on('input', function () {
  $('.code-err').hide();
}); // 获取验证吗

$('.get-code').on('click', function () {
  if (phoneReg($('.login-phone').val())) {
    timeDowm();
    window['loginTimer'] = setInterval(timeDowm, 1000);
    $.ajax({
      type: "GET",
      url: "http://rap2.taobao.org:38080/app/mock/235436/getCode.json",
      dataType: "json",
      data: {
        phone: $('.login-phone').val()
      },
      success: function success(res) {
        console.log(res);
      },
      error: function error() {}
    });
  } else {
    $('.phone-err').show();
  }
}); //  点击登陆

$('.Login-in').on('click', function () {
  if (!phoneReg($('.login-phone').val())) {
    $('.phone-err').show();
  } else if (!codeReg($('.login-code').val())) {
    $('.code-err').show();
  } else {
    $.ajax({
      type: "POST",
      url: "http://rap2.taobao.org:38080/app/mock/235436/login.json",
      dataType: "json",
      data: {
        phone: $('.login-phone').val(),
        code: $('.login-code').val()
      },
      success: function success(res) {
        console.log(res);
      },
      error: function error() {}
    });
  }
}); // 60秒倒计时

function timeDowm() {
  if (loginTime > 1) {
    loginTime -= 1;
    $('.get-code').text(loginTime + 's');
    $('.get-code').attr('disabled', true);
    $('.get-code').addClass('disabled');
  } else {
    loginTime = 60;
    $('.get-code').text('重新获取');
    $('.get-code').attr('disabled', false);
    $('.get-code').removeClass('disabled');
    clearInterval(window['loginTimer']);
    window['loginTimer'] = null;
  }
} // 验证手机号


function phoneReg(phone) {
  var reg = /^1[3456789]\d{9}$/;
  return reg.test(phone);
} // 验证验证吗


function codeReg(code) {
  var reg = /^\d{6}$/;
  return reg.test(code);
} // 初始化表单信息


function initLoginInfo() {
  $('.phone-err').hide();
  $('.code-err').hide();
  $('.login-phone').val('');
  $('.login-code').val('');
  $('.get-code').removeClass('disabled');
  $('.get-code').text('获取验证码');
  loginTime = 60;
  $('.get-code').attr('disabled', false);
  clearInterval(window['loginTimer']);
  window['loginTimer'] = null;
}