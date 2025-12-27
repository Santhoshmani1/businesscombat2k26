import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Info, Target, DollarSign, Users, Zap } from 'lucide-react';
import { CTAButton } from '../ui';
import { useScrollNavigation } from '../../hooks/useScrollNavigation';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Navigation items with icons
    const navItems = [
        { id: 'about', label: 'About', href: '#about', icon: Info },
        { id: 'rounds', label: 'Rounds', href: '#rounds', icon: Target },
        { id: 'pricing', label: 'Pricing', href: '#pricing', icon: DollarSign },
        { id: 'coordinators', label: 'Coordinators', href: '#coordinators', icon: Users },
    ];

    // Use scroll navigation hook
    const { activeSection, handleNavClick } = useScrollNavigation(navItems);

    // Handle scroll effect for header transparency
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle navigation click with mobile menu close
    const handleNavItemClick = (href) => {
        handleNavClick(href);
        setIsMobileMenuOpen(false);
    };

    // Handle registration button click
    const handleRegisterClick = () => {
        // Open registration form
        const url = 'https://forms.gle/6sWcLoYBgmKHCPhe8';
        window.open(url, '_blank');
    };

    // Header animation variants
    const headerVariants = {
        transparent: {
            backgroundColor: 'rgba(15, 20, 30, 0)',
            backdropFilter: 'blur(0px)',
            borderColor: 'rgba(255, 255, 255, 0)',
        },
        opaque: {
            backgroundColor: 'rgba(15, 20, 30, 0.8)',
            backdropFilter: 'blur(14px)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
        }
    };

    // Mobile menu animation variants
    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b"
                variants={headerVariants}
                animate={isScrolled ? 'opaque' : 'transparent'}
            >
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo/Brand */}
                        <div className="flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-core-orange/20 to-electric-blue/20 border border-glass-border">
                                    <Zap className="w-6 h-6 text-core-orange" />
                                </div>
                                <h1 className="hero-text text-xl lg:text-2xl text-core-orange">
                                    BUSINESS COMBAT
                                </h1>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
                            {navItems.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleNavItemClick(item.href)}
                                        className={`flex items-center gap-2 ui-text-medium text-sm lg:text-base transition-all duration-200 hover:text-core-orange group ${activeSection === item.id ? 'text-core-orange' : 'text-white'
                                            }`}
                                    >
                                        <IconComponent className={`w-4 h-4 transition-all duration-200 ${activeSection === item.id
                                            ? 'text-core-orange'
                                            : 'text-gray-400 group-hover:text-core-orange'
                                            }`} />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Desktop CTA Button */}
                        <div className="hidden md:block">
                            <CTAButton
                                variant="primary"
                                size="medium"
                                onClick={handleRegisterClick}
                            >
                                REGISTER
                            </CTAButton>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="p-2 text-white transition-colors duration-200 md:hidden hover:text-core-orange"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden"
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-base-black/80 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Content */}
                        <div className="relative p-6 mx-4 top-16 glass-card">
                            <nav className="flex flex-col space-y-4">
                                {navItems.map((item) => {
                                    const IconComponent = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => handleNavItemClick(item.href)}
                                            className={`flex items-center gap-3 ui-text-medium text-left py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-glass-bg hover:text-core-orange ${activeSection === item.id ? 'text-core-orange bg-glass-bg' : 'text-white'
                                                }`}
                                        >
                                            <IconComponent className={`w-5 h-5 ${activeSection === item.id ? 'text-core-orange' : 'text-gray-400'
                                                }`} />
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                })}

                                {/* Mobile CTA Button */}
                                <div className="pt-4 border-t border-glass-border">
                                    <CTAButton
                                        variant="primary"
                                        size="large"
                                        onClick={handleRegisterClick}
                                        className="w-full"
                                    >
                                        REGISTER
                                    </CTAButton>
                                </div>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;