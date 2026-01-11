// Initialize interactive UI behaviors after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Navigate between `#projectsDiv` elements (projects) when arrows are clicked
    const projectsDiv = document.getElementById('projects')
    const scrollArrowUp = document.getElementById('scroll-arrow-up')
    const scrollArrowDown = document.getElementById('scroll-arrow-down')

    if (projectsDiv) {
        const imageObjects = Array.from(projectsDiv.querySelectorAll('.image-object'))

        /**
         * Get the index of the first `.image-object` element that is visible
         * at or below the container's top padding. Falls back to the last index
         */
        function getCurrentIndex() {
            if (!imageObjects.length) return -1
            const containerRect = projectsDiv.getBoundingClientRect()
            const containerCenter = containerRect.top + projectsDiv.clientHeight / 2
            let closestIndex = 0
            let closestDist = Infinity
            imageObjects.forEach((el, idx) => {
                const rect = el.getBoundingClientRect()
                const elCenter = rect.top + rect.height / 2
                const dist = Math.abs(elCenter - containerCenter)
                if (dist < closestDist) {
                    closestDist = dist
                    closestIndex = idx
                }
            })
            return closestIndex
        }

        // Show/hide the up/down scroll arrows based on the provided index.
        function updateArrowsVisibility(index) {
            if (scrollArrowUp) {
                if (index <= 0) {
                    scrollArrowUp.style.opacity = '0'
                    scrollArrowUp.style.pointerEvents = 'none'
                } else {
                    scrollArrowUp.style.opacity = '1'
                    scrollArrowUp.style.pointerEvents = ''
                }
            }
            if (scrollArrowDown) {
                if (index >= imageObjects.length - 1) {
                    scrollArrowDown.style.opacity = '0'
                    scrollArrowDown.style.pointerEvents = 'none'
                } else {
                    scrollArrowDown.style.opacity = '1'
                    scrollArrowDown.style.pointerEvents = ''
                }
            }
        }

        /**
         * Scroll to the next/previous `.image-object` based on `direction`
         * Uses `scrollIntoView` so container scroll-padding and CSS snap rules apply
         */
        function navigateTo(direction) {
            if (!imageObjects.length) return
            const current = getCurrentIndex()
            let next = current + direction
            if (next < 0) next = 0
            if (next >= imageObjects.length) next = imageObjects.length - 1
            const target = imageObjects[next]
            if (target) {
                // Use scroll-snap + scroll-padding; scrollIntoView respects scroll-padding.
                target.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }

        if (scrollArrowDown) {
            // Click handler for the down-arrow control
            scrollArrowDown.addEventListener('click', (e) => {
                e.preventDefault()
                navigateTo(1)
            })
        }
        if (scrollArrowUp) {
            // Click handler for the up-arrow control
            scrollArrowUp.addEventListener('click', (e) => {
                e.preventDefault()
                navigateTo(-1)
            })
        }

        // Keep arrow visibility in sync on scroll/resize and at load
        projectsDiv.addEventListener('scroll', () => updateArrowsVisibility(getCurrentIndex()))
        window.addEventListener('resize', () => updateArrowsVisibility(getCurrentIndex()))
        updateArrowsVisibility(getCurrentIndex())
    }

    // // Initialize dropdown behavior for each `.dropdown-container`
    // document.querySelectorAll('.dropdown-container').forEach((container) => {
    //     const content = container.querySelector('.dropdown-content')
    //     const toggle = container.querySelector('.dropdown-toggle')
    //     const arrowDown = container.querySelector('.dropdown-arrow-down')
    //     const arrowUp = container.querySelector('.dropdown-arrow-up')
    //     if (!toggle || !content || !arrowDown || !arrowUp) return

    //     // content.classList.add('overflow-y-hidden')
    //     // content.classList.add('box-border')

    //     let expanded = false


    //     // Toggle click handler to expand/collapse dropdown content.
    //     toggle.addEventListener('click', () => {
    //         expanded = !expanded

    //         if (expanded) {
    //             content.style.border = ''
    //             content.style.maxHeight = content.scrollHeight + 'px'
    //             arrowDown.style.opacity = '0'
    //             arrowUp.style.opacity = '1'
    //         } else {


                
    //             // collapse using max-height
    //             content.style.maxHeight = '0px'
    //             arrowDown.style.opacity = '1'
    //             arrowUp.style.opacity = '0'
    //             /* Delay clearing the border to allow the height animation to finish. */
    //             setTimeout(() => {
    //                 if (!expanded) {
    //                     content.style.border = '1px solid transparent'
    //                     content.style.borderTop = '0px solid transparent'
    //                 }
    //             }, 300)
    //         }
    //     })
    //     content.style.overflowY = 'hidden'
    //     content.style.border = '1px solid transparent'
    //     content.style.borderTop = '0px solid transparent'
    //     content.style.maxHeight = '0px'
    //     arrowDown.style.opacity = '1'
    //     arrowUp.style.opacity = '0'
    // })


    document.querySelectorAll('.dropdown-container').forEach((container) => {
        const toggle = container.querySelector('.dropdown-toggle');
        const arrowDown = container.querySelector('.dropdown-arrow-down');
        const arrowUp = container.querySelector('.dropdown-arrow-up');
        const panel = container.querySelector('.dropdown-panel');
        const content = container.querySelector('.dropdown-content');

        if (!toggle || !arrowDown || !arrowDown || !panel || !content) return

        let panelCollapsed = true;
        panel.style.maxHeight = "0px";
        panel.style.border = '1px solid transparent'
        panel.style.borderTop = '0px solid transparent'

        toggle.addEventListener("click", () => {
            if (panelCollapsed) {
                panel.style.maxHeight = "0px";
                arrowUp.style.opacity = '0'
                arrowDown.style.opacity = '1'
                setTimeout(() => {
                    if (!panelCollapsed) {
                        panel.style.border = '1px solid transparent'
                        panel.style.borderTop = '0px solid transparent'
                    }
                }, 300)
            } else {
                panel.style.maxHeight = content.scrollHeight + "px";
                panel.style.border = ''
                arrowUp.style.opacity = '1'
                arrowDown.style.opacity = '0'
            }
            panelCollapsed = !panelCollapsed;
        });
    });









    // // Initialize dropdown behavior for each `.dropdown-container`
    // document.querySelectorAll('.dropdown-container').forEach((container) => {
    //     const toggle = container.querySelector('.dropdown-toggle')
    //     const content = container.querySelector('.dropdown-content')
    //     const arrowDown = container.querySelector('.dropdown-arrow-down')
    //     const arrowUp = container.querySelector('.dropdown-arrow-up')
    //     if (!toggle || !content || !arrowDown || !arrowUp) return

    //     let expanded = false

    //     const inner = document.createElement('div')
    //     const computed = window.getComputedStyle(content)

    //     inner.style.padding = computed.padding

    //     while (content.firstChild) {
    //         inner.appendChild(content.firstChild)
    //     }
    //     content.appendChild(inner)

    //     content.style.padding = '0'
    //     content.style.overflow = 'hidden'
    //     content.style.position = 'relative'
    //     content.style.maxHeight = '0px'

    //     inner.style.position = 'relative'

    //     const expandedHeight = inner.scrollHeight

    //     // Toggle click handler to expand/collapse dropdown content.
    //     toggle.addEventListener('click', () => {
    //         expanded = !expanded

    //         if (expanded) {
    //             content.style.border = ''
    //             content.style.maxHeight = expandedHeight + 'px'
    //             arrowDown.style.opacity = '0'
    //             arrowUp.style.opacity = '1'
    //         } else {
    //             /* Delay clearing the border to allow the height animation to finish. */
    //             setTimeout(() => {
    //                 if (!expanded) {
    //                     content.style.border = '1px solid transparent'
    //                     content.style.borderTop = '0px solid transparent'
    //                 }
    //             }, 300)
    //             content.style.maxHeight = '0px'
    //             arrowDown.style.opacity = '1'
    //             arrowUp.style.opacity = '0'
    //         }
    //     })
    //     content.style.border = '1px solid transparent'
    //     content.style.borderTop = '0px solid transparent'
    //     content.style.maxHeight = '0px'
    //     arrowDown.style.opacity = '1'
    //     arrowUp.style.opacity = '0'
    // })

    /* Animate great-grandchildren of `<main>` and `.image-panel` to fade in sequentially. */
    const main = document.querySelector('main')
    const mainGreatGrandchildren = main ? Array.from(main.querySelectorAll(':scope > * > * > *')) : []
    mainGreatGrandchildren.forEach((element) => element.classList.add('fade-in-line'))

    setTimeout(() => {
        mainGreatGrandchildren.forEach((el, i) => {
            /* Delay adding the `visible` class for staggered animation. */
            setTimeout(() => {
                el.classList.add('visible')
            }, 100 * i)
        })
    }, 200)

    /* Attach toggle handlers to each sidebar's toggle button. */
    document.querySelectorAll('.sidebar').forEach((sidebar) => {
        const sidebarToggle = sidebar.querySelector('.sidebar-toggle')
        if (sidebarToggle) {
            /* Click handler to toggle sidebar collapsed state. */
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed')
            })
        }
    })

    /**
     * Auto-collapse sidebars when the configured expanded width exceeds
     * one-quarter of the window width. This prevents oversized sidebars on small screens.
     */
    function autoCollapseSidebar(e) {
        document.querySelectorAll('.sidebar').forEach((sidebar) => {
            const rootStyles = getComputedStyle(document.documentElement)

            let expandedWidth = rootStyles.getPropertyValue('--sidebar-expanded-width').trim()
            let pxWidth = 0
            if (expandedWidth.endsWith('rem')) {
                const rem = parseFloat(expandedWidth)
                const fontSize = parseFloat(rootStyles.fontSize) || 16
                pxWidth = rem * fontSize
            } else {
                pxWidth = parseFloat(expandedWidth)
            }

            const windowWidth = window.innerWidth
            const sidebarToggle = sidebar.querySelector('.sidebar-toggle')
            if (!windowWidth || !sidebarToggle) return

            const forceCollapsed = pxWidth > windowWidth / 4
            if (forceCollapsed) {
                sidebar.classList.add('collapsed')
                sidebarToggle.disabled = true
                sidebarToggle.classList.add('opacity-50', 'cursor-not-allowed')
            } else {
                sidebar.classList.remove('collapsed')
                sidebarToggle.disabled = false
                sidebarToggle.classList.remove('opacity-50', 'cursor-not-allowed')
            }
        })
    }
    window.addEventListener('resize', autoCollapseSidebar)
    autoCollapseSidebar()
})
