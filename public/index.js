const path = "./../images/";
const image_array = ["pharmacist.jpg", "pharmacist_showing.jpg", "health_drugs.jpg"];

let index = 0;

const updateImage = () => {
    const carouselImage = $("#carousel-image");
    carouselImage.removeClass("show");
    setTimeout(() => {
        carouselImage.attr("src", `${path}${image_array[index]}`);
        carouselImage.addClass("show");
        index = (index + 1) % image_array.length;
    }, 500);
};

const startCarousel = () => {
    updateImage();
    setInterval(updateImage, 3000);
};

startCarousel();

let first_name = $("#form-first_name")
let last_name = $("#form-last_name")
let email = $("#form-email")
let passwd = $("#form-passwd")
let re_passwd = $("#form-re_passwd")
$("#form-details").hide();


$("#submit-btn").on("click", () => {
    first_val = first_name.val();
    last_val = last_name.val();
    email_val = email.val();
    passwd_val = passwd.val();
    
    $("#det-first_name").attr("value", `${first_val}`);
    $("#det-last_name").attr("value", `${last_val}`);
    $("#det-email").attr("value", `${email_val}`);
    $("#det-passwd").attr("value", "************");
    $("#form-first_name").attr("disabled", true);
    $("#form-last_name").attr("disabled", true);
    $("#form-email").attr("disabled", true);
    $("#form-passwd").attr("disabled", true);
    $("#form-re_passwd").attr("disabled", true);
    $("#submit-btn").attr("disabled", true);
    $("#form-details").slideToggle("slow", () => { });
})

$("#det-passwd").on("mouseenter", () => {
    $("#det-passwd").attr("value", `${passwd_val}`);
})

$("#det-passwd").on("mouseleave", () => {
    $("#det-passwd").attr("value", "************");
})

$("#incorrect-btn").on("click", () => {
    $("#form-details").hide();
    first_name.prop("value", "");
    last_name.prop("value", "");
    email.prop("value", "");
    passwd.prop("value", "");
    re_passwd.prop("value", "");

    first_name.attr("disabled", false);
    last_name.attr("disabled", false);
    email.attr("disabled", false);
    passwd.attr("disabled", false);
    re_passwd.attr("disabled", false);
    $("#submit-btn").attr("disabled", false);
})

passwd.on("focusout", () => {
    if (passwd.val() != re_passwd.val()) {
        $("#submit-btn").attr("disabled", true);
        $("#submit-btn").text("Passwords do not match");
    } else if (passwd.val() === "" && re_passwd.val() === ""){
        $("#submit-btn").attr("disabled", false);
        $("#submit-btn").text("Submit");
    } else if (passwd.val() === re_passwd.val()) {
        $("#submit-btn").attr("disabled", false);
        $("#submit-btn").text("Submit");
    }else {
        $("#submit-btn").attr("disabled", false);
    }
})

re_passwd.on("focusout", () => {
    if (passwd.val() != re_passwd.val()) {
        $("#submit-btn").attr("disabled", true);
        $("#submit-btn").text("Passwords do not match");
    } else if (passwd.val() === "" && re_passwd.val() === ""){
        $("#submit-btn").attr("disabled", false);
        $("#submit-btn").text("Submit");
    } else if (passwd.val() === re_passwd.val()) {
        $("#submit-btn").attr("disabled", false);
        $("#submit-btn").text("Submit");
    }else {
        $("#submit-btn").attr("disabled", false);
    }
})
