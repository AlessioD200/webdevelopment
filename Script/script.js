document.querySelectorAll('.dropdown-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default behavior of the link/button (like #)

        const menu = this.nextElementSibling; // Get the dropdown menu associated with this button

        // Close all dropdowns before toggling the current one
        document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
            if (dropdown !== menu) {
                dropdown.classList.remove('show'); // Close other dropdowns
            }
        });

        // Toggle the visibility of the current dropdown
        menu.classList.toggle('show');
    });
});

// Close the dropdown when clicking anywhere outside of it
document.addEventListener('click', function(e) {
    if (!e.target.closest('.project-item')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show'); // Close all dropdowns
        });
    }
});