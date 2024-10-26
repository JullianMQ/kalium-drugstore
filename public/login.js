let email = $("#form-email")
let password = $("#form-passwd")
let loginBtn = $("#submit-btn")

loginBtn.on("click", () => {
    console.log(email.val())
    console.log(password.val())
})
