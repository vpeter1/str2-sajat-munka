$('[data-toggle="tooltip"]').tooltip()

$(function () {
    $(document).scroll(function () {
        const $nav = $(".navbar-fixed-top");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
});


/* document.querySelector('.hello').scrollIntoView({
    behavior: 'smooth'
}); */