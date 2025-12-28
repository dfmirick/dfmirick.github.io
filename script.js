document.addEventListener('DOMContentLoaded', () => {
    
    // Dropdown (expandable content box) logic for multiple class instances
    document.querySelectorAll('.dropdown-container').forEach(container => {
        const toggle = container.querySelector('.dropdown-toggle');
        const content = container.querySelector('.dropdown-content');
        const arrowDown = container.querySelector('.dropdown-arrow-down');
        const arrowUp = container.querySelector('.dropdown-arrow-up');

        let expanded = false;

        if (!toggle || !content || !arrowDown || !arrowUp) return;

        const inner = document.createElement('div');
        const computed = window.getComputedStyle(content);

        inner.style.padding = computed.padding;

        while (content.firstChild) {
            inner.appendChild(content.firstChild);
        }
        content.appendChild(inner);

        content.style.padding = '0';
        content.style.overflow = 'hidden';
        content.style.position = 'relative';

        inner.style.position = 'relative';

        const expandedHeight = inner.scrollHeight;

        content.style.maxHeight = '0px';

        toggle.addEventListener('click', () => {
            expanded = !expanded;

            if (expanded) {
                content.style.maxHeight = expandedHeight + 'px';
                arrowDown.style.opacity = '0';
                arrowUp.style.opacity = '1';
            } else {
                content.style.maxHeight = '0px';
                arrowDown.style.opacity = '1';
                arrowUp.style.opacity = '0';
            }
        });
        arrowDown.style.opacity = '1';
        arrowUp.style.opacity = '0';
    });


    // Fade in elements in main with a delay
    const main = document.querySelector('main');
    const elements = Array.from(main ? main.children : []);

    elements.forEach(element => element.classList.add('fade-in-line'));

    setTimeout(() => {
        elements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, 200 * i);
        });
    }, 500);

    // Sidebar collapse functionality for CSS Grid layout
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById("sidebar-toggle");

    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
    });
});