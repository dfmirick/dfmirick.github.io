document.addEventListener('DOMContentLoaded', () => {

    // Auto-collapse sidebar if expanded width > 1/3 of window width
    function autoCollapseSidebar(e) {
        document.querySelectorAll('.sidebar').forEach(sidebar => {
            const rootStyles = getComputedStyle(document.documentElement);
            
            let expandedWidth = rootStyles.getPropertyValue('--sidebar-expanded-width').trim();
            let pxWidth = 0;

            if (expandedWidth.endsWith('rem')) {
                const rem = parseFloat(expandedWidth);
                const fontSize = parseFloat(rootStyles.fontSize) || 16;
                pxWidth = rem * fontSize;
            } else {
                pxWidth = parseFloat(expandedWidth);
            }

            const windowWidth = window.innerWidth;
            const sidebarToggle = sidebar.querySelector('.sidebar-toggle');
            
            if (!windowWidth || !sidebarToggle) return;
            
            const forceCollapsed = pxWidth > windowWidth / 3;

            if (forceCollapsed) {
                sidebar.classList.add('collapsed');
                sidebarToggle.disabled = true;
                sidebarToggle.classList.add('opacity-50', 'cursor-not-allowed');
            } else {
                sidebar.classList.remove('collapsed');
                sidebarToggle.disabled = false;
                sidebarToggle.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        });
    }

    window.addEventListener('resize', autoCollapseSidebar);
    autoCollapseSidebar();

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
                content.style.border = "";
                content.style.maxHeight = expandedHeight + 'px';
                arrowDown.style.opacity = '0';
                arrowUp.style.opacity = '1';
            } else {
                setTimeout(() => {
                    if (!expanded) {
                        content.style.border = "1px solid transparent";
                        content.style.borderTop = "0px solid transparent";
                    }
                }, 300);
                content.style.maxHeight = '0px';
                arrowDown.style.opacity = '1';
                arrowUp.style.opacity = '0';
            }
        });
        content.style.border = "1px solid transparent";
        content.style.borderTop = "0px solid transparent";
        content.style.maxHeight = '0px';
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

    // Sidebar functionality
    document.querySelectorAll('.sidebar').forEach(sidebar => {
        const sidebarToggle = sidebar.querySelector('.sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
            });
        }
    });
});