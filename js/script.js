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

    const servicesCarousel = document.querySelector('.stats-services .stats-carousel');
    if (servicesCarousel) {
        const track = servicesCarousel.querySelector('.stats-grid');
        const nextButton = servicesCarousel.querySelector('.stats-arrow');

        const updateArrowVisibility = () => {
            if (!track || !nextButton) {
                return;
            }
            nextButton.style.display = track.scrollWidth > track.clientWidth + 1 ? 'inline-flex' : 'none';
        };

        const scrollNext = () => {
            if (!track) {
                return;
            }
            const card = track.querySelector('.stat-card');
            if (!card) {
                return;
            }
            const styles = window.getComputedStyle(track);
            const gapValue =
                Number.parseFloat(styles.columnGap) ||
                Number.parseFloat(styles.gap) ||
                Number.parseFloat(styles.rowGap) ||
                0;
            const cardWidth = card.getBoundingClientRect().width;
            const visibleCount = Math.max(1, Math.round(track.clientWidth / (cardWidth + gapValue)));
            const step = (cardWidth + gapValue) * visibleCount;
            const maxScroll = track.scrollWidth - track.clientWidth;

            if (track.scrollLeft + step >= maxScroll - 1) {
                track.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                track.scrollBy({ left: step, behavior: 'smooth' });
            }
        };

        if (nextButton) {
            nextButton.addEventListener('click', scrollNext);
        }
        window.addEventListener('resize', updateArrowVisibility);
        updateArrowVisibility();
    }

    // Feather icons replacement
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
