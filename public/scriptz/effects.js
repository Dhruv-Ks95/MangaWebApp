$(".readmore").click(function(){
    $(this).closest(".thecard").css("transform","rotateY(180deg)");
});

$(".goback").click(function(){
    $(this).closest(".thecard").css("transform","");
});