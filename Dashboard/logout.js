function logout() {
    // Clear the "user_id" cookie
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Alert the user that they have been logged out
    alert('Du wurdest ausgelogt');
    
    // Redirect the user to the login page or another appropriate page
    window.location.href = "index.html"; // Change the URL as needed
}