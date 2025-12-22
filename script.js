// Sidebar collapse logic with show button and icon-only collapsed state
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarShowBtn = document.getElementById('sidebarShowBtn');
const sidebarLabels = document.querySelectorAll('.sidebar-label');
let collapsed = false;
function hideSidebar() {
    sidebar.style.marginLeft = '-220px';
    sidebar.style.width = '60px';
    sidebarShowBtn.style.display = 'block';
    sidebarLabels.forEach(label => label.style.display = 'none');
    collapsed = true;
}
function showSidebar() {
    sidebar.style.marginLeft = '0';
    sidebar.style.width = '260px';
    sidebarShowBtn.style.display = 'none';
    sidebarLabels.forEach(label => label.style.display = 'inline');
    collapsed = false;
}
sidebarToggle.addEventListener('click', hideSidebar);
sidebarShowBtn.addEventListener('click', showSidebar);
// Hide sidebar by default on mobile
function handleResize() {
    if (window.innerWidth < 768) {
        hideSidebar();
    } else {
        showSidebar();
    }
}
window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', handleResize);

// Boilerplate JS for Bootstrap site
// You can add custom JS below

document.addEventListener('DOMContentLoaded', function() {
    // Example: Show alert on button click
    const button = document.getElementById('clickMeBtn');
    if (button) {
        button.addEventListener('click', function() {
            alert('Button clicked!');
        });
    }
});
