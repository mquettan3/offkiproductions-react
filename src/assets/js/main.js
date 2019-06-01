$(document).ready(function() {

    /* ======= Scrollspy ======= */
    $('body').scrollspy({ target: '#header', offset: 51});

    /* ======= ScrollTo ======= */
    $('a.scrollto').on('click', function(e){

        //store hash
        var target = this.hash;

        e.preventDefault();

		$('body').scrollTo(target, 800, {offset: -50, 'axis':'y'});
        //Collapse mobile menu after clicking
		if ($('.navbar-collapse').hasClass('show')){
			$('.navbar-collapse').removeClass('show');
		}

	});

    /* ======= Fixed Header animation ======= */

    $(window).on('scroll load', function() {

         if ($(window).scrollTop() > 0 ) {
             $('#header').addClass('header-scrolled');
         }
         else {
             $('#header').removeClass('header-scrolled');
         }
    });

	/* ======= Vegas Plugin ======= */
    /* Ref: http://vegas.jaysalvat.com/index.html */
    $('#promo').vegas({
        delay: 8000,
        overlay: 'assets/plugins/vegas/dist/overlays/06.png',
        color: '#101113',
        transition: 'zoomOut',
        transitionDuration: 3000,
        slides: [
            { src: 'images/hero-1.jpg' },
            { src: 'images/hero-2.jpg' },
            { src: 'images/hero-3.jpg' },
            { src: 'images/hero-4.jpg' }
        ]
    });

});
