$(document).ready(function(){
    $('.carousel__inner').slick({
        speed:1200,
        adaptiveHeight: false,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: '<button type="button" class="slick-prev"><img src=icon/left.svg></button>',
        nextArrow: '<button type="button" class="slick-next"><img src=icon/right.svg></button>',
        responsive:[
            {
                breakpoint: 768,
                settings: 
                {
                    dots: true,
                    adaptiveHeight: false,
                    arrows:false
                }
            }
            
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //modal
    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal_close').on('click',function(){
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });
    $('.button_mini').each(function(i){
        $(this).on('click',function(){
            $('#order .modal_descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });
    
    function valideForms(form){
        $(form).validate({
            rules:{
                name:"required",
                phone:"required",
                email:{
                    required: true,
                    email:true
                }
            },
            messages:{
                name: "Пожалуйста, введите своё имя",
                phone: "Пожалуйста, введите свой номер",
                email:{
                    required:"Пожалуйста, введите свою почту",
                    email:"Неправльно введен email"
                }
            }
        });
    };
    valideForms('#consultation-form');
    valideForms('#consultation form');
    valideForms('#order form');
    $('input[name=phone]').mask('+7 (999) 999-99-99');

    $('form').submit(function(e){
        e.preventDefault();

        if (!$(this).valid()){
            return;
        }

        $.ajax({
            type: 'POST',
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function(){
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');


            $('form').trigger('reset');
        });
        return false;
    });

    $(window).scroll(function(){
        if ($(this).scrollTop()>1600){
            $('.pageup').fadeIn();
        } else{
            $('.pageup').fadeOut();
        }
    })

    $('.pageup').click(function(){
		$('html, body').animate({scrollTop: 0}, 1000);
		return false;
	});
    new WOW().init();
});

