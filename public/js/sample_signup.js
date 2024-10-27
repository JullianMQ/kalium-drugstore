$(document).ready(function() {
    $('#submit-btn').on('click', function() {
        const firstName = $('#form-first_name').val().trim();
        const lastName = $('#form-last_name').val().trim();
        const email = $('#form-email').val().trim();
        const password = $('#form-passwd').val();
        const rePassword = $('#form-re_passwd').val();

        if (!firstName || !lastName || !email || !password || !rePassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== rePassword) {
            alert('Passwords do not match.');
            return;
        }

        const userData = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password // Ensure this matches your server's expected field
        };

        $.ajax({
            url: '/users/register', // Your endpoint for registration
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(response) {
                alert('Registration successful! Redirecting...');
                window.location.href = '/login'; // Redirect to login page or another appropriate page
            },
            error: function(xhr) {
                alert('Registration failed: ' + xhr.responseJSON.error);
            }
        });
    });
});