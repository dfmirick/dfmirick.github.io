document.addEventListener('DOMContentLoaded', () => {
    // const button = document.getElementById('theme-switcher');
    // const buttonIcon = button.querySelector('.material-icons-outlined');

    // // Toggle Tailwind 'dark' class on the root element and update icon
    // button.addEventListener('click', () => {
    //     const isDark = document.documentElement.classList.toggle('dark');
    //     buttonIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
    // });

    // // Initialize icon based on current theme
    // const initialIsDark = document.documentElement.classList.contains('dark');
    // buttonIcon.textContent = initialIsDark ? 'light_mode' : 'dark_mode';

    // Sidebar collapse functionality for CSS Grid layout
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById("sidebar-toggle");

    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
    });
});