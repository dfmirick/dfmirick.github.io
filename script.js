document.addEventListener('DOMContentLoaded', () => {

    const button = document.getElementById('theme-switcher');
    const buttonIcon = button.querySelector('.material-icons-outlined');

    // Toggle theme and update icon
    button.addEventListener('click', () => {
        const next = document.body.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-bs-theme', next);
        buttonIcon.textContent = next === 'dark' ? 'light_mode' : 'dark_mode';
    });

    // Initialize icon based on current theme
    const initial = document.body.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
    document.body.setAttribute('data-bs-theme', initial);
    buttonIcon.textContent = initial === 'dark' ? 'light_mode' : 'dark_mode';

    // Sidebar collapse functionality for CSS Grid layout
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById("sidebar-toggle");

    sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    });
});