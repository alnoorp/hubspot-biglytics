$(document).ready(function () {
    $('.billing-selectors input').click(function(){
        console.log('this worked');
        $('.price-block').hide();
        $('.price-block--' + $(this).attr('id')).show();            
    });
})