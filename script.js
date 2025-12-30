/**
 * Initialize interactive UI behaviors after the DOM is ready.
 * Sets up scroll hints, image navigation, dropdowns, sidebar behavior, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    const imageDiv = document.getElementById('image-div')
    const scrollArrowDown = document.getElementById('scroll-arrow-down')
    const scrollArrowUp = document.getElementById('scroll-arrow-up')

    if (imageDiv) {
        // Navigate between `.image-object` elements when arrows are clicked
        const imageObjects = Array.from(imageDiv.querySelectorAll('.image-object'))

        /**
         * Get the index of the first `.image-object` element that is visible
         * at or below the container's top padding. Falls back to the last index.
         * @returns {number} index of the currently-visible image-object
         */
        function getCurrentIndex() {
            if (!imageObjects.length) return -1
            const containerRect = imageDiv.getBoundingClientRect()
            const containerCenter = containerRect.top + imageDiv.clientHeight / 2
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

        /**
         * Show or hide the up/down scroll arrows based on the provided index.
         * @param {number} index
         */
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
         * Scroll to the next/previous `.image-object` based on `direction`.
         * Uses `scrollIntoView` so container scroll-padding and CSS snap rules apply.
         * @param {number} direction +1 for next, -1 for previous
         * @returns {void}
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
            /**
             * Click handler for the down-arrow control.
             * @param {MouseEvent} e
             */
            scrollArrowDown.addEventListener('click', (e) => {
                e.preventDefault()
                navigateTo(1)
            })
        }
        if (scrollArrowUp) {
            /**
             * Click handler for the up-arrow control.
             * @param {MouseEvent} e
             */
            scrollArrowUp.addEventListener('click', (e) => {
                e.preventDefault()
                navigateTo(-1)
            })
        }

        // Keep arrow visibility in sync on scroll/resize and at load
        imageDiv.addEventListener('scroll', () => updateArrowsVisibility(getCurrentIndex()))
        window.addEventListener('resize', () => updateArrowsVisibility(getCurrentIndex()))
        updateArrowsVisibility(getCurrentIndex())
    }

    /**
     * Auto-collapse sidebars when the configured expanded width exceeds
     * one-third of the window width. This prevents oversized sidebars on small screens.
     * @param {Event} [e]
     * @returns {void}
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

            const forceCollapsed = pxWidth > windowWidth / 3

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

    // Dropdown (expandable content box) logic for multiple class instances
    /**
     * Initialize dropdown behavior for each `.dropdown-container`.
     * @param {Element} container
     */
    document.querySelectorAll('.dropdown-container').forEach((container) => {
        const toggle = container.querySelector('.dropdown-toggle')
        const content = container.querySelector('.dropdown-content')
        const arrowDown = container.querySelector('.dropdown-arrow-down')
        const arrowUp = container.querySelector('.dropdown-arrow-up')

        let expanded = false

        if (!toggle || !content || !arrowDown || !arrowUp) return

        const inner = document.createElement('div')
        const computed = window.getComputedStyle(content)

        inner.style.padding = computed.padding

        while (content.firstChild) {
            inner.appendChild(content.firstChild)
        }
        content.appendChild(inner)

        content.style.padding = '0'
        content.style.overflow = 'hidden'
        content.style.position = 'relative'

        inner.style.position = 'relative'

        const expandedHeight = inner.scrollHeight

        content.style.maxHeight = '0px'

        /**
         * Toggle click handler to expand/collapse dropdown content.
         * @returns {void}
         */
        toggle.addEventListener('click', () => {
            expanded = !expanded

            if (expanded) {
                content.style.border = ''
                content.style.maxHeight = expandedHeight + 'px'
                arrowDown.style.opacity = '0'
                arrowUp.style.opacity = '1'
            } else {
                /**
                 * Delay clearing the border to allow the height animation to finish.
                 * @returns {void}
                 */
                setTimeout(() => {
                    if (!expanded) {
                        content.style.border = '1px solid transparent'
                        content.style.borderTop = '0px solid transparent'
                    }
                }, 300)
                content.style.maxHeight = '0px'
                arrowDown.style.opacity = '1'
                arrowUp.style.opacity = '0'
            }
        })
        content.style.border = '1px solid transparent'
        content.style.borderTop = '0px solid transparent'
        content.style.maxHeight = '0px'
        arrowDown.style.opacity = '1'
        arrowUp.style.opacity = '0'
    })

    // Fade in elements in main and .image-panel with a delay
    /**
     * Animate children of `<main>` and `.image-panel` to fade in sequentially.
     * @returns {void}
     */

    const main = document.querySelector('main')
    const deepMainElements = main ? Array.from(main.children).flatMap((child) => Array.from(child.children)) : []
    const deepImageDivElements = imageDiv ? Array.from(imageDiv.children).flatMap((child) => Array.from(child.children)) : []
    const allAnimatableElements = [...deepMainElements, ...deepImageDivElements]

    allAnimatableElements.forEach((element) => element.classList.add('fade-in-line'))

    setTimeout(() => {
        allAnimatableElements.forEach((el, i) => {
            /**
             * Delay adding the `visible` class for staggered animation.
             * @returns {void}
             */
            setTimeout(() => {
                el.classList.add('visible')
            }, 100 * i)
        })
    }, 500)

    // Sidebar functionality
    /**
     * Attach toggle handlers to each sidebar's toggle button.
     * @param {Element} sidebar
     */
    document.querySelectorAll('.sidebar').forEach((sidebar) => {
        const sidebarToggle = sidebar.querySelector('.sidebar-toggle')
        if (sidebarToggle) {
            /**
             * Click handler to toggle sidebar collapsed state.
             * @returns {void}
             */
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed')
            })
        }
    })
})
