document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const fullpage = document.getElementById('fullpage');

    // Debounce function
    const debounce = (func, wait = 20, immediate = true) => {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    // Function to update active section
    const updateActiveSection = () => {
        const scrollPosition = fullpage.scrollTop;
        sections.forEach((section, index) => {
            const sectionTop = index * window.innerHeight;
            const sectionBottom = sectionTop + window.innerHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    };

    // Initial call to set active section
    updateActiveSection();

    // Update active section on scroll with debounce
    fullpage.addEventListener('scroll', debounce(updateActiveSection));

    // Smooth scroll to section when clicking on navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Smooth keyboard navigation
    document.addEventListener('keydown', (e) => {
        const currentIndex = Array.from(sections).findIndex(section => section.classList.contains('active'));
        let targetIndex;

        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            targetIndex = currentIndex + 1;
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            targetIndex = currentIndex - 1;
        }

        if (targetIndex !== undefined) {
            e.preventDefault(); // Prevent default scroll behavior
            sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
        }
    });
});

