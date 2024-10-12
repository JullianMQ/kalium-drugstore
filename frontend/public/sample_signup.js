let first_name = $("#form-first_name")
let last_name = $("#form-last_name")
let gender = $(".form-gender")
let phoneno = $("#form-phoneno")
let address = $("#form-address")
let date_of_birth = $("#form-date_of_birth")
let username = $("#form-username")
let email = $("#form-email")
let passwd = $("#form-passwd")

$("#form-details").hide();

const calcAge = (date) => {
    const birthDate = new Date(date);
    
    const [todayYear, todayMonth, todayDate] = [
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate()
    ];

    const [birthYear, birthMonth, birthDay] = [
        birthDate.getUTCFullYear(),
        birthDate.getUTCMonth(),
        birthDate.getUTCDate()
    ];

    let age = todayYear - birthYear;

    if (todayMonth < birthMonth || (todayMonth === birthMonth && todayDate < birthDay)) {
        age--;
    }

    return age;
};

$("#submit-btn").on("click", () => {
    first_name_val = first_name.val();
    last_name_val = last_name.val();
    gender_val = gender.val();
    phoneno_val = phoneno.val();
    address_val = address.val();
    date_of_birth_val = date_of_birth.val();
    username_val = username.val();
    email_val = email.val();
    passwd_val = passwd.val();

    $("#det-first_name").attr("value", `${first_name_val}`);
    $("#det-last_name").attr("value", `${last_name_val}`);
    $("#det-gender").attr("value", `${gender_val}`);
    $("#det-phoneno").attr("value", `${phoneno_val}`);
    $("#det-address").val(`${address_val}`);
    date_of_birth_val = calcAge(date_of_birth_val);
    $("#det-date_of_birth").attr("value", `${date_of_birth_val}`);
    $("#det-username").attr("value", `${username_val}`);
    $("#det-email").attr("value", `${email_val}`);
    $("#det-passwd").attr("value", "************");

    first_name.attr("disabled", true);
    last_name.attr("disabled", true);
    gender.attr("disabled", true);
    phoneno.attr("disabled", true);
    address.attr("disabled", true);
    date_of_birth.attr("disabled", true);
    username.attr("disabled", true);
    email.attr("disabled", true);
    passwd.attr("disabled", true);

    $("#form-details").slideToggle("slow", () => { });
    console.log($("#form-details"));
    $("#user-form").hide();
})

$("#next-btn").on("click", () => {
    console.log("clicked");
    $("#user-form").slideToggle();
    $("#form-credentials").hide();
})

$("#det-passwd").on("mouseenter", () => {
    $("#det-passwd").attr("value", `${passwd_val}`);
})

$("#det-passwd").on("click", () => {
    if (passwd_val === "************") {
        $("#det-passwd").attr("value", `${passwd_val}`);
    } else {
        $("#det-passwd").attr("value", "************");
    }
})

$("#det-passwd").on("mouseleave", () => {
    $("#det-passwd").attr("value", "************");
})

$("#incorrect-btn").on("click", () => {
    $("#form-details").hide();
    first_name.prop("value", "");
    last_name.prop("value", "");
    gender.prop("checked", false);
    phoneno.prop("value", "");
    address.prop("value", "");
    date_of_birth.prop("value", "");
    username.prop("value", "");
    email.prop("value", "");
    passwd.prop("value", "");

    first_name.attr("disabled", false);
    last_name.attr("disabled", false);
    gender.attr("disabled", false);
    phoneno.attr("disabled", false);
    address.attr("disabled", false);
    date_of_birth.attr("disabled", false);
    username.attr("disabled", false);
    email.attr("disabled", false);
    passwd.attr("disabled", false);
    $("#submit-btn").attr("disabled", false);
    $("#form-credentials").slideToggle();
})
