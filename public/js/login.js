$(document).ready(() => {
    // Element selections
    const emailInput = $("#form-email");
    const passwordInput = $("#form-passwd");

    // Handle form submission
    $("#submit-btn").on("click", () => {
        // Gather values
        const email = emailInput.val();
        const password = passwordInput.val();
        console.log(email);
        console.log(password);
        // Create a user object to send to the server
        const loginData = {
            email,
            password
        };

        // Send data to the server using AJAX
        $.ajax({
            type: "POST",
            url: "/users/login", // Change this URL to match your login endpoint
            contentType: "application/json",
            data: JSON.stringify(loginData),
            success: (response) => {
                alert(response.message); // Show success message
                
                // Store user ID in local storage
                localStorage.setItem('userId', response.user._id); // Adjust this based on your response structure
                
                // Optionally, redirect the user to another page upon successful login
                window.location.href = '/'; // Change this to your desired redirect URL
            },
            error: (xhr) => {
                alert(xhr.responseJSON.error); // Show error message
            }
        });
    });
});
