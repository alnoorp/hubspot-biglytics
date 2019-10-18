$(document).ready(function () {
    $('.pricing-option input').click(function(){
               $('.price-block').hide();
               $('.' + $(this).attr('id')).show();            
    });
})