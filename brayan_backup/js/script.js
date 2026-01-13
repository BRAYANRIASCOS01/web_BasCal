document.addEventListener('DOMContentLoaded', function() {
    // Set year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Header scroll effect
    const header = document.querySelector('.site-header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const primaryNav = document.getElementById('primary-nav');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            primaryNav.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Dropdown functionality for mobile
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', e => {
            if (window.innerWidth < 900) {
                e.preventDefault();
                const dropdown = toggle.parentElement;
                dropdown.classList.toggle('open');
            }
        });
    });

    // Accordion functionality
    document.querySelectorAll('.acc-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;
            const isPanelOpen = panel.style.display === 'block';

            // Close all other accordion items
            document.querySelectorAll('.acc-panel').forEach(otherPanel => {
                if (otherPanel !== panel) {
                    otherPanel.style.display = 'none';
                    otherPanel.previousElementSibling.classList.remove('active');
                }
            });

            panel.style.display = isPanelOpen ? 'none' : 'block';
            button.classList.toggle('active', !isPanelOpen);
        });
    });

    // Feather icons replacement
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
