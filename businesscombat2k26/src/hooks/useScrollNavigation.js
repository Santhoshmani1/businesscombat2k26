import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for smooth scroll navigation and active section detection
 * Handles smooth scrolling to sections and tracks which section is currently active
 */
export const useScrollNavigation = (sections = []) => {
    const [activeSection, setActiveSection] = useState('');

    // Smooth scroll to section
    const scrollToSection = useCallback((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = 80; // Account for fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, []);

    // Handle navigation link clicks
    const handleNavClick = useCallback((href) => {
        const sectionId = href.replace('#', '');
        scrollToSection(sectionId);
    }, [scrollToSection]);

    // Track active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100; // Offset for header

            // Find the current section
            let currentSection = '';

            sections.forEach((section) => {
                const element = document.getElementById(section.id);
                if (element) {
                    const elementTop = element.offsetTop;
                    const elementHeight = element.offsetHeight;

                    if (scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight) {
                        currentSection = section.id;
                    }
                }
            });

            // If we're at the top of the page, don't highlight any section
            if (window.scrollY < 100) {
                currentSection = '';
            }

            setActiveSection(currentSection);
        };

        // Initial check
        handleScroll();

        // Add scroll listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sections]);

    return {
        activeSection,
        scrollToSection,
        handleNavClick
    };
};