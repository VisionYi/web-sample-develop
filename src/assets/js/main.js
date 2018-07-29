import Pagination from './pagination.js';

/**
 * All JavaScript
 *
 * @author Shane Yi <scps950613@gmail.com>
 * @date 2017-01-24 10:00:33
 */
$(document).ready(function() {

    /* menu (RWD) 導行列 */

	var $navigation = $('.menu .navigation');
    var $all_subMenu = $('.menu ul.main-menu li.dropdown > ul.sub-menu');
    var $closeNavbar = $('#main ,#footer');

    if ($(window).width() <= 767) {
        $('body').css('margin-top', '55px');
        $('.menu').addClass('fixed');
    }

    $('.menu .menu-toggle').click(function() {
        if ($navigation.hasClass('side-slide')) {

            if ($navigation.hasClass('pushed')) {
                $navigation.removeClass('pushed');
                $('body').css('overflow', 'auto');
            } else {
                $navigation.addClass('pushed');
                $('body').css('overflow', 'hidden');
            }
        } else {

            if ($navigation.css('display') === 'block') {
                $('body').css('overflow', 'auto');
            } else {
                $('body').css('overflow', 'hidden');
            }

            $navigation.slideToggle(300);
        }

        $all_subMenu.removeAttr('style');
    });

    $('.menu ul.main-menu li.dropdown > a').click(function() {
        if ($(window).width() <= 767) {
            $(this).parent('li').siblings('.dropdown').find('ul.sub-menu').slideUp(300);
            $(this).siblings('ul.sub-menu').slideToggle(300);
        }
    });

    $closeNavbar.click(function() {
        if ($(window).width() <= 767) {

            if ($navigation.hasClass('side-slide pushed')) {
                $navigation.removeClass('pushed');
                $('body').css('overflow', 'auto');
                $all_subMenu.removeAttr('style');
            }else
            if ($navigation.css('display') === 'block' && !$navigation.hasClass('side-slide')) {
                $navigation.slideToggle(300);
                $('body').css('overflow', 'auto');
                $all_subMenu.removeAttr('style');
            }
        }
    });

    $(window).resize(function() {
        if ($(window).width() > 767) {
            $('body').removeAttr('style');
            $('.menu').removeClass('fixed');
            $all_subMenu.removeAttr('style');

            if ($navigation.hasClass('side-slide')) {
                $navigation.removeClass('pushed');
            } else {
                $navigation.removeAttr('style');
            }
        }

        if ($(window).width() <= 767) {
            $('body').css('margin-top', '55px');
            $('.menu').addClass('fixed');
        }
    });


	/* slides-ad */

	const ACTIVE = 'active';
	var ID_adSlider;

	// 自動輪播的功能，設定 5 秒換一次
	ID_adSlider = setInterval(adSliderAuto, 5000);

	$(document).on('click', '.slides-ad ol.controls > li', adSliderClick);

	function adSliderClick() {
		var controlClick = $(this);
		var innerClick = $('.slides-ad ul.inner > li').eq(controlClick.index());
		var controlActive = controlClick.siblings('.' + ACTIVE);
		var innerActive = innerClick.siblings('.' + ACTIVE);

		if (controlClick.index() === controlActive.index()) {
			return;
		}

		/* 防止連點的 Bug */
		$(document).off('click', '.slides-ad ol.controls > li', adSliderClick);

		adSliderSwitch(controlActive, controlClick, innerActive, innerClick);

		/* 防止連點的 Bug */
		setTimeout(function() {$(document).on('click', '.slides-ad ol.controls > li', adSliderClick);},600);

		clearInterval(ID_adSlider);
		ID_adSlider = setInterval(adSliderAuto, 5000);
	}

	function adSliderAuto() {
		var controlActive = $('.slides-ad ol.controls > li.' + ACTIVE);
		var innerActive = $('.slides-ad ul.inner > li.' + ACTIVE);
		var inners = $('.slides-ad ul.inner > li');
		var controlNext, innerNext;

		// 假如 slider 沒有畫面產生或 slider 的數量少於 2 個的話，就不設置自動輪播
		if (innerActive.length === 0 || inners.length < 2) {
			clearInterval(ID_adSlider);
			return;
		}

		controlNext = controlActive.next('li').length === 0 ?
				      $('.slides-ad ol.controls > li:eq(0)') : controlActive.next('li');
		innerNext = innerActive.next('li').length === 0 ?
					  $('.slides-ad ul.inner > li:eq(0)') : innerActive.next('li');

		adSliderSwitch(controlActive, controlNext, innerActive, innerNext);
	}

	function adSliderSwitch(controlActive, controlNext, innerActive, innerNext) {
		controlActive.removeClass(ACTIVE);
		controlNext.addClass(ACTIVE);

		innerActive.fadeTo(200, 0.5, function() {
			$(this).removeClass(ACTIVE);
			$(this).removeAttr('style');

			innerNext.fadeTo(400, 0.9, function() {
				$(this).addClass(ACTIVE);
				$(this).removeAttr('style');
			});
		});
	}


	/* All faq */

	var questionClick = function() {
		var itemClicked = $(this).parent('li');
		var itemActive = itemClicked.siblings('.' + ACTIVE);

		if (itemClicked.index() === itemActive.index()) {
			return;
		}

		itemClicked.find('.answer').slideDown(300,function() {
			$(this).parent('li').addClass(ACTIVE);
			$(this).removeAttr('style');
		});
		itemActive.find('.answer').slideUp(300,function() {
			$(this).parent('li').removeClass(ACTIVE);
			$(this).removeAttr('style');
		});
	};

	$(document).on('click', 'ul.faq li .question', questionClick);


	// pagination 製作分頁 UI 元件
	if ($('ul.pagination').length) {
		var config = {
			pagination: {
				selector: $('ul.pagination'),
				items: 18,
				itemsOnPage: 3,
				currentPage: 1,
				maxSize: 5,
				hrefTextPrefix: '#',
			}
		};

		var page = new Pagination(config.pagination);
		page.loadURLHash().init().clickRun();
	}
});
