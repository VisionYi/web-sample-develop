/**
 * All JavaScript
 *
 * @author Shane Yi <scps950613@gmail.com>
 * @date 2017-01-24 10:00:33
 */
$(document).ready(function() {

	/* MAIN MENU */
	$('.navigation > .main-menu > li:has(ul.sub-menu)').addClass('dropdown');
	$('ul.sub-menu > li:has(ul.sub-menu) > a').addClass('dropdown');

	$('#menu-toggle').click(function() {
		$('.navigation').slideToggle(300);
		return false;
	});

	$(window).resize(function() {
		if ($(window).width() > 767) {
			$('.navigation').removeAttr('style');
		}
	});


	const ACTIVE = 'active';

	/* slider-ad */
	var controlItems = $('.slider-ad ol.controls > li');
	var innerItems = $('.slider-ad ul.inner > li');

	var adSliderClick = function() {
		var controlClick = $(this);
		var controlActive = controlClick.siblings('.' + ACTIVE);
		var innerClick = innerItems.eq(controlClick.index());
		var innerActive = innerClick.siblings('.' + ACTIVE);

		/* # 防止連點的Bug */
		controlItems.off('click', adSliderClick);

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
		setTimeout(function() {controlItems.on('click', adSliderClick);},500);
	};

	controlItems.on('click', adSliderClick);


	/* board-news */
	var questionItems = $('.board-news ul.question-answer > li');

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

});
