
const ratings = $("[data-rate]");
const pill_fills = ratings.find(".pill-fill");

for (let i = 0; i < 20; i++) {
    // ratings[i].attr("fill", "#e4e4e4");
    pill_fills[i].setAttribute("fill", "#e4e4e4");
}


$("[data-rate]").on("click", function () {
    const rate = $(this).data("rate");

    $("[data-rate]").find(".pill-fill").attr("fill", "#e4e4e4");
    
    $("[data-rate]").each(function () {
        const currentRate = $(this).data("rate");
        const pill_fills = $(this).find(".pill-fill");

        
        if (currentRate <= rate) {
            
            $(pill_fills[0]).attr("fill", "#56b5eb");
            $(pill_fills[1]).attr("fill", "#56b5eb");

            $(pill_fills[2]).attr("fill", "#ff623f");
            $(pill_fills[3]).attr("fill", "#ff623f");
        }
    });
});

$("[data-rate]").on("mouseenter", function () {
    const rate = $(this).data("rate");

    $("[data-rate]").find(".pill-fill").attr("fill", "#e4e4e4");
    
    $("[data-rate]").each(function () {
        const currentRate = $(this).data("rate");
        const pill_fills = $(this).find(".pill-fill");

        
        if (currentRate <= rate) {
            
            $(pill_fills[0]).attr("fill", "#56b5eb");
            $(pill_fills[1]).attr("fill", "#56b5eb");

            $(pill_fills[2]).attr("fill", "#ff623f");
            $(pill_fills[3]).attr("fill", "#ff623f");
        }
    });
});

$("#complete-checkout").on("click", function () {
    $("#modal-rating").toggleClass("hidden");
});


// For LocalHost
// $("#back-to-home").on("click", function () {
//     window.location.replace("/public/");
// });

// For GitHub
$("#back-to-home").on("click", function () {
    window.location.replace("/kalium-drugstore/public/");
});
