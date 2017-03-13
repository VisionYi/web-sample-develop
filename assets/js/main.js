/**
 * All JavaScript
 *
 * @author Shane Yi <scps950613@gmail.com>
 * @date 2017-01-24 10:00:33
 */
$(document).ready(function() {

	/* RWD 導航列 */

	var $navigation = $('.navbar .navigation');
	var $all_subMenu = $('.navbar ul.main-menu li.dropdown > ul.sub-menu');
	var $closeNavbar = $('#main ,#footer');

	if ($(window).width() <= 767) {
		$('body').css('margin-top', '55px');
		$('.navbar').addClass('fixed');
	}

	$('.navbar .menu-toggle').click(function() {
		if ($navigation.hasClass('side-slided')) {

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

	$('.navbar ul.main-menu li.dropdown > a').click(function() {
		if ($(window).width() <= 767) {
			$(this).parent('li').siblings('.dropdown').find('ul.sub-menu').slideUp(300);
			$(this).siblings('ul.sub-menu').slideToggle(300);
		}
	});

	$closeNavbar.click(function() {
		if ($(window).width() <= 767) {

			if ($navigation.hasClass('side-slided pushed')) {
				$navigation.removeClass('pushed');
				$('body').css('overflow', 'auto');
				$all_subMenu.removeAttr('style');
			}else
			if ($navigation.css('display') === 'block' && !$navigation.hasClass('side-slided')) {
				$navigation.slideToggle(300);
				$('body').css('overflow', 'auto');
				$all_subMenu.removeAttr('style');
			}
		}
	});

	$(window).resize(function() {
		if ($(window).width() > 767) {
			$('body').removeAttr('style');
			$('.navbar').removeClass('fixed');
			$all_subMenu.removeAttr('style');

			if ($navigation.hasClass('side-slided')) {
				$navigation.removeClass('pushed');
			} else {
				$navigation.removeAttr('style');
			}
		}

		if ($(window).width() <= 767) {
			$('body').css('margin-top', '55px');
			$('.navbar').addClass('fixed');
		}
	});


	/* slider-ad */

	const ACTIVE = 'active';
	var $controlItems = $('.slider-ad ol.controls > li');
	var $innerItems = $('.slider-ad ul.inner > li');

	var adSliderClick = function() {
		var controlClick = $(this);
		var controlActive = controlClick.siblings('.' + ACTIVE);
		var innerClick = $innerItems.eq(controlClick.index());
		var innerActive = innerClick.siblings('.' + ACTIVE);

		/* # 防止連點的Bug */
		$controlItems.off('click', adSliderClick);

		if (controlClick.index() !== controlActive.index()) {

			controlActive.removeClass(ACTIVE);
			controlClick.addClass(ACTIVE);

			innerActive.fadeTo(250, 0.5,function() {
				$(this).removeClass(ACTIVE);
				$(this).removeAttr('style');

				innerClick.fadeTo(250, 0.9,function() {
					$(this).addClass(ACTIVE);
					$(this).removeAttr('style');
				});
			});
		}

		/* # 防止連點的Bug */
		setTimeout(function() {$controlItems.on('click', adSliderClick);},500);
	};

	$controlItems.on('click', adSliderClick);


	/* All question-answer */
	var questionItems = $('ul.question-answer > li');

	var questionClick = function() {
		var itemClicked = $(this).parent('li');
		var itemActive = itemClicked.siblings('.' + ACTIVE);

		if (itemClicked.index() !== itemActive.index()) {

			itemClicked.find('.answer').slideDown(300,function() {
				$(this).parent('li').addClass(ACTIVE);
				$(this).removeAttr('style');
			});
			itemActive.find('.answer').slideUp(300,function() {
				$(this).parent('li').removeClass(ACTIVE);
				$(this).removeAttr('style');
			});
		}
	};

	questionItems.find('.question').on('click', questionClick);


	/**
	 * 以下為修正多餘的margin-bottom
	 */

	/* 格線系統加上computer-only的元素時之情況 */

	var $computerOnly = $('.grid > .wide.computer-only');

	if ($(window).width() <= 767) {
		if ($computerOnly.next().length === 0) {
			$computerOnly.prev().css('margin-bottom', '0');
		}
	}

	$(window).resize(function() {
		if ($computerOnly.next().length === 0) {
			if ($(window).width() <= 767) {
				$computerOnly.prev().css('margin-bottom', '0');
			} else {
				$computerOnly.prev().removeAttr('style');
			}
		}
	});

	/* 修改格線系統內的最後一個子元素，須加上.wide上加入fix-last-bottom才能幫助移除 */

	$('.grid > .wide.fix-last-bottom').children().last().css('margin-bottom', '0');
});
