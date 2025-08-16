$(document).ready(function () {
    "use strict";
    $('#burger-menu').click(function () {
        $('#nav-menu').toggleClass('open');
    });

    $('#close-menu').click(function () {
        $('#nav-menu').removeClass('open');
    });


    const text = "Сможете переехать в готовый дом уже через 3 месяца";
    let index = 0;

    function type() {
        if (index < text.length) {

            const $char = $('<span></span>').text(text.charAt(index)).css('opacity', 0);
            $('#intro-text').append($char);

            setTimeout(function () {
                $char.animate({opacity: 1}, 300);
            }, 0);

            index++;
            setTimeout(type, 30);
        }
    }

    type();

    $('.third-project-content, .fourth-project-content, .fifth-project-content').hide();


    new WOW({
        animateClass: "animate__animated"
    }).init();

    $('#view-more').on('click', function () {

        $('.third-project-content, .fourth-project-content, .fifth-project-content').each(function () {

            if (!$(this).hasClass('shown')) {
                $(this).addClass('wow animate__fadeIn');
                $(this).show();
                $(this).addClass('shown');
            }
        });


        this.scrollIntoView({behavior: 'smooth'});


        new WOW({
            animateClass: "animate__animated"
        }).init();
    });

    $('.popup-image').magnificPopup({
        type: 'image',
        gallery: {
            enabled: false
        },
        callbacks: {
            open: function () {
                this.content.css({
                    transform: 'scale(1)',
                });
            },
            close: function () {
                this.content.css({
                    transform: 'scale(1)',
                });
            }
        }
    });

    $('.btn-download').on('click', function () {
        // Создаем элемент ссылки (anchor)
        const link = document.createElement('a');
        link.href = 'https://drive.google.com/uc?export=download&id=1t36DL7_dkDdAVVaF3lO35wgiOis5nvTC';
        link.download = 'пример_договора.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });


    $('.slider').slick({
        centerMode: true,
        dots: true,
        autoplay: false,
        centerPadding: '0',
        slidesToShow: 3,
        // prevArrow: '<img src="../images/slider/left.png" alt="Previous" />',
        // nextArrow: '<img src="../images/slider/right.png" alt="Next" />',
        responsive: [{
            breakpoint: 913,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '0',
                Infinity: true,
                slidesToShow: 1
            },
        }]
    });

    $('.card-info').hide();

    function updateCardInfo() {
        $('.slick-slide').each(function () {
            if ($(this).hasClass('slick-current')) {
                $(this).find('.card-info').fadeIn();
            } else {
                $(this).find('.card-info').fadeOut();
            }
        });
    }

    updateCardInfo();

    $('.slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.card-info').hide();
    });

    $('.slider').on('afterChange', function (event, slick, currentSlide) {
        setTimeout(updateCardInfo, 50);
    });


    let nameInput = $('#name');
    let phoneInput = $('#phone');
    let thankYouMessage = $('.thank-you-message');
    let loader = $('.loader');
    let consentCheckbox = $('#consent');
    let hasError = false;


    phoneInput.mask('+7 (999) 999-99-99');
    phoneInput.on('keypress', function (e) {
        if (e.which < 48 || e.which > 57) {
            e.preventDefault();
        }
    });

    $('#submit').on('click', function (e) {
        e.preventDefault();
        hasError = false;


        nameInput.css('border-color', 'initial');
        phoneInput.css('border-color', 'initial');
        $('.error-input').hide();


        if (!nameInput.val()) {
            nameInput.css('border-color', 'red');
            nameInput.next().show();
            hasError = true;
        }

        if (!phoneInput.val()) {
            phoneInput.css('border-color', 'red');
            phoneInput.next().show();
            hasError = true;
        }

        if (!consentCheckbox.is(':checked')) {
            $('.form-checkbox .error-input').show();
            hasError = true;
        } else {
            $('.form-checkbox .error-input').hide();
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: 'POST',
                url: 'https://testologia.ru/checkout',
                data: {
                    name: nameInput.val(),
                    phone: phoneInput.val()
                },
            })
                .done(function (response) {
                    loader.hide();
                    if (response.success === 1 || response.name === 'itlogia') {
                        $('.form').hide();
                        thankYouMessage.show();
                    } else {
                        alert("Возникла ошибка. Попробуйте еще раз.");
                    }
                });
        }
    });


    let popupNameInput = $('#popup-name');
    let popupPhoneInput = $('#popup-phone');
    let popupThankYouMessage = $('.popup-thank-you-message');
    let popupConsentCheckbox = $('#popup-consent');
    let popupSubmitButton = $('#popup-submit');
    let popupMessage = $('.popup-message'); // Сообщение


    popupPhoneInput.mask('+7 (999) 999-99-99');


    popupPhoneInput.on('keypress', function(e) {
        if (e.which < 48 || e.which > 57) {
            e.preventDefault();
        }
    });


    function resetPopup() {
        popupNameInput.val('').css('border-color', 'initial');
        popupPhoneInput.val('').css('border-color', 'initial');
        $('.popup-error-input').hide();
        popupConsentCheckbox.prop('checked', false);


        $('.popup-form').show();
        popupThankYouMessage.hide();
        popupMessage.show();
    }

    popupSubmitButton.on('click', function(e) {
        e.preventDefault();
        let popupHasError = false;


        popupNameInput.css('border-color', 'initial');
        popupPhoneInput.css('border-color', 'initial');
        $('.popup-error-input').hide();

        if (!popupNameInput.val()) {
            popupNameInput.css('border-color', 'red');
            popupNameInput.next('.popup-error-input').show();
            popupHasError = true;
        }


        if (!popupPhoneInput.val()) {
            popupPhoneInput.css('border-color', 'red');
            popupPhoneInput.next('.popup-error-input').show();
            popupHasError = true;
        }


        if (!popupConsentCheckbox.is(':checked')) {
            $('.popup-form-checkbox .popup-error-input').show();
            popupHasError = true;
        } else {
            $('.popup-form-checkbox .popup-error-input').hide();
        }


        if (!popupHasError) {
            loader.css('display', 'flex');

            $.ajax({
                method: 'POST',
                url: 'https://testologia.ru/checkout',
                data: {
                    name: popupNameInput.val(),
                    phone: popupPhoneInput.val()
                }
            }).done(function(response) {
                loader.hide();
                if (response.success === 1 || response.name === 'itlogia') {
                    $('.popup-form').hide();
                    popupThankYouMessage.show();
                    popupMessage.hide();
                } else {
                    alert("Возникла ошибка. Попробуйте еще раз.");
                }
            });
        }
    });


    $('.excursion-btn .btn-link').on('click', function(e) {
        e.preventDefault();
        resetPopup();
        $('#popup').show();
    });


    $('#close-popup').on('click', function() {
        $('#popup').hide();
    });


    $(window).on('click', function(event) {
        if ($(event.target).is('#popup')) {
            $('#popup').hide();
        }
    });

    $('.dot-first').on('click', function () {
        let firstBlock = $('.dot-first-block');
        $('img').removeClass('active');
        $(this).find('img').addClass('active');
        firstBlock.show().siblings('div[class*="-block"]').hide();
        firstBlock.addClass('animate__animated animate__fadeIn').fadeIn();
    });

    $('.dot-second').on('click', function () {
        let secondBlock = $('.dot-second-block');
        $('img').removeClass('active');
        $(this).find('img').addClass('active');
        secondBlock.show().siblings('div[class*="-block"]').hide();
        secondBlock.addClass('animate__animated animate__fadeIn').fadeIn();
    });

    $('.dot-third').on('click', function () {
        let thirdBlock = $('.dot-third-block');
        $('img').removeClass('active');
        $(this).find('img').addClass('active');
        thirdBlock.show().siblings('div[class*="-block"]').hide();
        thirdBlock.addClass('animate__animated animate__fadeIn').fadeIn();
    });

    $('.dot-fourth').on('click', function () {
        let fourthBlock = $('.dot-fourth-block');
        $('img').removeClass('active');
        $(this).find('img').addClass('active');
        fourthBlock.show().siblings('div[class*="-block"]').hide();
        fourthBlock.addClass('animate__animated animate__fadeIn').fadeIn();
    });

    $('.dot-fifth').on('click', function () {
        let fifthBlock = $('.dot-fifth-block');
        $('img').removeClass('active');
        $(this).find('img').addClass('active');
        fifthBlock.show().siblings('div[class*="-block"]').hide();
        fifthBlock.addClass('animate__animated animate__fadeIn').fadeIn();
    });
})
;



